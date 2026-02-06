import { GigaLayout } from '@/components/giga-layout'
import { GigaHero } from '@/components/giga-hero'
import { ServicesSection } from '@/components/services-section'
import { OceanQuote } from '@/components/ocean-quote'
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
        badge={{
          text: 'Where should we go next?',
          href: '#',
        }}
        ctaText="Let's Connect"
        ctaHref="#contact"
        logos={[]}
        useHoverEffect={true}
        hoverEffectText="THU TIDES"
      />
      <ServicesSection />
      <OceanQuote />

      {/* Underwater Gallery */}
      <CarouselGallery
        title="Underwater"
        description="Dive into the depths"
        itemsPerView={3}
        images={[
          {
            src: '/uw_buka_buka.webp',
            alt: 'Underwater at Buka Buka',
            title: 'Buka Buka',
          },
          {
            src: '/uw_malapascua.webp',
            alt: 'Underwater at Malapascua',
            title: 'Malapascua',
          },
          {
            src: '/uw_moalboal.webp',
            alt: 'Underwater at Moalboal',
            title: 'Moalboal',
          },
          {
            src: '/uw_dauin.webp',
            alt: 'Underwater at Dauin',
            title: 'Dauin',
          },
          {
            src: '/uw_jellyfish_mariona.webp',
            alt: 'Jellyfish at Mariona',
            title: 'Mariona Jellyfish',
          },
          {
            src: '/uw_napalin.webp',
            alt: 'Underwater at Napalin',
            title: 'Napalin',
          },
        ]}
      />

      {/* Aerial Gallery */}
      <CarouselGallery
        title="Aerial"
        description="Bird's eye view"
        itemsPerView={3}
        images={[
          {
            src: '/dji_aerial_beach_kalanggaman.webp',
            alt: 'Aerial view of Kalanggaman Beach',
            title: 'Kalanggaman Beach',
          },
          {
            src: '/DJI_arial_island_balicasa.webp',
            alt: 'Aerial view of Balicasa Island',
            title: 'Balicasa Island',
          },
          {
            src: '/DJI_arial_waterfall_casaroro.webp',
            alt: 'Aerial view of Casaroro Waterfall',
            title: 'Casaroro Waterfall',
          },
          {
            src: '/DJI_arial_waterfall_pasalan.webp',
            alt: 'Aerial view of Pasalan Waterfall',
            title: 'Pasalan Waterfall',
          },
          {
            src: '/dji_aerial_top_reef_atoll.webp',
            alt: 'Aerial view of top reef atoll',
            title: 'Top Reef Atoll',
          },
          {
            src: '/DJI_aerial_hero.webp',
            alt: 'Aerial coastal view',
            title: 'Coastal Tides',
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
