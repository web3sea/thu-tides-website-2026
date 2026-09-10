import * as React from 'react';
import { ScrollRevealStagger, Typography } from 'thu-tides-website';

const services = [
  { title: 'Aerial photography', body: 'Drone coverage that places a property in its landscape.' },
  { title: 'Underwater photography', body: 'Reef, pelagic and macro work for dive resorts.' },
  { title: 'Resort storytelling', body: 'Villas, food and guests photographed unposed.' },
];

export const StaggeredCards = () => (
  <ScrollRevealStagger trigger="slideUp" staggerDelay={0.15} threshold={0} className="grid max-w-3xl gap-4 md:grid-cols-3">
    {services.map((s) => (
      <div key={s.title} className="rounded-lg bg-card p-5 ring-1 ring-foreground/10">
        <Typography variant="subsection-title">{s.title}</Typography>
        <Typography variant="body-sm" color="muted">{s.body}</Typography>
      </div>
    ))}
  </ScrollRevealStagger>
);

export const StaggeredList = () => (
  <ScrollRevealStagger trigger="slideRight" staggerDelay={0.1} threshold={0} className="max-w-md space-y-2">
    <Typography variant="body">1. Discovery call and shot list</Typography>
    <Typography variant="body">2. Three to five days on location</Typography>
    <Typography variant="body">3. Colour-graded delivery in 10 working days</Typography>
    <Typography variant="body">4. Social crops and print masters</Typography>
  </ScrollRevealStagger>
);

export const StaggeredImages = () => (
  <ScrollRevealStagger trigger="zoomIn" staggerDelay={0.2} threshold={0} className="grid max-w-3xl grid-cols-3 gap-3">
    <img src="https://www.thutides.com/_next/image?url=%2Fuw_turtle.webp&w=1200&q=75" alt="Green turtle" className="aspect-square w-full rounded-lg object-cover" />
    <img src="https://www.thutides.com/_next/image?url=%2Fuw_seafan.webp&w=1200&q=75" alt="Sea fan" className="aspect-square w-full rounded-lg object-cover" />
    <img src="https://www.thutides.com/_next/image?url=%2Fuw_jacks.webp&w=1200&q=75" alt="School of jacks" className="aspect-square w-full rounded-lg object-cover" />
  </ScrollRevealStagger>
);
