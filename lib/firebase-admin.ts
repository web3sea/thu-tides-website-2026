// Firebase Admin SDK initialization (server-side only)

import * as admin from 'firebase-admin'

// Initialize Firebase Admin with singleton pattern
if (!admin.apps.length) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  console.log('[Firebase Admin] Initializing... NODE_ENV:', process.env.NODE_ENV)
  console.log('[Firebase Admin] FIREBASE_SERVICE_ACCOUNT_KEY present:', !!serviceAccountKey)

  if (serviceAccountKey) {
    // Method 1: Use service account key (production)
    try {
      const serviceAccount = JSON.parse(
        Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
      )

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })

      console.log('✅ Firebase Admin initialized with service account key')
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin with service account key:', error)
      throw error
    }
  } else if (process.env.NODE_ENV === 'development') {
    // Method 2: Use Application Default Credentials (development)
    // Requires: gcloud auth application-default login
    try {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })

      console.log('✅ Firebase Admin initialized with Application Default Credentials')
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin with ADC')
      console.error('💡 Run: gcloud auth application-default login')
      throw error
    }
  } else {
    // Build-time: Don't throw error, just log warning
    // This allows the build to succeed without Firebase credentials
    console.warn('⚠️  Firebase Admin not initialized - FIREBASE_SERVICE_ACCOUNT_KEY not set')
    console.warn('⚠️  Voting system will not function until credentials are configured')
  }
}

// Only export adminDb if Firebase is initialized
let adminDb: admin.firestore.Firestore | null = null
if (admin.apps.length > 0) {
  adminDb = admin.firestore()
}

export { admin, adminDb }
