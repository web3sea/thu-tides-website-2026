import * as React from 'react';
import { ImageGallery } from 'thu-tides-website';

const portfolio = [
  { src: '/uw_turtle.webp', alt: 'Green turtle over coral', caption: 'Green turtle, Apo Island' },
  { src: '/DJI_aerial_hero.webp', alt: 'Aerial view of a coral atoll', caption: 'Togean atoll from 120 m' },
  { src: '/villa_sunset_reconnect_buka_buka.webp', alt: 'Villa at sunset', caption: 'Villa Athena, Buka Buka, sunset' },
  { src: '/uw_seafan.webp', alt: 'Gorgonian sea fan', caption: 'Sea fan, Pescador Island' },
  { src: '/dji_aerial_top_reef_atoll.webp', alt: 'Top-down reef', caption: 'Reef crest, top-down' },
  { src: '/dive_tanks_reconnect.webp', alt: 'Dive tanks lined up', caption: 'Tanks ready for the morning dive' },
  { src: '/uw_napalin.webp', alt: 'Diver over reef at Napaling', caption: 'Napaling, Panglao' },
  { src: '/tarsier_bohol.webp', alt: 'Tarsier in Bohol', caption: 'Philippine tarsier, Bohol' },
];

export const ThreeColumns = () => (
  <ImageGallery images={portfolio.slice(0, 6)} columns={3} gap="md" hoverEffect="zoom" />
);

export const TwoColumnsLargeGap = () => (
  <ImageGallery images={portfolio.slice(0, 4)} columns={2} gap="lg" hoverEffect="lift" />
);

// Captions render inside the hover overlay only, so a static capture cannot show them;
// this cell sweeps the four-column axis with the overlay hover effect.
export const FourColumns = () => (
  <ImageGallery images={portfolio} columns={4} gap="sm" hoverEffect="overlay" showCaptions />
);
