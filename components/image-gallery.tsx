'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Typography } from '@/components/typography'
import { cn } from '@/lib/utils'

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  hoverEffect?: 'zoom' | 'overlay' | 'lift' | 'none'
  quality?: number
  showCaptions?: boolean
  className?: string
  onImageClick?: (index: number, image: GalleryImage) => void
}

const columnClasses = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

const gapClasses = {
  sm: 'gap-3 md:gap-4',
  md: 'gap-4 md:gap-6',
  lg: 'gap-6 md:gap-8',
}

const hoverEffects = {
  zoom: 'group-hover:scale-110',
  overlay: 'group-hover:brightness-75',
  lift: 'group-hover:shadow-2xl group-hover:-translate-y-2',
  none: '',
}

/**
 * ImageGallery - Responsive image grid with optional hover effects
 * Perfect for portfolio showcases and process documentation
 * 
 * @example
 * <ImageGallery
 *   images={projectImages}
 *   columns={3}
 *   hoverEffect="zoom"
 *   gap="lg"
 *   showCaptions
 * />
 */
export function ImageGallery({
  images,
  columns = 3,
  gap = 'md',
  hoverEffect = 'zoom',
  quality = 85,
  showCaptions = false,
  className = '',
  onImageClick,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <>
      <ScrollReveal trigger="slideUp" duration={0.8} className={className}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className={cn('grid w-full', columnClasses[columns], gapClasses[gap])}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative w-full h-0 pb-[100%] rounded-lg overflow-hidden bg-muted cursor-pointer"
              onClick={() => {
                setSelectedImage(index)
                onImageClick?.(index, image)
              }}
            >
              {/* Image */}
              <div
                className={cn(
                  'absolute inset-0 overflow-hidden rounded-lg transition-transform duration-500',
                  hoverEffect !== 'none' && hoverEffects[hoverEffect]
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={quality}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Overlay on hover */}
              {hoverEffect === 'overlay' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  className="absolute inset-0 bg-black rounded-lg"
                />
              )}

              {/* Caption */}
              {showCaptions && image.caption && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 rounded-lg"
                >
                  <Typography variant="caption" className="text-white">
                    {image.caption}
                  </Typography>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </ScrollReveal>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <ImageLightbox
          image={images[selectedImage]}
          index={selectedImage}
          total={images.length}
          onClose={() => setSelectedImage(null)}
          onNext={() => setSelectedImage((prev) => (prev! + 1) % images.length)}
          onPrev={() =>
            setSelectedImage((prev) => (prev! - 1 + images.length) % images.length)
          }
        />
      )}
    </>
  )
}

/**
 * ImageLightbox - Full-screen image viewer with navigation
 */
function ImageLightbox({
  image,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: {
  image: GalleryImage
  index: number
  total: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full max-w-5xl max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl"
          aria-label="Close"
        >
          ✕
        </motion.button>

        {/* Image */}
        <div className="relative flex-1 min-h-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            quality={95}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        {total > 1 && (
          <div className="flex items-center justify-between mt-6 text-white">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onPrev}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              ← Previous
            </motion.button>

            <Typography variant="caption" className="text-white">
              {index + 1} / {total}
            </Typography>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Next →
            </motion.button>
          </div>
        )}

        {/* Caption */}
        {image.caption && (
          <Typography variant="caption" className="text-white/70 text-center mt-4">
            {image.caption}
          </Typography>
        )}
      </motion.div>
    </motion.div>
  )
}

/**
 * MasonryGallery - Pinterest-style masonry layout
 * Useful for portfolio with varied image dimensions
 */
export function MasonryGallery({
  images,
  gap = 'md',
  quality = 85,
  showCaptions = false,
  className = '',
  onImageClick,
}: Omit<ImageGalleryProps, 'columns'>) {
  const [selectedImage, setSelectedImage] = React.useState<number | null>(null)

  // Sort images into columns for masonry effect
  const columns = 3
  const columnArrays: GalleryImage[][] = Array(columns)
    .fill(null)
    .map(() => [])

  images.forEach((image, idx) => {
    columnArrays[idx % columns].push(image)
  })

  return (
    <>
      <ScrollReveal trigger="slideUp" duration={0.8} className={className}>
        <div className={cn('flex gap-4 md:gap-6', gapClasses[gap])}>
          {columnArrays.map((column, colIdx) => (
            <div key={colIdx} className="flex-1 space-y-4 md:space-y-6">
              {column.map((image, imgIdx) => {
                const globalIndex =
                  images.indexOf(image) + colIdx * Math.ceil(images.length / columns)
                return (
                  <motion.div
                    key={`${colIdx}-${imgIdx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 0.5,
                      delay: (colIdx + imgIdx) * 0.05,
                    }}
                    className="group relative w-full h-64 rounded-lg overflow-hidden bg-muted cursor-pointer"
                    onClick={() => {
                      setSelectedImage(globalIndex)
                      onImageClick?.(globalIndex, image)
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="33vw"
                      quality={quality}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Lightbox */}
      {selectedImage !== null && (
        <ImageLightbox
          image={images[selectedImage]}
          index={selectedImage}
          total={images.length}
          onClose={() => setSelectedImage(null)}
          onNext={() => setSelectedImage((prev) => (prev! + 1) % images.length)}
          onPrev={() =>
            setSelectedImage((prev) => (prev! - 1 + images.length) % images.length)
          }
        />
      )}
    </>
  )
}
