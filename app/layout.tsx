import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Thu Tides',
    default: 'Thu Tides - Professional Travel & Underwater Photography for Hotels & Resorts',
  },
  description: 'Professional photography and video content for coastal hotels, dive resorts, and liveaboards. Specializing in travel, underwater, and aerial photography across Indonesia and the Philippines. Barter and paid partnerships available.',
  keywords: ['travel photography', 'underwater photography', 'hotel photography Indonesia', 'resort photography Philippines', 'dive resort content creation', 'coastal hospitality photography', 'aerial photography Indonesia', 'travel photography Indonesia', 'underwater photography Indonesia', 'hotel video production', 'barter photography partnerships'],
  authors: [{ name: 'Thu Tides' }],
  creator: 'Thu Tides',
  publisher: 'Thu Tides',
  metadataBase: new URL('https://thu-tides.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Thu Tides',
    title: 'Thu Tides - Professional Travel & Underwater Photography for Hotels & Resorts',
    description: 'Professional photography and video content for coastal hotels, dive resorts, and liveaboards across Indonesia and the Philippines.',
    images: [
      {
        url: '/DJI_aerial_hero.webp',
        width: 1200,
        height: 630,
        alt: 'Aerial coastal photography by Thu Tides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thu Tides - Professional Travel & Underwater Photography',
    description: 'Professional photography and video content for coastal hotels, dive resorts, and liveaboards across Indonesia and the Philippines.',
    images: ['/DJI_aerial_hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Organization schema
      {
        '@type': 'Organization',
        '@id': 'https://thu-tides.com/#organization',
        name: 'Thu Tides',
        url: 'https://thu-tides.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://thu-tides.com/DJI_aerial_hero.webp',
        },
        sameAs: [
          'https://instagram.com/thu.tides',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          availableLanguage: ['English'],
        },
      },
      // Professional Service schema
      {
        '@type': 'ProfessionalService',
        '@id': 'https://thu-tides.com/#service',
        name: 'Thu Tides',
        description: 'Professional photography and video content creation for coastal hospitality brands, specializing in underwater and aerial photography across Indonesia and the Philippines.',
        url: 'https://thu-tides.com',
        priceRange: '$$',
        areaServed: [
          {
            '@type': 'Country',
            name: 'Indonesia',
          },
          {
            '@type': 'Country',
            name: 'Philippines',
          },
        ],
        serviceType: [
          'Hotel Photography',
          'Resort Photography',
          'Underwater Photography',
          'Aerial Photography',
          'Video Production',
          'Content Creation',
          'Travel Photography',
        ],
        image: 'https://thu-tides.com/DJI_aerial_hero.webp',
      },
    ],
  }

  return (
    <html lang="en" className={notoSans.variable} style={{ colorScheme: "light dark" }}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
