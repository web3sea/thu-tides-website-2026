/**
 * Shared test setup utilities for Puppeteer E2E tests
 */

import puppeteer, { Browser, Page } from 'puppeteer';

export interface BrowserContext {
  browser: Browser;
  page: Page;
}

export interface ViewportConfig {
  width: number;
  height: number;
  deviceScaleFactor: number;
  isMobile: boolean;
}

export const VIEWPORTS = {
  mobile: {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    isMobile: true,
  },
  tablet: {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    isMobile: false,
  },
  desktop: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    isMobile: false,
  },
} as const;

/**
 * Launch a Puppeteer browser instance with common config
 */
export async function setupBrowser(
  headless: boolean = true
): Promise<BrowserContext> {
  const browser = await puppeteer.launch({
    headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Set default viewport
  await page.setViewport(VIEWPORTS.desktop);

  // Set timeout for all operations
  page.setDefaultTimeout(30000);

  return { browser, page };
}

/**
 * Teardown browser instance
 */
export async function teardownBrowser(context: BrowserContext): Promise<void> {
  if (context.page) {
    await context.page.close();
  }
  if (context.browser) {
    await context.browser.close();
  }
}

/**
 * Get base URL for tests (defaults to localhost:3000)
 */
export function getBaseUrl(): string {
  return process.env.TEST_BASE_URL || 'http://localhost:3000';
}

/**
 * Wait for element to be visible
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout: number = 10000
): Promise<void> {
  await page.waitForSelector(selector, {
    visible: true,
    timeout,
  });
}

/**
 * Fill form field by selector
 */
export async function fillFormField(
  page: Page,
  selector: string,
  value: string
): Promise<void> {
  await page.waitForSelector(selector);
  await page.click(selector, { clickCount: 3 }); // Select all existing text
  await page.keyboard.press('Backspace'); // Clear field
  await page.type(selector, value, { delay: 10 });
}

/**
 * Get text content of element
 */
export async function getElementText(
  page: Page,
  selector: string
): Promise<string> {
  await page.waitForSelector(selector);
  return page.$eval(selector, (el) => el.textContent || '');
}

/**
 * Check if element exists on page
 */
export async function elementExists(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { timeout });
    return true;
  } catch {
    return false;
  }
}

/**
 * Wait for navigation to complete
 */
export async function waitForNavigation(page: Page): Promise<void> {
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
}

/**
 * Capture screenshot for debugging
 */
export async function captureScreenshot(
  page: Page,
  name: string
): Promise<void> {
  const screenshotPath = `screenshots/${name}-${Date.now()}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Screenshot saved: ${screenshotPath}`);
}
