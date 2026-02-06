'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
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
  subtitle = 'AI agents for enterprise support',
  ctaText = 'Talk to us',
  ctaHref = '#',
  logos = defaultLogos,
  className,
}: GigaHeroProps) {
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
          className="w-full h-full object-cover opacity-90 dark:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/10 to-slate-900/90 dark:from-black/40 dark:to-black/90" />
      </div>

      {/* Main Hero Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 pt-10 pb-32 text-center max-w-5xl mx-auto w-full">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href={badge.href || '#'}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/10 mb-8 hover:bg-white/20 transition-colors group"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] md:text-xs font-semibold tracking-widest text-white/90 dark:text-white/80 uppercase">
                {badge.text}
              </span>
              <svg className="w-3 h-3 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight md:leading-tight lg:leading-[1.1] text-white dark:text-gray-50 mb-6 drop-shadow-sm"
        >
          {title.split('. ').map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && '.'}
              {i < arr.length - 1 && (
                <>
                  <br className="hidden md:block" />
                  <span className="opacity-90 dark:opacity-80">
                    {i === arr.length - 2 ? '' : ' '}
                  </span>
                </>
              )}
            </React.Fragment>
          ))}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 dark:text-gray-300 font-light mb-10 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Button */}
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
      </main>

      {/* Logo Section */}
      {logos && logos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 w-full px-6 pb-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
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
