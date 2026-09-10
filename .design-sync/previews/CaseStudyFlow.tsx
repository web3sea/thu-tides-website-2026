import * as React from 'react';
import { CaseStudyFlow, CaseStudySection } from 'thu-tides-website';

export const ChallengeGoalOutcome = () => (
  <div>
    <span className="sr-only">Case study</span>
  <CaseStudyFlow>
    <CaseStudySection
      type="challenge"
      title="A resort that photographs better than it markets"
      description="Reconnect Resort had a stunning house reef and overwater villas, but its website still relied on phone snapshots and stock imagery."
      image={{ src: '/villa_reconnect.webp', alt: 'Villa at Reconnect Resort' }}
      layout="right"
      backgroundColor="muted"
    />
    <CaseStudySection
      type="goal"
      title="One visual language, from reef to rooftop"
      description="Three days planned around the light: dive centre at dawn, villas through the afternoon, the house reef at golden hour."
      image={{ src: '/uw_buka_buka.webp', alt: 'Underwater at Buka Buka' }}
      layout="left"
      accent="olive"
      backgroundColor="light"
    />
    <CaseStudySection
      type="outcome"
      title="A complete image library in ten working days"
      description="120 colour-graded photographs, six aerial clips and a refreshed homepage hero."
      layout="full"
      accent="sage"
      backgroundColor="transparent"
    />
  </CaseStudyFlow>
  </div>
);

export const TwoSteps = () => (
  <div>
    <span className="sr-only">Case study</span>
  <CaseStudyFlow>
    <CaseStudySection
      type="challenge"
      title="Thresher sharks at 6 am, guests at 9"
      description="Evolution Divers needed imagery of Monad Shoal's thresher sharks that matched the calm, professional feel of the dive centre."
      layout="full"
      backgroundColor="muted"
    />
    <CaseStudySection
      type="outcome"
      title="A season launch built on real dives"
      description="Underwater and aerial coverage delivered in time for the 2026 season campaign."
      image={{ src: '/uw_malapascua.webp', alt: 'Thresher shark at Malapascua' }}
      layout="right"
      accent="sage"
      backgroundColor="light"
    />
  </CaseStudyFlow>
  </div>
);
