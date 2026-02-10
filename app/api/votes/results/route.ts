// GET endpoint for fetching current poll results

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import type { VoteResults } from '@/types/votes'

export async function GET() {
  // Check if Firebase is initialized
  if (!adminDb) {
    return NextResponse.json(
      {
        locations: [],
        totalVotes: 0,
        error: 'Voting system temporarily unavailable'
      },
      { status: 503 }
    )
  }

  try {
    // Fetch all vote documents from Firestore
    const votesSnapshot = await adminDb.collection('votes').get()

    // Map documents to location objects
    const locations = votesSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        slug: doc.id,
        name: data.name as string,
        count: data.count as number,
      }
    })

    // Calculate total votes
    const totalVotes = locations.reduce((sum, loc) => sum + loc.count, 0)

    // Calculate percentages and sort by percentage descending
    const results: VoteResults = {
      locations: locations
        .map((loc) => ({
          ...loc,
          percentage: totalVotes > 0 ? (loc.count / totalVotes) * 100 : 0,
        }))
        .sort((a, b) => b.percentage - a.percentage),
      totalVotes,
    }

    return NextResponse.json(results, {
      headers: {
        'Cache-Control': 'public, max-age=60',
      },
    })
  } catch (error) {
    console.error('Error fetching vote results:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vote results' },
      { status: 500 }
    )
  }
}
