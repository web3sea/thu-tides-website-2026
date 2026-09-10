import * as React from 'react';
import { MasonryGallery } from 'thu-tides-website';

const portfolio = [
  { src: '/uw_wall.webp', alt: 'Diver along a coral wall' },
  { src: '/DJI_arial_waterfall_casaroro.webp', alt: 'Casaroro Falls from above' },
  { src: '/uw_mariona.webp', alt: 'Reef scene at Mariona' },
  { src: '/dji_aerial_beach_kalanggaman.webp', alt: 'Kalanggaman sandbar' },
  { src: '/uw_pulau_papan.webp', alt: 'Stilt village at Pulau Papan' },
  { src: '/uw_dauin.webp', alt: 'Macro life at Dauin' },
];

export const NineImages = () => <MasonryGallery images={portfolio} gap="md" />;

export const SmallGap = () => <MasonryGallery images={portfolio.slice(0, 6)} gap="sm" />;

export const LargeGap = () => <MasonryGallery images={portfolio.slice(0, 6)} gap="lg" />;
