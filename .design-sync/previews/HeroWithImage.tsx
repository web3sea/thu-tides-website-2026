import * as React from 'react';
import { HeroWithImage, Button } from 'thu-tides-website';

export const Default = () => (
  <HeroWithImage
    backgroundImage="/DJI_aerial_hero.webp"
    backgroundImageAlt="Aerial view of coastal tides"
    title="Creative collaboration for coastal hospitality brands"
    subtitle="Travel, underwater and aerial photography across Indonesia and the Philippines"
    parallax={false}
  />
);

export const CeruleanOverlaySmall = () => (
  <HeroWithImage
    backgroundImage="/reconnect_buka_buka.webp"
    backgroundImageAlt="Aerial view of Reconnect Resort, Buka Buka Island"
    title="Reconnect Resort"
    subtitle="Buka Buka Island, Togean, Sulawesi"
    overlayColor="cerulean"
    overlayOpacity={0.35}
    height="small"
    parallax={false}
  />
);

export const LightOverlayMedium = () => (
  <HeroWithImage
    backgroundImage="/uw_malapascua.webp"
    backgroundImageAlt="Thresher shark at Monad Shoal, Malapascua"
    title="Evolution Divers"
    subtitle="Malapascua, Philippines"
    overlayColor="light"
    overlayOpacity={0.15}
    height="medium"
    parallax={false}
  />
);

export const WithCustomContent = () => (
  <HeroWithImage
    backgroundImage="/villa_sunset_reconnect_buka_buka.webp"
    backgroundImageAlt="Sunset over the villas at Reconnect Resort"
    title="Golden hour on Buka Buka"
    subtitle="A three-day content production for a barefoot-luxury dive resort"
    overlayOpacity={0.4}
    height="medium"
    parallax={false}
    content={
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="brand" size="lg">View case study</Button>
        <Button variant="outline" size="lg" className="border-white/80 text-white bg-transparent hover:bg-white/10">See the gallery</Button>
      </div>
    }
  />
);

export const NoOverlay = () => (
  <HeroWithImage
    backgroundImage="/dji_aerial_top_reef_atoll.webp"
    backgroundImageAlt="Aerial view of a reef atoll"
    title="Top Reef Atoll"
    overlayColor="none"
    height="small"
    parallax={false}
  />
);
