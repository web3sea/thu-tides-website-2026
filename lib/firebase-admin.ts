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
    } catch {
      // Re-throw a sanitized error — don't log the raw parse failure
      // which may contain partial credential material
      throw new Error('Firebase Admin initialization failed')
    }
  } else if (process.env.NODE_ENV === 'development') {
    try {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      })
    } catch {
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
    // initializeFirebase() already logged the error; return null so callers
    // can respond with a 503 instead of propagating an unhandled exception.
    return null
  }
}

// Export getter instead of direct reference
export { admin, getAdminDb }
