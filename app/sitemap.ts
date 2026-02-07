import { MetadataRoute } from 'next'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

/**
 * Dynamic sitemap for Thu Tides
 * Automatically discovers routes from the app directory
 * Next.js will automatically generate this at /sitemap.xml
 */

// Routes to exclude from sitemap (matching robots.txt disallow list)
const EXCLUDED_ROUTES = [
  '/giga-demo',
  '/giga',
]

/**
 * Recursively scan app directory to find all page routes
 */
function discoverRoutes(dir: string, basePath = ''): string[] {
  const routes: string[] = []

  try {
    const entries = readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      // Skip special Next.js files and folders
      if (entry.name.startsWith('_') ||
          entry.name.startsWith('.') ||
          entry.name === 'api' ||
          entry.name === 'sitemap.ts' ||
          entry.name === 'robots.txt') {
        continue
      }

      const fullPath = join(dir, entry.name)

      if (entry.isDirectory()) {
        const routePath = `${basePath}/${entry.name}`

        // Check if this directory contains a page file
        const hasPage = readdirSync(fullPath).some(file =>
          file === 'page.tsx' ||
          file === 'page.ts' ||
          file === 'page.jsx' ||
          file === 'page.js'
        )

        if (hasPage && !EXCLUDED_ROUTES.includes(routePath)) {
          routes.push(routePath)
        }

        // Recursively scan subdirectories
        routes.push(...discoverRoutes(fullPath, routePath))
      }
    }
  } catch (error) {
    // Log error but continue - better to have partial sitemap than none
    if (process.env.NODE_ENV === 'development') {
      console.error('Error discovering routes:', error)
    }
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thutides.com'

  // Use a static date for better caching - update manually when content changes
  // or use git commit date in production
  const lastModified = new Date('2026-02-06')

  // Discover all routes
  const appDir = join(process.cwd(), 'app')
  const discoveredRoutes = discoverRoutes(appDir)

  // Build sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // Add discovered routes
  for (const route of discoveredRoutes) {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  return sitemapEntries
}
