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
    default: 'Thu Tides - Island Photography & Coastal Adventures',
  },
  description: 'Explore the Philippines through stunning underwater and aerial photography. Join Thu Tides on expeditions discovering hidden islands, vibrant reefs, and coastal beauty in shades of blue.',
  keywords: ['Philippines photography', 'underwater photography', 'travel photography', 'island adventures', 'coastal photography', 'aerial photography', 'dive photography', 'Philippines travel'],
  authors: [{ name: 'Thu Tides' }],
  creator: 'Thu Tides',
  publisher: 'Thu Tides',
  metadataBase: new URL('https://thu-tides-website-2026-8zuawrgms-coraltriangle-uat.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Thu Tides',
    title: 'Thu Tides - Island Photography & Coastal Adventures',
    description: 'Explore the Philippines through stunning underwater and aerial photography.',
    images: [
      {
        url: '/DJI_aerial_hero.webp',
        width: 1200,
        height: 630,
        alt: 'Aerial view of Philippine coastal tides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thu Tides - Island Photography & Coastal Adventures',
    description: 'Explore the Philippines through stunning underwater and aerial photography.',
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
  return (
    <html lang="en" className={notoSans.variable} style={{ colorScheme: "light dark" }}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
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
