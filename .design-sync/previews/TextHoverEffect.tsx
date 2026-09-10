import * as React from 'react';
import { TextHoverEffect } from 'thu-tides-website';

export const BrandName = () => (
  <div className="h-48 w-full max-w-3xl rounded-lg bg-slate-900">
    <TextHoverEffect text="THU TIDES" />
  </div>
);

export const Compact = () => (
  <div className="h-32 w-full max-w-xl rounded-lg bg-slate-900">
    <TextHoverEffect text="PORTFOLIO" textSize="text-6xl" />
  </div>
);

export const OverPhoto = () => (
  <div className="relative h-64 w-full max-w-3xl overflow-hidden rounded-lg">
    <img src="https://www.thutides.com/_next/image?url=%2Fuw_wall.webp&w=1200&q=75" alt="Diver along a coral wall" className="absolute inset-0 h-full w-full object-cover" style={{ filter: 'brightness(0.5)' }} />
    <div className="relative h-full w-full">
      <TextHoverEffect text="UNDERWATER" textSize="text-7xl" />
    </div>
  </div>
);
