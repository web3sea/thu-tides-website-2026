import * as React from 'react';
import { ImageCarousel } from 'thu-tides-website';

const reconnect = [
  { src: '/reconnect_buka_buka.webp', alt: 'Aerial view of Reconnect Resort, Buka Buka Island', caption: 'Reconnect Resort from the air, Buka Buka Island, Indonesia' },
  { src: '/villa_sunrise_reconnect.webp', alt: 'Overwater villa at sunrise', caption: 'Villa Athena at sunrise, shot from the jetty' },
  { src: '/dive_shop_reconnect.webp', alt: 'Dive centre at Reconnect Resort', caption: 'The dive centre before the first boat leaves' },
  { src: '/pier_reconnect.webp', alt: 'Wooden pier over turquoise water', caption: 'House-reef pier, late afternoon' },
];

const underwater = [
  { src: '/uw_turtle.webp', alt: 'Green turtle over coral', caption: 'Green turtle, Apo Island, Philippines', aspectRatio: 'square' as const },
  { src: '/uw_seafan.webp', alt: 'Sea fan with diver', caption: 'Gorgonian sea fan on the wall at Moalboal', aspectRatio: 'square' as const },
  { src: '/uw_jacks.webp', alt: 'School of jacks', caption: 'Jack tornado, Balicasag', aspectRatio: 'square' as const },
];

const portrait = [
  { src: '/villa_bath_reconnect_buka_buka.webp', alt: 'Outdoor villa bath', caption: 'Open-air bath, Villa Coco', aspectRatio: 'portrait' as const },
  { src: '/villa_sign_reconnect.webp', alt: 'Hand-painted villa sign', caption: 'Hand-painted signage on the garden path', aspectRatio: 'portrait' as const },
];

export const FadeWithCaptions = () => (
  <div className="max-w-2xl">
    <ImageCarousel images={reconnect} animationType="fade" showDots showArrows showCaptions />
  </div>
);

export const SlideSquare = () => (
  <div className="max-w-md">
    <ImageCarousel images={underwater} animationType="slide" showCaptions />
  </div>
);

export const PortraitNoDots = () => (
  <div className="max-w-xs">
    <ImageCarousel images={portrait} animationType="zoom" showDots={false} showCaptions />
  </div>
);

export const SingleImage = () => (
  <div className="max-w-2xl">
    <ImageCarousel images={[reconnect[0]]} showCaptions={false} />
  </div>
);
