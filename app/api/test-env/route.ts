import { NextResponse } from 'next/server'

export async function GET() {
  const allKeys = Object.keys(process.env).sort()
  const firebaseKeys = allKeys.filter(k => k.includes('FIREBASE') || k.includes('FB_'))

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    hasFirebaseKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    hasFbAdminKey: !!process.env.FB_ADMIN_KEY,
    firebaseKeyLength: process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.length || 0,
    fbAdminKeyLength: process.env.FB_ADMIN_KEY?.length || 0,
    firebaseKeys,
    totalEnvVars: allKeys.length,
    sampleKeys: allKeys.slice(0, 25),
  })
}
