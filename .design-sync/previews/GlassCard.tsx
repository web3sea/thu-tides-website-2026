import * as React from 'react';
import { Badge, Button, GlassCard } from 'thu-tides-website';

const Backdrop = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative overflow-hidden rounded-2xl ${className}`}>
    <img
      src="https://www.thutides.com/DJI_aerial_hero.webp"
      alt="Aerial view of a reef and coastline"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="relative p-6">{children}</div>
  </div>
);

export const Default = () => (
  <Backdrop className="max-w-md">
    <GlassCard className="text-white">
      <p className="text-xs uppercase tracking-widest text-white/70">Case study</p>
      <h3 className="mt-1 text-xl font-semibold">Reconnect Resort</h3>
      <p className="mt-2 text-sm text-white/80">Aerial and underwater storytelling for a private island retreat in Central Sulawesi.</p>
    </GlassCard>
  </Backdrop>
);

export const Variants = () => (
  <Backdrop className="max-w-2xl">
    <div className="grid gap-4 sm:grid-cols-3 text-white">
      <GlassCard variant="minimal" padding="md">
        <p className="text-xs uppercase tracking-widest text-white/70">minimal</p>
        <p className="mt-1 text-sm">Barely-there tint for captions over imagery.</p>
      </GlassCard>
      <GlassCard variant="default" padding="md">
        <p className="text-xs uppercase tracking-widest text-white/70">default</p>
        <p className="mt-1 text-sm">Standard frosted panel for overlay content.</p>
      </GlassCard>
      <GlassCard variant="strong" padding="md">
        <p className="text-xs uppercase tracking-widest text-white/70">strong</p>
        <p className="mt-1 text-sm">Heavier blur where legibility matters most.</p>
      </GlassCard>
    </div>
  </Backdrop>
);

export const Padding = () => (
  <div className="flex max-w-2xl flex-col gap-4 rounded-2xl bg-brand-cerulean p-6 text-white">
    <GlassCard padding="sm" variant="strong" hover={false}>
      <p className="text-sm"><span className="font-medium">padding=&quot;sm&quot;</span> · 16px · compact vote rows and chips</p>
    </GlassCard>
    <GlassCard padding="md" variant="strong" hover={false}>
      <p className="text-sm"><span className="font-medium">padding=&quot;md&quot;</span> · 24px · standard card body</p>
    </GlassCard>
    <GlassCard padding="lg" variant="strong" hover={false}>
      <p className="text-sm"><span className="font-medium">padding=&quot;lg&quot;</span> · 32px · hero and section cards</p>
    </GlassCard>
  </div>
);

export const CollabOffer = () => (
  <Backdrop className="max-w-lg">
    <GlassCard variant="strong" className="text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Stay for content partnership</h3>
          <p className="mt-1 text-sm text-white/80">Three nights at your property in exchange for a full aerial and underwater media set.</p>
        </div>
        <Badge variant="secondary">Barter</Badge>
      </div>
      <ul className="mt-4 space-y-1 text-sm text-white/90">
        <li>40+ edited photographs, web and print resolution</li>
        <li>One 60-second aerial reel</li>
        <li>Usage rights for your own channels</li>
      </ul>
      <div className="mt-5 flex gap-2">
        <Button variant="brand" size="sm">Start a partnership</Button>
        <Button variant="ghost" size="sm" className="text-white hover:text-white">See past work</Button>
      </div>
    </GlassCard>
  </Backdrop>
);
