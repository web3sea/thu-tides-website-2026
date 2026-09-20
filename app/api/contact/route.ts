import { NextRequest, NextResponse } from 'next/server'
import { createRateLimiter } from '@/lib/rate-limit'

interface ContactFormData {
  name: string
  email: string
  whatsapp: string
  inquiry: string
}

// Per-instance by design; lib/rate-limit.ts documents that and how memory is bounded.
const rateLimiter = createRateLimiter({ max: 5, windowMs: 60_000 })

function isRateLimited(ip: string): boolean {
  return rateLimiter.check(ip)
}

// Email format validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Escape Slack mrkdwn special characters to prevent <!channel>/<!here> injection
function escapeSlack(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

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
    // Rate limiting by IP — x-real-ip is set by Vercel's edge and cannot be
    // spoofed by clients. Fallback uses the rightmost x-forwarded-for value
    // (the hop added by Vercel), not the leftmost (which clients can forge).
    const ip =
      request.headers.get('x-real-ip') ??
      request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() ??
      'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

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

    // Validate field lengths
    if (name.length > MAX_NAME_LENGTH ||
        email.length > MAX_EMAIL_LENGTH ||
        whatsapp.length > MAX_WHATSAPP_LENGTH ||
        inquiry.length > MAX_INQUIRY_LENGTH) {
      return NextResponse.json(
        { error: 'One or more fields exceed the maximum allowed length' },
        { status: 400 }
      )
    }

    // Validate email format (only when email is provided)
    if (email && !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

// Throws on failure, and does not catch: Promise.allSettled in the handler turns a
// rejection into a warning on the response and logs it once. Swallowing it here made
// a dead webhook indistinguishable from a delivered message, which is how an inquiry
// gets lost silently.
async function sendToSlack(data: ContactFormData) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

  // Not configured is a deliberate skip, not a failure: CI and local dev run
  // without it and the form is meant to keep working.
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
            text: `*Name:*\n${escapeSlack(data.name)}`,
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${escapeSlack(data.email)}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*WhatsApp:*\n${data.whatsapp ? escapeSlack(data.whatsapp) : 'Not provided'}`,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Inquiry:*\n${escapeSlack(data.inquiry)}`,
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
    const errorText = await response.text()
    console.error('Slack notification failed:', response.status, errorText)
    throw new Error(`Slack webhook error: ${response.status}`)
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
        listIds: brevoListId ? (() => {
          const id = Number(brevoListId)
          if (!Number.isInteger(id) || id <= 0) throw new Error('Invalid BREVO_LIST_ID')
          return [id]
        })() : [],
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
        templateId: (() => {
          const id = Number(templateId)
          if (!Number.isInteger(id) || id <= 0) throw new Error('Invalid BREVO_WELCOME_TEMPLATE_ID')
          return id
        })(),
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
