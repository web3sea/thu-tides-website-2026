'use client'

import * as React from 'react'
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
        const hash = window.location.hash.slice(1) // remove #
        if (hash) {
          setActiveFilter(hash)
        }
      }

      // Set initial filter from hash
      handleHashChange()

      // Listen for hash changes
      window.addEventListener('hashchange', handleHashChange)

      return () => {
        window.removeEventListener('hashchange', handleHashChange)
      }
    }
  }, [])

  // Get filtered categories
  const getFilteredCategories = () => {
    // If filter is 'topside', show multiple categories
    if (activeFilter === 'topside') {
      return photoCategories.filter((cat) =>
        ['dive', 'landscape', 'wildlife', 'properties'].includes(cat.slug)
      )
    }
    // Otherwise show single matching category
    return photoCategories.filter((cat) => cat.slug === activeFilter)
  }

  const filteredCategories = getFilteredCategories()

  return (
    <GigaLayout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/DJI_aerial_hero.webp')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center px-6 py-20">
          <H1 className="text-white mb-6 text-5xl md:text-6xl lg:text-7xl">
            Our Photography
          </H1>
          <P className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto">
            Capturing the beauty of coastal hospitality, underwater worlds, and
            island adventures across Indonesia and the Philippines
          </P>
        </div>
      </section>

      {/* Filter Navigation */}
      <div className="backdrop-blur-xl bg-slate-800/90 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {filterCategories.map((filter) => (
              <button
                key={filter.slug}
                onClick={() => {
                  setActiveFilter(filter.slug)
                  // Update URL hash without scrolling
                  window.history.pushState(null, '', `#${filter.slug}`)
                }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.slug
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white/90 hover:bg-white/20 hover:scale-105'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Sections */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <PhotoCategorySection key={category.id} category={category} />
          ))
        ) : (
          <div className="text-center py-20">
            <P className="text-white/60 font-light">
              No photos found for this category.
            </P>
          </div>
        )}
      </div>
    </GigaLayout>
  )
}
