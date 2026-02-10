/**
 * Validate Firebase configuration
 *
 * Usage: node scripts/validate-firebase-config.js
 */

const path = require('path')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env.local') })

console.log('\n🔍 Validating Firebase Configuration...\n')

// Check Firebase Client SDK variables
const clientVars = {
  'NEXT_PUBLIC_FIREBASE_API_KEY': process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID': process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  'NEXT_PUBLIC_FIREBASE_APP_ID': process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Check Firebase Admin SDK variable
const adminVar = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

let hasErrors = false

console.log('📋 Firebase Client SDK Variables:\n')
Object.entries(clientVars).forEach(([key, value]) => {
  if (!value || value === '') {
    console.log(`   ❌ ${key}: NOT SET`)
    hasErrors = true
  } else if (value.length < 10) {
    console.log(`   ⚠️  ${key}: TOO SHORT (${value.length} chars)`)
    hasErrors = true
  } else {
    console.log(`   ✅ ${key}: ${value.substring(0, 20)}... (${value.length} chars)`)
  }
})

console.log('\n📋 Firebase Admin SDK Variable:\n')
if (!adminVar || adminVar === '') {
  console.log('   ❌ FIREBASE_SERVICE_ACCOUNT_KEY: NOT SET')
  hasErrors = true
} else {
  // Try to decode base64
  try {
    const decoded = Buffer.from(adminVar, 'base64').toString('utf-8')
    const json = JSON.parse(decoded)

    if (json.type === 'service_account') {
      console.log(`   ✅ FIREBASE_SERVICE_ACCOUNT_KEY: Valid (${adminVar.length} chars)`)
      console.log(`   ✅ Project ID in key: ${json.project_id}`)
      console.log(`   ✅ Client Email: ${json.client_email}`)
    } else {
      console.log('   ❌ FIREBASE_SERVICE_ACCOUNT_KEY: Invalid format (not a service account)')
      hasErrors = true
    }
  } catch (error) {
    console.log(`   ❌ FIREBASE_SERVICE_ACCOUNT_KEY: Invalid base64 or JSON`)
    console.log(`   Error: ${error.message}`)
    hasErrors = true
  }
}

console.log('\n' + '='.repeat(60))

if (hasErrors) {
  console.log('\n❌ Configuration has errors. Please fix the issues above.\n')
  console.log('📖 See FIREBASE_SETUP.md for detailed instructions.\n')
  process.exit(1)
} else {
  console.log('\n✅ All Firebase configuration is valid!\n')
  console.log('🎉 You can now run: node scripts/seed-firestore.js\n')
  process.exit(0)
}
