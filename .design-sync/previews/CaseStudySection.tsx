import * as React from 'react';
import { CaseStudySection, P } from 'thu-tides-website';

export const ChallengeImageRight = () => (
  <div>
    <span className="sr-only">Case study</span>
  <CaseStudySection
    type="challenge"
    title="A resort that photographs better than it markets"
    description="Reconnect Resort had a stunning house reef and overwater villas, but its website still relied on phone snapshots and stock imagery. Guests arriving from Instagram felt a gap between what they saw online and what they found on the island."
    image={{ src: '/villa_reconnect.webp', alt: 'Villa at Reconnect Resort' }}
    layout="right"
    backgroundColor="muted"
  />
  </div>
);

export const GoalImageLeft = () => (
  <div>
    <span className="sr-only">Case study</span>
  <CaseStudySection
    type="goal"
    title="One visual language, from reef to rooftop"
    description="We planned three days around the light: the dive centre at first light, villas and the jetty through the afternoon, and the house reef at golden hour. Every frame had to work on the website, in print and as a square crop for social."
    image={{ src: '/dive_shop_reconnect.webp', alt: 'Dive centre at Reconnect Resort' }}
    layout="left"
    accent="olive"
    backgroundColor="light"
  />
  </div>
);

export const OutcomeFullWidth = () => (
  <div>
    <span className="sr-only">Case study</span>
  <CaseStudySection
    type="outcome"
    title="A complete image library in ten working days"
    description="120 colour-graded photographs, six short aerial clips and a refreshed homepage hero. Direct bookings from the website rose in the first season after launch."
    image={{ src: '/DJ_aerial_reconnect.webp', alt: 'Aerial view of Reconnect Resort' }}
    layout="full"
    accent="sage"
    backgroundColor="transparent"
  />
  </div>
);

export const WithChildrenNoImage = () => (
  <div>
    <span className="sr-only">Case study</span>
  <CaseStudySection
    type="outcome"
    title="What we delivered"
    description="Every asset was delivered in web, print and social crops, with raw files available on request."
    layout="full"
    accent="sage"
    backgroundColor="muted"
  >
    <ul className="grid gap-3 sm:grid-cols-3">
      <li className="rounded-lg bg-white p-4 shadow-sm"><P className="font-semibold">120 photographs</P><P className="text-sm text-muted-foreground">Property, dive and underwater</P></li>
      <li className="rounded-lg bg-white p-4 shadow-sm"><P className="font-semibold">6 aerial clips</P><P className="text-sm text-muted-foreground">4K drone loops for the homepage</P></li>
      <li className="rounded-lg bg-white p-4 shadow-sm"><P className="font-semibold">10 working days</P><P className="text-sm text-muted-foreground">From shoot to final delivery</P></li>
    </ul>
  </CaseStudySection>
  </div>
);
