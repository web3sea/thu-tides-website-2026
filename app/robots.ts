import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/giga-demo/'],
      },
    ],
    sitemap: 'https://thu-tides-website-2026-8zuawrgms-coraltriangle-uat.vercel.app/sitemap.xml',
  }
}
