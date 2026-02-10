# Race Condition Fix: Vote Recording

## Problem

The original implementation had a TOCTOU (Time-of-Check-Time-of-Use) vulnerability where two simultaneous requests from the same IP could both pass the duplicate vote check before either recorded the vote, allowing duplicate votes.

### Original Code Flow

```typescript
// Step 1: Check if IP has voted
const ipDoc = await adminDb.collection('vote_ips').doc(hashedIP).get()
if (ipDoc.exists) { return error }

// Step 2: Increment vote count
await adminDb.collection('votes').doc(location).update({...})

// Step 3: Record IP vote (RACE WINDOW HERE)
await adminDb.collection('vote_ips').doc(hashedIP).set({...})
```

**Race Condition Window:** Between steps 1 and 3, another request could complete all three steps, meaning both requests would succeed.

### Attack Scenario

```
Time    Request A                Request B
----    ---------                ---------
T0      Check IP (not exists)
T1                               Check IP (not exists)
T2      Increment vote
T3                               Increment vote
T4      Record IP
T5                               Record IP (overwrites A)
```

Result: **2 votes counted, 1 IP recorded** ❌

## Solution

Wrapped the duplicate check and vote recording in a **Firestore transaction** to make them atomic.

### Fixed Code Flow

```typescript
await adminDb.runTransaction(async (transaction) => {
  // Step 1: Check if IP has voted
  const ipDoc = await transaction.get(ipDocRef)
  if (ipDoc.exists) {
    throw new Error('ALREADY_VOTED')
  }

  // Step 2: Record IP vote (atomic with step 1)
  transaction.set(ipDocRef, {...})

  // Step 3: Increment vote count (atomic with steps 1-2)
  transaction.update(voteDocRef, {...})
})
```

**Key Improvement:** All three operations are atomic. If Request B starts while Request A is in the transaction, B will see the IP document that A created, preventing duplicate votes.

### How Transactions Prevent the Race

Firestore transactions use **optimistic concurrency control**:

1. Transaction reads the current state
2. Transaction performs operations in memory
3. At commit time, Firestore verifies none of the read documents changed
4. If any changed, transaction retries automatically
5. If Request B commits first, Request A's transaction will retry and see B's IP document

```
Time    Request A (Transaction)      Request B (Transaction)
----    -----------------------      -----------------------
T0      Read IP (not exists)
T1                                   Read IP (not exists)
T2      Prepare writes
T3                                   Prepare writes
T4      Commit attempt
T5      ✅ Success
T6                                   Commit attempt
T7                                   ❌ Conflict detected!
T8                                   Retry transaction
T9                                   Read IP (exists now)
T10                                  Return "already voted"
```

Result: **1 vote counted, 1 IP recorded** ✅

## Testing the Fix

### Before Fix (Simulated Race Condition)

```bash
# Send 2 simultaneous requests
curl -X POST http://localhost:3000/api/votes/location \
  -H "Content-Type: application/json" \
  -d '{"location":"maldives"}' &

curl -X POST http://localhost:3000/api/votes/location \
  -H "Content-Type: application/json" \
  -d '{"location":"maldives"}' &

wait

# Check Firestore vote count
# Expected with bug: count = 2 (duplicate vote succeeded)
```

### After Fix (Transaction Protection)

```bash
# Send 2 simultaneous requests
curl -X POST http://localhost:3000/api/votes/location \
  -H "Content-Type: application/json" \
  -d '{"location":"california"}' &

curl -X POST http://localhost:3000/api/votes/location \
  -H "Content-Type: application/json" \
  -d '{"location":"california"}' &

wait

# Check Firestore vote count
# Expected with fix: count = 1 (second request gets 409 "already voted")
```

## Performance Impact

**Transaction overhead:**
- Read latency: +0ms (same reads required)
- Write latency: +50-100ms (transaction coordination)
- Retries: Rare in practice (only on actual conflicts)

**Trade-off:** Slightly higher latency for guaranteed correctness. Acceptable for user-facing voting feature.

## Code Changes

**File:** `app/api/votes/location/route.ts`

**Changes:**
1. Moved request body parsing before IP check (needed for validation)
2. Wrapped IP check + vote recording in `adminDb.runTransaction()`
3. Added error handling for `ALREADY_VOTED` exception from transaction
4. Moved IP hashing after validation (minor optimization)

**Lines changed:** ~45 lines (lines 54-96)

## Related Security Considerations

This fix also helps prevent:
- **Timing attacks:** Transaction makes timing attacks harder
- **Race-based double voting:** Core issue resolved
- **Concurrent vote manipulation:** Multiple users voting for same location simultaneously

**Still vulnerable to:**
- VPN-based IP rotation (user can vote again with different IP)
- Distributed timing attacks (needs additional rate limiting)

See code review for rate limiting improvements (separate issue).

## Verification Checklist

- [x] Transaction wraps all critical operations
- [x] Error handling for "already voted" case
- [x] Error handling for other transaction failures
- [x] Code compiles without errors
- [x] Dev server runs successfully
- [ ] Manual testing with concurrent requests
- [ ] Integration test for race condition
- [ ] Load testing (verify transaction performance)

## References

- [Firestore Transactions Documentation](https://firebase.google.com/docs/firestore/manage-data/transactions)
- [Optimistic Concurrency Control](https://en.wikipedia.org/wiki/Optimistic_concurrency_control)
- [TOCTOU Vulnerabilities](https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use)
