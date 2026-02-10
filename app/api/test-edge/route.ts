import { NextResponse } from 'next/server'

// Force Edge Runtime
export const runtime = 'edge'

export async function GET() {
  return NextResponse.json({
    runtime: 'edge',
    hasFirebaseKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    firebaseKeyLength: process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.length || 0,
    hasTestVar: !!process.env.TEST_VAR,
    nodeEnv: process.env.NODE_ENV,
  })
}
