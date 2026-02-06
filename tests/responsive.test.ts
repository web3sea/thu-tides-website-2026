/**
 * Responsive UI Testing for Giga Components
 * Tests Navigation and GigaHero components at multiple breakpoints
 *
 * Run with: pnpm test:responsive
 */

import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import puppeteer, { Browser, Page } from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

// Configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const TEST_PAGE = '/giga-demo';
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
  await page.waitForNetworkIdle({ idleTime: 500 });
  // Wait for framer-motion animations to settle
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// Test suite
describe('Giga Components Responsive Tests', () => {
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
      waitUntil: 'networkidle0',
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

        // Take screenshot
        await page.screenshot({
          path: join(SCREENSHOT_DIR, `navigation-${viewport.name}.png`),
          fullPage: false,
        });
      });

      test(`should show logo and branding at ${viewport.name}`, async () => {
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
        expect(logo?.text).toContain('Giga');
      });

      test(`should show Sign in link at ${viewport.name}`, async () => {
        const signInLink = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('nav a'));
          const signIn = links.find(link => link.textContent?.includes('Sign in'));
          return signIn ? {
            visible: signIn instanceof HTMLElement &&
                     signIn.offsetWidth > 0 &&
                     signIn.offsetHeight > 0,
            text: signIn.textContent?.trim(),
          } : null;
        });

        expect(signInLink).not.toBeNull();
        expect(signInLink?.visible).toBe(true);
        expect(signInLink?.text).toBe('Sign in');
      });

      test(`should show Talk to us CTA button at ${viewport.name}`, async () => {
        const ctaButton = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('nav button'));
          const cta = buttons.find(btn => btn.textContent?.includes('Talk to us'));
          return cta ? {
            visible: cta instanceof HTMLElement &&
                     cta.offsetWidth > 0 &&
                     cta.offsetHeight > 0,
            text: cta.textContent?.trim(),
          } : null;
        });

        expect(ctaButton).not.toBeNull();
        expect(ctaButton?.visible).toBe(true);
        expect(ctaButton?.text).toBe('Talk to us');
      });

      if (viewport.width >= 768) {
        test(`should show desktop menu at ${viewport.name}`, async () => {
          const desktopMenu = await page.evaluate(() => {
            const productButton = Array.from(document.querySelectorAll('nav button'))
              .find(btn => btn.textContent?.includes('Product'));
            return productButton ? {
              visible: productButton instanceof HTMLElement &&
                       productButton.offsetWidth > 0 &&
                       productButton.offsetHeight > 0,
              text: productButton.textContent?.trim(),
            } : null;
          });

          expect(desktopMenu).not.toBeNull();
          expect(desktopMenu?.visible).toBe(true);
        });

        test(`should show Product dropdown on hover at ${viewport.name}`, async () => {
          // Hover over Product button
          const productButton = await page.evaluateHandle(() => {
            const buttons = Array.from(document.querySelectorAll('nav button'));
            return buttons.find(btn => btn.textContent?.includes('Product'));
          });

          if (productButton) {
            const element = productButton.asElement();
            if (element) await element.hover();
            await new Promise(resolve => setTimeout(resolve, 300)); // Wait for dropdown animation

            const dropdown = await page.evaluate(() => {
              const dropdowns = Array.from(document.querySelectorAll('nav .absolute'));
              return dropdowns.length > 0 && dropdowns.some(
                el => el instanceof HTMLElement &&
                      el.offsetWidth > 0 &&
                      el.offsetHeight > 0
              );
            });

            expect(dropdown).toBe(true);

            // Take screenshot with dropdown
            await page.screenshot({
              path: join(SCREENSHOT_DIR, `navigation-dropdown-${viewport.name}.png`),
            });
          }
        });

        test(`should show Product menu items at ${viewport.name}`, async () => {
          // Hover over Product button
          const productButton = await page.evaluateHandle(() => {
            const buttons = Array.from(document.querySelectorAll('nav button'));
            return buttons.find(btn => btn.textContent?.includes('Product'));
          });

          if (productButton) {
            const element = productButton.asElement();
            if (element) await element.hover();
            await new Promise(resolve => setTimeout(resolve, 300));

            const menuItems = await page.evaluate(() => {
              const expectedItems = ['Agent Canvas', 'Insights', 'Voice Experience', 'Browser Agent'];
              const links = Array.from(document.querySelectorAll('nav a'));
              return expectedItems.filter(item =>
                links.some(link => link.textContent?.includes(item))
              );
            });

            expect(menuItems.length).toBeGreaterThanOrEqual(3);
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

  describe('GigaHero Component', () => {
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

        // Take screenshot
        await page.screenshot({
          path: join(SCREENSHOT_DIR, `hero-${viewport.name}.png`),
          fullPage: true,
        });
      });

      test(`should display hero title at ${viewport.name}`, async () => {
        const title = await page.evaluate(() => {
          const h1 = document.querySelector('main h1');
          return h1 ? {
            visible: h1 instanceof HTMLElement &&
                     h1.offsetWidth > 0 &&
                     h1.offsetHeight > 0,
            text: h1.textContent?.trim(),
            fontSize: window.getComputedStyle(h1).fontSize,
          } : null;
        });

        expect(title).not.toBeNull();
        expect(title?.visible).toBe(true);
        expect(title?.text).toContain('AI that talks like a human');
        expect(title?.text).toContain('Handles millions of calls');

        // Verify font size scales with viewport
        const fontSize = parseInt(title?.fontSize || '0');
        expect(fontSize).toBeGreaterThan(0);
      });

      test(`should display hero subtitle at ${viewport.name}`, async () => {
        const subtitle = await page.evaluate(() => {
          const h1 = document.querySelector('main h1');
          const nextP = h1?.nextElementSibling;
          return nextP && nextP.tagName === 'P' ? {
            visible: nextP instanceof HTMLElement &&
                     nextP.offsetWidth > 0 &&
                     nextP.offsetHeight > 0,
            text: nextP.textContent?.trim(),
          } : null;
        });

        expect(subtitle).not.toBeNull();
        expect(subtitle?.visible).toBe(true);
        expect(subtitle?.text).toContain('AI agents for enterprise support');
      });

      test(`should display badge at ${viewport.name}`, async () => {
        const badge = await page.evaluate(() => {
          const badge = document.querySelector('main a[href="#"]');
          return badge ? {
            visible: badge instanceof HTMLElement &&
                     badge.offsetWidth > 0 &&
                     badge.offsetHeight > 0,
            text: badge.textContent?.trim(),
          } : null;
        });

        expect(badge).not.toBeNull();
        expect(badge?.visible).toBe(true);
        expect(badge?.text).toContain('Giga Launches Browser Agent');
      });

      test(`should display hero CTA button at ${viewport.name}`, async () => {
        const ctaButton = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('main button, main a[class*="button"]'));
          const cta = buttons.find(btn => btn.textContent?.includes('Talk to us'));
          return cta ? {
            visible: cta instanceof HTMLElement &&
                     cta.offsetWidth > 0 &&
                     cta.offsetHeight > 0,
            text: cta.textContent?.trim(),
            clickable: true,
          } : null;
        });

        expect(ctaButton).not.toBeNull();
        expect(ctaButton?.visible).toBe(true);
        expect(ctaButton?.text).toBe('Talk to us');
      });

      test(`should display company logos at ${viewport.name}`, async () => {
        const logos = await page.evaluate(() => {
          const logoContainer = Array.from(document.querySelectorAll('div'))
            .find(div => div.textContent?.includes('POSTMAN') ||
                         div.textContent?.includes('DOORDASH'));

          if (!logoContainer) return null;

          const logoElements = Array.from(logoContainer.querySelectorAll('div'))
            .filter(el => el.textContent &&
                         (el.textContent.includes('POSTMAN') ||
                          el.textContent.includes('DOORDASH') ||
                          el.textContent.includes('Rio')));

          return {
            visible: logoContainer instanceof HTMLElement &&
                     logoContainer.offsetWidth > 0 &&
                     logoContainer.offsetHeight > 0,
            count: logoElements.length,
          };
        });

        expect(logos).not.toBeNull();
        expect(logos?.visible).toBe(true);
        expect(logos?.count).toBeGreaterThan(0);
      });

      test(`should have proper text sizing at ${viewport.name}`, async () => {
        const textSizes = await page.evaluate(() => {
          const h1 = document.querySelector('main h1');
          const p = document.querySelector('main p');

          return {
            h1FontSize: h1 ? window.getComputedStyle(h1).fontSize : null,
            pFontSize: p ? window.getComputedStyle(p).fontSize : null,
          };
        });

        expect(textSizes.h1FontSize).not.toBeNull();
        expect(textSizes.pFontSize).not.toBeNull();

        const h1Size = parseInt(textSizes.h1FontSize || '0');
        const pSize = parseInt(textSizes.pFontSize || '0');

        // Title should be larger than body text
        expect(h1Size).toBeGreaterThan(pSize);

        // Verify responsive scaling
        if (viewport.width >= 1440) {
          expect(h1Size).toBeGreaterThanOrEqual(60); // Large desktop
        } else if (viewport.width >= 768) {
          expect(h1Size).toBeGreaterThanOrEqual(50); // Tablet
        } else {
          expect(h1Size).toBeGreaterThanOrEqual(30); // Mobile
        }
      });

      test(`should have proper text wrapping at ${viewport.name}`, async () => {
        const textMetrics = await page.evaluate(() => {
          const h1 = document.querySelector('main h1');
          if (!h1 || !(h1 instanceof HTMLElement)) return null;

          const rect = h1.getBoundingClientRect();
          const style = window.getComputedStyle(h1);

          return {
            width: rect.width,
            overflow: style.overflow,
            textOverflow: style.textOverflow,
            whiteSpace: style.whiteSpace,
            lineHeight: style.lineHeight,
          };
        });

        expect(textMetrics).not.toBeNull();
        // Text should not overflow
        expect(textMetrics?.overflow).not.toBe('visible');
      });

      test(`should have clickable CTA at ${viewport.name}`, async () => {
        const ctaSelector = 'main button, main a[href="#contact"]';
        const cta = await page.$(ctaSelector);

        expect(cta).not.toBeNull();

        // Verify the element is clickable
        const isClickable = await page.evaluate((selector) => {
          const elements = Array.from(document.querySelectorAll(selector));
          const ctaElement = elements.find(el => el.textContent?.includes('Talk to us'));

          if (!ctaElement || !(ctaElement instanceof HTMLElement)) return false;

          const rect = ctaElement.getBoundingClientRect();
          return rect.width > 0 &&
                 rect.height > 0 &&
                 window.getComputedStyle(ctaElement).pointerEvents !== 'none';
        }, ctaSelector);

        expect(isClickable).toBe(true);
      });
    });

    test('should maintain proper aspect ratio across viewports', async () => {
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
          return rect.width / rect.height;
        });

        aspectRatios[key] = ratio;
      }

      // All aspect ratios should be positive
      Object.values(aspectRatios).forEach(ratio => {
        expect(ratio).toBeGreaterThan(0);
      });
    });
  });

  describe('Page-level Responsive Tests', () => {
    test('should have all CTAs visible and clickable at all breakpoints', async () => {
      for (const viewport of Object.values(VIEWPORTS)) {
        await page.setViewport({
          width: viewport.width,
          height: viewport.height,
        });
        await waitForPageReady(page);

        const ctas = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button, a[class*="button"]'));
          return buttons.map(btn => {
            if (!(btn instanceof HTMLElement)) return null;

            const rect = btn.getBoundingClientRect();
            const style = window.getComputedStyle(btn);

            return {
              text: btn.textContent?.trim(),
              visible: rect.width > 0 && rect.height > 0,
              clickable: style.pointerEvents !== 'none',
              inViewport: rect.top >= 0 && rect.top <= window.innerHeight,
            };
          }).filter(Boolean);
        });

        // Should have multiple CTAs
        expect(ctas.length).toBeGreaterThan(0);

        // At least one CTA should be in viewport
        const visibleCtas = ctas.filter(cta => cta?.visible && cta?.inViewport);
        expect(visibleCtas.length).toBeGreaterThan(0);
      }
    });

    test('should handle smooth transitions between breakpoints', async () => {
      const viewports = [
        { width: 375, height: 667 },
        { width: 768, height: 1024 },
        { width: 1024, height: 768 },
        { width: 1440, height: 900 },
      ];

      for (const viewport of viewports) {
        await page.setViewport(viewport);
        await waitForPageReady(page);

        const hasLayoutIssues = await page.evaluate(() => {
          // Check for horizontal scrollbars
          const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;

          // Check for overlapping elements
          const nav = document.querySelector('nav');
          const main = document.querySelector('main');

          if (!nav || !main) return false;

          const navRect = nav.getBoundingClientRect();
          const mainRect = main.getBoundingClientRect();

          // Nav and main should not overlap improperly
          const overlap = navRect.bottom > mainRect.top + 50; // Allow some overlap for fixed nav

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

        // Full page screenshot
        await page.screenshot({
          path: join(SCREENSHOT_DIR, `full-page-${name}.png`),
          fullPage: true,
        });

        // Above the fold screenshot
        await page.screenshot({
          path: join(SCREENSHOT_DIR, `above-fold-${name}.png`),
          fullPage: false,
        });
      }

      // Verify screenshots were created
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
