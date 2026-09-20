// Firebase Admin SDK initialization (server-side only)

import * as admin from 'firebase-admin'

// Lazy initialization function
function initializeFirebase() {
  if (admin.apps.length > 0) {
    return // Already initialized
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

  if (serviceAccountKey) {
    try {
      const serviceAccount = JSON.parse(
        Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
      )

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    } catch (error) {
      // Log enough to diagnose without echoing the key: a parse failure's message
      // can quote the input it choked on, so the message itself is not safe to
      // print. The error class plus the key's shape is what actually narrows it
      // down (wrong encoding, truncated value, JSON that is not a service account).
      console.error('Firebase Admin initialization failed', {
        cause: error instanceof Error ? error.name : typeof error,
        keyLength: serviceAccountKey.length,
        looksBase64: /^[A-Za-z0-9+/=\s]+$/.test(serviceAccountKey),
      })
      // Re-throw a sanitized error — don't surface the raw parse failure,
      // which may contain partial credential material.
      throw new Error('Firebase Admin initialization failed')
    }
  } else if (process.env.NODE_ENV === 'development') {
    try {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
    } catch (error) {
      // ADC errors carry no credential material, so the message is safe to log.
      console.error(
        'Firebase Admin initialization failed (ADC). Run: gcloud auth application-default login',
        error instanceof Error ? error.message : String(error)
      )
      throw new Error('Firebase Admin initialization failed (ADC)')
    }
  } else {
    console.warn('Firebase Admin not initialized: no credentials configured')
  }
}

// Getter function for adminDb with lazy initialization
function getAdminDb(): admin.firestore.Firestore | null {
  try {
    initializeFirebase()
    return admin.apps.length > 0 ? admin.firestore() : null
  } catch {
    // initializeFirebase() has already logged the detail; return null so callers
    // can respond with a 503 instead of propagating an unhandled exception.
    return null
  }
}

// Export getter instead of direct reference
export { admin, getAdminDb }
