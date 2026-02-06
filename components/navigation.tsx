'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

export interface NavigationProps {
  className?: string
}

const expeditionsMenuItems = [
  {
    title: 'Reconnect',
    description: 'Dive resort in Togean, Sulawesi.',
    href: '/reconnect',
  },
  {
    title: 'Evolution',
    description: 'Dive center in Malapascua, Philippines.',
    href: '/evolution',
  },
  {
    title: 'Munduk Heaven',
    description: 'Discover the magic of Bali\'s hidden mountain paradise.',
    href: '/munduk-heaven',
  },
]

const photographsMenuItems = [
  {
    title: 'Aerials',
    description: 'Stunning drone photography and aerial perspectives.',
    href: '/aerials',
  },
  {
    title: 'Underwater',
    description: 'Capturing the beauty beneath the waves.',
    href: '/underwater',
  },
  {
    title: 'Top Side',
    description: 'Surface and coastal photography collections.',
    href: '/topside',
  },
]

const aboutMenuItems = [
  {
    title: 'Our Story',
    description: 'Learn about our mission and values.',
    href: '/about',
  },
  {
    title: 'Values',
    description: 'Sustainability, community, and mindful living.',
    href: '/values',
  },
  {
    title: 'Testimonials',
    description: 'What our guests are saying.',
    href: '/testimonials',
  },
]

export function Navigation({ className }: NavigationProps) {
  const [isExpeditionsOpen, setIsExpeditionsOpen] = React.useState(false)
  const [isPhotographsOpen, setIsPhotographsOpen] = React.useState(false)
  const [isAboutOpen, setIsAboutOpen] = React.useState(false)
  const expeditionsTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)
  const photographsTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)
  const aboutTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const handleExpeditionsMouseEnter = () => {
    if (expeditionsTimeoutRef.current) clearTimeout(expeditionsTimeoutRef.current)
    setIsExpeditionsOpen(true)
  }

  const handleExpeditionsMouseLeave = () => {
    expeditionsTimeoutRef.current = setTimeout(() => {
      setIsExpeditionsOpen(false)
    }, 200)
  }

  const handlePhotographsMouseEnter = () => {
    if (photographsTimeoutRef.current) clearTimeout(photographsTimeoutRef.current)
    setIsPhotographsOpen(true)
  }

  const handlePhotographsMouseLeave = () => {
    photographsTimeoutRef.current = setTimeout(() => {
      setIsPhotographsOpen(false)
    }, 200)
  }

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
    setIsAboutOpen(true)
  }

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setIsAboutOpen(false)
    }, 200)
  }

  React.useEffect(() => {
    return () => {
      if (expeditionsTimeoutRef.current) clearTimeout(expeditionsTimeoutRef.current)
      if (photographsTimeoutRef.current) clearTimeout(photographsTimeoutRef.current)
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
    }
  }, [])

  return (
    <nav
      className={cn(
        'absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-10 flex items-center justify-between bg-transparent',
        className
      )}
    >
      {/* Left Section - Logo and Menu */}
      <div className="flex items-center gap-12">
        {/* Logo */}
        <Link href="/" className="text-white hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            Home
          </Link>

          {/* Expeditions Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleExpeditionsMouseEnter}
            onMouseLeave={handleExpeditionsMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors group">
              Expeditions
              <motion.span
                className="material-symbols-outlined text-lg"
                animate={{ rotate: isExpeditionsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                expand_more
              </motion.span>
            </button>

            <AnimatePresence>
              {isExpeditionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-80 rounded-lg backdrop-blur-xl bg-slate-800/90 border border-white/10 shadow-2xl p-2"
                >
                  <div className="flex flex-col gap-1">
                    {expeditionsMenuItems.map((item) => (
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

          {/* Photographs Dropdown */}
          <div
            className="relative"
            onMouseEnter={handlePhotographsMouseEnter}
            onMouseLeave={handlePhotographsMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors group">
              Photographs
              <motion.span
                className="material-symbols-outlined text-lg"
                animate={{ rotate: isPhotographsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                expand_more
              </motion.span>
            </button>

            <AnimatePresence>
              {isPhotographsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-80 rounded-lg backdrop-blur-xl bg-slate-800/90 border border-white/10 shadow-2xl p-2"
                >
                  <div className="flex flex-col gap-1">
                    {photographsMenuItems.map((item) => (
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

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleAboutMouseEnter}
            onMouseLeave={handleAboutMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors group">
              About
              <motion.span
                className="material-symbols-outlined text-lg"
                animate={{ rotate: isAboutOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                expand_more
              </motion.span>
            </button>

            <AnimatePresence>
              {isAboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-80 rounded-lg backdrop-blur-xl bg-slate-800/90 border border-white/10 shadow-2xl p-2"
                >
                  <div className="flex flex-col gap-1">
                    {aboutMenuItems.map((item) => (
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
        </div>
      </div>

      {/* Right Section - CTA */}
      <Link
        href="/book"
        className="border border-white/90 hover:bg-white/10 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
      >
        Let&apos;s Connect
      </Link>
    </nav>
  )
}
