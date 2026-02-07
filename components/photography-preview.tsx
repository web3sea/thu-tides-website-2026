'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { H2, P } from '@/components/typography'
import { featuredPhotos } from '@/data/photography'
import { cn } from '@/lib/utils'

/**
 * PhotographyPreview - Condensed photography showcase for homepage
 * Shows featured images from each category with CTA to full photography page
 */
export function PhotographyPreview() {
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
    <section className="relative section-padding bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <H2 className="text-white mb-4">Our Photography</H2>
          <P className="text-xl text-white/80 font-light mb-8 max-w-3xl mx-auto">
            From underwater depths to aerial perspectives, explore our portfolio
            of coastal hospitality and island adventure photography
          </P>
        </div>

        {/* Featured Images Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {featuredPhotos.map((photo, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={photo.href}
                className="group relative block overflow-hidden rounded-lg bg-gray-900 aspect-[4/3] cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold mb-1">{photo.title}</h3>
                    <p className="text-sm text-gray-200 font-light">
                      View Collection →
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/photography"
            className={cn(
              'inline-block px-8 py-4 rounded-full text-base font-semibold transition-all duration-200',
              'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105',
              'shadow-lg hover:shadow-xl'
            )}
          >
            Explore All Albums
          </Link>
        </div>
      </div>
    </section>
  )
}
