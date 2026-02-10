import { NextResponse } from 'next/server'

export async function GET() {
  const allKeys = Object.keys(process.env).sort()
  const firebaseKeys = allKeys.filter(k => k.includes('FIREBASE'))

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    hasFirebaseKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    keyLength: process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.length || 0,
    firebaseKeys,
    publicFirebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 10) + '...',
    totalEnvVars: allKeys.length,
    sampleKeys: allKeys.slice(0, 20),
  })
}
