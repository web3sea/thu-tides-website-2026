/**
 * Form testing helper utilities
 */

import { Page } from 'puppeteer';
import { fillFormField, waitForElement, elementExists } from './test-setup';

export interface ContactFormData {
  name: string;
  email: string;
  whatsapp: string;
  inquiry: string;
}

/**
 * Fill out the contact form with provided data
 */
export async function fillContactForm(
  page: Page,
  data: Partial<ContactFormData>
): Promise<void> {
  // Wait for form to be visible
  await waitForElement(page, 'form');

  // Fill name field if provided
  if (data.name !== undefined) {
    await fillFormField(page, '#name', data.name);
  }

  // Fill email field if provided
  if (data.email !== undefined) {
    await fillFormField(page, '#email', data.email);
  }

  // Fill WhatsApp field if provided
  if (data.whatsapp !== undefined) {
    await fillFormField(page, '#whatsapp', data.whatsapp);
  }

  // Fill inquiry field if provided
  if (data.inquiry !== undefined) {
    await fillFormField(page, '#inquiry', data.inquiry);
  }
}

/**
 * Submit the contact form
 */
export async function submitContactForm(page: Page): Promise<void> {
  // Wait for submit button
  await waitForElement(page, 'button[type="submit"]');

  // Click submit button
  await page.click('button[type="submit"]');
}

/**
 * Check if form validation error is displayed
 */
export async function hasValidationError(page: Page): Promise<boolean> {
  // Check for HTML5 validation messages
  const hasInvalidField = await page.evaluate(() => {
    const inputs = Array.from(
      document.querySelectorAll('input[required], textarea[required]')
    );
    return inputs.some((input) => !(input as HTMLInputElement).validity.valid);
  });

  return hasInvalidField;
}

/**
 * Wait for toast notification to appear
 */
export async function waitForToast(
  page: Page,
  timeout: number = 5000
): Promise<string> {
  try {
    // Wait for Sonner toast to appear
    await page.waitForSelector('[data-sonner-toast]', { timeout });

    // Get toast text content
    const toastText = await page.$eval(
      '[data-sonner-toast]',
      (el) => el.textContent || ''
    );

    return toastText.trim();
  } catch (error) {
    throw new Error('Toast notification did not appear within timeout');
  }
}

/**
 * Check if success toast is displayed
 */
export async function hasSuccessToast(page: Page): Promise<boolean> {
  try {
    const exists = await elementExists(page, '[data-sonner-toast][data-type="success"]', 3000);
    return exists;
  } catch {
    return false;
  }
}

/**
 * Check if error toast is displayed
 */
export async function hasErrorToast(page: Page): Promise<boolean> {
  const exists = await elementExists(page, '[data-sonner-toast][data-type="error"]', 3000);
  return exists;
}

/**
 * Check if form fields are cleared (reset)
 */
export async function isFormCleared(page: Page): Promise<boolean> {
  const values = await page.evaluate(() => {
    const name = (document.querySelector('#name') as HTMLInputElement)?.value;
    const email = (document.querySelector('#email') as HTMLInputElement)?.value;
    const whatsapp = (document.querySelector('#whatsapp') as HTMLInputElement)?.value;
    const inquiry = (document.querySelector('#inquiry') as HTMLTextAreaElement)?.value;

    return { name, email, whatsapp, inquiry };
  });

  return (
    !values.name &&
    !values.email &&
    !values.whatsapp &&
    !values.inquiry
  );
}

/**
 * Check if submit button is disabled
 */
export async function isSubmitButtonDisabled(page: Page): Promise<boolean> {
  return page.$eval(
    'button[type="submit"]',
    (button) => (button as HTMLButtonElement).disabled
  );
}

/**
 * Get submit button text
 */
export async function getSubmitButtonText(page: Page): Promise<string> {
  return page.$eval(
    'button[type="submit"]',
    (button) => button.textContent?.trim() || ''
  );
}
