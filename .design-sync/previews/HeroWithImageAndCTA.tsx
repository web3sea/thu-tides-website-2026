import * as React from 'react';
import { HeroWithImageAndCTA } from 'thu-tides-website';

export const Default = () => (
  <HeroWithImageAndCTA
    backgroundImage="/DJI_aerial_hero.webp"
    backgroundImageAlt="Aerial view of coastal tides"
    title="Authentic visual storytelling for coastal hospitality"
    subtitle="Underwater, aerial and property photography for hotels and dive resorts"
    ctaText="Book a shoot"
    ctaHref="/#contact"
    parallax={false}
  />
);

export const CeruleanMedium = () => (
  <HeroWithImageAndCTA
    backgroundImage="/uw_moalboal.webp"
    backgroundImageAlt="Sardine run at Moalboal"
    title="Our Photography"
    subtitle="From underwater depths to aerial perspectives"
    ctaText="Explore all albums"
    ctaHref="/photography"
    overlayColor="cerulean"
    overlayOpacity={0.3}
    height="medium"
    parallax={false}
  />
);

export const SmallDarkOverlay = () => (
  <HeroWithImageAndCTA
    backgroundImage="/pier_reconnect.webp"
    backgroundImageAlt="Jetty at Reconnect Resort"
    title="Partner with us"
    ctaText="Let's connect"
    ctaHref="/#contact"
    overlayOpacity={0.5}
    height="small"
    parallax={false}
  />
);
