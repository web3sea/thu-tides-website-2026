'use client'

import * as React from 'react'
import { Navigation } from '@/components/navigation'
import { cn } from '@/lib/utils'

export interface GigaLayoutProps {
  children: React.ReactNode
  className?: string
  showNavigation?: boolean
}

/**
 * GigaLayout - Layout wrapper with navigation
 * Use this to wrap pages that need the Giga-style navigation
 *
 * @example
 * <GigaLayout>
 *   <GigaHero {...heroProps} />
 *   <section>Content here</section>
 * </GigaLayout>
 */
export function GigaLayout({
  children,
  className,
  showNavigation = true,
}: GigaLayoutProps) {
  return (
    <div className={cn('w-full min-h-screen bg-slate-900 text-white', className)}>
      {showNavigation && <Navigation />}
      {children}
    </div>
  )
}
