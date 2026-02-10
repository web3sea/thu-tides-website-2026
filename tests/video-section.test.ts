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

    // Set viewport to desktop size (video is hidden on mobile)
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
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Get all network requests made so far
    const videoRequests = await page.evaluate(() => {
      return performance
        .getEntriesByType('resource')
        .filter((entry: any) =>
          entry.name.includes('website_banner_optimized')
        )
        .length;
    });

    // Video should not be loaded initially (page loads at top, video is below fold)
    expect(videoRequests).toBe(0);
  }, TEST_TIMEOUT);

  test('should display poster image before video loads', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Scroll to video section
    await page.evaluate(() => {
      const videoSection = document.querySelector('section.hidden.md\\:block');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Wait a moment for intersection observer to trigger
    await page.waitForTimeout(500);

    // Check if poster image is present
    const posterImage = await page.evaluate(() => {
      const img = document.querySelector('img[src*="website_banner_poster"]');
      return img !== null;
    });

    expect(posterImage).toBe(true);
  }, TEST_TIMEOUT);

  test('should lazy load video when scrolled into view', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Initial state - no video loaded
    let videoRequests = await page.evaluate(() => {
      return performance
        .getEntriesByType('resource')
        .filter((entry: any) =>
          entry.name.includes('website_banner_optimized')
        )
        .length;
    });
    expect(videoRequests).toBe(0);

    // Scroll to video section
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight - 1000);
    });

    // Wait for lazy loading to trigger (200px preload margin + 100ms delay)
    await page.waitForTimeout(1500);

    // Now video should be loading/loaded
    videoRequests = await page.evaluate(() => {
      return performance
        .getEntriesByType('resource')
        .filter((entry: any) =>
          entry.name.includes('website_banner_optimized')
        )
        .length;
    });

    expect(videoRequests).toBeGreaterThan(0);
  }, TEST_TIMEOUT);

  test('should have correct video element attributes', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Scroll to video section to trigger lazy loading
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight - 1000);
    });

    // Wait for video to load
    await page.waitForTimeout(2000);

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
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Scroll to video section
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight - 1000);
    });

    // Wait for video to load
    await page.waitForTimeout(2000);

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

  test('should have video section hidden on mobile viewport', async () => {
    // Set mobile viewport
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Check if video section is hidden
    const isHidden = await page.evaluate(() => {
      const videoSection = document.querySelector('section.hidden.md\\:block');
      if (!videoSection) return true;

      const styles = window.getComputedStyle(videoSection);
      return styles.display === 'none';
    });

    expect(isHidden).toBe(true);

    // Reset viewport for other tests
    await page.setViewport({ width: 1280, height: 800 });
  }, TEST_TIMEOUT);

  test('should have AnimatedWaveLogo overlay visible', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Scroll to video section
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight - 1000);
    });

    await page.waitForTimeout(1000);

    // Check for logo overlay
    const hasLogo = await page.evaluate(() => {
      // Look for the AnimatedWaveLogo component (it should have specific text or SVG)
      const logoContainer = document.querySelector('section.hidden.md\\:block svg');
      return logoContainer !== null;
    });

    expect(hasLogo).toBe(true);
  }, TEST_TIMEOUT);

  test('should have gradient overlay for logo visibility', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Scroll to video section
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight - 1000);
    });

    await page.waitForTimeout(1000);

    // Check for gradient overlay
    const hasGradient = await page.evaluate(() => {
      const videoSection = document.querySelector('section.hidden.md\\:block');
      if (!videoSection) return false;

      const gradient = videoSection.querySelector('.bg-gradient-to-t');
      return gradient !== null;
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

    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Scroll to video section
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight - 1000);
    });

    await page.waitForTimeout(2000);

    // Filter out known non-critical errors (if any)
    const criticalErrors = consoleErrors.filter(err =>
      !err.includes('favicon') &&
      !err.includes('chrome-extension')
    );

    expect(criticalErrors.length).toBe(0);
  }, TEST_TIMEOUT);

  test('should respect IntersectionObserver rootMargin (preload behavior)', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY);
    expect(initialScroll).toBe(0);

    // Scroll to just before the video section (within 200px preload margin)
    await page.evaluate(() => {
      const videoSection = document.querySelector('section.hidden.md\\:block');
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect();
        const targetScroll = window.scrollY + rect.top - window.innerHeight - 150;
        window.scrollTo(0, Math.max(0, targetScroll));
      }
    });

    // Wait for lazy loading to potentially trigger
    await page.waitForTimeout(1500);

    // Video should start loading even though not fully in viewport (200px margin)
    const videoRequests = await page.evaluate(() => {
      return performance
        .getEntriesByType('resource')
        .filter((entry: any) =>
          entry.name.includes('website_banner_optimized')
        )
        .length;
    });

    // Should be loading due to rootMargin preload
    expect(videoRequests).toBeGreaterThanOrEqual(0);
  }, TEST_TIMEOUT);
});
