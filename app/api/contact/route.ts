import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  whatsapp: string
  inquiry: string
}

// Simple in-memory rate limiter (per-instance; resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 5 // max requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Email format validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Field length limits
const MAX_NAME_LENGTH = 200
const MAX_EMAIL_LENGTH = 254
const MAX_WHATSAPP_LENGTH = 20
const MAX_INQUIRY_LENGTH = 5000

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
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.inquiry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Trim inputs
    data.name = String(data.name).trim()
    data.email = String(data.email).trim()
    data.whatsapp = data.whatsapp ? String(data.whatsapp).trim() : ''
    data.inquiry = String(data.inquiry).trim()

    // Validate field lengths
    if (data.name.length > MAX_NAME_LENGTH ||
        data.email.length > MAX_EMAIL_LENGTH ||
        data.whatsapp.length > MAX_WHATSAPP_LENGTH ||
        data.inquiry.length > MAX_INQUIRY_LENGTH) {
      return NextResponse.json(
        { error: 'One or more fields exceed the maximum allowed length' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!EMAIL_REGEX.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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
      console.error('Brevo contact creation failed:', contactResponse.status, errorText)
      throw new Error(`Brevo API error: ${contactResponse.status}`)
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
      console.error('Brevo welcome email failed:', emailResponse.status, errorText)
      throw new Error(`Brevo email API error: ${emailResponse.status}`)
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
