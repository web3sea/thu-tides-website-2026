'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

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
      <Link href="/" className="text-white hover:opacity-90 transition-opacity">
        <Logo />
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
