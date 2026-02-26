'use client';

import Script from 'next/script';

interface GoogleTagProps {
  tagId: string;
}

const GT_ID_REGEX = /^GT-[A-Z0-9]+$/;

export function GoogleTag({ tagId }: GoogleTagProps) {
  if (!tagId || !GT_ID_REGEX.test(tagId)) {
    return null;
  }

  const safeId = JSON.stringify(tagId);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
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
