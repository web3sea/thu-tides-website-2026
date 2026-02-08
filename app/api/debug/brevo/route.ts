import { NextResponse } from 'next/server'

/**
 * Diagnostic endpoint to test Brevo API connectivity
 * Access at: http://localhost:3000/api/debug/brevo
 *
 * Tests:
 * 1. API key validation
 * 2. Network connectivity to Brevo
 * 3. Account information retrieval
 */
export async function GET() {
  const brevoApiKey = process.env.BREVO_API_KEY
  const brevoListId = process.env.BREVO_LIST_ID
  const brevoTemplateId = process.env.BREVO_WELCOME_TEMPLATE_ID

  // Check environment variables
  const envCheck = {
    hasApiKey: !!brevoApiKey,
    hasListId: !!brevoListId,
    hasTemplateId: !!brevoTemplateId,
    apiKeyFormat: brevoApiKey?.startsWith('xkeysib-') ? 'valid format' : 'invalid format',
    listId: brevoListId,
    templateId: brevoTemplateId,
  }

  if (!brevoApiKey) {
    return NextResponse.json({
      success: false,
      error: 'BREVO_API_KEY not configured',
      envCheck,
    })
  }

  try {
    // Test 1: Get account information
    console.log('Testing Brevo API connectivity...')
    const accountResponse = await fetch('https://api.brevo.com/v3/account', {
      headers: {
        'api-key': brevoApiKey,
        'accept': 'application/json',
      },
    })

    if (!accountResponse.ok) {
      const errorText = await accountResponse.text()
      return NextResponse.json({
        success: false,
        error: 'Brevo API request failed',
        details: {
          status: accountResponse.status,
          statusText: accountResponse.statusText,
          body: errorText,
        },
        envCheck,
      })
    }

    const accountData = await accountResponse.json()

    // Test 2: Get list information (if list ID is configured)
    let listData = null
    if (brevoListId) {
      try {
        const listResponse = await fetch(`https://api.brevo.com/v3/contacts/lists/${brevoListId}`, {
          headers: {
            'api-key': brevoApiKey,
            'accept': 'application/json',
          },
        })

        if (listResponse.ok) {
          listData = await listResponse.json()
        } else {
          const errorText = await listResponse.text()
          listData = {
            error: 'Failed to fetch list',
            status: listResponse.status,
            body: errorText,
          }
        }
      } catch (error) {
        listData = {
          error: 'List fetch threw exception',
          message: error instanceof Error ? error.message : String(error),
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Brevo API connectivity verified',
      envCheck,
      account: {
        email: accountData.email,
        firstName: accountData.firstName,
        lastName: accountData.lastName,
        companyName: accountData.companyName,
        plan: accountData.plan,
      },
      list: listData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      cause: error instanceof Error ? error.cause : undefined,
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    }

    return NextResponse.json({
      success: false,
      error: 'Brevo API connection failed',
      details: errorDetails,
      envCheck,
    })
  }
}
