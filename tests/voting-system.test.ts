/**
 * Voting System E2E Tests
 *
 * Tests the location voting dropdown UI behavior including:
 * - Vote dropdown display
 * - Vote results fetching
 * - Vote submission flow
 * - Error handling
 * - Duplicate vote prevention
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import {
  setupBrowser,
  teardownBrowser,
  getBaseUrl,
  waitForElement,
  BrowserContext,
  elementExists,
} from './helpers/test-setup';

describe('Voting System E2E Tests', () => {
  let context: BrowserContext;
  const baseUrl = getBaseUrl();

  beforeAll(async () => {
    // Use headless mode in CI, headed mode for local debugging
    const headless = process.env.CI !== 'false';
    context = await setupBrowser(headless);
  });

  afterAll(async () => {
    await teardownBrowser(context);
  });

  describe('Vote Dropdown Display', () => {
    it('should open vote dropdown on badge button click', async () => {
      await context.page.goto(baseUrl);

      // Wait for page to load
      await waitForElement(context.page, 'main');

      // Find and click the vote badge button (in hero section)
      const badgeButton = await context.page.waitForSelector(
        'button:has-text("Vote"), button:has-text("vote")',
        { timeout: 10000 }
      );
      expect(badgeButton).not.toBeNull();

      await badgeButton?.click();

      // Wait for dropdown to appear
      const dropdownVisible = await elementExists(
        context.page,
        '[data-testid="vote-dropdown"], .vote-dropdown, [role="dialog"]',
        3000
      );

      expect(dropdownVisible).toBe(true);
    });

    it('should fetch vote results when dropdown opened', async () => {
      await context.page.goto(baseUrl);

      // Set up request interception to verify API call
      const apiCalls: string[] = [];
      await context.page.setRequestInterception(true);

      context.page.on('request', (interceptedRequest) => {
        const url = interceptedRequest.url();
        if (url.includes('/api/votes/results')) {
          apiCalls.push(url);
        }
        interceptedRequest.continue();
      });

      // Click vote button
      const badgeButton = await context.page.waitForSelector(
        'button:has-text("Vote"), button:has-text("vote")'
      );
      await badgeButton?.click();

      // Wait for API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Verify API was called
      expect(apiCalls.length).toBeGreaterThan(0);

      // Clean up
      await context.page.setRequestInterception(false);
    });

    it('should display all 11 locations with names and percentages', async () => {
      await context.page.goto(baseUrl);

      // Open dropdown
      const badgeButton = await context.page.waitForSelector(
        'button:has-text("Vote"), button:has-text("vote")'
      );
      await badgeButton?.click();

      // Wait for results to load (spinner should disappear)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get all location buttons
      const locationButtons = await context.page.evaluate(() => {
        // Find buttons that contain percentage text (format: X.X%)
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons
          .filter(btn => /\d+\.\d+%/.test(btn.textContent || ''))
          .map(btn => ({
            text: btn.textContent || '',
            hasPercentage: /\d+\.\d+%/.test(btn.textContent || ''),
          }));
      });

      // Should have 11 locations
      expect(locationButtons.length).toBe(11);

      // All should have percentages
      const allHavePercentages = locationButtons.every(loc => loc.hasPercentage);
      expect(allHavePercentages).toBe(true);
    });

    it('should show loading state while fetching results', async () => {
      await context.page.goto(baseUrl);

      // Click vote button
      const badgeButton = await context.page.waitForSelector(
        'button:has-text("Vote"), button:has-text("vote")'
      );
      await badgeButton?.click();

      // Check for loading spinner immediately after opening
      const hasSpinner = await context.page.evaluate(() => {
        // Look for common spinner classes
        const spinner = document.querySelector(
          '.animate-spin, [role="progressbar"], .spinner'
        );
        return spinner !== null;
      });

      expect(hasSpinner).toBe(true);
    });
  });

  describe('Vote Submission', () => {
    it('should allow voting by clicking location button', async () => {
      await context.page.goto(baseUrl);

      // Open dropdown
      const badgeButton = await context.page.waitForSelector(
        'button:has-text("Vote"), button:has-text("vote")'
      );
      await badgeButton?.click();

      // Wait for results to load
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Set up request interception to capture vote submission
      const voteCalls: string[] = [];
      await context.page.setRequestInterception(true);

      context.page.on('request', (interceptedRequest) => {
        const url = interceptedRequest.url();
        if (url.includes('/api/votes/location')) {
          voteCalls.push(url);
        }
        interceptedRequest.continue();
      });

      // Click first location button
      const locationButtons = await context.page.$$('button');

      // Find button with percentage text (more reliable than async find)
      let voteButton;
      for (const btn of locationButtons) {
        const text = await context.page.evaluate(el => el.textContent, btn);
        if (/\d+\.\d+%/.test(text || '')) {
          voteButton = btn;
          break;
        }
      }

      if (voteButton) {
        await voteButton.click();

        // Wait for API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Verify vote was submitted
        expect(voteCalls.length).toBeGreaterThan(0);
      }

      // Clean up
      await context.page.setRequestInterception(false);
    });

    it('should show "You have already voted" message on duplicate vote attempt', async () => {
      await context.page.goto(baseUrl);

      // Open dropdown
      const badgeButton = await context.page.waitForSelector(
        'button:has-text("Vote"), button:has-text("vote")'
      );
      await badgeButton?.click();

      // Wait for results
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Try to click a location button twice
      const locationButtons = await context.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.filter(btn => /\d+\.\d+%/.test(btn.textContent || ''));
      });

      if (locationButtons.length > 0) {
        // Click first location
        await context.page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const voteBtn = buttons.find(btn => /\d+\.\d+%/.test(btn.textContent || ''));
          voteBtn?.click();
        });

        // Wait for vote to process
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Try to click again
        await context.page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          const voteBtn = buttons.find(btn => /\d+\.\d+%/.test(btn.textContent || ''));
          voteBtn?.click();
        });

        // Wait for potential toast
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check for error message
        const hasErrorMessage = await context.page.evaluate(() => {
          const bodyText = document.body.textContent || '';
          return bodyText.toLowerCase().includes('already voted');
        });

        expect(hasErrorMessage).toBe(true);
      }
    });

    it('should update vote percentages after successful vote', async () => {
      await context.page.goto(baseUrl);

      // Open dropdown
      const badgeButton = await context.page.waitForSelector(
        'button:has-text("Vote"), button:has-text("vote")'
      );
      await badgeButton?.click();

      // Wait for results
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get initial percentages
      const initialPercentages = await context.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons
          .filter(btn => /\d+\.\d+%/.test(btn.textContent || ''))
          .map(btn => {
            const match = btn.textContent?.match(/(\d+\.\d+)%/);
            return match ? parseFloat(match[1]) : 0;
          });
      });

      // Submit vote
      await context.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const voteBtn = buttons.find(btn => /\d+\.\d+%/.test(btn.textContent || ''));
        voteBtn?.click();
      });

      // Wait for vote to process and UI to update
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Get updated percentages
      const updatedPercentages = await context.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons
          .filter(btn => /\d+\.\d+%/.test(btn.textContent || ''))
          .map(btn => {
            const match = btn.textContent?.match(/(\d+\.\d+)%/);
            return match ? parseFloat(match[1]) : 0;
          });
      });

      // Percentages should change after vote
      expect(updatedPercentages).not.toEqual(initialPercentages);
    });

    it('should show loading spinner during vote submission', async () => {
      await context.page.goto(baseUrl);

      // Open dropdown
      const badgeButton = await context.page.waitForSelector(
        'button:has-text("Vote"), button:has-text("vote")'
      );
      await badgeButton?.click();

      // Wait for results
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Click vote button and immediately check for loading state
      await context.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const voteBtn = buttons.find(btn => /\d+\.\d+%/.test(btn.textContent || ''));
        voteBtn?.click();
      });

      // Check for loading indicator (... or spinner)
      await new Promise(resolve => setTimeout(resolve, 100));

      const hasLoadingIndicator = await context.page.evaluate(() => {
        const bodyText = document.body.textContent || '';
        return bodyText.includes('...') ||
               document.querySelector('.animate-pulse') !== null;
      });

      expect(hasLoadingIndicator).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should show error toast on vote failure', async () => {
      await context.page.goto(baseUrl);

      // Open dropdown
      const badgeButton = await context.page.waitForSelector(
        'button:has-text("Vote"), button:has-text("vote")'
      );
      await badgeButton?.click();

      // Wait for results
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Intercept and force failure
      await context.page.setRequestInterception(true);

      context.page.once('request', (interceptedRequest) => {
        if (interceptedRequest.url().includes('/api/votes/location')) {
          interceptedRequest.respond({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Internal server error' }),
          });
        } else {
          interceptedRequest.continue();
        }
      });

      // Try to vote
      await context.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const voteBtn = buttons.find(btn => /\d+\.\d+%/.test(btn.textContent || ''));
        voteBtn?.click();
      });

      // Wait for error toast
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check for error toast
      const hasErrorToast = await elementExists(
        context.page,
        '[data-sonner-toast][data-type="error"], [role="alert"]',
        3000
      );

      expect(hasErrorToast).toBe(true);

      // Clean up
      await context.page.setRequestInterception(false);
    });
  });

  describe('Dropdown Interaction', () => {
    it('should close dropdown when clicking outside', async () => {
      await context.page.goto(baseUrl);

      // Open dropdown
      const badgeButton = await context.page.waitForSelector(
        'button:has-text("Vote"), button:has-text("vote")'
      );
      await badgeButton?.click();

      // Wait for dropdown to open
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verify dropdown is open
      const isOpenBefore = await elementExists(
        context.page,
        '[data-testid="vote-dropdown"], .vote-dropdown, [role="dialog"]',
        1000
      );
      expect(isOpenBefore).toBe(true);

      // Click outside dropdown (on main content area)
      await context.page.click('main');

      // Wait for close animation
      await new Promise(resolve => setTimeout(resolve, 500));

      // Verify dropdown is closed
      const isOpenAfter = await elementExists(
        context.page,
        '[data-testid="vote-dropdown"], .vote-dropdown, [role="dialog"]',
        500
      );
      expect(isOpenAfter).toBe(false);
    });
  });
});
