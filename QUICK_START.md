# 🚀 Quick Start: Location Voting System

The voting system code is complete! Follow these steps to configure Firebase and test it.

## Option 1: Interactive Setup Wizard (Recommended) ⭐

Run the automated setup wizard that will guide you through each step:

```bash
./scripts/firebase-setup-wizard.sh
```

The wizard will:
- ✅ Guide you through Firebase Console steps
- ✅ Collect your Firebase credentials
- ✅ Update `.env.local` automatically
- ✅ Validate configuration
- ✅ Seed Firestore with location data
- ✅ Verify everything works

**Time needed:** 15-20 minutes

---

## Option 2: Manual Setup

If you prefer manual setup, follow these steps:

### Step 1: Create Firebase Project (5 min)
1. Go to https://console.firebase.google.com
2. Create project: `thu-tides-voting`
3. Enable Firestore Database

### Step 2: Get Credentials (5 min)
1. Get web app config from Project Settings
2. Download service account key JSON
3. Base64 encode the key:
   ```bash
   cat path/to/key.json | base64
   ```

### Step 3: Configure Environment (2 min)
Edit `.env.local` and add your Firebase credentials (see `FIREBASE_SETUP.md` for details)

### Step 4: Validate & Seed (3 min)
```bash
# Validate configuration
node scripts/validate-firebase-config.js

# Seed Firestore with locations
node scripts/seed-firestore.js
```

### Step 5: Test! (1 min)
```bash
pnpm dev
# Visit http://localhost:3000
# Click "Where Should We Go Next?" button
```

---

## What You Get

Once configured, users can:
- 🗳️ Vote for their favorite destination
- 📊 See real-time percentage results
- 🔒 One vote per IP address (privacy-preserving)
- 📱 Mobile-responsive interface
- ✨ Smooth liquid animations

---

## 11 Voting Destinations

1. **Maldives** 🏝️
2. **Misool** 🌊
3. **Java** ⛰️
4. **Lombok & Sumba** 🏄
5. **California** 🌅
6. **Flores** 🐉
7. **Kalimantan** 🌴
8. **Namibia** 🏜️
9. **Mauritius** 🦤
10. **Banggai** 🐠
11. **Togean** 🏖️

---

## Helpful Scripts

```bash
# Validate Firebase configuration
node scripts/validate-firebase-config.js

# Seed Firestore with location data
node scripts/seed-firestore.js

# Run the interactive setup wizard
./scripts/firebase-setup-wizard.sh
```

---

## Documentation

- **`FIREBASE_SETUP.md`** - Detailed manual setup instructions
- **`VOTING_SYSTEM_TESTING.md`** - Testing checklist
- **`IMPLEMENTATION_COMPLETE.md`** - Architecture and features

---

## Need Help?

If you encounter issues:
1. Check the error message carefully
2. Run validation script: `node scripts/validate-firebase-config.js`
3. Review `FIREBASE_SETUP.md` troubleshooting section
4. Check Firebase Console for any warnings

---

## Ready? Let's Go! 🎯

**Easiest path:**
```bash
./scripts/firebase-setup-wizard.sh
```

**Manual path:**
```bash
# 1. Create Firebase project (console.firebase.google.com)
# 2. Update .env.local with credentials
# 3. Validate and seed:
node scripts/validate-firebase-config.js && node scripts/seed-firestore.js
# 4. Test:
pnpm dev
```

**Current Status:**
- ✅ Code implemented
- ✅ Dev server running at http://localhost:3000
- ⏳ Firebase configuration needed
- ⏳ Firestore seeding needed

**After setup:**
- ✅ Full voting functionality
- ✅ Real-time results
- ✅ Ready for production deployment
