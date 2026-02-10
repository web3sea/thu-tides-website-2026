import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    hasFirebaseKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    keyLength: process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.length || 0,
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('FIREBASE')),
  })
}
