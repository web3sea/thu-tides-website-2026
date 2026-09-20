'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { GlassCard } from '@/components/ui/glass-card'
import { toast } from 'sonner'
import type { VoteResults } from '@/types/votes'

const PANEL_ID_MOBILE = 'vote-panel-mobile'
const PANEL_ID_DESKTOP = 'vote-panel-desktop'

/**
 * For the trigger's aria-controls. Both twins are named because they render
 * together and CSS hides one; a display:none panel is out of the accessibility
 * tree, so exactly one of these resolves at any viewport.
 */
export const VOTE_PANEL_IDS = `${PANEL_ID_MOBILE} ${PANEL_ID_DESKTOP}`

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
  const [hasError, setHasError] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('thu-tides-voted') === 'true'
  })
  const mobileRef = useRef<HTMLDivElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)

  const fetchResults = useCallback(async () => {
    setIsLoading(true)
    setHasError(false)
    try {
      const res = await fetch('/api/votes/results')
      if (!res.ok) throw new Error('Failed to fetch results')
      const data: VoteResults = await res.json()
      setResults(data)
    } catch (error) {
      console.error('Error fetching results:', error)
      toast.error('Failed to load voting results')
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Close on a click outside the panels and the trigger. This lives here rather
  // than in the parent because only this component knows where the panels are:
  // a handler that tests the trigger alone treats a click on a location row as
  // "outside" and tears the panel down mid-vote. Both refs point at the panels
  // themselves -- on mobile that is the card, not the full-screen backdrop it
  // sits on, so that pressing the backdrop still counts as outside.
  useEffect(() => {
    if (!isOpen) return

    function handleMouseDown(event: MouseEvent) {
      const target = event.target as Node
      const isInside =
        mobileRef.current?.contains(target) ||
        desktopRef.current?.contains(target) ||
        triggerRef.current?.contains(target)

      if (!isInside) onClose()
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [isOpen, onClose, triggerRef])

  // Escape closes, which the mouse-only handler above did not cover: a keyboard
  // user could open the panel and then had no way to dismiss it.
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // The mobile panel is a modal dialog, so focus belongs inside it while it is open
  // and back on the trigger afterwards. Tab is kept within the card: aria-modal tells
  // a screen reader to stay, but it does not constrain the Tab key.
  useEffect(() => {
    if (!isOpen) return

    const card = mobileRef.current
    // Only the mobile twin is modal, and only when it is the visible one.
    if (!card || card.offsetParent === null) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const focusables = () =>
      Array.from(
        card.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.offsetParent !== null)

    // Focus the dialog itself rather than its first control. At this point the panel
    // is still showing the loading spinner and has no focusable children, and it is
    // the container a screen reader should announce anyway.
    card.focus()

    function handleTab(event: KeyboardEvent) {
      if (event.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => {
      document.removeEventListener('keydown', handleTab)
      previouslyFocused?.focus()
    }
  }, [isOpen])

  // Fetch results each time the dropdown opens so the poll stays fresh.
  useEffect(() => {
    if (isOpen) {
      fetchResults()
    }
  }, [isOpen, fetchResults])

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
          localStorage.setItem('thu-tides-voted', 'true')
          setHasVoted(true)
        }
        return
      }

      toast.success('Vote recorded! Thank you for participating.')
      setResults(data.results)
      localStorage.setItem('thu-tides-voted', 'true')
      setHasVoted(true)
    } catch (error) {
      console.error('Error submitting vote:', error)
      toast.error('Failed to submit vote')
    } finally {
      setIsVoting(false)
      setSelectedLocation(null)
    }
  }

  // Render voting content (shared between mobile and desktop)
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-white/30 border-t-white rounded-full" />
        </div>
      )
    }

    if (!results) {
      return hasError ? (
        <div className="text-center py-8 text-white/70 space-y-3">
          <p>Failed to load results</p>
          <button
            type="button"
            onClick={fetchResults}
            aria-label="Try again to load voting results"
            className="text-sm text-white/50 hover:text-white/80 underline transition-colors"
          >
            Try again
          </button>
        </div>
      ) : null
    }

    return (
      <div className="space-y-1 max-h-[70vh] md:max-h-[400px] overflow-y-auto">
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
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile: Full-screen modal */}
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            data-testid="vote-dropdown-mobile"
          >
            <GlassCard
              ref={mobileRef}
              id={PANEL_ID_MOBILE}
              role="dialog"
              aria-modal="true"
              aria-label="Vote for the next destination"
              tabIndex={-1}
              variant="strong"
              padding="sm"
              className="w-full max-w-md"
            >
              {renderContent()}
            </GlassCard>
          </motion.div>

          {/* Desktop: Inline accordion */}
          <motion.div
            ref={desktopRef}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden md:block w-full mt-6"
            id={PANEL_ID_DESKTOP}
            role="region"
            aria-label="Vote for the next destination"
            data-testid="vote-dropdown-desktop"
          >
            <GlassCard variant="strong" padding="sm" className="max-w-2xl mx-auto">
              {renderContent()}
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
