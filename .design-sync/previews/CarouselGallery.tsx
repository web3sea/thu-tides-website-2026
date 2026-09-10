import * as React from 'react';
import { CarouselGallery } from 'thu-tides-website';

const images = [
  { src: '/uw_malapascua.webp', alt: 'Thresher shark at Monad Shoal', title: 'Malapascua, Philippines' },
  { src: '/uw_moalboal.webp', alt: 'Sardine run at Moalboal', title: 'Moalboal, Philippines' },
  { src: '/uw_top_reef_atoll.webp', alt: 'Reef top at a Togean atoll', title: 'Togean Islands, Indonesia' },
  { src: '/uw_buka_buka.webp', alt: 'House reef at Buka Buka', title: 'Buka Buka Island, Indonesia' },
  { src: '/uw_jacks.webp', alt: 'School of jacks at Balicasag', title: 'Balicasag, Philippines' },
];

// Preview note: slides further than ~1250px off-screen are never lazy-loaded by Chrome, which
// hangs the capture harness, so the stories keep every slide within reach of the viewport.
export const ThreePerView = () => (
  <CarouselGallery
    title="Underwater portfolio"
    description="Reef, pelagic and macro work from Indonesia and the Philippines"
    images={images.slice(0, 4)}
    itemsPerView={3}
  />
);

export const TwoPerView = () => (
  <CarouselGallery title="Dive resorts" images={images.slice(0, 4)} itemsPerView={2} />
);

export const SinglePerView = () => (
  <CarouselGallery images={images.slice(0, 2)} itemsPerView={1} />
);
