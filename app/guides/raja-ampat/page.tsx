import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GigaLayout } from '@/components/giga-layout'
import { H1, H2, P } from '@/components/typography'
import { guideBySlug } from '@/data/guides'

const guide = guideBySlug('raja-ampat')

export const metadata: Metadata = {
  title: 'Raja Ampat Travel Guide',
  description:
    'A mobile guide to Raja Ampat from Thu Tides: seasons and permits, a 12-day itinerary with a real budget, Kri, Arborek, Piaynemo, Misool and where to stay. US$12, reads on two devices.',
  alternates: { canonical: '/guides/raja-ampat' },
  openGraph: {
    title: 'Raja Ampat Travel Guide by Thu Tides',
    description: 'Seasons, permits, a 12-day itinerary with a real budget, and the islands we would go back to.',
    images: [{ url: '/guides/raja-ampat-cover.webp', width: 1080, height: 1400 }],
  },
}

const included = [
  { icon: 'phone_iphone', title: 'Built for your phone', text: 'A small web app you open with a code from your email. No app store, no PDF to pinch and zoom.' },
  { icon: 'devices', title: 'Two devices', text: 'Register the phone and tablet you will actually read on. Both stay signed in for 30 days at a time.' },
  { icon: 'payments', title: 'A real budget', text: 'What a 12-day trip cost us, line by line, and how to trim it or spend more where it matters.' },
  { icon: 'sailing', title: 'Homestay to liveaboard', text: 'Honest notes on the three ways to sleep in Raja Ampat and what each changes about your trip.' },
]

export default function RajaAmpatGuidePage() {
  if (!guide || !guide.buyUrl) notFound()

  return (
    <GigaLayout>
      {/* Hero */}
      <section aria-label="Raja Ampat guide" className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src={guide.image}
          alt={guide.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 pt-40">
          <P className="text-sm uppercase tracking-widest text-brand-cerulean-2 font-medium mb-4">
            Travel guide · {guide.region}
          </P>
          <H1 className="text-white mb-5 text-5xl md:text-7xl">{guide.title}</H1>
          <P className="text-xl md:text-2xl text-white/85 font-light max-w-2xl mb-8">{guide.tagline}</P>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={guide.buyUrl}
              rel="noopener noreferrer"
              className="inline-flex max-w-full items-center gap-2 rounded-full bg-brand-cerulean hover:bg-brand-cerulean-2 px-6 py-3.5 text-base font-semibold text-white transition-colors"
            >
              <span>Get the guide, {guide.price}</span>
              <span className="material-symbols-outlined shrink-0 text-lg" aria-hidden="true">arrow_forward</span>
            </a>
            <a
              href={guide.appUrl}
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/40 hover:bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-colors"
            >
              Already bought it? Open the guide
            </a>
          </div>
        </div>
      </section>

      {/* Pitch */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <P className="text-2xl md:text-3xl text-white font-light leading-relaxed">{guide.description}</P>
        </div>
      </section>

      {/* What's inside */}
      <section aria-labelledby="chapters" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <H2 id="chapters" className="text-white mb-10 text-3xl md:text-4xl">
            What is inside
          </H2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guide.chapters?.map((chapter, i) => (
              <li key={chapter.title} className="flex gap-5 rounded-2xl bg-white/5 border border-white/10 p-6">
                <span className="text-brand-cerulean-2 font-light text-3xl leading-none tabular-nums w-10 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-white text-lg font-medium mb-1">{chapter.title}</h3>
                  <P className="text-white/70 font-light">{chapter.intro}</P>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <H2 id="how" className="text-white mb-10 text-3xl md:text-4xl">
            How it works
          </H2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {included.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <span className="material-symbols-outlined text-3xl text-brand-cerulean-2" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="text-white text-lg font-medium mt-4 mb-2">{item.title}</h3>
                <P className="text-white/70 font-light text-sm leading-relaxed">{item.text}</P>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy */}
      <section aria-labelledby="buy" className="px-6 pb-28">
        <div className="max-w-3xl mx-auto rounded-2xl bg-brand-cerulean/15 border border-brand-cerulean/40 p-8 md:p-12 text-center">
          <H2 id="buy" className="text-white mb-3 text-3xl">
            {guide.price}, yours for good
          </H2>
          <P className="text-white/80 font-light mb-8 max-w-xl mx-auto">
            Pay once with card, Apple Pay or Google Pay. You land straight in the guide with a code
            sent to the email you paid with. Questions first? Write to hello@thutides.com.
          </P>
          <a
            href={guide.buyUrl}
              rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-cerulean hover:bg-brand-cerulean-2 px-8 py-4 text-base font-semibold text-white transition-colors"
          >
            Get the Raja Ampat guide
            <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
          </a>
          <P className="text-white/50 text-xs mt-6">
            Payments are processed by Stripe. Lombok and Bali guides are next; see all{' '}
            <Link href="/guides" className="underline hover:text-white/80">guides</Link>.
          </P>
        </div>
      </section>
    </GigaLayout>
  )
}
