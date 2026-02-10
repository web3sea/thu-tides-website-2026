// POST endpoint for vote submission with IP-based rate limiting

import { NextRequest, NextResponse } from 'next/server'
import { adminDb, admin } from '@/lib/firebase-admin'
import crypto from 'crypto'
import type { VoteRequest, VoteResponse } from '@/types/votes'

// Valid location slugs
const VALID_LOCATIONS = [
  'maldives',
  'misool',
  'java',
  'lombok-sumba',
  'california',
  'flores',
  'kalimantan',
  'namibia',
  'mauritius',
  'banggai',
  'togean',
]

// Rate limit: 10 requests per minute per IP
const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 60000 // 1 minute

export async function POST(request: NextRequest) {
  try {
    // Extract IP address from headers
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown'

    // Hash IP for rate limiting (consistent with vote tracking)
    const hashedIPForRateLimit = crypto
      .createHash('sha256')
      .update(ip)
      .digest('hex')

    // Firestore-based rate limiting check
    const now = Date.now()
    const rateLimitRef = adminDb.collection('rate_limits').doc(hashedIPForRateLimit)
    const rateLimitDoc = await rateLimitRef.get()

    if (rateLimitDoc.exists) {
      const data = rateLimitDoc.data()
      const count = data?.count || 0
      const resetTime = data?.resetTime?.toMillis() || 0

      // Check if within rate limit window and over limit
      if (count >= RATE_LIMIT_MAX && now < resetTime) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.', success: false },
          { status: 429 }
        )
      }

      // Update rate limit counter
      if (now >= resetTime) {
        // Window expired, reset counter
        await rateLimitRef.set({
          count: 1,
          resetTime: admin.firestore.Timestamp.fromMillis(now + RATE_LIMIT_WINDOW_MS),
          ip: hashedIPForRateLimit,
        })
      } else {
        // Increment counter within window
        await rateLimitRef.update({
          count: admin.firestore.FieldValue.increment(1),
        })
      }
    } else {
      // First request from this IP, create rate limit document
      await rateLimitRef.set({
        count: 1,
        resetTime: admin.firestore.Timestamp.fromMillis(now + RATE_LIMIT_WINDOW_MS),
        ip: hashedIPForRateLimit,
      })
    }

    // Parse and validate request body first
    const body: VoteRequest = await request.json()
    const { location } = body

    if (!location || !VALID_LOCATIONS.includes(location)) {
      return NextResponse.json(
        { error: 'Invalid location', success: false },
        { status: 400 }
      )
    }

    // Use the same hashed IP for vote tracking
    const hashedIP = hashedIPForRateLimit

    // Use transaction to atomically check if voted and record vote
    // This prevents race condition where two simultaneous requests could both pass the check
    try {
      await adminDb.runTransaction(async (transaction) => {
        const ipDocRef = adminDb.collection('vote_ips').doc(hashedIP)
        const ipDoc = await transaction.get(ipDocRef)

        // Check if IP has already voted
        if (ipDoc.exists) {
          throw new Error('ALREADY_VOTED')
        }

        // Record IP vote
        transaction.set(ipDocRef, {
          ip: hashedIP,
          location,
          votedAt: admin.firestore.FieldValue.serverTimestamp(),
        })

        // Atomic increment vote count
        const voteDocRef = adminDb.collection('votes').doc(location)
        transaction.update(voteDocRef, {
          count: admin.firestore.FieldValue.increment(1),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        })
      })
    } catch (transactionError) {
      // Handle "already voted" error from transaction
      if (
        transactionError instanceof Error &&
        transactionError.message === 'ALREADY_VOTED'
      ) {
        return NextResponse.json(
          { error: 'You have already voted', success: false },
          { status: 409 }
        )
      }
      // Re-throw other transaction errors to outer catch
      throw transactionError
    }

    // Fetch updated results
    const votesSnapshot = await adminDb.collection('votes').get()

    const locations = votesSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        slug: doc.id,
        name: data.name as string,
        count: data.count as number,
      }
    })

    const totalVotes = locations.reduce((sum, loc) => sum + loc.count, 0)

    const results = {
      locations: locations
        .map((loc) => ({
          ...loc,
          percentage: totalVotes > 0 ? (loc.count / totalVotes) * 100 : 0,
        }))
        .sort((a, b) => b.percentage - a.percentage),
      totalVotes,
    }

    const response: VoteResponse = {
      success: true,
      results,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error processing vote:', error)
    return NextResponse.json(
      { error: 'Failed to process vote', success: false },
      { status: 500 }
    )
  }
}
