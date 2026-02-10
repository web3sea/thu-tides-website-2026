# Location Voting System - Testing Guide

Quick reference for testing the voting system after Firebase setup is complete.

## Prerequisites

- ✅ Firebase project created
- ✅ Firestore enabled with 11 location documents
- ✅ Environment variables configured in `.env.local`
- ✅ Dev server running (`pnpm dev`)

## Manual Testing Checklist

### 1. Visual Inspection
- [ ] Navigate to http://localhost:3000
- [ ] Badge button "Where Should We Go Next?" is visible in hero
- [ ] Badge has pulsing white dot indicator
- [ ] Arrow icon is pointing right

### 2. Dropdown Opening
- [ ] Click badge button
- [ ] Dropdown slides down smoothly (spring animation)
- [ ] Arrow icon rotates 90 degrees
- [ ] Dropdown appears below button
- [ ] Dropdown width is at least 360px
- [ ] Loading spinner appears briefly

### 3. Results Display
- [ ] All 11 locations are listed
- [ ] Each location shows percentage (e.g., "23.5%")
- [ ] Locations are sorted by percentage (highest first)
- [ ] If no votes yet, all show "0.0%"

**Expected Locations:**
- Maldives
- Misool
- Java
- Lombok & Sumba
- California
- Flores
- Kalimantan
- Namibia
- Mauritius
- Banggai
- Togean

### 4. Hover Effects
- [ ] Hover over a location
- [ ] Background changes to white/10% opacity
- [ ] Location shifts 4px to the right
- [ ] Cursor changes to pointer
- [ ] Smooth transition

### 5. Voting (First Vote)
- [ ] Click a location (e.g., "Maldives")
- [ ] Loading spinner appears on that item ("...")
- [ ] Success toast appears: "Vote recorded! Thank you for participating."
- [ ] Percentages update immediately
- [ ] Footer appears: "Thanks for voting! Total votes: X"
- [ ] Voted location's percentage increases

### 6. Voting (Second Attempt)
- [ ] Try clicking another location
- [ ] Error toast appears: "You have already voted"
- [ ] Percentages remain unchanged
- [ ] Items become non-interactive (opacity 70%, cursor not-allowed)

### 7. Click-Outside to Close
- [ ] Click anywhere outside the dropdown
- [ ] Dropdown slides up and disappears
- [ ] Arrow icon rotates back to pointing right

### 8. Reopen Dropdown
- [ ] Click badge button again
- [ ] Dropdown reopens with updated percentages
- [ ] "Thanks for voting" message still visible if already voted
- [ ] No loading spinner (results cached)

### 9. Mobile Responsive (DevTools)
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
- [ ] Select iPhone 12/13 Pro
- [ ] Badge button is touch-friendly
- [ ] Dropdown is readable and scrollable
- [ ] Tap location to vote
- [ ] Toast notifications appear correctly

## API Testing with cURL

### Test Results Endpoint
```bash
curl http://localhost:3000/api/votes/results
```

**Expected Response:**
```json
{
  "locations": [
    {
      "slug": "maldives",
      "name": "Maldives",
      "count": 5,
      "percentage": 45.5
    }
  ],
  "totalVotes": 11
}
```

### Test Voting Endpoint (First Vote)
```bash
curl -X POST http://localhost:3000/api/votes/location \
  -H "Content-Type: application/json" \
  -d '{"location":"maldives"}'
```

### Test Duplicate Vote (Same IP)
```bash
curl -X POST http://localhost:3000/api/votes/location \
  -H "Content-Type: application/json" \
  -d '{"location":"maldives"}'
```

**Expected Response (409 Conflict):**
```json
{
  "error": "You have already voted",
  "success": false
}
```

### Test Rate Limiting (11+ requests in 1 minute)
```bash
for i in {1..12}; do
  curl -X POST http://localhost:3000/api/votes/location \
    -H "Content-Type: application/json" \
    -d '{"location":"maldives"}' &
done
```

**Expected Response (429 Too Many Requests):**
```json
{
  "error": "Too many requests. Please try again later.",
  "success": false
}
```

## Firestore Verification

### Check Vote Count in Firestore Console
1. Go to Firebase Console → Firestore Database
2. Open `votes` collection
3. Click on a location document (e.g., `maldives`)
4. Verify `count` field incremented
5. Check `updatedAt` timestamp is recent

### Check IP Hash Storage
1. In Firestore, open `vote_ips` collection
2. Look for documents with SHA-256 hash IDs
3. Click a document to see:
   - `ip`: hashed value (64 hex characters)
   - `location`: voted location slug
   - `votedAt`: timestamp

**Security Check:**
- ✅ IP is hashed (not plain text)
- ✅ Hash is consistent for same IP
- ✅ No personally identifiable information stored

## Test Data Reset

To reset voting data for fresh testing:

1. Go to Firebase Console → Firestore
2. Delete all documents in `vote_ips` collection
3. For each document in `votes` collection, set `count` to `0`
4. Refresh browser

## Success Criteria

Test passes if:
- ✅ All manual testing checklist items pass
- ✅ No console errors or warnings
- ✅ API requests return expected responses
- ✅ Firestore data updates correctly
- ✅ Animation is smooth (60 FPS)
- ✅ Cannot vote twice from same IP

---

**Happy Testing! 🎉**
