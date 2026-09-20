import type { Metadata } from 'next'
import { GigaLayout } from '@/components/giga-layout'
import { GuidesWallet } from '@/components/guides-wallet'

export const metadata: Metadata = {
  title: 'Travel Guides',
  description: 'Thu Tides travel guides for Indonesia: Raja Ampat available now, with Bali, Lombok, Sulawesi and Java coming soon.',
  alternates: { canonical: '/guides' },
}

export default function GuidesPage() {
  return (
    <GigaLayout>
      <GuidesWallet />
    </GigaLayout>
  )
}
