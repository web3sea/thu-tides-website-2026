import { GigaLayout } from '@/components/giga-layout'
import { GigaHero } from '@/components/giga-hero'

export default function Page() {
  return (
    <GigaLayout>
      <GigaHero
        backgroundImage="/DJI_aerial_hero.JPG"
        backgroundImageAlt="Aerial view of coastal tides"
        title="AI that talks like a human. Handles millions of calls."
        subtitle="AI agents for enterprise support"
        badge={{
          text: 'Where should we go next?',
          href: '#',
        }}
        ctaText="Talk to us"
        ctaHref="#contact"
      />
    </GigaLayout>
  )
}
