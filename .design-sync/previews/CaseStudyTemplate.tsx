import * as React from 'react';
import { CaseStudyTemplate } from 'thu-tides-website';

const reconnect = {
  title: 'Reconnect Resort, Buka Buka',
  subtitle: 'A three-day content production for a barefoot-luxury dive resort in the Togean Islands',
  heroImage: '/reconnect_buka_buka.webp',
  year: 2025,
  category: 'Dive Resort',
  client: 'Reconnect Resort',
  tools: ['Sony A7R V', 'Nauticam housing', 'DJI Mavic 3', 'Lightroom'],
  challenge: {
    title: 'The Challenge',
    description:
      'Reconnect Resort had a stunning house reef and overwater villas, but its website still relied on phone snapshots and stock imagery. Guests arriving from Instagram felt a gap between what they saw online and what they found on the island.',
    image: '/villa_reconnect.webp',
  },
  goal: {
    title: 'Our Approach',
    description:
      'We planned three days around the light: the dive centre at first light, villas and the jetty through the afternoon, and the house reef at golden hour. Every frame had to work on the website, in print and as a square crop for social.',
    image: '/dive_shop_reconnect.webp',
  },
  outcome: {
    title: 'The Result',
    description:
      '120 colour-graded photographs, six short aerial clips and a refreshed homepage hero, delivered in ten working days. Direct bookings from the website rose in the first season after launch.',
  },
  resultImages: [
    { src: '/DJ_aerial_reconnect.webp', alt: 'Aerial view of Reconnect Resort', caption: 'Aerial establishing shot' },
    { src: '/villa_sunset_reconnect_buka_buka.webp', alt: 'Sunset over the villas', caption: 'Villas at golden hour' },
    { src: '/uw_buka_buka.webp', alt: 'House reef at Buka Buka', caption: 'The house reef' },
  ],
  processImages: [
    { src: '/pier_reconnect.webp', alt: 'Jetty at dawn', caption: 'Scouting the jetty at dawn' },
    { src: '/dive_tanks_reconnect.webp', alt: 'Dive tanks at the dive centre', caption: 'Dive centre details' },
    { src: '/villa_bath_reconnect_buka_buka.webp', alt: 'Villa bathroom', caption: 'Interior styling' },
    { src: '/maison_coco_reconnect.webp', alt: 'Maison Coco villa', caption: 'Maison Coco' },
    { src: '/villa_sign_reconnect.webp', alt: 'Villa signage', caption: 'Wayfinding details' },
    { src: '/villa_sunrise_reconnect.webp', alt: 'Sunrise at Reconnect', caption: 'Sunrise on the last morning' },
  ],
  metrics: [
    { number: '120', label: 'Photographs delivered' },
    { number: '6', label: 'Aerial video clips' },
    { number: '10', label: 'Working days to delivery' },
  ],
  testimonial: {
    text: 'Thu captured the resort exactly as our guests remember it, calm, bright and completely unposed.',
    author: 'Ari',
    role: 'General Manager, Reconnect Resort',
  },
};

export const ReconnectResort = () => <CaseStudyTemplate caseStudy={reconnect} />;
