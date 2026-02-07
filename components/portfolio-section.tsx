'use client'

import * as React from 'react'
import Image from 'next/image'
import { H2, H3, P } from '@/components/typography'

type PortfolioItem = {
  id: string
  title: string
  description: string
  propertyType: string
  location: string
  image: string
  featured: boolean
}

// Portfolio data organized by location and type
const portfolioItems: PortfolioItem[] = [
  // Buka Buka / Reconnect Resort
  {
    id: '1',
    title: 'Reconnect Buka Buka',
    description: 'Intimate island resort photography',
    propertyType: 'Dive Resort',
    location: 'Togean, Sulawesi',
    image: '/reconnect_buka_buka.webp',
    featured: true,
  },
  {
    id: '2',
    title: 'Buka Buka Sunset',
    description: 'Golden hour at Reconnect resort',
    propertyType: 'Dive Resort',
    location: 'Togean, Sulawesi',
    image: '/villa_sunset_reconnect_buka_buka.webp',
    featured: true,
  },
  {
    id: '3',
    title: 'Villa Bath - Reconnect',
    description: 'Luxury accommodation details',
    propertyType: 'Dive Resort',
    location: 'Togean, Sulawesi',
    image: '/villa_bath_reconnect_buka_buka.webp',
    featured: false,
  },
  {
    id: '4',
    title: 'Buka Buka Underwater',
    description: 'Vibrant marine life at Buka Buka',
    propertyType: 'Dive Resort',
    location: 'Togean, Sulawesi',
    image: '/uw_buka_buka.webp',
    featured: false,
  },
  // Aerial Photography
  {
    id: '5',
    title: 'Kalanggaman Beach',
    description: 'Stunning aerial view of pristine beach',
    propertyType: 'Boutique Hotel',
    location: 'Philippines',
    image: '/dji_aerial_beach_kalanggaman.webp',
    featured: true,
  },
  {
    id: '6',
    title: 'Balicasag Island',
    description: 'Aerial perspective of island paradise',
    propertyType: 'Dive Resort',
    location: 'Bohol, Philippines',
    image: '/DJI_arial_island_balicasa.webp',
    featured: false,
  },
  {
    id: '7',
    title: 'Casaroro Waterfall',
    description: 'Aerial view of mountain waterfall',
    propertyType: 'Homestay',
    location: 'Negros, Philippines',
    image: '/DJI_arial_waterfall_casaroro.webp',
    featured: false,
  },
  {
    id: '8',
    title: 'Pasalan Waterfall',
    description: 'Hidden waterfall from above',
    propertyType: 'Homestay',
    location: 'Philippines',
    image: '/DJI_arial_waterfall_pasalan.webp',
    featured: false,
  },
  {
    id: '9',
    title: 'Top Reef Atoll',
    description: 'Aerial view of coral reef atoll',
    propertyType: 'Liveaboard',
    location: 'Philippines',
    image: '/dji_aerial_top_reef_atoll.webp',
    featured: false,
  },
  // Underwater Photography
  {
    id: '10',
    title: 'Pulau Papan Underwater',
    description: 'Underwater coral gardens',
    propertyType: 'Dive Resort',
    location: 'Philippines',
    image: '/uw_pulau_papan.webp',
    featured: true,
  },
  {
    id: '11',
    title: 'Mariona Depths',
    description: 'Deep water marine photography',
    propertyType: 'Liveaboard',
    location: 'Philippines',
    image: '/uw_mariona.webp',
    featured: false,
  },
  {
    id: '12',
    title: 'Jellyfish - Mariona',
    description: 'Ethereal jellyfish photography',
    propertyType: 'Liveaboard',
    location: 'Philippines',
    image: '/uw_jellyfish_mariona.webp',
    featured: false,
  },
  {
    id: '13',
    title: 'Malapascua Diving',
    description: 'Underwater life at Malapascua',
    propertyType: 'Dive Resort',
    location: 'Malapascua, Philippines',
    image: '/uw_malapascua.webp',
    featured: false,
  },
  {
    id: '14',
    title: 'Moalboal Marine Life',
    description: 'Sardine run and coral gardens',
    propertyType: 'Dive Resort',
    location: 'Moalboal, Philippines',
    image: '/uw_moalboal.webp',
    featured: false,
  },
  {
    id: '15',
    title: 'Dauin Muck Diving',
    description: 'Macro underwater photography',
    propertyType: 'Dive Resort',
    location: 'Dauin, Philippines',
    image: '/uw_dauin.webp',
    featured: false,
  },
  {
    id: '16',
    title: 'Napalin Underwater',
    description: 'Crystal clear waters and marine life',
    propertyType: 'Dive Resort',
    location: 'Philippines',
    image: '/uw_napalin.webp',
    featured: false,
  },
  {
    id: '17',
    title: 'Top Reef Underwater',
    description: 'Healthy coral reef ecosystem',
    propertyType: 'Liveaboard',
    location: 'Philippines',
    image: '/uw_top_reef_atoll.webp',
    featured: false,
  },
  {
    id: '18',
    title: 'Dive Experience',
    description: 'Capturing the diving adventure',
    propertyType: 'Dive Resort',
    location: 'Philippines',
    image: '/dive_shop_reconnect.webp',
    featured: false,
  },
  {
    id: '19',
    title: 'Diving Moments',
    description: 'Professional dive photography',
    propertyType: 'Dive Resort',
    location: 'Philippines',
    image: '/dive_tanks_reconnect.webp',
    featured: false,
  },
  // Wildlife & Nature
  {
    id: '20',
    title: 'Tarsier - Bohol',
    description: 'World\'s smallest primate in natural habitat',
    propertyType: 'Homestay',
    location: 'Bohol, Philippines',
    image: '/tarsier_bohol.webp',
    featured: false,
  },
  {
    id: '21',
    title: 'Golden Sunrise',
    description: 'Breathtaking sunrise over the islands',
    propertyType: 'Boutique Hotel',
    location: 'Philippines',
    image: '/villa_sunrise_reconnect.webp',
    featured: false,
  },
  {
    id: '22',
    title: 'Island Common Area',
    description: 'Shared spaces and community vibes',
    propertyType: 'Homestay',
    location: 'Philippines',
    image: '/pier_reconnect.webp',
    featured: false,
  },
  // Portrait & Lifestyle
  {
    id: '23',
    title: 'Island Lifestyle',
    description: 'Authentic coastal living moments',
    propertyType: 'Boutique Hotel',
    location: 'Philippines',
    image: '/villa_reconnect.webp',
    featured: false,
  },
  {
    id: '24',
    title: 'Coastal Relaxation',
    description: 'Guest experience photography',
    propertyType: 'Boutique Hotel',
    location: 'Philippines',
    image: '/villa_sign_reconnect.webp',
    featured: false,
  },
  {
    id: '25',
    title: 'Beach Moments',
    description: 'Capturing the island experience',
    propertyType: 'Boutique Hotel',
    location: 'Philippines',
    image: '/villa_athena_reconnect.webp',
    featured: false,
  },
  {
    id: '26',
    title: 'Coastal Living',
    description: 'Lifestyle photography for hospitality',
    propertyType: 'Homestay',
    location: 'Philippines',
    image: '/villa_coco_reconnect.webp',
    featured: false,
  },
  // Additional Photography
  {
    id: '27',
    title: 'Property Details',
    description: 'Architectural and detail photography',
    propertyType: 'Boutique Hotel',
    location: 'Philippines',
    image: '/uw_seafan.webp',
    featured: false,
  },
  {
    id: '28',
    title: 'Resort Atmosphere',
    description: 'Capturing the ambiance',
    propertyType: 'Dive Resort',
    location: 'Philippines',
    image: '/uw_turtle.webp',
    featured: false,
  },
  {
    id: '29',
    title: 'Coastal Views',
    description: 'Scenic coastal photography',
    propertyType: 'Boutique Hotel',
    location: 'Philippines',
    image: '/uw_wall.webp',
    featured: false,
  },
  {
    id: '30',
    title: 'Island Scenes',
    description: 'Documenting island life',
    propertyType: 'Homestay',
    location: 'Philippines',
    image: '/DSC00366.webp',
    featured: false,
  },
  {
    id: '31',
    title: 'Professional Composition',
    description: 'High-quality property photography',
    propertyType: 'Boutique Hotel',
    location: 'Philippines',
    image: '/LUS03355-2.webp',
    featured: false,
  },
]

export function PortfolioSection() {
  const [filter, setFilter] = React.useState<string>('Dive Resort')
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const animationRef = React.useRef<number | null>(null)
  const [scrollSpeed, setScrollSpeed] = React.useState(0)

  const propertyTypes = ['Dive Resort', 'Boutique Hotel', 'Homestay', 'Liveaboard']
  const filteredItems = portfolioItems.filter(item => item.propertyType === filter)

  // Handle mouse move for carousel scrolling
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return

    const rect = carouselRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const containerWidth = rect.width

    // Calculate position as percentage (0 to 1)
    const position = x / containerWidth

    // Define scroll zones: left 30%, center 40%, right 30%
    if (position < 0.3) {
      // Scroll left - speed increases as mouse moves further left
      const intensity = (0.3 - position) / 0.3
      setScrollSpeed(-2 * intensity)
    } else if (position > 0.7) {
      // Scroll right - speed increases as mouse moves further right
      const intensity = (position - 0.7) / 0.3
      setScrollSpeed(2 * intensity)
    } else {
      // Center zone - no scrolling
      setScrollSpeed(0)
    }
  }

  const handleMouseLeave = () => {
    setScrollSpeed(0)
  }

  // Animate scrolling based on speed
  React.useEffect(() => {
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
  }, [scrollSpeed])

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
            {propertyTypes.map((type) => (
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
        >
          {/* Gradient Overlays for visual effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none" />

          {/* Scrollable Carousel */}
          <div
            ref={carouselRef}
            className="overflow-x-hidden overflow-y-visible scrollbar-hide py-4"
            style={{
              scrollBehavior: 'auto',
              cursor: scrollSpeed !== 0 ? (scrollSpeed < 0 ? 'w-resize' : 'e-resize') : 'default'
            }}
          >
            <div className="flex gap-6 px-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex-shrink-0 w-[400px] h-[300px] overflow-hidden rounded-lg bg-gray-900 cursor-pointer hover:scale-105 transition-transform duration-500"
                >
                  {/* Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 text-sm mb-2 opacity-90">
                        <span className="material-symbols-outlined text-base">
                          location_on
                        </span>
                        <span>{item.location}</span>
                        <span className="mx-2">•</span>
                        <span>{item.propertyType}</span>
                      </div>
                      <H3 className="mb-2 text-white">{item.title}</H3>
                      <P className="text-sm text-gray-200 font-light">
                        {item.description}
                      </P>
                    </div>
                  </div>
                </div>
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
