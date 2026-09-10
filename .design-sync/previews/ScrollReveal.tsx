import * as React from 'react';
import { ScrollReveal, Typography } from 'thu-tides-website';

const Block = ({ title, body }: { title: string; body: string }) => (
  <div className="max-w-md rounded-lg bg-card p-6 ring-1 ring-foreground/10">
    <Typography variant="subsection-title">{title}</Typography>
    <Typography variant="body" color="muted">{body}</Typography>
  </div>
);

export const SlideUp = () => (
  <ScrollReveal trigger="slideUp" threshold={0}>
    <Block title="Reconnect Resort" body="Three days on Buka Buka Island photographing the dive centre, villas and house reef." />
  </ScrollReveal>
);

export const Fade = () => (
  <ScrollReveal trigger="fade" speed="fast" threshold={0}>
    <Block title="Evolution Divers" body="Thresher sharks at dawn and the resort's new boats for the 2026 season." />
  </ScrollReveal>
);

export const SlideLeft = () => (
  <ScrollReveal trigger="slideLeft" speed="slow" threshold={0}>
    <Block title="Munduk Heaven" body="Waterfalls, rice terraces and a cliffside villa in the Bali highlands." />
  </ScrollReveal>
);

export const ScaleInImage = () => (
  <ScrollReveal trigger="scaleIn" threshold={0} className="max-w-md">
    <img src="https://www.thutides.com/_next/image?url=%2FDJI_aerial_hero.webp&w=1200&q=75" alt="Aerial view of a coral atoll" className="aspect-video w-full rounded-lg object-cover" />
  </ScrollReveal>
);
