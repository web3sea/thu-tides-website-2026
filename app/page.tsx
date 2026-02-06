import { GigaLayout } from '@/components/giga-layout'
import { GigaHero } from '@/components/giga-hero'

export default function Page() {
  return (
    <GigaLayout>
      <GigaHero
        backgroundImage="/DJI_aerial_hero.JPG"
        backgroundImageAlt="Aerial view of coastal tides"
        title="My Island Life."
        subtitle="Expeditions in shades of blue."
        badge={{
          text: 'Where should we go next?',
          href: '#',
        }}
        ctaText="Let's Connect"
        ctaHref="#contact"
        logos={[]}
      />
    </GigaLayout>
  )
}
