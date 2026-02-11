/**
 * Voting system testing helper utilities
 */

import { Page } from 'puppeteer';
import { waitForElement, elementExists } from './test-setup';

/**
 * Open the location voting dropdown
 */
export async function openVoteDropdown(page: Page): Promise<void> {
  // Wait for page to load
  await waitForElement(page, 'main');

  // Find and click the vote badge button
  const badgeButton = await page.waitForSelector(
    'button:has-text("Vote"), button:has-text("vote")',
    { timeout: 10000 }
  );

  if (!badgeButton) {
    throw new Error('Vote button not found');
  }

  await badgeButton.click();

  // Wait for dropdown to appear
  await new Promise(resolve => setTimeout(resolve, 500));
}

/**
 * Wait for vote results to load in dropdown
 */
export async function waitForVoteResults(
  page: Page,
  timeout: number = 3000
): Promise<void> {
  // Wait for loading spinner to disappear
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const isLoading = await page.evaluate(() => {
      const spinner = document.querySelector('.animate-spin');
      return spinner !== null;
    });

    if (!isLoading) {
      // Wait a bit more for results to render
      await new Promise(resolve => setTimeout(resolve, 500));
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 200));
  }

  throw new Error('Vote results did not load within timeout');
}

/**
 * Get all location names and percentages from dropdown
 */
export async function getLocationResults(page: Page): Promise<Array<{ name: string; percentage: number }>> {
  return page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const locationButtons = buttons.filter(btn => /\d+\.\d+%/.test(btn.textContent || ''));

    return locationButtons.map(btn => {
      const text = btn.textContent || '';
      const percentageMatch = text.match(/(\d+\.\d+)%/);
      const percentage = percentageMatch ? parseFloat(percentageMatch[1]) : 0;
      const name = text.replace(/\d+\.\d+%/, '').trim();

      return { name, percentage };
    });
  });
}

/**
 * Click on a location to vote
 */
export async function clickLocationVote(page: Page, locationName?: string): Promise<void> {
  if (locationName) {
    // Click specific location by name
    await page.evaluate((name) => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const targetButton = buttons.find(btn => {
        const text = btn.textContent || '';
        return text.includes(name) && /\d+\.\d+%/.test(text);
      });

      if (targetButton) {
        (targetButton as HTMLElement).click();
      } else {
        throw new Error(`Location button for "${name}" not found`);
      }
    }, locationName);
  } else {
    // Click first available location
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const voteBtn = buttons.find(btn => /\d+\.\d+%/.test(btn.textContent || ''));

      if (voteBtn) {
        (voteBtn as HTMLElement).click();
      } else {
        throw new Error('No location buttons found');
      }
    });
  }
}

/**
 * Check if dropdown is showing loading spinner
 */
export async function isDropdownLoading(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const spinner = document.querySelector('.animate-spin');
    return spinner !== null;
  });
}

/**
 * Check if dropdown shows "already voted" state
 */
export async function hasAlreadyVotedMessage(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const bodyText = document.body.textContent || '';
    return bodyText.toLowerCase().includes('already voted');
  });
}

/**
 * Check if dropdown is visible
 */
export async function isDropdownVisible(page: Page): Promise<boolean> {
  return elementExists(
    page,
    '[data-testid="vote-dropdown"], .vote-dropdown, [role="dialog"]',
    1000
  );
}

/**
 * Close dropdown by clicking outside
 */
export async function closeDropdownByClickingOutside(page: Page): Promise<void> {
  await page.click('main');
  await new Promise(resolve => setTimeout(resolve, 500));
}

/**
 * Wait for vote submission to complete
 */
export async function waitForVoteSubmission(page: Page, timeout: number = 5000): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const isSubmitting = await page.evaluate(() => {
      // Check for loading indicators
      const bodyText = document.body.textContent || '';
      const hasEllipsis = bodyText.includes('...');
      const hasPulse = document.querySelector('.animate-pulse') !== null;

      return hasEllipsis || hasPulse;
    });

    if (!isSubmitting) {
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 200));
  }
}

/**
 * Check if toast notification is displayed
 */
export async function hasToast(page: Page, type?: 'success' | 'error'): Promise<boolean> {
  if (type) {
    return elementExists(
      page,
      `[data-sonner-toast][data-type="${type}"], [role="alert"]`,
      3000
    );
  }

  return elementExists(
    page,
    '[data-sonner-toast], [role="alert"]',
    3000
  );
}

/**
 * Get toast message text
 */
export async function getToastText(page: Page): Promise<string | null> {
  try {
    await page.waitForSelector('[data-sonner-toast], [role="alert"]', { timeout: 3000 });
    return page.$eval(
      '[data-sonner-toast], [role="alert"]',
      (el) => el.textContent || ''
    );
  } catch {
    return null;
  }
}
