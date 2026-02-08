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

    // Validate required fields
    if (!data.name || !data.email || !data.inquiry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Run integrations in parallel with graceful error handling
    const results = await Promise.allSettled([
      sendToSlack(data),
      addToBrevo(data),
    ])

    // Log failures but don't block success
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const integration = index === 0 ? 'Slack' : 'Brevo'
        console.error(`${integration} integration failed:`, result.reason)
      }
    })

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
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
    throw error
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

    // Sanitize phone number: remove spaces, dashes, parentheses
    const sanitizedPhone = data.whatsapp
      ? data.whatsapp.replace(/[\s\-\(\)]/g, '')
      : ''

    // 1. Add contact to list
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
          SMS: sanitizedPhone, // Using SMS field for WhatsApp number
        },
        listIds: brevoListId ? [parseInt(brevoListId)] : [],
        updateEnabled: true, // Update if contact already exists
      }),
    }, 20000) // 20 second timeout for slow connections

    if (!contactResponse.ok && contactResponse.status !== 400) {
      // 400 might mean contact already exists, which is fine with updateEnabled
      const error = await contactResponse.text()
      console.error('Brevo contact creation failed:', error)
      return // Don't proceed to email if contact creation failed
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
      const error = await emailResponse.text()
      console.error('Brevo welcome email failed:', error)
    }
  } catch (error) {
    // Log but don't throw - let the form submission succeed
    console.error('Brevo integration error:', error)
    throw error
  }
}
