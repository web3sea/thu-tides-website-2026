import { Navigation } from '@/components/navigation'
import { GigaHero } from '@/components/giga-hero'

export default function GigaPage() {
  return (
    <div className="w-full min-h-screen bg-slate-900">
      <Navigation />
      <GigaHero
        title="AI that talks like a human. Handles millions of calls."
        subtitle="AI agents for enterprise support"
        badge={{
          text: 'Giga Launches Browser Agent',
          href: '#',
        }}
        ctaText="Talk to us"
        ctaHref="#contact"
      />
    </div>
  )
}
