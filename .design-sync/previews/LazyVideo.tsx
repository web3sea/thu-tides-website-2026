import * as React from 'react';
import { LazyVideo } from 'thu-tides-website';

// Preview note: the real banner video is 17 MB and would time out the render check, so the
// src is an empty data: URI with preload="none". On the site this is
// src="/website_banner_optimized.mp4" poster="/website_banner_poster.webp".
const VIDEO = 'data:video/mp4,';
const POSTER = 'https://www.thutides.com/_next/image?url=%2Fwebsite_banner_poster.webp&w=1200&q=75';

export const BannerLoop = () => (
  <div className="aspect-video max-w-2xl overflow-hidden rounded-lg">
    <LazyVideo src={VIDEO} poster={POSTER} className="h-full w-full object-cover" preload="none" loop muted playsInline />
  </div>
);

export const PosterOnly = () => (
  <div className="aspect-video max-w-2xl overflow-hidden rounded-lg">
    <LazyVideo src={VIDEO} poster={POSTER} className="h-full w-full object-cover" preload="none" muted playsInline />
  </div>
);

export const WithControls = () => (
  <div className="aspect-video max-w-xl overflow-hidden rounded-lg">
    <LazyVideo src={VIDEO} poster={POSTER} className="h-full w-full object-cover" preload="none" controls muted playsInline />
  </div>
);
