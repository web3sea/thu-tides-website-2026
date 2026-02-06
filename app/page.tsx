import { GigaLayout } from '@/components/giga-layout'
import { GigaHero } from '@/components/giga-hero'
import { ServicesSection } from '@/components/services-section'
import { OceanQuote } from '@/components/ocean-quote'
import { PortfolioSection } from '@/components/portfolio-section'
import { AboutSection } from '@/components/about-section'
import { VideoLoopSection } from '@/components/video-loop-section'
import { CollabSection } from '@/components/collab-section'
import { CarouselGallery } from '@/components/carousel-gallery'
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

      {/* Dive Photography Gallery */}
      <CarouselGallery
        title="Dive Photography"
        description="Exploring marine life"
        itemsPerView={3}
        images={[
          {
            src: '/dive 8.webp',
            alt: 'Dive scene',
            title: 'Dive Adventure 1',
          },
          {
            src: '/dive 9.webp',
            alt: 'Dive scene',
            title: 'Dive Adventure 2',
          },
          {
            src: '/uw_mariona.webp',
            alt: 'Underwater at Mariona',
            title: 'Mariona',
          },
          {
            src: '/uw_pulau_papan.webp',
            alt: 'Underwater at Pulau Papan',
            title: 'Pulau Papan',
          },
          {
            src: '/uw_top_reef_atoll.webp',
            alt: 'Underwater at Top Reef Atoll',
            title: 'Top Reef Atoll',
          },
          {
            src: '/common 19.webp',
            alt: 'Common dive scene',
            title: 'Marine Life',
          },
        ]}
      />

      {/* Properties & Accommodation Gallery */}
      <CarouselGallery
        title="Properties"
        description="Coastal hospitality spaces"
        itemsPerView={3}
        images={[
          {
            src: '/reconnect_buka_buka.webp',
            alt: 'Reconnect at Buka Buka',
            title: 'Buka Buka Resort',
          },
          {
            src: '/villa_bath_reconnect_buka_buka.webp',
            alt: 'Villa bathroom at Buka Buka',
            title: 'Villa Bath',
          },
          {
            src: '/AC 2.webp',
            alt: 'Accommodation view',
            title: 'Coastal Room',
          },
          {
            src: '/AC 5.webp',
            alt: 'Accommodation view',
            title: 'Ocean View',
          },
          {
            src: '/Athena 10.webp',
            alt: 'Athena property',
            title: 'Athena',
          },
          {
            src: '/Coco 8.webp',
            alt: 'Coco property',
            title: 'Coco',
          },
        ]}
      />

      {/* Sunset & Landscape Gallery */}
      <CarouselGallery
        title="Sunset & Landscape"
        description="Golden hour moments"
        itemsPerView={3}
        images={[
          {
            src: '/Sunrise 2.webp',
            alt: 'Sunrise view',
            title: 'Dawn',
          },
          {
            src: '/sunset6_reconnect_buka_buka.webp',
            alt: 'Sunset at Buka Buka',
            title: 'Buka Buka Sunset',
          },
          {
            src: '/DSC00012.webp',
            alt: 'Landscape view',
            title: 'Coastal Scene',
          },
          {
            src: '/DSC00057.webp',
            alt: 'Landscape view',
            title: 'Island Vista',
          },
          {
            src: '/DSC00090.webp',
            alt: 'Landscape view',
            title: 'Beach Panorama',
          },
          {
            src: '/DSC00366.webp',
            alt: 'Landscape view',
            title: 'Tropical Paradise',
          },
        ]}
      />

      {/* Wildlife & Nature Gallery */}
      <CarouselGallery
        title="Wildlife & Nature"
        description="Natural wonders"
        itemsPerView={3}
        images={[
          {
            src: '/tarsier_bohol.webp',
            alt: 'Tarsier in Bohol',
            title: 'Tarsier',
          },
          {
            src: '/LUS03355-2.webp',
            alt: 'Nature scene',
            title: 'Natural Beauty',
          },
          {
            src: '/DJI_20251117042317_0009_D.webp',
            alt: 'Aerial nature view',
            title: 'From Above',
          },
          {
            src: '/uw_jellyfish_mariona.webp',
            alt: 'Jellyfish at Mariona',
            title: 'Jellyfish',
          },
          {
            src: '/uw_buka_buka.webp',
            alt: 'Marine life at Buka Buka',
            title: 'Marine Ecosystem',
          },
          {
            src: '/common 19.webp',
            alt: 'Wildlife scene',
            title: 'Biodiversity',
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
