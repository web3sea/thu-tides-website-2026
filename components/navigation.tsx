'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface NavigationProps {
  className?: string
}

const navigationLinks = [
  { label: 'About', href: '/about' },
  { label: 'Values', href: '/values' },
  { label: 'Stay', href: '/stay' },
  { label: 'Yoga', href: '/yoga' },
  { label: 'Events', href: '/events' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Team', href: '/team' },
  { label: 'FAQ', href: '/faq' },
]

export function Navigation({ className }: NavigationProps) {
  return (
    <nav
      className={cn(
        'relative z-50 px-6 py-6 md:px-10 flex items-center justify-between',
        className
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity group"
      >
        <motion.div
          className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-white"
          >
            <motion.path
              d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
              animate={{
                x: [0, 3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
              animate={{
                x: [0, 3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1,
              }}
            />
            <motion.path
              d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
              animate={{
                x: [0, 3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
          </svg>
        </motion.div>
        Thu Tides
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {navigationLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-base font-normal text-white/90 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Book Your Stay Button */}
      <Link
        href="/book"
        className="border-2 border-white text-white px-8 py-3 rounded-full text-base font-normal hover:bg-white/10 transition-all"
      >
        Book your stay
      </Link>
    </nav>
  )
}
