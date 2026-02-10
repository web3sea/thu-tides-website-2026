/**
 * Seed Firestore with initial location data
 *
 * Usage:
 * 1. Ensure FIREBASE_SERVICE_ACCOUNT_KEY is set in .env.local
 * 2. Run: node scripts/seed-firestore.js
 */

const admin = require('firebase-admin')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

// Initialize Firebase Admin
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

if (serviceAccountKey) {
  // Method 1: Use service account key
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(serviceAccountKey, 'base64').toString('utf-8')
    )

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })

    console.log('✅ Firebase Admin initialized with service account key')
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin:', error.message)
    process.exit(1)
  }
} else {
  // Method 2: Use Application Default Credentials
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })

    console.log('✅ Firebase Admin initialized with Application Default Credentials')
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin with ADC')
    console.error('💡 Run: gcloud auth application-default login')
    console.error('Error details:', error.message)
    process.exit(1)
  }
}

const db = admin.firestore()

// Location data to seed
const locations = [
  { slug: 'maldives', name: 'Maldives' },
  { slug: 'misool', name: 'Misool' },
  { slug: 'java', name: 'Java' },
  { slug: 'lombok-sumba', name: 'Lombok & Sumba' },
  { slug: 'california', name: 'California' },
  { slug: 'flores', name: 'Flores' },
  { slug: 'kalimantan', name: 'Kalimantan' },
  { slug: 'namibia', name: 'Namibia' },
  { slug: 'mauritius', name: 'Mauritius' },
  { slug: 'banggai', name: 'Banggai' },
  { slug: 'togean', name: 'Togean' },
]

async function seedFirestore() {
  console.log('\n🌱 Seeding Firestore with location data...\n')

  const batch = db.batch()

  locations.forEach((location) => {
    const docRef = db.collection('votes').doc(location.slug)
    batch.set(docRef, {
      name: location.name,
      slug: location.slug,
      count: 0,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    console.log(`   ✓ ${location.name} (${location.slug})`)
  })

  try {
    await batch.commit()
    console.log('\n✅ Successfully seeded all locations!')
    console.log(`\n📊 Created ${locations.length} documents in 'votes' collection`)
    console.log('\n🎉 You can now test the voting system at http://localhost:3000\n')
  } catch (error) {
    console.error('\n❌ Error seeding Firestore:', error.message)
    process.exit(1)
  }

  process.exit(0)
}

// Run the seed function
seedFirestore()
