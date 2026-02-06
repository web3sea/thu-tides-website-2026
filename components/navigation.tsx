'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface NavigationProps {
  className?: string
}

const productMenuItems = [
  {
    title: 'Agent Canvas',
    description: 'Build your ideal agent and solve support issues faster.',
    href: '#',
  },
  {
    title: 'Insights',
    description: 'Insights identify and recommend policy changes to improve performance.',
    href: '#',
  },
  {
    title: 'Voice Experience',
    description: 'Emotionally aware agents that keep conversations natural.',
    href: '#',
  },
  {
    title: 'Browser Agent',
    description: 'Execute workflows directly inside browser-based systems without APIs.',
    href: '#',
  },
]

export function Navigation({ className }: NavigationProps) {
  const [isProductOpen, setIsProductOpen] = React.useState(false)
  const [isCompanyOpen, setIsCompanyOpen] = React.useState(false)
  const productTimeoutRef = React.useRef<NodeJS.Timeout>()
  const companyTimeoutRef = React.useRef<NodeJS.Timeout>()

  const handleProductMouseEnter = () => {
    if (productTimeoutRef.current) clearTimeout(productTimeoutRef.current)
    setIsProductOpen(true)
  }

  const handleProductMouseLeave = () => {
    productTimeoutRef.current = setTimeout(() => {
      setIsProductOpen(false)
    }, 200)
  }

  const handleCompanyMouseEnter = () => {
    if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current)
    setIsCompanyOpen(true)
  }

  const handleCompanyMouseLeave = () => {
    companyTimeoutRef.current = setTimeout(() => {
      setIsCompanyOpen(false)
    }, 200)
  }

  React.useEffect(() => {
    return () => {
      if (productTimeoutRef.current) clearTimeout(productTimeoutRef.current)
      if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current)
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
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-gray-200 to-gray-400" />
          Giga
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Product Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleProductMouseEnter}
            onMouseLeave={handleProductMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors group">
              Product
              <motion.span
                className="material-symbols-outlined text-lg"
                animate={{ rotate: isProductOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                expand_more
              </motion.span>
            </button>

            <AnimatePresence>
              {isProductOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-80 rounded-lg backdrop-blur-xl bg-slate-800/90 border border-white/10 shadow-2xl p-2"
                >
                  <div className="flex flex-col gap-1">
                    {productMenuItems.map((item) => (
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

          {/* Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleCompanyMouseEnter}
            onMouseLeave={handleCompanyMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
              Company
              <span className="material-symbols-outlined text-lg">
                expand_more
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Auth and CTA */}
      <div className="flex items-center gap-6">
        <Link
          href="#"
          className="text-sm font-medium text-white hover:text-gray-200 transition-colors"
        >
          Sign in
        </Link>
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
