'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

export interface NavigationProps {
  className?: string
}

const photographsMenuItems = [
  {
    title: 'Underwater',
    description: 'Dive into the depths and discover vibrant marine life.',
    href: '/photography#underwater',
  },
  {
    title: 'Aerial',
    description: 'Stunning drone photography and aerial perspectives.',
    href: '/photography#aerials',
  },
  {
    title: 'Dive',
    description: 'Diving adventures and underwater exploration.',
    href: '/photography#dive',
  },
  {
    title: 'Properties',
    description: 'Beautiful resorts and hospitality spaces.',
    href: '/photography#properties',
  },
  {
    title: 'Landscape',
    description: 'Breathtaking coastal and island landscapes.',
    href: '/photography#landscape',
  },
  {
    title: 'Wildlife',
    description: 'Nature and wildlife photography.',
    href: '/photography#wildlife',
  },
]

export function Navigation({ className }: NavigationProps): React.JSX.Element {
  const [isPhotographsOpen, setIsPhotographsOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const photographsTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const handlePhotographsMouseEnter = () => {
    if (photographsTimeoutRef.current) clearTimeout(photographsTimeoutRef.current)
    setIsPhotographsOpen(true)
  }

  const handlePhotographsMouseLeave = () => {
    photographsTimeoutRef.current = setTimeout(() => {
      setIsPhotographsOpen(false)
    }, 200)
  }

  React.useEffect(() => {
    return () => {
      if (photographsTimeoutRef.current) clearTimeout(photographsTimeoutRef.current)
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

          {/* About Link */}
          <Link
            href="#about"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            About
          </Link>

          {/* Photographs Dropdown */}
          <div
            className="relative"
            onMouseEnter={handlePhotographsMouseEnter}
            onMouseLeave={handlePhotographsMouseLeave}
          >
            <Link
              href="/photography"
              className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors group"
            >
              Photographs
              <motion.span
                className="material-symbols-outlined text-lg"
                animate={{ rotate: isPhotographsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                expand_more
              </motion.span>
            </Link>

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
        </div>
      </div>

      {/* Right Section - CTA and Mobile Menu Button */}
      <div className="flex items-center gap-4">
        <Link
          href="#contact"
          className="hidden md:block border border-white/90 hover:bg-white/10 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
        >
          Let&apos;s Connect
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-slate-900 z-50 md:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Logo />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined text-3xl">close</span>
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col p-6 gap-6">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/90 hover:text-white transition-colors"
                >
                  Home
                </Link>

                <Link
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/90 hover:text-white transition-colors"
                >
                  About
                </Link>

                {/* Photographs Section */}
                <div className="flex flex-col gap-3">
                  <Link
                    href="/photography"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-semibold text-white"
                  >
                    Photographs
                  </Link>
                  <div className="pl-4 flex flex-col gap-3">
                    {photographsMenuItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm text-white/80 hover:text-white transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 border border-white/90 hover:bg-white/10 text-white px-6 py-3 rounded-full text-center font-semibold transition-all"
                >
                  Let&apos;s Connect
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
