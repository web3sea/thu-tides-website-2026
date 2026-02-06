'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Typography } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface HeroWithImageProps {
  backgroundImage: string
  backgroundImageAlt?: string
  title: string
  subtitle?: string
  overlayOpacity?: number
  overlayColor?: 'dark' | 'light' | 'cerulean' | 'none'
  content?: React.ReactNode
  height?: 'small' | 'medium' | 'large' | 'full'
  parallax?: boolean
  animationTrigger?: 'load' | 'scroll'
  className?: string
}

const heightClasses = {
  small: 'h-[300px] md:h-[400px]',
  medium: 'h-[400px] md:h-[500px]',
  large: 'h-[500px] md:h-[600px]',
  full: 'h-screen',
}

const overlayClasses = {
  dark: 'bg-black',
  light: 'bg-white',
  cerulean: 'bg-brand-cerulean',
  none: '',
}

/**
 * HeroWithImage - Full-featured hero section with background image
 * Supports parallax, overlay tinting, and animated content
 * 
 * @example
 * <HeroWithImage
 *   backgroundImage="/hero.jpg"
 *   title="Welcome to Our Studio"
 *   subtitle="Award-winning photography and design"
 *   overlayOpacity={0.3}
 *   overlayColor="cerulean"
 *   height="large"
 *   parallax
 * />
 */
export function HeroWithImage({
  backgroundImage,
  backgroundImageAlt = 'Hero background',
  title,
  subtitle,
  overlayOpacity = 0.3,
  overlayColor = 'dark',
  content,
  height = 'large',
  parallax = true,
  animationTrigger = 'load',
  className = '',
}: HeroWithImageProps) {
  const [scrollY, setScrollY] = React.useState(0)

  React.useEffect(() => {
    if (!parallax) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [parallax])

  const contentVariant =
    animationTrigger === 'load'
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.2 },
        }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6 },
        }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        heightClasses[height],
        className
      )}
    >
      {/* Background Image with Parallax */}
      <motion.div
        initial={{ scale: 1 }}
        animate={parallax ? { y: scrollY * 0.5 } : {}}
        className="absolute inset-0"
      >
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          sizes="100vw"
          quality={85}
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      {overlayColor !== 'none' && (
        <div
          className={cn(
            'absolute inset-0',
            overlayClasses[overlayColor]
          )}
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content Container */}
      <div className="relative h-full w-full flex items-center justify-center px-6">
        <motion.div
          {...contentVariant}
          className="text-center text-white max-w-3xl mx-auto space-y-6"
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="hero-title"
              className="text-white drop-shadow-lg"
            >
              {title}
            </Typography>
          </motion.div>

          {/* Subtitle */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography
                variant="hero-subtitle"
                className="text-white/90 drop-shadow-md"
              >
                {subtitle}
              </Typography>
            </motion.div>
          )}

          {/* Custom Content */}
          {content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pt-4"
            >
              {content}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator (optional, only on full screen) */}
      {height === 'full' && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <Typography variant="caption" className="text-white/60">
              Scroll to explore
            </Typography>
            <svg
              className="w-6 h-6 text-white/60 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  )
}

/**
 * HeroWithImageAndCTA - Extended hero with call-to-action button
 */
export function HeroWithImageAndCTA({
  backgroundImage,
  title,
  subtitle,
  ctaText = 'Explore',
  ctaHref = '#',
  onCtaClick,
  ...props
}: HeroWithImageProps & {
  ctaText?: string
  ctaHref?: string
  onCtaClick?: () => void
}) {
  return (
    <HeroWithImage
      backgroundImage={backgroundImage}
      title={title}
      subtitle={subtitle}
      {...props}
      content={
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <Button
            variant="brand"
            size="lg"
            onClick={(e) => {
              if (onCtaClick) {
                e.preventDefault()
                onCtaClick()
              }
            }}
            render={(props) => (
              <Link href={ctaHref} {...props}>
                {ctaText}
              </Link>
            )}
          />
        </motion.div>
      }
    />
  )
}
