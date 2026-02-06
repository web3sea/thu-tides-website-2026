import { Navigation } from '@/components/navigation'
import { GigaHero } from '@/components/giga-hero'

export default function GigaPage() {
  return (
    <div className="w-full min-h-screen bg-slate-900">
      <Navigation />
      <GigaHero />
    </div>
  )
}
