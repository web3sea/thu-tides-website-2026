import * as React from 'react';
import { ImageCarouselRow } from 'thu-tides-website';

const aerial = {
  images: [
    { src: '/DJI_aerial_hero.webp', alt: 'Aerial view of a coral atoll', caption: 'Aerial: reef and lagoon, Togean Islands' },
    { src: '/dji_aerial_beach_kalanggaman.webp', alt: 'Kalanggaman sandbar from above', caption: 'Aerial: Kalanggaman sandbar, Leyte' },
    { src: '/DJI_arial_island_balicasa.webp', alt: 'Balicasag island from above', caption: 'Aerial: Balicasag Island, Bohol' },
  ],
  animationType: 'fade' as const,
  showCaptions: true,
};

const underwater = {
  images: [
    { src: '/uw_malapascua.webp', alt: 'Thresher shark at Monad Shoal', caption: 'Underwater: thresher shark, Malapascua' },
    { src: '/uw_moalboal.webp', alt: 'Sardine run at Moalboal', caption: 'Underwater: sardine run, Moalboal' },
    { src: '/uw_jellyfish_mariona.webp', alt: 'Stingless jellyfish lake', caption: 'Underwater: jellyfish lake, Mariona' },
  ],
  animationType: 'fade' as const,
  showCaptions: true,
};

const resort = {
  images: [
    { src: '/villa_coco_reconnect.webp', alt: 'Villa Coco exterior', caption: 'Resort: Villa Coco, Reconnect' },
    { src: '/maison_coco_reconnect.webp', alt: 'Maison Coco interior', caption: 'Resort: Maison Coco living area' },
  ],
  animationType: 'slide' as const,
  showCaptions: true,
};

export const AerialAndUnderwater = () => (
  <ImageCarouselRow carousels={[aerial, underwater]} />
);

export const ThreeSequences = () => (
  <ImageCarouselRow carousels={[aerial, underwater, resort]} className="md:grid-cols-3" />
);

export const NoDots = () => (
  <ImageCarouselRow
    carousels={[
      { ...aerial, showDots: false, showCaptions: false },
      { ...resort, showDots: false, showCaptions: false },
    ]}
  />
);
