'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GigaLayout } from '@/components/giga-layout'
import { PhotoCategorySection } from '@/components/photo-category-section'
import { photoCategories } from '@/data/photography'
import { H1, P } from '@/components/typography'

const filterCategories = [
  { slug: 'underwater', label: 'Underwater' },
  { slug: 'aerials', label: 'Aerial' },
  { slug: 'dive', label: 'Dive' },
  { slug: 'properties', label: 'Properties' },
  { slug: 'landscape', label: 'Landscape' },
  { slug: 'wildlife', label: 'Wildlife' },
]

export default function PhotographyPage() {
  const [activeFilter, setActiveFilter] = React.useState<string>('underwater')

  // Handle hash navigation from URL
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleHashChange = () => {
        const hash = window.location.hash.slice(1)
        if (hash) setActiveFilter(hash)
      }

      handleHashChange()
      window.addEventListener('hashchange', handleHashChange)
      return () => window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleFilterChange = (slug: string) => {
    setActiveFilter(slug)
    window.history.pushState(null, '', `#${slug}`)
  }

  // Arrow key navigation between tabs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      handleFilterChange(filterCategories[(index + 1) % filterCategories.length].slug)
    } else if (e.key === 'ArrowLeft') {
      handleFilterChange(filterCategories[(index - 1 + filterCategories.length) % filterCategories.length].slug)
    }
  }

  const getFilteredCategories = () => {
    if (activeFilter === 'topside') {
      return photoCategories.filter((cat) =>
        ['dive', 'landscape', 'wildlife', 'properties'].includes(cat.slug)
      )
    }
    return photoCategories.filter((cat) => cat.slug === activeFilter)
  }

  const filteredCategories = getFilteredCategories()

  return (
    <GigaLayout>
      {/* Hero Section */}
      <section
        aria-label="Photography hero"
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[url('/DJI_aerial_hero.webp')] bg-cover bg-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900"
        />
        <div className="relative z-10 text-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <H1 className="text-white mb-6 text-5xl md:text-6xl lg:text-7xl">
              Our Photography
            </H1>
            <P className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto">
              Capturing the beauty of coastal hospitality, underwater worlds, and
              island adventures across Indonesia and the Philippines
            </P>
          </motion.div>
        </div>
      </section>

      {/* Filter Navigation — sticky tab bar */}
      <div
        role="tablist"
        aria-label="Photography categories"
        className="sticky top-0 z-30 backdrop-blur-xl bg-slate-900/90 border-b border-white/10 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap justify-center gap-2">
            {filterCategories.map((filter, index) => (
              <button
                key={filter.slug}
                role="tab"
                id={`tab-${filter.slug}`}
                aria-selected={activeFilter === filter.slug}
                aria-controls={`tabpanel-${filter.slug}`}
                tabIndex={activeFilter === filter.slug ? 0 : -1}
                onClick={() => handleFilterChange(filter.slug)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                  activeFilter === filter.slug
                    ? 'bg-brand-cerulean text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white hover:scale-105'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Sections */}
      <div
        id={`tabpanel-${activeFilter}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeFilter}`}
        className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-[50vh]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <PhotoCategorySection key={category.id} category={category} />
              ))
            ) : (
              <div className="flex items-center justify-center py-32">
                <P className="text-white/40 font-light">
                  No photos found for this category.
                </P>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </GigaLayout>
  )
}
