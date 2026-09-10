import * as React from 'react';
import { MasonryGallery } from 'thu-tides-website';

const portfolio = [
  { src: '/uw_wall.webp', alt: 'Diver along a coral wall' },
  { src: '/DJI_arial_waterfall_casaroro.webp', alt: 'Casaroro Falls from above' },
  { src: '/villa_reconnect.webp', alt: 'Villa exterior at Reconnect Resort' },
  { src: '/uw_mariona.webp', alt: 'Reef scene at Mariona' },
  { src: '/dji_aerial_beach_kalanggaman.webp', alt: 'Kalanggaman sandbar' },
  { src: '/uw_pulau_papan.webp', alt: 'Stilt village at Pulau Papan' },
  { src: '/DJI_arial_waterfall_pasalan.webp', alt: 'Pasalan waterfall from above' },
  { src: '/uw_dauin.webp', alt: 'Macro life at Dauin' },
  { src: '/villa_athena_reconnect.webp', alt: 'Villa Athena interior' },
];

export const NineImages = () => <MasonryGallery images={portfolio} gap="md" />;

export const SmallGap = () => <MasonryGallery images={portfolio.slice(0, 6)} gap="sm" />;

export const LargeGap = () => <MasonryGallery images={portfolio.slice(0, 6)} gap="lg" />;
