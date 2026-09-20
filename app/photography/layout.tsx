import type { Metadata } from 'next'

// The photography page itself is a client component and cannot export metadata,
// so it lives here. Without it the page inherited the root layout's metadata and
// canonicalised itself to the homepage.
export const metadata: Metadata = {
  title: 'Photography',
  description:
    'Underwater, aerial and hospitality photography from Thu Tides: reefs and marine life, coastlines from the air, dive operations, and the rooms and villas of coastal properties across Indonesia and the Philippines.',
  keywords: [
    'underwater photography Indonesia',
    'aerial photography Indonesia',
    'dive resort photography',
    'hotel photography Indonesia',
    'resort photography Philippines',
    'travel photography portfolio',
  ],
  alternates: { canonical: '/photography' },
  // Next replaces these objects wholesale rather than deep-merging them with the
  // root layout's, so every field we still want has to be repeated here -- most
  // importantly the images, without which shares of this page render blank.
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Thu Tides',
    title: 'Photography | Thu Tides',
    description:
      'Underwater, aerial and hospitality photography for coastal hotels, dive resorts and liveaboards across Indonesia and the Philippines.',
    url: '/photography',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aerial coastal photography by Thu Tides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photography | Thu Tides',
    description:
      'Underwater, aerial and hospitality photography for coastal hotels, dive resorts and liveaboards.',
    images: ['/og-image.png'],
  },
}

export default function PhotographyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
