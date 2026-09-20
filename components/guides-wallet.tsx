'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import * as React from 'react'

type GuidePass = {
  slug: 'raja-ampat' | 'bali' | 'lombok' | 'sulawesi' | 'java'
  title: string
  status: 'Available now' | 'Coming soon'
  detail: string
  tone: string
  available?: boolean
}

const guidePasses: GuidePass[] = [
  { slug: 'raja-ampat', title: 'Raja Ampat', status: 'Available now', detail: 'An island-by-island field guide for the crossings, reefs and stays that make sense.', tone: 'from-[#062733] via-[#0b6675] to-[#59b8c8]', available: true },
  { slug: 'bali', title: 'Bali', status: 'Coming soon', detail: 'A new Thu Tides guide is in the works.', tone: 'from-[#3d2118] via-[#a94c2d] to-[#de9a4b]' },
  { slug: 'lombok', title: 'Lombok', status: 'Coming soon', detail: 'A new Thu Tides guide is in the works.', tone: 'from-[#123f43] via-[#2e7a70] to-[#a6c67d]' },
  { slug: 'sulawesi', title: 'Sulawesi', status: 'Coming soon', detail: 'A new Thu Tides guide is in the works.', tone: 'from-[#202448] via-[#525b94] to-[#c0a5cc]' },
  { slug: 'java', title: 'Java', status: 'Coming soon', detail: 'A new Thu Tides guide is in the works.', tone: 'from-[#38281b] via-[#806343] to-[#d9ba83]' },
]

export function GuidesWallet() {
  const [selectedSlug, setSelectedSlug] = React.useState<GuidePass['slug']>('raja-ampat')
  const selected = guidePasses.find((guide) => guide.slug === selectedSlug) ?? guidePasses[0]
  const selectedIndex = guidePasses.findIndex((guide) => guide.slug === selectedSlug)

  return (
    <section aria-label="Thu Tides travel guides" className="px-6 pb-28 pt-32 md:pb-36 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-brand-cerulean-2">Your travel library</p>
          <h1 className="text-5xl font-light leading-[0.94] tracking-tight text-white md:text-7xl">The guides worth keeping close.</h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/70">A growing collection of considered routes for Indonesia&apos;s islands. Select a guide to take a closer look.</p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16">
          <div className="relative mx-auto h-[24.75rem] w-full max-w-[31rem] sm:h-[27.5rem]">
            {guidePasses.map((guide, index) => {
              const isSelected = guide.slug === selectedSlug
              const y = index < selectedIndex ? index * 16 - 20 : index * 16
              return (
                <motion.button
                  key={guide.slug}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedSlug(guide.slug)}
                  animate={{ y, scale: isSelected ? 1 : 0.976, filter: isSelected ? 'brightness(1)' : 'brightness(.86)' }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  className={`absolute inset-x-0 h-[18rem] overflow-hidden rounded-[1.7rem] bg-gradient-to-br ${guide.tone} p-6 text-left text-white shadow-[0_22px_50px_rgba(0,0,0,0.3)] outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-cerulean-2 sm:h-[19.5rem]`}
                  style={{ zIndex: isSelected ? 20 : 10 + index }}
                >
                  {guide.slug === 'raja-ampat' && <Image src="/guides/raja-ampat-cover.webp" alt="" fill sizes="(max-width: 640px) calc(100vw - 48px), 496px" className="object-cover opacity-35 mix-blend-luminosity" />}
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_87%_9%,rgba(255,255,255,0.27),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.09),transparent_52%)]" />
                  <span className="relative flex h-full flex-col justify-between">
                    <span className="flex items-start justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.18em]"><span>Thu Tides</span><span className="rounded-full border border-white/35 px-2.5 py-1 text-[10px] tracking-[0.12em]">{guide.status}</span></span>
                    <span><span className="block text-5xl font-light leading-none tracking-tight sm:text-6xl">{guide.title}</span><span className="mt-3 block text-sm text-white/80">{guide.available ? 'Travel guide · $12' : 'Indonesia guide · in development'}</span></span>
                  </span>
                </motion.button>
              )
            })}
          </div>

          <motion.div key={selected.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="rounded-[1.45rem] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-cerulean-2">{selected.status}</p>
            <h2 className="mt-3 text-4xl font-light leading-none text-white">{selected.title}</h2>
            <p className="mt-4 text-base font-light leading-relaxed text-white/70">{selected.detail}</p>
            {selected.available ? <Link href="/guides/raja-ampat" className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-brand-cerulean px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-cerulean-2">See what&apos;s inside · $12</Link> : <p className="mt-7 flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white/55">Coming soon</p>}
          </motion.div>
        </div>

        <p className="mx-auto mt-12 max-w-md text-center text-sm font-light leading-relaxed text-white/45">One place at a time. Your purchased guides will live here as the collection grows.</p>
      </div>
    </section>
  )
}
