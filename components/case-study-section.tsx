'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Typography } from '@/components/typography'
import { cn } from '@/lib/utils'

export interface CaseStudySectionProps {
  type: 'challenge' | 'goal' | 'outcome'
  title: string
  description: string
  image?: {
    src: string
    alt: string
  }
  layout?: 'left' | 'right' | 'full'
  accent?: 'cerulean' | 'sage' | 'olive'
  backgroundColor?: 'light' | 'muted' | 'transparent'
  children?: React.ReactNode
  className?: string
}

const typeConfig = {
  challenge: {
    icon: '⚠️',
    color: 'text-brand-cerulean',
    bgColor: 'bg-[#0B7AA1]/5',
  },
  goal: {
    icon: '🎯',
    color: 'text-brand-olive',
    bgColor: 'bg-[#7A8F4A]/5',
  },
  outcome: {
    icon: '✨',
    color: 'text-brand-sage',
    bgColor: 'bg-[#8FA998]/5',
  },
}

const accentColors = {
  cerulean: 'border-l-4 border-[#0B7AA1]',
  sage: 'border-l-4 border-[#8FA998]',
  olive: 'border-l-4 border-[#7A8F4A]',
}

const bgColors = {
  light: 'bg-white dark:bg-slate-950',
  muted: 'bg-slate-50 dark:bg-slate-900',
  transparent: 'bg-transparent',
}

/**
 * CaseStudySection - Narrative section for challenge, goal, or outcome
 * Creates visual hierarchy and alternating layouts for engaging case study pages
 * 
 * @example
 * <CaseStudySection
 *   type="challenge"
 *   title="The Challenge"
 *   description="Client needed to..."
 *   image={{ src: '/challenge.jpg', alt: 'Challenge insight' }}
 *   layout="right"
 * />
 */
export function CaseStudySection({
  type,
  title,
  description,
  image,
  layout = 'right',
  accent = 'cerulean',
  backgroundColor = 'transparent',
  children,
  className = '',
}: CaseStudySectionProps) {
  const config = typeConfig[type]
  const accentClass = accentColors[accent]
  const bgClass = bgColors[backgroundColor]

  const isFullWidth = layout === 'full'
  const imageOnLeft = layout === 'left'

  return (
    <ScrollReveal
      trigger="slideUp"
      duration={0.8}
      className={cn('section-space-lg', className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          'relative rounded-lg p-8 md:p-12',
          bgClass,
          backgroundColor !== 'transparent' && 'shadow-sm'
        )}
      >
        {/* Full width layout */}
        {isFullWidth && (
          <div className="space-y-8">
            {/* Header */}
            <div className={cn('max-w-2xl', accentClass, 'pl-6')}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{config.icon}</span>
                <Typography
                  variant="metadata"
                  className={config.color}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Typography>
              </div>
              <Typography variant="section-title" className="mb-4">
                {title}
              </Typography>
              <Typography variant="case-intro" className="text-foreground/85">
                {description}
              </Typography>
            </div>

            {/* Image below text on full width */}
            {image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-full h-auto min-h-96 rounded-lg overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                  quality={85}
                  className="object-cover"
                />
              </motion.div>
            )}

            {/* Children content */}
            {children && <div className="mt-8">{children}</div>}
          </div>
        )}

        {/* Two-column layout */}
        {!isFullWidth && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Content Column */}
            <div
              className={cn(
                'flex flex-col justify-center',
                imageOnLeft ? 'md:order-2' : ''
              )}
            >
              <div className={cn(accentClass, 'pl-6')}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{config.icon}</span>
                  <Typography
                    variant="metadata"
                    className={config.color}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Typography>
                </div>
                <Typography variant="subsection-title" className="mb-4">
                  {title}
                </Typography>
                <Typography variant="case-body" className="text-foreground/85 mb-6">
                  {description}
                </Typography>

                {/* Additional content children */}
                {children && (
                  <div className="space-y-4">{children}</div>
                )}
              </div>
            </div>

            {/* Image Column */}
            {image && (
              <motion.div
                initial={{ opacity: 0, x: imageOnLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={cn(
                  'relative w-full h-96 md:h-full min-h-96 rounded-lg overflow-hidden',
                  imageOnLeft ? 'md:order-1' : ''
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  quality={85}
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </ScrollReveal>
  )
}

/**
 * CaseStudyFlow - Complete challenge → goal → outcome narrative
 * Provides visual dividers and consistent styling across sections
 */
export function CaseStudyFlow({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-0">
      {React.Children.map(children, (child, idx) => {
        if (idx === 0) return child

        return (
          <React.Fragment key={idx}>
            {/* Animated Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-px bg-gradient-to-r from-transparent via-[#8FA998]/30 to-transparent my-12 md:my-16"
            />
            {child}
          </React.Fragment>
        )
      })}
    </div>
  )
}
