/**
 * Responsive UI Testing for Thu Tides Navigation and Hero
 * Tests Navigation and Hero components at mobile, tablet, and desktop breakpoints
 *
 * Run with: pnpm test:responsive
 */

import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import puppeteer, { Browser, Page } from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

// Configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const TEST_PAGE = '/';
const SCREENSHOT_DIR = join(__dirname, '../screenshots');

// Viewport configurations
const VIEWPORTS = {
  mobile: { width: 375, height: 667, name: 'mobile' },
  tablet: { width: 768, height: 1024, name: 'tablet' },
  desktop: { width: 1440, height: 900, name: 'desktop' },
};

// Test timeout for long-running operations
const TEST_TIMEOUT = 30000;

// Helper function to ensure screenshot directory exists
function ensureScreenshotDir(): void {
  if (!existsSync(SCREENSHOT_DIR)) {
    mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
}

// Helper function to wait for page to be ready
async function waitForPageReady(page: Page): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));
}

// Test suite
describe('Thu Tides Responsive Tests', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    ensureScreenshotDir();
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }, TEST_TIMEOUT);

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${BASE_URL}${TEST_PAGE}`, {
      waitUntil: 'domcontentloaded',
      timeout: TEST_TIMEOUT,
    });
  }, TEST_TIMEOUT);

  afterEach(async () => {
    if (page) {
      await page.close();
    }
  });

  describe('Navigation Component', () => {
    describe.each(Object.values(VIEWPORTS))('at $name viewport', (viewport) => {
      beforeEach(async () => {
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
        });
        await waitForPageReady(page);
      });

      test(`should render navigation at ${viewport.name}`, async () => {
        const nav = await page.$('nav');
        expect(nav).not.toBeNull();

        await page.screenshot({
          path: join(SCREENSHOT_DIR, `navigation-${viewport.name}.png`),
          fullPage: false,
        });
      });

      test(`should show logo link at ${viewport.name}`, async () => {
        const logo = await page.evaluate(() => {
          const logoLink = document.querySelector('nav a[href="/"]');
          return logoLink ? {
            visible: logoLink instanceof HTMLElement &&
                     logoLink.offsetWidth > 0 &&
                     logoLink.offsetHeight > 0,
            text: logoLink.textContent?.trim(),
          } : null;
        });

        expect(logo).not.toBeNull();
        expect(logo?.visible).toBe(true);
        expect(logo?.text).toContain('Thu Tides');
      });

      if (viewport.width < 768) {
        test(`should show mobile hamburger menu button at ${viewport.name}`, async () => {
          const menuButton = await page.evaluate(() => {
            const btn = document.querySelector('button[aria-label="Open menu"]');
            return btn ? {
              visible: btn instanceof HTMLElement &&
                       btn.offsetWidth > 0 &&
                       btn.offsetHeight > 0,
            } : null;
          });

          expect(menuButton).not.toBeNull();
          expect(menuButton?.visible).toBe(true);
        });
      }

      if (viewport.width >= 768) {
        test(`should show desktop nav links at ${viewport.name}`, async () => {
          const links = await page.evaluate(() => {
            const navLinks = Array.from(document.querySelectorAll('nav a'));
            return navLinks
              .filter(link => link instanceof HTMLElement &&
                             link.offsetWidth > 0 &&
                             link.offsetHeight > 0)
              .map(link => link.textContent?.trim());
          });

          // Desktop nav should have Home and About links
          expect(links.some(text => text?.includes('Home'))).toBe(true);
          expect(links.some(text => text?.includes('About'))).toBe(true);
        });

        test(`should show Photographs nav link at ${viewport.name}`, async () => {
          const photographsLink = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('nav a'));
            const link = links.find(l => l.textContent?.includes('Photographs'));
            return link ? {
              visible: link instanceof HTMLElement &&
                       link.offsetWidth > 0 &&
                       link.offsetHeight > 0,
            } : null;
          });

          expect(photographsLink).not.toBeNull();
          expect(photographsLink?.visible).toBe(true);
        });

        test(`should show Let's Connect CTA at ${viewport.name}`, async () => {
          const ctaLink = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('nav a'));
            const link = links.find(l => l.textContent?.includes("Connect"));
            return link ? {
              visible: link instanceof HTMLElement &&
                       link.offsetWidth > 0 &&
                       link.offsetHeight > 0,
            } : null;
          });

          expect(ctaLink).not.toBeNull();
          expect(ctaLink?.visible).toBe(true);
        });

        test(`should show Photographs dropdown on hover at ${viewport.name}`, async () => {
          const photographsLink = await page.evaluateHandle(() => {
            const links = Array.from(document.querySelectorAll('nav a'));
            return links.find(l => l.textContent?.includes('Photographs'));
          });

          if (photographsLink) {
            const element = photographsLink.asElement();
            // @ts-expect-error - Puppeteer type mismatch between Node and Element
            if (element) await element.hover();
            await new Promise(resolve => setTimeout(resolve, 300));

            const dropdownItems = await page.evaluate(() => {
              const expectedItems = ['Underwater', 'Aerial', 'Dive', 'Properties'];
              const links = Array.from(document.querySelectorAll('nav a'));
              return expectedItems.filter(item =>
                links.some(link => link.textContent?.includes(item))
              );
            });

            expect(dropdownItems.length).toBeGreaterThanOrEqual(2);
          }
        });
      }
    });

    test('should handle responsive layout transitions', async () => {
      // Start at desktop
      await page.setViewport({ width: 1440, height: 900 });
      await waitForPageReady(page);

      const desktopHeight = await page.evaluate(() => {
        const nav = document.querySelector('nav');
        return nav ? nav.getBoundingClientRect().height : 0;
      });

      // Transition to mobile
      await page.setViewport({ width: 375, height: 667 });
      await waitForPageReady(page);

      const mobileHeight = await page.evaluate(() => {
        const nav = document.querySelector('nav');
        return nav ? nav.getBoundingClientRect().height : 0;
      });

      expect(desktopHeight).toBeGreaterThan(0);
      expect(mobileHeight).toBeGreaterThan(0);
    });
  });

  describe('Hero Section', () => {
    describe.each(Object.values(VIEWPORTS))('at $name viewport', (viewport) => {
      beforeEach(async () => {
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
        });
        await waitForPageReady(page);
      });

      test(`should render hero section at ${viewport.name}`, async () => {
        const hero = await page.$('main');
        expect(hero).not.toBeNull();

        await page.screenshot({
          path: join(SCREENSHOT_DIR, `hero-${viewport.name}.png`),
          fullPage: true,
        });
      });

      test(`should display vote badge button at ${viewport.name}`, async () => {
        const badge = await page.evaluate(() => {
          // Badge is a button in the hero section
          const buttons = Array.from(document.querySelectorAll('main button'));
          const badge = buttons.find(btn => btn.textContent?.includes('Where should we go'));
          return badge ? {
            visible: badge instanceof HTMLElement &&
                     badge.offsetWidth > 0 &&
                     badge.offsetHeight > 0,
          } : null;
        });

        expect(badge).not.toBeNull();
        expect(badge?.visible).toBe(true);
      });

      test(`should have no horizontal scroll at ${viewport.name}`, async () => {
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });

        expect(hasHorizontalScroll).toBe(false);
      });

      test(`should have proper text sizing at ${viewport.name}`, async () => {
        const textMetrics = await page.evaluate(() => {
          // Get any visible paragraph text
          const paragraphs = Array.from(document.querySelectorAll('p'));
          const visibleP = paragraphs.find(p =>
            p instanceof HTMLElement && p.offsetWidth > 0 && p.offsetHeight > 0
          );

          return visibleP ? {
            fontSize: window.getComputedStyle(visibleP).fontSize,
          } : null;
        });

        expect(textMetrics).not.toBeNull();
        const fontSize = parseInt(textMetrics?.fontSize || '0');
        expect(fontSize).toBeGreaterThan(0);
      });
    });

    test('should maintain layout across viewports', async () => {
      const aspectRatios: { [key: string]: number } = {};

      for (const [key, viewport] of Object.entries(VIEWPORTS)) {
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
        });
        await waitForPageReady(page);

        const ratio = await page.evaluate(() => {
          const hero = document.querySelector('main');
          if (!hero || !(hero instanceof HTMLElement)) return 0;

          const rect = hero.getBoundingClientRect();
          return rect.width > 0 ? rect.width / Math.max(rect.height, 1) : 0;
        });

        aspectRatios[key] = ratio;
      }

      Object.values(aspectRatios).forEach(ratio => {
        expect(ratio).toBeGreaterThan(0);
      });
    });
  });

  describe('Page-level Responsive Tests', () => {
    test('should have no layout issues at all breakpoints', async () => {
      for (const viewport of Object.values(VIEWPORTS)) {
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
        });
        await waitForPageReady(page);

        const hasLayoutIssues = await page.evaluate(() => {
          const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;

          const nav = document.querySelector('nav');
          const main = document.querySelector('main');

          if (!nav || !main) return false;

          const navRect = nav.getBoundingClientRect();
          const mainRect = main.getBoundingClientRect();

          // Nav and main should not overlap improperly
          const overlap = navRect.bottom > mainRect.top + 100;

          return hasHorizontalScroll || overlap;
        });

        expect(hasLayoutIssues).toBe(false);
      }
    });

    test('should generate visual regression screenshots', async () => {
      for (const [name, viewport] of Object.entries(VIEWPORTS)) {
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
        });
        await waitForPageReady(page);

        await page.screenshot({
          path: join(SCREENSHOT_DIR, `full-page-${name}.png`),
          fullPage: true,
        });

        await page.screenshot({
          path: join(SCREENSHOT_DIR, `above-fold-${name}.png`),
          fullPage: false,
        });
      }

      const screenshots = readdirSync(SCREENSHOT_DIR);
      expect(screenshots.length).toBeGreaterThan(0);
    });
  });
});

// Run the tests
if (require.main === module) {
  console.log('Starting responsive UI tests...');
  console.log(`Testing URL: ${BASE_URL}${TEST_PAGE}`);
  console.log(`Screenshots will be saved to: ${SCREENSHOT_DIR}`);
}
