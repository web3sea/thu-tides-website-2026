import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const brevoApiKey = process.env.BREVO_API_KEY
    const brevoListId = process.env.BREVO_LIST_ID

    // Test contact creation
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey || '',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'directtest@thutides.com',
        attributes: {
          FIRSTNAME: 'Direct Test',
          SMS: '+15551234567',
        },
        listIds: brevoListId ? [parseInt(brevoListId)] : [],
        updateEnabled: true,
      }),
    })

    const responseText = await response.text()

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText,
      envVars: {
        hasApiKey: !!brevoApiKey,
        apiKeyLength: brevoApiKey?.length,
        listId: brevoListId,
      }
    })
  } catch (error) {
    return NextResponse.json({
      error: String(error),
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
