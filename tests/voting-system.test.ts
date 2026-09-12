/**
 * Voting System E2E Tests
 *
 * Drives the location voting dropdown in a real browser (Puppeteer) against a
 * running site, with the vote API mocked inside the browser. Mocking keeps the
 * suite hermetic: it never writes real votes to Firestore, it does not need
 * Firebase credentials, and every assertion sees the same data. The real API is
 * covered separately by tests/api/votes.test.ts.
 *
 * Selector rules (Puppeteer, not Playwright):
 * - Puppeteer's CSS engine has no `:has-text()`; use attributes the component
 *   exposes on purpose (`data-testid`, `aria-label`) or `::-p-text(...)`.
 * - Match the badge by its aria-label suffix, and the dropdown by its test id,
 *   so copy changes do not break the suite.
 * - waitForSelector(sel, { visible: true }) checks only the FIRST element that
 *   matches; a hidden responsive twin earlier in the DOM makes it wait forever.
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import type { HTTPRequest } from 'puppeteer';
import {
  setupBrowser,
  teardownBrowser,
  getBaseUrl,
  waitForElement,
  BrowserContext,
  elementExists,
} from './helpers/test-setup';
import { buildResults, LOCATION_COUNT } from './fixtures/vote-results';

const BADGE = 'button[aria-label$="Click to vote"]';
// The component renders a mobile and a desktop container; the suite runs at the desktop
// viewport. Puppeteer's visible wait only inspects the first match of a selector, so the
// two need distinct ids or the hidden mobile one shadows the visible desktop one.
const DROPDOWN = '[data-testid="vote-dropdown-desktop"]';
// Location rows are buttons whose text ends in a percentage, e.g. "Flores23.5%".
const PERCENT = /\d+\.\d+%/;
const RESULTS_URL = '/api/votes/results';
const VOTE_URL = '/api/votes/location';

type MockReply = { status: number; body: unknown };

describe('Voting System E2E Tests', () => {
  let context: BrowserContext;
  const baseUrl = getBaseUrl();

  // Per-test overrides for the mocked API. Reset in beforeEach.
  let resultsReply: MockReply;
  let voteReply: (body: { location: string }) => MockReply;
  let resultsDelayMs = 0;
  let voteDelayMs = 0;
  const seen = { results: 0, votes: [] as string[] };

  const reply = async (req: HTTPRequest, r: MockReply, delay: number) => {
    if (delay) await new Promise((res) => setTimeout(res, delay));
    await req.respond({
      status: r.status,
      contentType: 'application/json',
      body: JSON.stringify(r.body),
    });
  };

  beforeAll(async () => {
    const headless = process.env.CI !== 'false';
    context = await setupBrowser(headless);
    await context.page.setRequestInterception(true);
    context.page.on('request', (req) => {
      const url = req.url();
      if (url.includes(RESULTS_URL)) {
        seen.results += 1;
        void reply(req, resultsReply, resultsDelayMs);
      } else if (url.includes(VOTE_URL) && req.method() === 'POST') {
        const body = JSON.parse(req.postData() || '{}') as { location: string };
        seen.votes.push(body.location);
        void reply(req, voteReply(body), voteDelayMs);
      } else {
        void req.continue();
      }
    });
  });

  afterAll(async () => {
    await teardownBrowser(context);
  });

  beforeEach(async () => {
    resultsReply = { status: 200, body: buildResults() };
    voteReply = ({ location }) => ({
      status: 200,
      body: { success: true, results: buildResults(location) },
    });
    resultsDelayMs = 0;
    voteDelayMs = 0;
    seen.results = 0;
    seen.votes = [];
    // The component remembers a vote in localStorage; start every test fresh.
    await context.page.evaluateOnNewDocument(() => localStorage.removeItem('thu-tides-voted'));
    await context.page.goto(baseUrl);
    await waitForElement(context.page, 'main');
  });

  async function openDropdown() {
    const badge = await context.page.waitForSelector(BADGE, { visible: true, timeout: 10000 });
    expect(badge).not.toBeNull();
    // The badge is server-rendered inside a framer-motion fade-in, so it is visible before
    // React has hydrated and attached its click handler. The fade-in only completes after
    // hydration, so waiting for full opacity is the cheapest "hydrated" signal.
    await context.page.waitForFunction(
      (sel: string) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        return !!el && getComputedStyle(el.parentElement as HTMLElement).opacity === '1';
      },
      { timeout: 15000 },
      BADGE
    );
    await badge!.click();
    try {
      await context.page.waitForSelector(DROPDOWN, { visible: true, timeout: 3000 });
    } catch {
      // One retry covers the rare click that lands in the same tick as hydration.
      await badge!.click();
      await context.page.waitForSelector(DROPDOWN, { visible: true, timeout: 5000 });
    }
  }

  async function waitForLocationRows() {
    await context.page.waitForFunction(
      (re: string, n: number) =>
        Array.from(document.querySelectorAll('button')).filter((b) =>
          new RegExp(re).test(b.textContent || '')
        ).length === n,
      { timeout: 5000 },
      PERCENT.source,
      LOCATION_COUNT
    );
  }

  function readRows() {
    return context.page.evaluate((re: string) => {
      return Array.from(document.querySelectorAll('button'))
        .filter((b) => new RegExp(re).test(b.textContent || ''))
        .map((b) => {
          const m = (b.textContent || '').match(/(\d+\.\d+)%/);
          return { text: b.textContent || '', percentage: m ? parseFloat(m[1]) : 0 };
        });
    }, PERCENT.source);
  }

  function clickFirstRow() {
    return context.page.evaluate((re: string) => {
      const row = Array.from(document.querySelectorAll('button')).find((b) =>
        new RegExp(re).test(b.textContent || '')
      );
      row?.click();
    }, PERCENT.source);
  }

  describe('Vote Dropdown Display', () => {
    it('should open vote dropdown on badge button click', async () => {
      await openDropdown();
      expect(await elementExists(context.page, DROPDOWN, 1000)).toBe(true);
    });

    it('should fetch vote results when dropdown opened', async () => {
      await openDropdown();
      await waitForLocationRows();
      expect(seen.results).toBeGreaterThan(0);
    });

    it('should display all 11 locations with names and percentages', async () => {
      await openDropdown();
      await waitForLocationRows();
      const rows = await readRows();
      expect(rows.length).toBe(LOCATION_COUNT);
      expect(rows.every((r) => PERCENT.test(r.text))).toBe(true);
      expect(rows.some((r) => r.text.includes('Maldives'))).toBe(true);
    });

    it('should show loading state while fetching results', async () => {
      resultsDelayMs = 1500;
      await openDropdown();
      const spinner = await elementExists(context.page, `${DROPDOWN} .animate-spin`, 1000);
      expect(spinner).toBe(true);
      await waitForLocationRows();
    });
  });

  describe('Vote Submission', () => {
    it('should allow voting by clicking location button', async () => {
      await openDropdown();
      await waitForLocationRows();
      await clickFirstRow();
      await context.page.waitForFunction(() => document.body.textContent?.includes('Thanks for voting'), {
        timeout: 5000,
      });
      expect(seen.votes.length).toBe(1);
      expect(seen.votes[0]).toMatch(/^[a-z-]+$/);
    });

    it('should show "You have already voted" message on duplicate vote attempt', async () => {
      await openDropdown();
      await waitForLocationRows();
      await clickFirstRow();
      await context.page.waitForFunction(() => document.body.textContent?.includes('Thanks for voting'), {
        timeout: 5000,
      });

      // Rows are disabled after a vote, so the component's own guard cannot fire from a
      // click. Simulate the server rejecting a second vote from the same visitor instead.
      voteReply = () => ({ status: 409, body: { error: 'You have already voted', success: false } });
      await context.page.evaluate((re: string) => {
        const row = Array.from(document.querySelectorAll('button')).find((b) =>
          new RegExp(re).test(b.textContent || '')
        ) as HTMLButtonElement | undefined;
        if (row) {
          row.disabled = false;
          row.click();
        }
      }, PERCENT.source);

      const toast = await elementExists(
        context.page,
        '[data-sonner-toast][data-type="error"], [role="alert"], [role="status"]',
        3000
      );
      const text = await context.page.evaluate(() => document.body.textContent || '');
      expect(toast || text.toLowerCase().includes('already voted')).toBe(true);
    });

    it('should update vote percentages after successful vote', async () => {
      await openDropdown();
      await waitForLocationRows();
      const before = (await readRows()).map((r) => r.percentage);
      await clickFirstRow();
      await context.page.waitForFunction(() => document.body.textContent?.includes('Thanks for voting'), {
        timeout: 5000,
      });
      const after = (await readRows()).map((r) => r.percentage);
      expect(after).not.toEqual(before);
    });

    it('should show loading spinner during vote submission', async () => {
      voteDelayMs = 1500;
      await openDropdown();
      await waitForLocationRows();
      await clickFirstRow();
      const pending = await elementExists(context.page, `${DROPDOWN} .animate-pulse`, 1000);
      expect(pending).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should show error toast on vote failure', async () => {
      voteReply = () => ({ status: 500, body: { error: 'Internal server error' } });
      await openDropdown();
      await waitForLocationRows();
      await clickFirstRow();
      const hasErrorToast = await elementExists(
        context.page,
        '[data-sonner-toast][data-type="error"], [role="alert"]',
        3000
      );
      expect(hasErrorToast).toBe(true);
    });
  });

  describe('Dropdown Interaction', () => {
    it('should close dropdown when clicking outside', async () => {
      await openDropdown();
      await waitForLocationRows();

      // Click on the page footer, well outside the hero and the dropdown.
      await context.page.evaluate(() => {
        const footer = document.querySelector('footer');
        footer?.scrollIntoView();
      });
      await context.page.click('footer');

      await context.page.waitForFunction(
        (sel: string) => document.querySelector(sel) === null,
        { timeout: 3000 },
        DROPDOWN
      );
      expect(await elementExists(context.page, DROPDOWN, 300)).toBe(false);
    });
  });
});
