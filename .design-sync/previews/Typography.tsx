import * as React from 'react';
import { Typography } from 'thu-tides-website';

export const HeroAndSections = () => (
  <div className="space-y-4">
    <Typography variant="hero-title">Authentic visual storytelling for coastal hospitality</Typography>
    <Typography variant="hero-subtitle">Travel, underwater and aerial photography across Indonesia and the Philippines</Typography>
    <Typography variant="section-title">Featured work</Typography>
    <Typography variant="subsection-title">Reconnect Resort, Buka Buka Island</Typography>
  </div>
);

export const BodyText = () => (
  <div className="max-w-prose space-y-3">
    <Typography variant="case-intro">
      A three-day production for a barefoot-luxury resort that wanted its marketing to feel as unhurried as the island itself.
    </Typography>
    <Typography variant="body-lg">We photographed the dive centre at first light, the overwater villas through the afternoon and the house reef at golden hour.</Typography>
    <Typography variant="body">Every image was delivered colour-graded and cropped for web, print and social in one set.</Typography>
    <Typography variant="body-sm">Delivery in 10 working days. Raw files available on request.</Typography>
  </div>
);

export const MetadataAndCaptions = () => (
  <div className="space-y-3">
    <div><Typography variant="metadata">Dive resort · Philippines · 2026</Typography></div>
    <div><Typography variant="label">Location</Typography></div>
    <Typography variant="caption">Thresher shark at Monad Shoal, 6:14 am.</Typography>
    <Typography variant="caption-sm">Shot on Sony A7R V, 16-35mm, natural light.</Typography>
    <p>
      <Typography as="span" variant="accent-primary">Cerulean accent</Typography>{' '}
      <Typography as="span" variant="accent-secondary">Olive accent</Typography>
    </p>
  </div>
);

export const Quotes = () => (
  <div className="max-w-prose space-y-4">
    <Typography variant="quote">"Thu captured the resort exactly as our guests remember it, calm, bright and completely unposed."</Typography>
    <Typography variant="quote-sm" align="right">Ari, General Manager, Reconnect Resort</Typography>
  </div>
);

export const Alignment = () => (
  <div className="space-y-2">
    <Typography variant="body" align="left">Left aligned body text.</Typography>
    <Typography variant="body" align="center">Center aligned body text.</Typography>
    <Typography variant="body" align="right">Right aligned body text.</Typography>
    <Typography variant="body" color="muted">Muted colour variant.</Typography>
  </div>
);
