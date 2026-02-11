'use client'

import * as React from 'react'
import { H2, P } from '@/components/typography'
import { PortfolioItem } from '@/components/portfolio-item'
import { portfolioItems, propertyTypes as importedPropertyTypes } from '@/data/portfolio'

export function PortfolioSection(): React.JSX.Element {
  const [filter, setFilter] = React.useState<string>('Dive Resort')
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const animationRef = React.useRef<number | null>(null)
  const [scrollSpeed, setScrollSpeed] = React.useState(0)
  const [isTouchDevice, setIsTouchDevice] = React.useState(false)

  // Scroll zone thresholds and speeds
  const SCROLL_ZONE_LEFT = 0.3
  const SCROLL_ZONE_RIGHT = 0.7
  const MAX_SCROLL_SPEED = 2

  // Memoize filtered items to prevent unnecessary recalculation
  const filteredItems = React.useMemo(
    () => portfolioItems.filter(item => item.propertyType === filter),
    [filter]
  )

  // Detect touch device
  React.useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  // Handle mouse move for carousel scrolling (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current || isTouchDevice) return

    const rect = carouselRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const containerWidth = rect.width

    // Calculate position as percentage (0 to 1)
    const position = x / containerWidth

    // Define scroll zones: left 30%, center 40%, right 30%
    if (position < SCROLL_ZONE_LEFT) {
      // Scroll left - speed increases as mouse moves further left
      const intensity = (SCROLL_ZONE_LEFT - position) / SCROLL_ZONE_LEFT
      setScrollSpeed(-MAX_SCROLL_SPEED * intensity)
    } else if (position > SCROLL_ZONE_RIGHT) {
      // Scroll right - speed increases as mouse moves further right
      const intensity = (position - SCROLL_ZONE_RIGHT) / (1 - SCROLL_ZONE_RIGHT)
      setScrollSpeed(MAX_SCROLL_SPEED * intensity)
    } else {
      // Center zone - no scrolling
      setScrollSpeed(0)
    }
  }

  const handleMouseLeave = () => {
    setScrollSpeed(0)
  }

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return

    const scrollAmount = 400 // Width of one portfolio item

    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Animate scrolling based on speed (desktop only)
  React.useEffect(() => {
    if (isTouchDevice) return

    const animate = () => {
      if (carouselRef.current && scrollSpeed !== 0) {
        carouselRef.current.scrollLeft += scrollSpeed
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [scrollSpeed, isTouchDevice])

  return (
    <section className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <H2 className="text-gray-900 mb-4">
            Portfolio Showcase
          </H2>
          <P className="text-xl text-gray-600 font-light mb-8 max-w-3xl mx-auto">
            Explore our work across dive resorts, boutique hotels, homestays, and liveaboards throughout Indonesia and the Philippines
          </P>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {importedPropertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === type
                    ? 'bg-brand-cerulean text-white shadow-lg shadow-brand-cerulean/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Portfolio carousel - use arrow keys to navigate"
          tabIndex={0}
        >
          {/* Gradient Overlays for visual effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none" />

          {/* Scrollable Carousel */}
          <div
            ref={carouselRef}
            className={`overflow-y-visible scrollbar-hide py-4 ${
              isTouchDevice ? 'overflow-x-auto' : 'overflow-x-hidden'
            }`}
            style={{
              scrollBehavior: isTouchDevice ? 'smooth' : 'auto',
              cursor: !isTouchDevice && scrollSpeed !== 0 ? (scrollSpeed < 0 ? 'w-resize' : 'e-resize') : 'default',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex gap-6 px-8">
              {filteredItems.map((item) => (
                <PortfolioItem key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <P className="text-gray-500 font-light">
              No projects found for this property type.
            </P>
          </div>
        )}
      </div>
    </section>
  )
}
