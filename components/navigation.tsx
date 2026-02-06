'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

export interface NavigationProps {
  className?: string
}

const stayMenuItems = [
  {
    title: 'Accommodations',
    description: 'Beachfront villas and cozy rooms with ocean views.',
    href: '/stay',
  },
  {
    title: 'Amenities',
    description: 'Pool, beach access, restaurant, and wellness facilities.',
    href: '/stay#amenities',
  },
  {
    title: 'Packages',
    description: 'Special retreat packages and extended stay options.',
    href: '/stay#packages',
  },
]

const experienceMenuItems = [
  {
    title: 'Yoga',
    description: 'Daily classes, workshops, and private sessions by the sea.',
    href: '/yoga',
  },
  {
    title: 'Events',
    description: 'Retreats, workshops, and special gatherings.',
    href: '/events',
  },
  {
    title: 'Activities',
    description: 'Diving, surfing, island tours, and local experiences.',
    href: '/activities',
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
    title: 'Team',
    description: 'Meet the people who make Thu Tides special.',
    href: '/team',
  },
  {
    title: 'Reviews',
    description: 'What our guests are saying.',
    href: '/reviews',
  },
]

export function Navigation({ className }: NavigationProps) {
  const [isStayOpen, setIsStayOpen] = React.useState(false)
  const [isExperienceOpen, setIsExperienceOpen] = React.useState(false)
  const [isAboutOpen, setIsAboutOpen] = React.useState(false)
  const stayTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)
  const experienceTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)
  const aboutTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const handleStayMouseEnter = () => {
    if (stayTimeoutRef.current) clearTimeout(stayTimeoutRef.current)
    setIsStayOpen(true)
  }

  const handleStayMouseLeave = () => {
    stayTimeoutRef.current = setTimeout(() => {
      setIsStayOpen(false)
    }, 200)
  }

  const handleExperienceMouseEnter = () => {
    if (experienceTimeoutRef.current) clearTimeout(experienceTimeoutRef.current)
    setIsExperienceOpen(true)
  }

  const handleExperienceMouseLeave = () => {
    experienceTimeoutRef.current = setTimeout(() => {
      setIsExperienceOpen(false)
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
      if (stayTimeoutRef.current) clearTimeout(stayTimeoutRef.current)
      if (experienceTimeoutRef.current) clearTimeout(experienceTimeoutRef.current)
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
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
        <Link href="/" className="text-white hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Stay Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleStayMouseEnter}
            onMouseLeave={handleStayMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors group">
              Stay
              <motion.span
                className="material-symbols-outlined text-lg"
                animate={{ rotate: isStayOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                expand_more
              </motion.span>
            </button>

            <AnimatePresence>
              {isStayOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-80 rounded-lg backdrop-blur-xl bg-slate-800/90 border border-white/10 shadow-2xl p-2"
                >
                  <div className="flex flex-col gap-1">
                    {stayMenuItems.map((item) => (
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

          {/* Experience Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleExperienceMouseEnter}
            onMouseLeave={handleExperienceMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors group">
              Experience
              <motion.span
                className="material-symbols-outlined text-lg"
                animate={{ rotate: isExperienceOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                expand_more
              </motion.span>
            </button>

            <AnimatePresence>
              {isExperienceOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-80 rounded-lg backdrop-blur-xl bg-slate-800/90 border border-white/10 shadow-2xl p-2"
                >
                  <div className="flex flex-col gap-1">
                    {experienceMenuItems.map((item) => (
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

          <Link
            href="/faq"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            FAQ
          </Link>
        </div>
      </div>

      {/* Right Section - CTA */}
      <Link
        href="/book"
        className="bg-white hover:bg-gray-100 text-slate-900 px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
      >
        Let&apos;s Connect
      </Link>
    </nav>
  )
}
