import * as React from 'react';
import { Navigation } from 'thu-tides-website';

// Navigation is position:absolute with white text; it sits over the hero on
// the site, so each export gives it a relative, dark stage to land on.
export const OnDark = () => (
  <div className="relative h-32 bg-slate-900">
    <Navigation />
  </div>
);

export const OverHeroImage = () => (
  <div
    className="relative h-64 bg-cover bg-center"
    style={{ backgroundImage: 'url(https://www.thutides.com/DJI_aerial_hero.webp)' }}
  >
    <div className="absolute inset-0 bg-slate-900/40" />
    <Navigation />
  </div>
);

export const Static = () => (
  <div className="bg-slate-900">
    <Navigation className="relative" />
  </div>
);
