'use client'

import * as React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

export interface CarouselImage {
  src: string
  alt: string
  title?: string
}

export interface CarouselGalleryProps {
  images: CarouselImage[]
  className?: string
  title?: string
  description?: string
  autoplay?: boolean
  itemsPerView?: 1 | 2 | 3
}

/**
 * CarouselGallery - Full-width carousel gallery component
 * Displays a collection of images in a responsive carousel
 *
 * @example
 * <CarouselGallery
 *   title="Gallery"
 *   images={[
 *     { src: '/image1.jpg', alt: 'Image 1' },
 *     { src: '/image2.jpg', alt: 'Image 2' },
 *   ]}
 *   itemsPerView={3}
 * />
 */
export function CarouselGallery({
  images,
  className,
  title,
  description,
  itemsPerView = 3,
}: CarouselGalleryProps) {
  const basisClasses = {
    1: 'md:basis-full',
    2: 'md:basis-1/2',
    3: 'md:basis-1/2 lg:basis-1/3',
  }

  return (
    <section className={cn('w-full bg-slate-900 py-16 md:py-24', className)}>
      <div className="container mx-auto px-4">
        {(title || description) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-slate-400 md:text-xl">
                {description}
              </p>
            )}
          </div>
        )}

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className={cn('pl-2 md:pl-4', basisClasses[itemsPerView])}
              >
                <Card className="overflow-hidden border-slate-800 bg-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {image.title && (
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white">
                          {image.title}
                        </h3>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 border-slate-700 bg-slate-800/90 text-white hover:bg-slate-700 hover:text-white" />
          <CarouselNext className="right-4 border-slate-700 bg-slate-800/90 text-white hover:bg-slate-700 hover:text-white" />
        </Carousel>
      </div>
    </section>
  )
}
