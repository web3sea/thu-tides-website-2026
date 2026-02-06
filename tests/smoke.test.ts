/**
 * Smoke Test - Quick validation that testing infrastructure works
 *
 * Run with: pnpm test tests/smoke.test.ts
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import puppeteer, { Browser, Page } from 'puppeteer';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const TEST_TIMEOUT = 30000;

describe('Smoke Test - Infrastructure Validation', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
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

  test('should launch browser successfully', () => {
    expect(browser).toBeDefined();
  });

  test('should create new page', async () => {
    page = await browser.newPage();
    expect(page).toBeDefined();
  });

  test('should navigate to giga-demo page', async () => {
    await page.goto(`${BASE_URL}/giga-demo`, {
      waitUntil: 'networkidle0',
      timeout: TEST_TIMEOUT,
    });

    const url = page.url();
    expect(url).toContain('/giga-demo');
  });

  test('should find navigation element', async () => {
    const nav = await page.$('nav');
    expect(nav).not.toBeNull();
  });

  test('should find main hero section', async () => {
    const main = await page.$('main');
    expect(main).not.toBeNull();
  });

  test('should render page title', async () => {
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should have viewport responsive meta tag', async () => {
    const viewportMeta = await page.$('meta[name="viewport"]');
    expect(viewportMeta).not.toBeNull();
  });

  test('should execute JavaScript', async () => {
    const result = await page.evaluate(() => {
      return 2 + 2;
    });
    expect(result).toBe(4);
  });

  afterAll(async () => {
    if (page) {
      await page.close();
    }
  });
});
