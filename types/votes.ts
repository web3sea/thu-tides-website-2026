// Location voting system types

export interface Location {
  slug: string
  name: string
  count: number
  percentage: number
}

export interface VoteIP {
  ip: string
  location: string
  votedAt: Date
}

export interface VoteResults {
  locations: Location[]
  totalVotes: number
}

export interface VoteRequest {
  location: string
}

export interface VoteResponse {
  success: boolean
  results?: VoteResults
  error?: string
}

// Firestore document types
export interface VoteDocument {
  name: string
  count: number
  slug: string
  updatedAt: Date
}

export interface VoteIPDocument {
  ip: string // SHA-256 hashed
  location: string
  votedAt: Date
}
