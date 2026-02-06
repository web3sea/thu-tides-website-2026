import { MetadataRoute } from 'next'

/**
 * Dynamic sitemap for Thu Tides
 * Next.js will automatically generate this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thutides.com'
  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Add more pages as they're created
    // Example for future service pages:
    // {
    //   url: `${baseUrl}/services/photography`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}
