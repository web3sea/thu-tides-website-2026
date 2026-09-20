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
  VIEWPORTS,
} from './helpers/test-setup';
import { buildResults, LOCATION_COUNT } from './fixtures/vote-results';

const BADGE = 'button[aria-label$="Click to vote"]';
// The component renders a mobile and a desktop container; the suite runs at the desktop
// viewport. Puppeteer's visible wait only inspects the first match of a selector, so the
// two need distinct ids or the hidden mobile one shadows the visible desktop one.
const DROPDOWN = '[data-testid="vote-dropdown-desktop"]';
const DROPDOWN_MOBILE = '[data-testid="vote-dropdown-mobile"]';
// Location rows are buttons whose text ends in a percentage, e.g. "Flores23.5%". Always
// query them inside DROPDOWN: the hidden mobile panel holds an identical set of rows.
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
      // Navigation between tests aborts in-flight requests, so respond/continue can
      // reject after the fact; that is expected and must not surface as an unhandled
      // rejection in the next test.
      const swallow = () => {};
      if (url.includes(RESULTS_URL)) {
        seen.results += 1;
        reply(req, resultsReply, resultsDelayMs).catch(swallow);
      } else if (url.includes(VOTE_URL) && req.method() === 'POST') {
        let body: { location: string };
        try {
          body = JSON.parse(req.postData() || '{}');
        } catch {
          reply(req, { status: 400, body: { error: 'bad json' } }, 0).catch(swallow);
          return;
        }
        seen.votes.push(body.location);
        reply(req, voteReply(body), voteDelayMs).catch(swallow);
      } else {
        req.continue().catch(swallow);
      }
    });
    // The component remembers a vote in localStorage; start every page load fresh.
    await context.page.evaluateOnNewDocument(() => localStorage.removeItem('thu-tides-voted'));
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
    await context.page.goto(baseUrl);
    await waitForElement(context.page, 'main');
  });

  async function openDropdown(panel: string = DROPDOWN) {
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
      await context.page.waitForSelector(panel, { visible: true, timeout: 3000 });
    } catch {
      // One retry covers the rare click that lands in the same tick as hydration,
      // but only if nothing opened; a second click on an open panel would close it.
      if (!(await context.page.$(panel))) await badge!.click();
      await context.page.waitForSelector(panel, { visible: true, timeout: 5000 });
    }
  }

  async function waitForLocationRows(panel: string = DROPDOWN) {
    await context.page.waitForFunction(
      (sel: string, re: string, n: number) =>
        Array.from(document.querySelectorAll<HTMLButtonElement>(`${sel} button`)).filter((b) =>
          new RegExp(re).test(b.textContent || '')
        ).length === n,
      { timeout: 5000 },
      panel,
      PERCENT.source,
      LOCATION_COUNT
    );
  }

  function readRows() {
    return context.page.evaluate((sel: string, re: string) => {
      return Array.from(document.querySelectorAll<HTMLButtonElement>(`${sel} button`))
        .filter((b) => new RegExp(re).test(b.textContent || ''))
        .map((b) => {
          const m = (b.textContent || '').match(/(\d+\.\d+)%/);
          return { text: b.textContent || '', percentage: m ? parseFloat(m[1]) : 0 };
        });
    }, DROPDOWN, PERCENT.source);
  }

  // A real mouse click (mousedown -> mouseup -> click), not element.click(). The
  // document-level close handler listens on mousedown, so a synthetic click
  // cannot see a panel that tears itself down when a row is pressed.
  async function clickFirstRow(panel: string = DROPDOWN) {
    const rows = await context.page.$$(`${panel} button`);
    for (const row of rows) {
      const text = await context.page.evaluate((el: Element) => el.textContent || '', row);
      if (PERCENT.test(text)) {
        await row.click();
        return;
      }
    }
    throw new Error(`No location row found in ${panel}`);
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

    it('should keep the panel open after voting so the result is visible', async () => {
      // Regression: the close-on-outside-click handler used to test only the
      // trigger, so pressing a location row closed the panel on mousedown and
      // the voter never saw the confirmation or the updated percentages.
      await openDropdown();
      await waitForLocationRows();
      await clickFirstRow();

      // Scoped to the panel, not document.body: the point is that the footer is
      // rendered INSIDE a panel that is still mounted.
      await context.page.waitForFunction(
        (sel: string) =>
          (document.querySelector(sel)?.textContent || '').includes('Thanks for voting'),
        { timeout: 5000 },
        DROPDOWN
      );

      // Settle past the 200ms exit transition: elementExists would otherwise match
      // a panel already animating away.
      await new Promise((r) => setTimeout(r, 500));
      expect(await elementExists(context.page, DROPDOWN, 500)).toBe(true);
    });

    it('should show "You have already voted" message on duplicate vote attempt', async () => {
      // A returning visitor whose browser state was cleared: the server still knows the IP
      // and answers 409. The component must surface the message and lock the rows.
      voteReply = () => ({ status: 409, body: { error: 'You have already voted', success: false } });
      await openDropdown();
      await waitForLocationRows();
      await clickFirstRow();

      await context.page.waitForFunction(
        () => (document.body.textContent || '').toLowerCase().includes('already voted'),
        { timeout: 5000 }
      );
      const rows = await context.page.evaluate(
        (sel: string) =>
          Array.from(document.querySelectorAll<HTMLButtonElement>(`${sel} button`)).map((b) => b.disabled),
        DROPDOWN
      );
      expect(rows.length).toBe(LOCATION_COUNT);
      expect(rows.every(Boolean)).toBe(true);
      expect(seen.votes.length).toBe(1);
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
    it('should expose open state on the trigger via aria-expanded', async () => {
      const expanded = () =>
        context.page.$eval(BADGE, (el: Element) => el.getAttribute('aria-expanded'));

      expect(await expanded()).toBe('false');
      await openDropdown();
      expect(await expanded()).toBe('true');
    });

    it('should not point aria-controls at an element that does not exist', async () => {
      // The panels are unmounted while closed, so any IDREF here dangles in the
      // common case. No aria-controls is correct; a broken one is not.
      const dangling = await context.page.$eval(BADGE, (el: Element) => {
        const ids = (el.getAttribute('aria-controls') || '').split(/\s+/).filter(Boolean);
        return ids.filter((id) => document.getElementById(id) === null);
      });
      expect(dangling).toEqual([]);
    });

    it('should close on Escape', async () => {
      await openDropdown();
      await waitForLocationRows();

      await context.page.keyboard.press('Escape');

      await context.page.waitForFunction(
        (sel: string) => document.querySelector(sel) === null,
        { timeout: 3000 },
        DROPDOWN
      );
      expect(await context.page.$eval(BADGE, (el: Element) => el.getAttribute('aria-expanded'))).toBe(
        'false'
      );
    });

    // The mobile panel is a card centred on a full-screen backdrop. Its ref is on the
    // card, so pressing the backdrop counts as outside -- this replaced a backdrop
    // onClick handler and nothing else covers it.
    describe('at mobile viewport', () => {
      beforeEach(async () => {
        await context.page.setViewport(VIEWPORTS.mobile);
        await context.page.goto(baseUrl);
        await waitForElement(context.page, 'main');
      });

      afterAll(async () => {
        await context.page.setViewport(VIEWPORTS.desktop);
      });

      it('should be a modal dialog that takes focus and gives it back', async () => {
        await openDropdown(DROPDOWN_MOBILE);
        await waitForLocationRows(DROPDOWN_MOBILE);

        const dialog = await context.page.$eval(`${DROPDOWN_MOBILE} [role="dialog"]`, (el: Element) => ({
          ariaModal: el.getAttribute('aria-modal'),
          label: el.getAttribute('aria-label'),
        }));
        expect(dialog.ariaModal).toBe('true');
        expect(dialog.label).toBeTruthy();

        // Focus moved into the dialog rather than staying on the trigger.
        const focusInside = await context.page.evaluate((sel: string) => {
          const panel = document.querySelector(sel);
          return !!panel && !!document.activeElement && panel.contains(document.activeElement);
        }, DROPDOWN_MOBILE);
        expect(focusInside).toBe(true);

        await context.page.keyboard.press('Escape');
        await context.page.waitForFunction(
          (sel: string) => document.querySelector(sel) === null,
          { timeout: 3000 },
          DROPDOWN_MOBILE
        );

        // ...and came back to the trigger on close.
        const focusRestored = await context.page.evaluate(
          (sel: string) => document.activeElement === document.querySelector(sel),
          BADGE
        );
        expect(focusRestored).toBe(true);
      });

      it('should keep focus inside the dialog after voting disables the rows', async () => {
        // The voted row gets `disabled`, so the element holding focus disappears from
        // the tab order and focus used to fall to <body>, leaving the open dialog
        // with nothing to contain.
        await openDropdown(DROPDOWN_MOBILE);
        await waitForLocationRows(DROPDOWN_MOBILE);
        await clickFirstRow(DROPDOWN_MOBILE);
        await context.page.waitForFunction(
          (sel: string) =>
            (document.querySelector(sel)?.textContent || '').includes('Thanks for voting'),
          { timeout: 5000 },
          DROPDOWN_MOBILE
        );

        const active = await context.page.evaluate((sel: string) => {
          const panel = document.querySelector(sel);
          return {
            tag: document.activeElement?.tagName ?? null,
            inside: !!panel && !!document.activeElement && panel.contains(document.activeElement),
          };
        }, DROPDOWN_MOBILE);

        expect(active.tag).not.toBe('BODY');
        expect(active.inside).toBe(true);

        // And Tab still cannot walk out behind the dialog.
        await context.page.keyboard.press('Tab');
        const stillInside = await context.page.evaluate((sel: string) => {
          const panel = document.querySelector(sel);
          return !!panel && !!document.activeElement && panel.contains(document.activeElement);
        }, DROPDOWN_MOBILE);
        expect(stillInside).toBe(true);
      });

      it('should keep the mobile panel open while voting, then close on the backdrop', async () => {
        await openDropdown(DROPDOWN_MOBILE);
        await waitForLocationRows(DROPDOWN_MOBILE);
        await clickFirstRow(DROPDOWN_MOBILE);
        await context.page.waitForFunction(
          (sel: string) =>
            (document.querySelector(sel)?.textContent || '').includes('Thanks for voting'),
          { timeout: 5000 },
          DROPDOWN_MOBILE
        );
        await new Promise((r) => setTimeout(r, 500));
        expect(await elementExists(context.page, DROPDOWN_MOBILE, 500)).toBe(true);

        // Top-left corner is backdrop, outside the centred card.
        await context.page.mouse.click(5, 5);
        await context.page.waitForFunction(
          (sel: string) => document.querySelector(sel) === null,
          { timeout: 3000 },
          DROPDOWN_MOBILE
        );
      });
    });

    it('should trap focus if the viewport narrows into the modal breakpoint', async () => {
      // The "am I the modal twin" test used to run once when the panel opened, so
      // opening at desktop and then narrowing left a visible modal with no trap.
      await openDropdown();
      await waitForLocationRows();

      let inside = false;
      try {
        // Width only, keeping isMobile false: toggling mobile emulation on an already
        // loaded page needs a reload to take effect, and "the viewport narrows" is a
        // pure width change as far as the responsive CSS is concerned.
        await context.page.setViewport({
          width: VIEWPORTS.mobile.width,
          height: VIEWPORTS.mobile.height,
          deviceScaleFactor: 1,
          isMobile: false,
        });
        // Not waitForSelector({ visible: true }): a viewport change mutates no DOM, it
        // only re-evaluates the media query, and waitForSelector polls on mutation so
        // it would never look again. waitForFunction polls per frame.
        await context.page.waitForFunction(
          (sel: string) => {
            const el = document.querySelector(sel);
            return !!el && getComputedStyle(el).display !== 'none';
          },
          { timeout: 5000 },
          DROPDOWN_MOBILE
        );
        await waitForLocationRows(DROPDOWN_MOBILE);

        // Walk further than there are rows; focus must never leave the dialog.
        for (let i = 0; i < LOCATION_COUNT + 3; i++) {
          await context.page.keyboard.press('Tab');
        }

        inside = await context.page.evaluate((sel: string) => {
          const panel = document.querySelector(sel);
          return !!panel && !!document.activeElement && panel.contains(document.activeElement);
        }, DROPDOWN_MOBILE);
      } finally {
        // Restore even on failure, or the mobile viewport leaks into later tests.
        await context.page.setViewport(VIEWPORTS.desktop);
      }
      expect(inside).toBe(true);
    });

    it('should close dropdown when clicking outside', async () => {
      await openDropdown();
      await waitForLocationRows();

      // LocationVoteDropdown closes the panel on any mousedown outside its panels and
      // the badge. Click the top-left corner of the viewport, which is empty; the
      // footer's centre is a column of links.
      await context.page.mouse.click(5, 5);

      await context.page.waitForFunction(
        (sel: string) => document.querySelector(sel) === null,
        { timeout: 3000 },
        DROPDOWN
      );
      expect(await elementExists(context.page, DROPDOWN, 300)).toBe(false);
    });
  });
});
