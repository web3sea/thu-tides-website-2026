import { GigaLayout } from '@/components/giga-layout'
import { GigaHero } from '@/components/giga-hero'
import { ServicesSection } from '@/components/services-section'
import { OceanQuote } from '@/components/ocean-quote'
import { PortfolioSection } from '@/components/portfolio-section'
import { AboutSection } from '@/components/about-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { VideoLoopSection } from '@/components/video-loop-section'
import { CollabSection } from '@/components/collab-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Professional travel and underwater photography for coastal hotels, dive resorts, and liveaboards across Indonesia and the Philippines. View our portfolio of underwater, aerial, and hospitality photography.',
  keywords: ['travel photography', 'underwater photography Indonesia', 'hotel photography', 'dive resort photography', 'aerial photography', 'coastal hospitality', 'Indonesia travel photography', 'Philippines photography'],
  openGraph: {
    title: 'Thu Tides - Professional Travel & Underwater Photography',
    description: 'Professional photography and video content for coastal hotels, dive resorts, and liveaboards across Indonesia and the Philippines.',
    images: [
      {
        url: '/DJI_aerial_hero.webp',
        width: 1200,
        height: 630,
        alt: 'Aerial coastal photography by Thu Tides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thu Tides - Professional Travel & Underwater Photography',
    description: 'Professional photography and video content for coastal hotels and resorts.',
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
        logos={[]}
        useHoverEffect={true}
        hoverEffectText="THU TIDES"
      />
      <ServicesSection />
      <OceanQuote />
      <PortfolioSection />
      <AboutSection />
      <TestimonialsSection />
      <VideoLoopSection />
      <CollabSection />
    </GigaLayout>
  )
}
