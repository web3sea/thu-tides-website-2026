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
  openGraph: {
    title: 'Photography | Thu Tides',
    description:
      'Underwater, aerial and hospitality photography for coastal hotels, dive resorts and liveaboards across Indonesia and the Philippines.',
    url: '/photography',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photography | Thu Tides',
    description:
      'Underwater, aerial and hospitality photography for coastal hotels, dive resorts and liveaboards.',
  },
}

export default function PhotographyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}
