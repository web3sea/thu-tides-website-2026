import * as React from 'react';
import { Footer } from 'thu-tides-website';

export const Default = () => <Footer brandName="THU TIDES" />;

export const CustomSections = () => (
  <Footer
    brandName="THU TIDES"
    sections={[
      { title: 'Underwater', links: [], href: '/photography#underwater' },
      { title: 'Aerial', links: [], href: '/photography#aerials' },
      { title: 'Properties', links: [], href: '/photography#properties' },
      { title: 'Partners', links: [], href: '/#partners' },
      { title: 'Contact', links: [], href: '/#contact' },
    ]}
  />
);
