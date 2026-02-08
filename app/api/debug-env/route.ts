import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasSlackWebhook: !!process.env.SLACK_WEBHOOK_URL,
    slackWebhookStart: process.env.SLACK_WEBHOOK_URL?.substring(0, 30) + '...',
    hasBrevoApiKey: !!process.env.BREVO_API_KEY,
    brevoApiKeyStart: process.env.BREVO_API_KEY?.substring(0, 20) + '...',
    hasBrevoListId: !!process.env.BREVO_LIST_ID,
    brevoListId: process.env.BREVO_LIST_ID,
    hasBrevoTemplateId: !!process.env.BREVO_WELCOME_TEMPLATE_ID,
    brevoTemplateId: process.env.BREVO_WELCOME_TEMPLATE_ID,
  })
}
