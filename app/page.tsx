import { GigaLayout } from '@/components/giga-layout'
import { GigaHero } from '@/components/giga-hero'
import { CarouselGallery } from '@/components/carousel-gallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Island Photography & Coastal Adventures',
  description: 'Dive into stunning underwater and aerial photography from the Philippines. Explore Buka Buka, Pulau Papan, Mariona, and hidden coral reefs through immersive coastal imagery.',
  keywords: ['Philippines islands', 'Buka Buka', 'Pulau Papan', 'underwater photography Philippines', 'coral reef photography', 'travel photography', 'aerial photography Philippines'],
  openGraph: {
    title: 'Thu Tides - My Island Life',
    description: 'Expeditions in shades of blue. Explore stunning underwater and aerial photography from the Philippines.',
    images: [
      {
        url: '/DJI_aerial_hero.JPG',
        width: 1200,
        height: 630,
        alt: 'Aerial view of Philippine coastal islands and reefs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thu Tides - My Island Life',
    description: 'Expeditions in shades of blue.',
    images: ['/DJI_aerial_hero.JPG'],
  },
}

export default function Page() {
  return (
    <GigaLayout>
      <GigaHero
        backgroundImage="/DJI_aerial_hero.JPG"
        backgroundImageAlt="Aerial view of coastal tides"
        title="Island Photography & Coastal Adventures."
        subtitle="Expeditions in shades of blue."
        badge={{
          text: 'Where should we go next?',
          href: '#',
        }}
        ctaText="Let's Connect"
        ctaHref="#contact"
        logos={[]}
      />
      <CarouselGallery
        title="Gallery"
        description="Explore our collection of coastal adventures"
        itemsPerView={3}
        images={[
          {
            src: '/uw_pulau_papan.jpg',
            alt: 'Underwater view of Pulau Papan',
            title: 'Pulau Papan',
          },
          {
            src: '/uw_mariona.jpg',
            alt: 'Underwater exploration at Mariona',
            title: 'Mariona Depths',
          },
          {
            src: '/reconnect_buka_buka.jpg',
            alt: 'Reconnect at Buka Buka',
            title: 'Buka Buka',
          },
          {
            src: '/dji_aerial_top_reef_atoll.JPG',
            alt: 'Aerial view of top reef atoll',
            title: 'Top Reef Atoll',
          },
          {
            src: '/uw_top_reef_atoll.jpg',
            alt: 'Underwater view of top reef atoll',
            title: 'Atoll Underwater',
          },
          {
            src: '/sunset6_reconnect_buka_buka.jpg',
            alt: 'Sunset at Buka Buka',
            title: 'Buka Buka Sunset',
          },
        ]}
      />
    </GigaLayout>
  )
}
