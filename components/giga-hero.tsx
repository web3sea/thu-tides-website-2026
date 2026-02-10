'use client'

import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TextHoverEffect } from '@/components/ui/text-hover-effect'
import { LocationVoteDropdown } from '@/components/location-vote-dropdown'
import { cn } from '@/lib/utils'

export interface GigaHeroProps {
  backgroundImage?: string
  backgroundImageAlt?: string
  badge?: {
    text: string
    href?: string
  }
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  logos?: Array<{
    name: string
    icon?: React.ReactNode
  }>
  className?: string
  useHoverEffect?: boolean
  hoverEffectText?: string
}

const defaultLogos = [
  { name: 'POSTMAN', icon: '🚀' },
  { name: 'Rio', icon: '✨' },
  { name: 'DOORDASH', icon: '🚚' },
  { name: 'capital.com', icon: '💼' },
  { name: 'afriex', icon: '💱' },
  { name: 'Sendoso', icon: '📦' },
]

/**
 * GigaHero - Enterprise-focused hero section with dramatic background
 * Inspired by modern SaaS landing pages with glassmorphism and depth
 */
export function GigaHero({
  backgroundImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnFtiM9V-CBNK-gMG4XabepZwTFkqIYYYFsb7ycg0XVAL3oHzGCGYfByOhG1kBUpy2TTOvKrskEskA8cnF7n85lWXfqB3E92kHMpmFPHGLLgzUXsTJVk0o6jd_vUuvmo23iNtVWgM4SjHmUw6tcP8TKxoitkT3N6YA0VudSuiXjcxpvDHPJ38pFxS0_ovdSeDvQXplQTbP0CItK-5hO9V4H68DfitipilMibTpoEdKbAgAyGEFhhi9_oUPNIX4ZTqGJujgIkcKltPW',
  backgroundImageAlt = 'Misty mountain range landscape at dusk',
  badge = {
    text: 'Giga Launches Browser Agent',
    href: '#',
  },
  title = 'AI that talks like a human. Handles millions of calls.',
  subtitle = '',
  ctaText,
  ctaHref,
  logos = defaultLogos,
  className,
  useHoverEffect = false,
  hoverEffectText,
}: GigaHeroProps) {
  const [triggerFlicker, setTriggerFlicker] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const badgeRef = useRef<HTMLButtonElement>(null)

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setTriggerFlicker((prev) => !prev) // Toggle triggers animation via useEffect
    setDropdownOpen((prev) => !prev)
  }

  // Click-outside handler to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        badgeRef.current &&
        !badgeRef.current.contains(event.target as Node) &&
        dropdownOpen
      ) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])
  return (
    <div
      className={cn(
        'relative w-full min-h-screen flex flex-col overflow-hidden',
        className
      )}
    >
      {/* Background Image with Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          sizes="100vw"
          quality={90}
          priority
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/10 to-slate-900/90" />
      </div>

      {/* Main Hero Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 pt-10 pb-32 text-center max-w-5xl mx-auto w-full">
        {/* Title */}
        {useHoverEffect ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-4xl h-[300px] md:h-[400px] mb-4"
            >
              <TextHoverEffect
                text={hoverEffectText || title}
                flickerTrigger={triggerFlicker}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl md:text-2xl text-white font-light mb-6 max-w-3xl mx-auto"
            >
              {title}
            </motion.p>
          </>
        ) : (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight md:leading-tight lg:leading-[1.1] text-white mb-6 drop-shadow-sm"
          >
            {title.split('. ').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && '.'}
                {i < arr.length - 1 && (
                  <>
                    <br className="hidden md:block" />
                    <span className="opacity-90">
                      {i === arr.length - 2 ? '' : ' '}
                    </span>
                  </>
                )}
              </React.Fragment>
            ))}
          </motion.h1>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button
              ref={badgeRef}
              onClick={handleBadgeClick}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-2 hover:bg-white/20 transition-colors group cursor-pointer"
              aria-label={`${badge.text} - Click to vote`}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] md:text-xs font-semibold tracking-widest text-white/90 uppercase">
                {badge.text}
              </span>
              <svg
                className={cn(
                  'w-3 h-3 text-white/70 transition-transform',
                  dropdownOpen ? 'rotate-90' : 'group-hover:translate-x-1'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <LocationVoteDropdown
              isOpen={dropdownOpen}
              onClose={() => setDropdownOpen(false)}
              triggerRef={badgeRef}
            />
          </motion.div>
        )}

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Button */}
        {ctaText && ctaHref && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link href={ctaHref}>
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-slate-900 px-8 py-6 rounded-full text-base font-semibold shadow-lg hover:shadow-white/20 transform hover:-translate-y-0.5 transition-all h-auto"
              >
                {ctaText}
              </Button>
            </Link>
          </motion.div>
        )}
      </main>

      {/* Logo Section */}
      {logos && logos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 w-full px-6 pb-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-normal">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-white"
              >
                {logo.icon && (
                  <span className="text-2xl md:text-3xl">{logo.icon}</span>
                )}
                <span className="font-bold tracking-wide text-sm md:text-base">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
