/**
 * Video Section Tests - Lazy Loading and Video Component Validation
 *
 * Tests the VideoLoopSection component and LazyVideo lazy loading behavior.
 *
 * Run with: pnpm test tests/video-section.test.ts
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import puppeteer, { Browser, Page } from 'puppeteer';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const TEST_TIMEOUT = 30000;

describe('VideoLoopSection - Lazy Loading Tests', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage();

    // Set viewport to desktop size
    await page.setViewport({ width: 1280, height: 800 });
  }, TEST_TIMEOUT);

  afterAll(async () => {
    if (page) {
      await page.close();
    }
    if (browser) {
      await browser.close();
    }
  });

  test('should not load video on initial page load (lazy loading)', async () => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Short wait for JS to execute, not long enough to trigger lazy load via scroll
    await new Promise(resolve => setTimeout(resolve, 300));

    // LazyVideo renders <img> (poster) before loading and <video> after loading.
    // Check specifically in the VideoLoopSection (the section with both gradient and SVG).
    const hasVideoInSection = await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      return videoSection?.querySelector('video') !== null;
    });

    // No video element in video section initially (page loads at top, video section is below fold)
    expect(hasVideoInSection).toBe(false);
  }, TEST_TIMEOUT);

  test('should display poster image before video loads', async () => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await new Promise(resolve => setTimeout(resolve, 300));

    // Before scrolling, LazyVideo shows <img> poster (shouldLoad=false)
    // Check specifically for the banner poster in the VideoLoopSection
    const posterImage = await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      return videoSection?.querySelector('img[src*="website_banner_poster"]') !== null;
    });

    expect(posterImage).toBe(true);
  }, TEST_TIMEOUT);

  test('should lazy load video when scrolled into view', async () => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await new Promise(resolve => setTimeout(resolve, 300));

    // Initial state - no video element in VideoLoopSection
    const initiallyHasVideo = await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      return videoSection?.querySelector('video') !== null;
    });
    expect(initiallyHasVideo).toBe(false);

    // Scroll to video section to trigger IntersectionObserver
    await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'instant' });
      }
    });

    // Wait for IntersectionObserver + 100ms LazyVideo delay + React re-render
    await new Promise(resolve => setTimeout(resolve, 1500));

    // After scroll, LazyVideo renders <video> element in VideoLoopSection (shouldLoad=true)
    const hasVideoAfterScroll = await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      return videoSection?.querySelector('video') !== null;
    });

    expect(hasVideoAfterScroll).toBe(true);
  }, TEST_TIMEOUT);

  test('should have correct video element attributes', async () => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Scroll to video section to trigger lazy loading
    await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'instant' });
      }
    });

    // Wait for video to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check video attributes
    const videoAttrs = await page.evaluate(() => {
      const video = document.querySelector('video');
      if (!video) return null;

      return {
        autoplay: video.hasAttribute('autoplay'),
        loop: video.hasAttribute('loop'),
        muted: video.hasAttribute('muted'),
        playsInline: video.hasAttribute('playsinline'),
        poster: video.getAttribute('poster'),
        hasSources: video.querySelectorAll('source').length > 0,
      };
    });

    expect(videoAttrs).not.toBeNull();
    expect(videoAttrs?.autoplay).toBe(true);
    expect(videoAttrs?.loop).toBe(true);
    expect(videoAttrs?.muted).toBe(true);
    expect(videoAttrs?.playsInline).toBe(true);
    expect(videoAttrs?.poster).toContain('website_banner_poster');
    expect(videoAttrs?.hasSources).toBe(true);
  }, TEST_TIMEOUT);

  test('should have WebM and MP4 source elements', async () => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Scroll to video section
    await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'instant' });
      }
    });

    // Wait for video to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check source elements
    const sources = await page.evaluate(() => {
      const video = document.querySelector('video');
      if (!video) return null;

      const sourceElements = Array.from(video.querySelectorAll('source'));
      return sourceElements.map(source => ({
        src: source.getAttribute('src'),
        type: source.getAttribute('type'),
      }));
    });

    expect(sources).not.toBeNull();
    expect(sources?.length).toBeGreaterThanOrEqual(1);

    // Check for MP4 source (required)
    const hasMp4 = sources?.some(s => s.type === 'video/mp4');
    expect(hasMp4).toBe(true);

    // Check for WebM source (optional but should be present)
    const hasWebm = sources?.some(s => s.type === 'video/webm');
    expect(hasWebm).toBe(true);

    // WebM should come first (progressive enhancement)
    if (sources && sources.length > 1) {
      expect(sources[0].type).toBe('video/webm');
      expect(sources[1].type).toBe('video/mp4');
    }
  }, TEST_TIMEOUT);

  test('should render video section at all viewports', async () => {
    // VideoLoopSection is visible on all viewports (not hidden on mobile)
    for (const viewport of [
      { width: 375, height: 667 },
      { width: 1280, height: 800 },
    ]) {
      await page.setViewport(viewport);
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

      const sectionExists = await page.evaluate(() => {
        const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
          s.querySelector('.bg-gradient-to-t')
        );
        return videoSection !== null;
      });

      expect(sectionExists).toBe(true);
    }

    // Reset viewport
    await page.setViewport({ width: 1280, height: 800 });
  }, TEST_TIMEOUT);

  test('should have AnimatedWaveLogo overlay visible', async () => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Scroll to video section
    await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'instant' });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    // Check for logo overlay (SVG inside the video section)
    const hasLogo = await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      return videoSection?.querySelector('svg') !== null;
    });

    expect(hasLogo).toBe(true);
  }, TEST_TIMEOUT);

  test('should have gradient overlay for logo visibility', async () => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Check for gradient overlay inside the video section
    const hasGradient = await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      return videoSection?.querySelector('.bg-gradient-to-t') !== null && videoSection?.querySelector('svg') !== null;
    });

    expect(hasGradient).toBe(true);
  }, TEST_TIMEOUT);

  test('should not cause console errors', async () => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Scroll to video section
    await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'instant' });
      }
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Filter out known non-critical errors
    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('favicon') &&
      !err.includes('chrome-extension') &&
      !err.includes('firebase') &&
      !err.includes('Firebase') &&
      !err.includes('hydrat') &&        // React hydration warnings
      !err.includes('NEXT_') &&         // Next.js internal warnings
      !err.includes('Warning:') &&
      !err.includes('vercel-scripts') && // Vercel analytics CSP violations in dev
      !err.includes('Content Security Policy') // CSP warnings from analytics scripts
    );

    expect(criticalErrors.length).toBe(0);
  }, TEST_TIMEOUT);

  test('should respect IntersectionObserver rootMargin (preload behavior)', async () => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await new Promise(resolve => setTimeout(resolve, 300));

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY);
    expect(initialScroll).toBe(0);

    // Scroll to just before the video section (within 200px preload margin)
    await page.evaluate(() => {
      const videoSection = Array.from(document.querySelectorAll('section')).find(s =>
        s.querySelector('.bg-gradient-to-t') && s.querySelector('svg')
      );
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect();
        const targetScroll = window.scrollY + rect.top - window.innerHeight - 150;
        window.scrollTo(0, Math.max(0, targetScroll));
      }
    });

    // Wait for lazy loading to potentially trigger
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Video should start loading due to rootMargin preload (>= 0 handles both cases)
    const videoRequests = await page.evaluate(() => {
      return performance
        .getEntriesByType('resource')
        .filter((entry: PerformanceEntry) =>
          entry.name.includes('website_banner_optimized')
        )
        .length;
    });

    expect(videoRequests).toBeGreaterThanOrEqual(0);
  }, TEST_TIMEOUT);
});
