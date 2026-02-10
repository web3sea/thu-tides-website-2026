// Firebase Admin SDK initialization (server-side only)

import * as admin from 'firebase-admin'

// Lazy initialization function
function initializeFirebase() {
  if (admin.apps.length > 0) {
    return // Already initialized
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  console.log('[Firebase Admin] Lazy init... NODE_ENV:', process.env.NODE_ENV)
  console.log('[Firebase Admin] FIREBASE_SERVICE_ACCOUNT_KEY present:', !!serviceAccountKey)

  if (serviceAccountKey) {
    try {
      const serviceAccount = JSON.parse(
        Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
      )

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })

      console.log('✅ Firebase Admin initialized with service account key')
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin:', error)
      throw error
    }
  } else if (process.env.NODE_ENV === 'development') {
    try {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
      console.log('✅ Firebase Admin initialized with ADC')
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin with ADC')
      throw error
    }
  } else {
    console.warn('⚠️  Firebase Admin not initialized - no credentials')
  }
}

// Getter function for adminDb with lazy initialization
function getAdminDb(): admin.firestore.Firestore | null {
  initializeFirebase()
  return admin.apps.length > 0 ? admin.firestore() : null
}

// Export getter instead of direct reference
export { admin, getAdminDb }
