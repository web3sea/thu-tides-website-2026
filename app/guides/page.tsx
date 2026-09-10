import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GigaLayout } from '@/components/giga-layout'
import { H1, H2, P } from '@/components/typography'
import { guides, type Guide } from '@/data/guides'

export const metadata: Metadata = {
  title: 'Travel Guides',
  description:
    'Mobile travel guides to Indonesia from Thu Tides: Raja Ampat out now, Lombok and Bali to follow. Seasons, permits, real budgets and the islands we would go back to.',
  alternates: { canonical: '/guides' },
}

const statusLabel: Record<Guide['status'], string> = {
  available: 'Out now',
  next: 'Coming next',
  planned: 'Planned',
}

export default function GuidesPage() {
  const [featured, ...rest] = guides

  return (
    <GigaLayout>
      <section aria-label="Travel guides" className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <P className="text-sm uppercase tracking-widest text-brand-cerulean-2 font-medium mb-4">
            Travel guides
          </P>
          <H1 className="text-white mb-6 text-4xl md:text-6xl">Indonesia, one island at a time</H1>
          <P className="text-lg md:text-xl text-white/75 font-light max-w-2xl mx-auto">
            Written from our own trips, built for your phone. Each guide is a small web app you open
            with a code from your email, no download, works on the boat.
          </P>
        </div>
      </section>

      {/* Featured: the guide on sale */}
      <section aria-labelledby="featured-guide" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full min-h-[360px]">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="p-8 md:p-12">
            <span className="inline-block rounded-full bg-brand-cerulean px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {statusLabel[featured.status]}
            </span>
            <H2 id="featured-guide" className="text-white mt-5 mb-2">
              {featured.title}
            </H2>
            <P className="text-white/60 text-sm mb-5">{featured.region}</P>
            <P className="text-white/85 text-lg font-light leading-relaxed mb-8">{featured.description}</P>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/guides/${featured.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-cerulean hover:bg-brand-cerulean-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                See what is inside
                <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
              </Link>
              {featured.price && (
                <span className="text-white/80 text-sm">
                  {featured.price} <span className="text-white/50">one-time, two devices</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming guides */}
      <section aria-labelledby="upcoming-guides" className="px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <H2 id="upcoming-guides" className="text-white mb-8 text-3xl">
            Coming next
          </H2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((guide) => (
              <article
                key={guide.slug}
                className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={guide.image}
                    alt={guide.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-70"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/70">
                    {statusLabel[guide.status]}
                  </span>
                  <h3 className="text-white text-2xl font-light mt-4 mb-1">{guide.title}</h3>
                  <P className="text-white/60 text-sm mb-3">{guide.region}</P>
                  <P className="text-white/80 font-light">{guide.tagline}</P>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </GigaLayout>
  )
}
