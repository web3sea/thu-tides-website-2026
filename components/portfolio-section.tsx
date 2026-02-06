'use client'

import * as React from 'react'
import Image from 'next/image'

type PortfolioItem = {
  id: string
  title: string
  description: string
  propertyType: string
  location: string
  image: string
  featured: boolean
}

// Placeholder portfolio data - will be replaced with actual content
const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Buka Buka Resort',
    description: 'Intimate island resort photography and aerial content',
    propertyType: 'Dive Resort',
    location: 'Philippines',
    image: '/reconnect_buka_buka.webp',
    featured: true,
  },
  {
    id: '2',
    title: 'Pulau Papan',
    description: 'Underwater and coastal photography for boutique diving destination',
    propertyType: 'Dive Resort',
    location: 'Philippines',
    image: '/uw_pulau_papan.webp',
    featured: true,
  },
  {
    id: '3',
    title: 'Mariona Depths',
    description: 'Underwater photography showcasing vibrant marine life',
    propertyType: 'Liveaboard',
    location: 'Philippines',
    image: '/uw_mariona.webp',
    featured: false,
  },
  {
    id: '4',
    title: 'Top Reef Atoll',
    description: 'Aerial and underwater content for remote island destination',
    propertyType: 'Boutique Hotel',
    location: 'Philippines',
    image: '/dji_aerial_top_reef_atoll.webp',
    featured: false,
  },
]

export function PortfolioSection() {
  const [filter, setFilter] = React.useState<string>('All')
  const propertyTypes = ['All', 'Boutique Hotel', 'Homestay', 'Dive Resort', 'Liveaboard']

  const filteredItems = filter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.propertyType === filter)

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Our Work
          </h2>
          <p className="text-xl text-gray-600 font-light mb-8">
            Portfolio showcase
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg bg-gray-900 aspect-[4/3] cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-sm mb-2 opacity-90">
                    <span className="material-symbols-outlined text-base">
                      location_on
                    </span>
                    <span>{item.location}</span>
                    <span className="mx-2">•</span>
                    <span>{item.propertyType}</span>
                  </div>
                  <h3 className="text-2xl font-light mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200 font-light">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 font-light">
              No projects found for this property type.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
