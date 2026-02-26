'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GA_ID_REGEX = /^G-[A-Z0-9]+$/;

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId || !GA_ID_REGEX.test(measurementId)) {
    return null;
  }

  const safeId = JSON.stringify(measurementId);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${safeId});
        `}
      </Script>
    </>
  );
}
