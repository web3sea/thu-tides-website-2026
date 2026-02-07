'use client'

import * as React from 'react'
import { PhotoCategory } from '@/data/photography'
import { ImageGallery, MasonryGallery } from '@/components/image-gallery'
import { CarouselGallery } from '@/components/carousel-gallery'
import { H2, P } from '@/components/typography'

interface PhotoCategorySectionProps {
  category: PhotoCategory
  className?: string
}

/**
 * PhotoCategorySection - Renders the appropriate gallery component based on category configuration
 * Supports masonry, grid, and carousel layouts
 */
export function PhotoCategorySection({
  category,
  className = '',
}: PhotoCategorySectionProps) {
  const { title, description, displayComponent, images, galleryConfig } = category

  return (
    <section className={`relative section-padding ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <H2 className="text-white mb-4">{title}</H2>
          <P className="text-xl text-white/80 font-light">{description}</P>
        </div>

        {/* Gallery Display */}
        {displayComponent === 'masonry' && (
          <MasonryGallery
            images={images}
            gap="md"
            onImageClick={(index) => {
              // Lightbox is handled by MasonryGallery internally
            }}
          />
        )}

        {displayComponent === 'grid' && (
          <ImageGallery
            images={images}
            columns={galleryConfig?.columns || 3}
            gap="md"
            hoverEffect={galleryConfig?.hoverEffect || 'zoom'}
            onImageClick={(index) => {
              // Lightbox is handled by ImageGallery internally
            }}
          />
        )}

        {displayComponent === 'carousel' && (
          <CarouselGallery
            images={images.map((img) => ({
              src: img.src,
              alt: img.alt,
              title: img.title,
            }))}
            itemsPerView={galleryConfig?.itemsPerView || 3}
          />
        )}
      </div>
    </section>
  )
}
