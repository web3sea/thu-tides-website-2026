'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon, ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

export interface CarouselImage {
  src: string
  alt: string
  caption?: string
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'video'
}

export interface ImageCarouselProps {
  images: CarouselImage[]
  animationType?: 'fade' | 'slide' | 'zoom'
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  showCaptions?: boolean
  captions?: string[]
  quality?: number
  priority?: boolean
  onImageChange?: (index: number) => void
  className?: string
}

const aspectRatios = {
  square: 'aspect-square',
  landscape: 'aspect-video',
  portrait: 'aspect-[3/4]',
  video: 'aspect-video',
}

const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
}

/**
 * ImageCarousel - Photography showcase carousel with smooth animations
 * Perfect for case study image galleries
 * 
 * @example
 * <ImageCarousel 
 *   images={projectImages}
 *   animationType="fade"
 *   showDots
 *   showCaptions
 *   autoPlay
 * />
 */
export function ImageCarousel({
  images,
  animationType = 'fade',
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  showCaptions = true,
  quality = 85,
  priority = false,
  onImageChange,
  className = '',
}: ImageCarouselProps) {
  const [current, setCurrent] = React.useState(0)
  const [direction, setDirection] = React.useState<'next' | 'prev'>('next')
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  // Auto-play logic
  React.useEffect(() => {
    if (!autoPlay || !images || images.length === 0) return

    intervalRef.current = setInterval(() => {
      setDirection('next')
      setCurrent((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoPlay, autoPlayInterval, images])

  // Notify parent of image change
  React.useEffect(() => {
    onImageChange?.(current)
  }, [current, onImageChange])

  if (!images || images.length === 0) {
    return <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">No images provided</div>
  }

  const currentImage = images[current]
  const aspectRatio = currentImage.aspectRatio || 'landscape'

  const handleNext = () => {
    setDirection('next')
    setCurrent((prev) => (prev + 1) % images.length)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handlePrev = () => {
    setDirection('prev')
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleDotClick = (index: number) => {
    setDirection(index > current ? 'next' : 'prev')
    setCurrent(index)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const variants = animationVariants[animationType]

  return (
    <div className={cn('relative w-full group', className)}>
      {/* Main image container */}
      <div className="relative w-full overflow-hidden rounded-lg bg-muted">
        <div className={cn('w-full', aspectRatios[aspectRatio])}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="relative w-full h-full"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                quality={quality}
                priority={priority || current === 0}
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {showArrows && images.length > 1 && (
          <>
            <motion.button
              onClick={handlePrev}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, backgroundColor: 'rgba(11, 122, 161, 0.1)' }}
              className={cn(
                'absolute left-4 top-1/2 -translate-y-1/2 z-10',
                'p-2 rounded-full backdrop-blur-sm transition-all duration-300',
                'opacity-0 group-hover:opacity-100',
                'focus:ring-2 focus:ring-[#0B7AA1] focus:outline-none'
              )}
              aria-label="Previous image"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} className="text-white drop-shadow" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, backgroundColor: 'rgba(11, 122, 161, 0.1)' }}
              className={cn(
                'absolute right-4 top-1/2 -translate-y-1/2 z-10',
                'p-2 rounded-full backdrop-blur-sm transition-all duration-300',
                'opacity-0 group-hover:opacity-100',
                'focus:ring-2 focus:ring-[#0B7AA1] focus:outline-none'
              )}
              aria-label="Next image"
            >
              <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} className="text-white drop-shadow" />
            </motion.button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
            {current + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Caption */}
      {showCaptions && currentImage.caption && (
        <motion.p
          key={`caption-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="text-sm text-muted-foreground italic mt-3 px-1"
        >
          {currentImage.caption}
        </motion.p>
      )}

      {/* Dot indicators */}
      {showDots && images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-2 mt-6"
        >
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === current
                  ? 'w-8 bg-[#0B7AA1]'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
              )}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === current}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

/**
 * ImageCarouselRow - Multiple carousels in a grid layout
 * Useful for showing multiple project angles or sequences
 */
export function ImageCarouselRow({
  carousels,
  className = '',
}: {
  carousels: ImageCarouselProps[]
  className?: string
}) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      {carousels.map((carousel, idx) => (
        <ImageCarousel key={idx} {...carousel} />
      ))}
    </div>
  )
}
