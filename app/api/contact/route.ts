import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  whatsapp: string
  inquiry: string
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

    // 1. Send notification to Slack
    await sendToSlack(data)

    // 2. Add contact to Brevo and send welcome email
    await addToBrevo(data)

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

  const response = await fetch(slackWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })

  if (!response.ok) {
    throw new Error(`Slack notification failed: ${response.statusText}`)
  }
}

async function addToBrevo(data: ContactFormData) {
  const brevoApiKey = process.env.BREVO_API_KEY
  const brevoListId = process.env.BREVO_LIST_ID

  if (!brevoApiKey) {
    console.warn('BREVO_API_KEY not configured')
    return
  }

  // 1. Add contact to list
  const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
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
        WHATSAPP: data.whatsapp || '',
      },
      listIds: brevoListId ? [parseInt(brevoListId)] : [],
      updateEnabled: true, // Update if contact already exists
    }),
  })

  if (!contactResponse.ok && contactResponse.status !== 400) {
    // 400 might mean contact already exists, which is fine with updateEnabled
    const error = await contactResponse.text()
    console.error('Brevo contact creation failed:', error)
  }

  // 2. Send welcome email
  const templateId = process.env.BREVO_WELCOME_TEMPLATE_ID

  if (!templateId) {
    console.warn('BREVO_WELCOME_TEMPLATE_ID not configured, skipping welcome email')
    return
  }

  const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
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
  })

  if (!emailResponse.ok) {
    const error = await emailResponse.text()
    throw new Error(`Brevo welcome email failed: ${error}`)
  }
}
