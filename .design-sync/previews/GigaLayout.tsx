import * as React from 'react';
import { GigaLayout, GigaHero, H2, P } from 'thu-tides-website';

export const WithHero = () => (
  <GigaLayout>
    <GigaHero
      backgroundImage="/DJI_aerial_hero.webp"
      backgroundImageAlt="Aerial view of coastal tides"
      title="Creative collaboration for coastal hospitality brands."
      badge={{ text: 'Where should we go next?', href: '#' }}
      ctaText="Let's connect"
      ctaHref="/#contact"
      logos={[]}
    />
  </GigaLayout>
);

export const ContentOnly = () => (
  <GigaLayout>
    <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto text-center">
      <H2 className="text-white mb-4">Photographs</H2>
      <P className="text-white/80 text-lg font-light">
        Underwater, aerial, dive, property, landscape and wildlife albums from Indonesia and the Philippines.
      </P>
    </section>
  </GigaLayout>
);

export const WithoutNavigation = () => (
  <GigaLayout showNavigation={false}>
    <section className="px-6 md:px-12 py-24 max-w-4xl mx-auto text-center">
      <H2 className="text-white mb-4">Reconnect Resort, Buka Buka</H2>
      <P className="text-white/80 text-lg font-light">A three-day content production for a barefoot-luxury dive resort in the Togean Islands.</P>
    </section>
  </GigaLayout>
);
