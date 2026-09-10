import * as React from 'react';
import { PhotoCategorySection } from 'thu-tides-website';

// Rendered inside GigaLayout's slate-900 shell on the photography page;
// headings are white, so every export sits on a dark ground.
const Dark = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-slate-900">{children}</div>
);

const underwater = {
  id: '1',
  title: 'Underwater',
  description: 'Dive into the depths and discover vibrant marine life',
  slug: 'underwater',
  displayComponent: 'masonry' as const,
  images: [
    { src: '/uw_buka_buka.webp', alt: 'Underwater at Buka Buka', title: 'Buka Buka' },
    { src: '/uw_malapascua.webp', alt: 'Underwater at Malapascua', title: 'Malapascua' },
    { src: '/uw_moalboal.webp', alt: 'Underwater at Moalboal', title: 'Moalboal' },
    { src: '/uw_dauin.webp', alt: 'Underwater at Dauin', title: 'Dauin' },
    { src: '/uw_jellyfish_mariona.webp', alt: 'Jellyfish at Mariona', title: 'Mariona Jellyfish' },
    { src: '/uw_napalin.webp', alt: 'Underwater at Napalin', title: 'Napalin' },
  ],
  galleryConfig: { hoverEffect: 'zoom' as const },
};

const aerial = {
  id: '2',
  title: 'Aerial',
  description: 'Stunning drone photography and aerial perspectives',
  slug: 'aerials',
  displayComponent: 'grid' as const,
  images: [
    { src: '/dji_aerial_beach_kalanggaman.webp', alt: 'Aerial view of Kalanggaman Beach', title: 'Kalanggaman Beach' },
    { src: '/DJI_arial_island_balicasa.webp', alt: 'Aerial view of Balicasag Island', title: 'Balicasag Island' },
    { src: '/DJI_arial_waterfall_casaroro.webp', alt: 'Aerial view of Casaroro Waterfall', title: 'Casaroro Waterfall' },
    { src: '/DJI_arial_waterfall_pasalan.webp', alt: 'Aerial view of Pasalan Waterfall', title: 'Pasalan Waterfall' },
    { src: '/dji_aerial_top_reef_atoll.webp', alt: 'Aerial view of a reef atoll', title: 'Top Reef Atoll' },
    { src: '/DJI_aerial_hero.webp', alt: 'Aerial coastal view', title: 'Coastal Tides' },
  ],
  galleryConfig: { columns: 3 as const, hoverEffect: 'zoom' as const },
};

const landscape = {
  id: '5',
  title: 'Sunset & Landscape',
  description: 'Golden hour moments and breathtaking vistas',
  slug: 'landscape',
  displayComponent: 'carousel' as const,
  images: [
    { src: '/villa_sunrise_reconnect.webp', alt: 'Sunrise at Reconnect Resort', title: 'Dawn' },
    { src: '/villa_sunset_reconnect_buka_buka.webp', alt: 'Sunset at Buka Buka', title: 'Buka Buka Sunset' },
    { src: '/DJI_arial_waterfall_casaroro.webp', alt: 'Aerial view of Casaroro Waterfall', title: 'Casaroro Falls' },
    { src: '/DJ_aerial_reconnect.webp', alt: 'Aerial view of Reconnect Resort', title: 'Coastal Aerial' },
  ],
  galleryConfig: { itemsPerView: 3 as const },
};

export const Masonry = () => (
  <Dark><PhotoCategorySection category={underwater} /></Dark>
);

export const Grid = () => (
  <Dark><PhotoCategorySection category={aerial} /></Dark>
);

export const Carousel = () => (
  <Dark><PhotoCategorySection category={landscape} /></Dark>
);
