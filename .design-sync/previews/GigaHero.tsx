import * as React from 'react';
import { GigaHero } from 'thu-tides-website';

const partnerLogos = [
  { name: 'RECONNECT RESORT' },
  { name: 'EVOLUTION DIVERS' },
  { name: 'MUNDUK HEAVEN' },
];

export const Default = () => (
  <GigaHero
    backgroundImage="/DJI_aerial_hero.webp"
    backgroundImageAlt="Aerial view of coastal tides"
    title="Creative collaboration for coastal hospitality brands."
    subtitle="Underwater, aerial and property photography across Indonesia and the Philippines."
    badge={{ text: 'Where should we go next?', href: '#' }}
    ctaText="Let's connect"
    ctaHref="/#contact"
    logos={[]}
  />
);

export const WithPartnerLogos = () => (
  <GigaHero
    backgroundImage="/dji_aerial_beach_kalanggaman.webp"
    backgroundImageAlt="Aerial view of Kalanggaman Beach"
    title="Trusted by dive resorts. Loved by travellers."
    badge={{ text: 'Now booking 2026 season', href: '#' }}
    ctaText="View portfolio"
    ctaHref="/photography"
    logos={partnerLogos}
  />
);

export const HoverEffectTitle = () => (
  <GigaHero
    backgroundImage="/DJI_aerial_hero.webp"
    backgroundImageAlt="Aerial view of coastal tides"
    title="Creative collaboration for coastal hospitality brands."
    badge={{ text: 'Where should we go next?', href: '#' }}
    logos={[]}
    useHoverEffect
    hoverEffectText="THU TIDES"
  />
);

export const MinimalNoBadge = () => (
  <GigaHero
    backgroundImage="/uw_top_reef_atoll.webp"
    backgroundImageAlt="Reef wall at Top Reef Atoll"
    title="Underwater stories. Told with light."
    badge={null as never}
    logos={[]}
  />
);
