'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { GlassCard } from '@/components/ui/glass-card'
import { toast } from 'sonner'
import type { VoteResults } from '@/types/votes'

interface LocationVoteDropdownProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scaleY: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { type: 'spring' as const, damping: 20, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    y: -5,
    scaleY: 0.98,
    transition: { duration: 0.2 },
  },
}

export function LocationVoteDropdown({
  isOpen,
  onClose,
  triggerRef,
}: LocationVoteDropdownProps) {
  const [results, setResults] = useState<VoteResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch results when dropdown opens
  useEffect(() => {
    if (isOpen && !results) {
      setIsLoading(true)
      fetch('/api/votes/results')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch results')
          return res.json()
        })
        .then((data: VoteResults) => {
          setResults(data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching results:', error)
          toast.error('Failed to load voting results')
          setIsLoading(false)
        })
    }
  }, [isOpen, results])

  // Handle vote submission
  async function handleVote(location: string) {
    if (hasVoted) {
      toast.error('You have already voted')
      return
    }

    setIsVoting(true)
    setSelectedLocation(location)

    try {
      const res = await fetch('/api/votes/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Failed to vote')
        if (res.status === 409) {
          setHasVoted(true)
        }
        return
      }

      toast.success('Vote recorded! Thank you for participating.')
      setResults(data.results)
      setHasVoted(true)
    } catch (error) {
      console.error('Error submitting vote:', error)
      toast.error('Failed to submit vote')
    } finally {
      setIsVoting(false)
      setSelectedLocation(null)
    }
  }

  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Handle backdrop click on mobile
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (isMobile && e.target === e.currentTarget) {
      onClose()
    }
  }

  // Mobile: Full-screen modal
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
          >
            <GlassCard variant="strong" padding="sm" className="w-full max-w-md">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-white/30 border-t-white rounded-full" />
                </div>
              ) : results ? (
                <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                  {results.locations.map((location) => (
                    <motion.button
                      key={location.slug}
                      onClick={() => handleVote(location.slug)}
                      disabled={isVoting || hasVoted}
                      whileHover={
                        !hasVoted && !isVoting
                          ? { backgroundColor: 'rgba(255, 255, 255, 0.1)', x: 4 }
                          : undefined
                      }
                      whileTap={!hasVoted && !isVoting ? { scale: 0.98 } : undefined}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-white transition-colors ${
                        hasVoted ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                      }`}
                    >
                      <span className="font-medium text-left">{location.name}</span>
                      <span className="text-lg font-semibold text-white/90 ml-4 flex-shrink-0">
                        {isVoting && selectedLocation === location.slug ? (
                          <span className="animate-pulse">...</span>
                        ) : (
                          `${location.percentage.toFixed(1)}%`
                        )}
                      </span>
                    </motion.button>
                  ))}
                  {hasVoted && (
                    <div className="mt-4 pt-3 border-t border-white/10 text-center">
                      <p className="text-sm text-white/70">
                        Thanks for voting! Total votes: {results.totalVotes}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-white/70">
                  Failed to load results
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // Desktop: Inline accordion
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full mt-6"
        >
          <GlassCard variant="strong" padding="sm" className="max-w-2xl mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-white/30 border-t-white rounded-full" />
              </div>
            ) : results ? (
              <div
                className={`space-y-1 overflow-y-auto ${
                  isMobile ? 'max-h-[70vh]' : 'max-h-[400px]'
                }`}
              >
                {results.locations.map((location) => (
                  <motion.button
                    key={location.slug}
                    onClick={() => handleVote(location.slug)}
                    disabled={isVoting || hasVoted}
                    whileHover={
                      !hasVoted && !isVoting
                        ? { backgroundColor: 'rgba(255, 255, 255, 0.1)', x: 4 }
                        : undefined
                    }
                    whileTap={!hasVoted && !isVoting ? { scale: 0.98 } : undefined}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-white transition-colors ${
                      hasVoted ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                    }`}
                  >
                    <span className="font-medium text-left">{location.name}</span>
                    <span className="text-lg font-semibold text-white/90 ml-4 flex-shrink-0">
                      {isVoting && selectedLocation === location.slug ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        `${location.percentage.toFixed(1)}%`
                      )}
                    </span>
                  </motion.button>
                ))}
                {hasVoted && (
                  <div className="mt-4 pt-3 border-t border-white/10 text-center">
                    <p className="text-sm text-white/70">
                      Thanks for voting! Total votes: {results.totalVotes}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-white/70">
                Failed to load results
              </div>
            )}
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
