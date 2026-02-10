# Firebase Setup Guide for Location Voting System

This guide will walk you through setting up Firebase Firestore for the location voting feature.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" or "Create a project"
3. Enter project name: `thu-tides-voting`
4. Disable Google Analytics (optional for this use case)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in production mode" (we'll set custom rules later)
4. Choose a Cloud Firestore location (e.g., `us-central1` or closest to your users)
5. Click "Enable"

## Step 3: Set Firestore Security Rules

1. In Firestore, go to the "Rules" tab
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Votes collection - read-only for clients
    match /votes/{locationId} {
      allow read: if true;
      allow write: if false;
    }
    // Vote IPs collection - no client access
    match /vote_ips/{ipHash} {
      allow read, write: if false;
    }
  }
}
```

3. Click "Publish"

## Step 4: Get Firebase Web App Configuration

1. In Firebase Console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>) to add a web app
5. Register app with nickname: `thu-tides-web`
6. Don't enable Firebase Hosting
7. Click "Register app"
8. Copy the configuration object (it will look like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "thu-tides-voting.firebaseapp.com",
  projectId: "thu-tides-voting",
  storageBucket: "thu-tides-voting.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 5: Generate Service Account Key

1. In Project Settings, go to "Service accounts" tab
2. Click "Generate new private key"
3. Confirm by clicking "Generate key"
4. A JSON file will download - **keep this secure!**
5. Convert the JSON to base64:

```bash
# On macOS/Linux:
cat path/to/service-account-key.json | base64

# On Windows (PowerShell):
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("path\to\service-account-key.json"))
```

6. Copy the base64 string

## Step 6: Update Environment Variables

Edit `.env.local` and fill in the Firebase configuration:

```bash
# Firebase Client SDK (from Step 4)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=thu-tides-voting.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=thu-tides-voting
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=thu-tides-voting.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Firebase Admin SDK (from Step 5)
FIREBASE_SERVICE_ACCOUNT_KEY=ewogICJ0eXBlIjogInNlcnZpY2VfY...
```

## Step 7: Seed Initial Location Data

You need to create 11 documents in the `votes` collection. You can do this via Firebase Console:

1. In Firestore, click "Start collection"
2. Collection ID: `votes`
3. Create the first document:
   - Document ID: `maldives`
   - Fields:
     - `name` (string): `Maldives`
     - `slug` (string): `maldives`
     - `count` (number): `0`
     - `updatedAt` (timestamp): Click "Add field" → Select current time

4. Repeat for all 11 locations:

| Document ID | name | slug | count |
|------------|------|------|-------|
| maldives | Maldives | maldives | 0 |
| misool | Misool | misool | 0 |
| java | Java | java | 0 |
| lombok-sumba | Lombok & Sumba | lombok-sumba | 0 |
| california | California | california | 0 |
| flores | Flores | flores | 0 |
| kalimantan | Kalimantan | kalimantan | 0 |
| namibia | Namibia | namibia | 0 |
| mauritius | Mauritius | mauritius | 0 |
| banggai | Banggai | banggai | 0 |
| togean | Togean | togean | 0 |

## Step 8: Test the Setup

1. Start the development server:
```bash
pnpm dev
```

2. Open http://localhost:3000

3. Click the "Where Should We Go Next?" badge button

4. The dropdown should appear with all 11 locations showing 0.0%

5. Click a location to vote

6. You should see a success toast and the percentage should update

7. Try voting again - you should see an error message

## Step 9: Deploy to Vercel

1. Add the same environment variables to your Vercel project:
   - Go to your Vercel dashboard
   - Select the `thu-tides-website-2026` project
   - Go to Settings → Environment Variables
   - Add all the Firebase variables (same as `.env.local`)
   - Apply to: Production, Preview, and Development

2. Redeploy your site:
```bash
git add .
git commit -m "Add location voting system with Firebase"
git push origin main
```

## Troubleshooting

### "Failed to load voting results"
- Check that all environment variables are set correctly
- Verify Firebase project is active and Firestore is enabled
- Check browser console for specific errors

### "Invalid location" error
- Ensure the location slug matches exactly (lowercase, hyphenated)
- Verify all 11 documents exist in Firestore `votes` collection

### "Failed to initialize Firebase Admin SDK"
- Verify `FIREBASE_SERVICE_ACCOUNT_KEY` is base64 encoded
- Check that the service account key JSON is valid
- Ensure no extra whitespace or line breaks in the base64 string

### Rate limiting issues
- The API has a rate limit of 10 requests per minute per IP
- If testing rapidly, wait 1 minute between attempts
- In production, this protects against spam/abuse

## Firebase Pricing

The free "Spark" plan includes:
- 50,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day
- 1 GB storage

For the voting system:
- Each vote = 2 writes (vote count + IP record) + 11 reads (fetch results)
- Each results fetch = 11 reads
- Estimated capacity: ~2,500 votes/day on free tier

If you exceed the free tier, upgrade to "Blaze" (pay-as-you-go) plan.

## Security Notes

- IP addresses are SHA-256 hashed before storage (privacy-preserving)
- Client SDK keys are safe to expose (security rules enforce access control)
- Service account key must remain secret (stored in environment variable)
- Firestore security rules prevent client-side write access
- All votes must go through the API route which validates and rate-limits

## Monitoring

Monitor usage in Firebase Console:
- Firestore → Usage tab: See read/write metrics
- Firestore → Data tab: View vote counts in real-time
- Functions → Logs (if you add Cloud Functions later)

Check API logs in Vercel:
- Vercel Dashboard → Project → Logs
- Filter by `/api/votes/location` and `/api/votes/results`
