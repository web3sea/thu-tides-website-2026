'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface NavigationProps {
  className?: string
}

const workMenuItems = [
  {
    title: 'Portfolio',
    description: 'View our collection of photography and creative work.',
    href: '/work/portfolio',
  },
  {
    title: 'Case Studies',
    description: 'In-depth looks at featured projects and campaigns.',
    href: '/work/case-studies',
  },
  {
    title: 'Services',
    description: 'Photography, videography, and creative services we offer.',
    href: '/work/services',
  },
  {
    title: 'Client Gallery',
    description: 'Browse work by client and industry.',
    href: '/work/clients',
  },
]

export function Navigation({ className }: NavigationProps) {
  const [isWorkOpen, setIsWorkOpen] = React.useState(false)
  const workTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const handleWorkMouseEnter = () => {
    if (workTimeoutRef.current) clearTimeout(workTimeoutRef.current)
    setIsWorkOpen(true)
  }

  const handleWorkMouseLeave = () => {
    workTimeoutRef.current = setTimeout(() => {
      setIsWorkOpen(false)
    }, 200)
  }

  React.useEffect(() => {
    return () => {
      if (workTimeoutRef.current) clearTimeout(workTimeoutRef.current)
    }
  }, [])

  return (
    <nav
      className={cn(
        'relative z-50 px-6 py-6 md:px-10 flex items-center justify-between',
        className
      )}
    >
      {/* Left Section - Logo and Menu */}
      <div className="flex items-center gap-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-white"
            >
              <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
              <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
              <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            </svg>
          </div>
          Thu Tides
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            Home
          </Link>

          {/* Work Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleWorkMouseEnter}
            onMouseLeave={handleWorkMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors group">
              Work
              <motion.span
                className="material-symbols-outlined text-lg"
                animate={{ rotate: isWorkOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                expand_more
              </motion.span>
            </button>

            <AnimatePresence>
              {isWorkOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-80 rounded-lg backdrop-blur-xl bg-slate-800/90 border border-white/10 shadow-2xl p-2"
                >
                  <div className="flex flex-col gap-1">
                    {workMenuItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group/item block p-3 rounded-md hover:bg-white/10 transition-colors"
                      >
                        <h3 className="text-sm font-semibold text-white group-hover/item:text-gray-200">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/about"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Right Section - CTA */}
      <div className="flex items-center gap-6">
        <Button
          size="lg"
          className="bg-white hover:bg-gray-100 text-slate-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Talk to us
        </Button>
      </div>
    </nav>
  )
}
