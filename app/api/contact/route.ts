import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  whatsapp: string
  inquiry: string
}

// Utility function to add timeout to fetch requests
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 10000) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeout)
    return response
  } catch (error) {
    clearTimeout(timeout)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Trim all inputs to prevent whitespace-only submissions
    const name = data.name?.trim() || ''
    const email = data.email?.trim() || ''
    const whatsapp = data.whatsapp?.trim() || ''
    const inquiry = data.inquiry?.trim() || ''

    // Validate required fields
    if (!name || !inquiry) {
      return NextResponse.json(
        { error: 'Missing required fields: name and inquiry are required' },
        { status: 400 }
      )
    }

    // Validate at least one contact method is provided
    if (!email && !whatsapp) {
      return NextResponse.json(
        { error: 'Please provide either an email address or WhatsApp number' },
        { status: 400 }
      )
    }

    // Use trimmed values for integrations
    const cleanData: ContactFormData = { name, email, whatsapp, inquiry }

    // Run integrations in parallel with graceful error handling
    const results = await Promise.allSettled([
      sendToSlack(cleanData),
      addToBrevo(cleanData),
    ])

    // Log failures but don't block success
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const integration = index === 0 ? 'Slack' : 'Brevo'
        console.error(`${integration} integration failed:`, result.reason)
      }
    })

    // Collect failures to inform user
    const failures = results
      .map((result, index) => ({
        integration: index === 0 ? 'Slack' : 'Brevo',
        failed: result.status === 'rejected',
      }))
      .filter(r => r.failed)

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        warnings: failures.length > 0 ? failures : undefined,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}

async function sendToSlack(data: ContactFormData) {
  try {
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

    if (!slackWebhookUrl) {
      console.warn('SLACK_WEBHOOK_URL not configured')
      return
    }

    const message = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎉 New Contact Form Inquiry',
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Name:*\n${data.name}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${data.email}`,
            },
          ],
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*WhatsApp:*\n${data.whatsapp || 'Not provided'}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Inquiry:*\n${data.inquiry}`,
          },
        },
        {
          type: 'divider',
        },
      ],
    }

    const response = await fetchWithTimeout(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })

    if (!response.ok) {
      console.error('Slack notification failed:', response.statusText)
    }
  } catch (error) {
    console.error('Slack integration error:', error)
  }
}

async function addToBrevo(data: ContactFormData) {
  try {
    const brevoApiKey = process.env.BREVO_API_KEY
    const brevoListId = process.env.BREVO_LIST_ID

    if (!brevoApiKey) {
      console.warn('BREVO_API_KEY not configured')
      return
    }

    // Skip Brevo if no email provided (Brevo requires email)
    if (!data.email) {
      console.warn('No email provided, skipping Brevo integration')
      return
    }

    // 1. Add contact to list (without phone for now - Brevo has strict validation)
    const contactResponse = await fetchWithTimeout('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        attributes: {
          FIRSTNAME: data.name,
          // SMS field omitted - Brevo's phone validation is too strict
          // WhatsApp number is available in Slack notification
        },
        listIds: brevoListId ? [parseInt(brevoListId)] : [],
        updateEnabled: true, // Update if contact already exists
      }),
    }, 20000) // 20 second timeout for slow connections

    if (!contactResponse.ok && contactResponse.status !== 400) {
      // 400 might mean contact already exists, which is fine with updateEnabled
      const errorText = await contactResponse.text()
      const errorDetails = {
        status: contactResponse.status,
        statusText: contactResponse.statusText,
        headers: Object.fromEntries(contactResponse.headers),
        body: errorText,
      }
      console.error('Brevo contact creation failed:', JSON.stringify(errorDetails, null, 2))
      throw new Error(`Brevo API error: ${contactResponse.status} ${errorText}`)
    }

    // 2. Send welcome email (if configured)
    const templateId = process.env.BREVO_WELCOME_TEMPLATE_ID

    if (!templateId) {
      console.warn('BREVO_WELCOME_TEMPLATE_ID not configured, skipping welcome email')
      return
    }

    const emailResponse = await fetchWithTimeout('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        to: [
          {
            email: data.email,
            name: data.name,
          },
        ],
        templateId: parseInt(templateId),
        params: {
          NAME: data.name,
        },
      }),
    }, 20000) // 20 second timeout for slow connections

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      const errorDetails = {
        status: emailResponse.status,
        statusText: emailResponse.statusText,
        headers: Object.fromEntries(emailResponse.headers),
        body: errorText,
      }
      console.error('Brevo welcome email failed:', JSON.stringify(errorDetails, null, 2))
      throw new Error(`Brevo email API error: ${emailResponse.status} ${errorText}`)
    }
  } catch (error) {
    // Enhanced error logging with full details
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      cause: error instanceof Error ? error.cause : undefined,
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    }
    console.error('Brevo integration error:', JSON.stringify(errorDetails, null, 2))
    throw error // Re-throw to mark as rejected in Promise.allSettled
  }
}
