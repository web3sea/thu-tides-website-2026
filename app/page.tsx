import { GigaLayout } from '@/components/giga-layout'
import { GigaHero } from '@/components/giga-hero'
import { ServicesSection } from '@/components/services-section'
import { OceanQuote } from '@/components/ocean-quote'
import { CarouselGallery } from '@/components/carousel-gallery'
import { PortfolioSection } from '@/components/portfolio-section'
import { AboutSection } from '@/components/about-section'
import { VideoLoopSection } from '@/components/video-loop-section'
import { CollabSection } from '@/components/collab-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creative collaboration for coastal hospitality brands',
  description: 'Dive into stunning underwater and aerial photography from the Philippines. Explore Buka Buka, Pulau Papan, Mariona, and hidden coral reefs through immersive coastal imagery.',
  keywords: ['Philippines islands', 'Buka Buka', 'Pulau Papan', 'underwater photography Philippines', 'coral reef photography', 'travel photography', 'aerial photography Philippines'],
  openGraph: {
    title: 'Thu Tides - My Island Life',
    description: 'Expeditions in shades of blue. Explore stunning underwater and aerial photography from the Philippines.',
    images: [
      {
        url: '/DJI_aerial_hero.webp',
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
    images: ['/DJI_aerial_hero.webp'],
  },
}

export default function Page() {
  return (
    <GigaLayout>
      <GigaHero
        backgroundImage="/DJI_aerial_hero.webp"
        backgroundImageAlt="Aerial view of coastal tides"
        title="Creative collaboration for coastal hospitality brands."
        subtitle="Expeditions in shades of blue."
        badge={{
          text: 'Where should we go next?',
          href: '#',
        }}
        ctaText="Let's Connect"
        ctaHref="#contact"
        logos={[]}
      />
      <ServicesSection />
      <OceanQuote />
      <CarouselGallery
        title="Gallery"
        description="Explore our collection of coastal adventures"
        itemsPerView={3}
        images={[
          {
            src: '/uw_pulau_papan.webp',
            alt: 'Underwater view of Pulau Papan',
            title: 'Pulau Papan',
          },
          {
            src: '/uw_mariona.webp',
            alt: 'Underwater exploration at Mariona',
            title: 'Mariona Depths',
          },
          {
            src: '/reconnect_buka_buka.webp',
            alt: 'Reconnect at Buka Buka',
            title: 'Buka Buka',
          },
          {
            src: '/dji_aerial_top_reef_atoll.webp',
            alt: 'Aerial view of top reef atoll',
            title: 'Top Reef Atoll',
          },
          {
            src: '/uw_top_reef_atoll.webp',
            alt: 'Underwater view of top reef atoll',
            title: 'Atoll Underwater',
          },
          {
            src: '/sunset6_reconnect_buka_buka.webp',
            alt: 'Sunset at Buka Buka',
            title: 'Buka Buka Sunset',
          },
        ]}
      />
      <PortfolioSection />
      <AboutSection />
      <VideoLoopSection />
      <CollabSection />
    </GigaLayout>
  )
}
