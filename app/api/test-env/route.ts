import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    testVar: process.env.TEST_VAR,
    hasTestVar: !!process.env.TEST_VAR,
    fbAdminKey: !!process.env.FB_ADMIN_KEY,
    firebaseKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
  })
}
