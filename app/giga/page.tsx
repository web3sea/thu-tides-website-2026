import { Navigation } from '@/components/navigation'
import { GigaHero } from '@/components/giga-hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise AI Support Agents',
  description: 'AI that talks like a human and handles millions of calls. Giga provides enterprise-grade AI agents for customer support with natural conversation capabilities.',
  keywords: ['enterprise AI', 'AI support agents', 'customer service AI', 'conversational AI', 'AI automation'],
}

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
