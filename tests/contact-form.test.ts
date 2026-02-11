/**
 * Contact Form E2E Tests
 *
 * Tests the contact form UI behavior including:
 * - Form field display
 * - Validation
 * - Submission flow
 * - Toast notifications
 * - Form reset
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import {
  setupBrowser,
  teardownBrowser,
  getBaseUrl,
  waitForElement,
  BrowserContext,
} from './helpers/test-setup';
import {
  fillContactForm,
  submitContactForm,
  waitForToast,
  hasSuccessToast,
  hasErrorToast,
  isFormCleared,
  isSubmitButtonDisabled,
  getSubmitButtonText,
} from './helpers/form-helpers';
import {
  VALID_CONTACT_FORM,
  VALID_CONTACT_EMAIL_ONLY,
  VALID_CONTACT_WHATSAPP_ONLY,
  INVALID_EMAIL_FORMAT,
  MISSING_CONTACT_METHOD,
} from './fixtures/test-data';

describe('Contact Form E2E Tests', () => {
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

  describe('Form Display', () => {
    it('should display all required form fields', async () => {
      await context.page.goto(`${baseUrl}/#contact`);

      // Wait for contact section to load
      await waitForElement(context.page, '#contact');

      // Check that all form fields exist
      const nameField = await context.page.$('#name');
      const emailField = await context.page.$('#email');
      const whatsappField = await context.page.$('#whatsapp');
      const inquiryField = await context.page.$('#inquiry');
      const submitButton = await context.page.$('button[type="submit"]');

      expect(nameField).not.toBeNull();
      expect(emailField).not.toBeNull();
      expect(whatsappField).not.toBeNull();
      expect(inquiryField).not.toBeNull();
      expect(submitButton).not.toBeNull();
    });

    it('should have correct field labels', async () => {
      await context.page.goto(`${baseUrl}/#contact`);
      await waitForElement(context.page, '#contact');

      const labels = await context.page.evaluate(() => {
        const nameLabel = document.querySelector('label[for="name"]')?.textContent;
        const emailLabel = document.querySelector('label[for="email"]')?.textContent;
        const whatsappLabel = document.querySelector('label[for="whatsapp"]')?.textContent;
        const inquiryLabel = document.querySelector('label[for="inquiry"]')?.textContent;

        return { nameLabel, emailLabel, whatsappLabel, inquiryLabel };
      });

      expect(labels.nameLabel).toContain('Name');
      expect(labels.emailLabel).toContain('Email');
      expect(labels.whatsappLabel).toContain('WhatsApp');
      expect(labels.inquiryLabel).toContain('Inquiry');
    });
  });

  describe('Client-Side Validation', () => {
    it('should require name field', async () => {
      await context.page.goto(`${baseUrl}/#contact`);
      await waitForElement(context.page, '#contact');

      // Try to submit without name
      await fillContactForm(context.page, {
        name: '',
        email: 'test@example.com',
        whatsapp: '',
        inquiry: 'Test inquiry',
      });

      await submitContactForm(context.page);

      // HTML5 validation should prevent submission
      const isInvalid = await context.page.evaluate(() => {
        const nameInput = document.querySelector('#name') as HTMLInputElement;
        return !nameInput.validity.valid;
      });

      expect(isInvalid).toBe(true);
    });

    it('should require either email OR whatsapp', async () => {
      await context.page.goto(`${baseUrl}/#contact`);
      await waitForElement(context.page, '#contact');

      // Fill form without email or WhatsApp
      await fillContactForm(context.page, MISSING_CONTACT_METHOD);
      await submitContactForm(context.page);

      // Should show error toast
      const toastText = await waitForToast(context.page);
      expect(toastText).toContain('email');
      expect(toastText).toContain('WhatsApp');
    });

    it('should validate email format', async () => {
      await context.page.goto(`${baseUrl}/#contact`);
      await waitForElement(context.page, '#contact');

      // Fill form with invalid email
      await fillContactForm(context.page, {
        ...INVALID_EMAIL_FORMAT,
        email: 'not-an-email',
      } as any);

      await submitContactForm(context.page);

      // Wait a moment for potential API call
      await context.page.waitForTimeout(1000);

      // Should either show HTML5 validation or error toast
      const hasError = await hasErrorToast(context.page);
      const isInvalid = await context.page.evaluate(() => {
        const emailInput = document.querySelector('#email') as HTMLInputElement;
        return emailInput.value && !emailInput.validity.valid;
      });

      expect(hasError || isInvalid).toBe(true);
    });
  });

  describe('Form Submission', () => {
    it('should prevent double submission', async () => {
      await context.page.goto(`${baseUrl}/#contact`);
      await waitForElement(context.page, '#contact');

      // Fill valid form
      await fillContactForm(context.page, VALID_CONTACT_FORM);

      // Check button is enabled initially
      const initiallyDisabled = await isSubmitButtonDisabled(context.page);
      expect(initiallyDisabled).toBe(false);

      // Submit form
      await submitContactForm(context.page);

      // Check button shows loading state
      const buttonText = await getSubmitButtonText(context.page);
      expect(buttonText).toContain('Sending');

      // Button should be disabled during submission
      const disabledDuringSubmit = await isSubmitButtonDisabled(context.page);
      expect(disabledDuringSubmit).toBe(true);
    });

    it('should show success toast on successful submission', async () => {
      await context.page.goto(`${baseUrl}/#contact`);
      await waitForElement(context.page, '#contact');

      // Fill and submit valid form
      await fillContactForm(context.page, VALID_CONTACT_FORM);
      await submitContactForm(context.page);

      // Wait for success toast
      const toastText = await waitForToast(context.page);
      expect(toastText.toLowerCase()).toContain('thank you');
    });

    it('should reset form after successful submission', async () => {
      await context.page.goto(`${baseUrl}/#contact`);
      await waitForElement(context.page, '#contact');

      // Fill and submit
      await fillContactForm(context.page, VALID_CONTACT_FORM);
      await submitContactForm(context.page);

      // Wait for success
      await waitForToast(context.page);

      // Wait a moment for form reset
      await context.page.waitForTimeout(1000);

      // Check if form is cleared
      const isCleared = await isFormCleared(context.page);
      expect(isCleared).toBe(true);
    });

    it('should accept submission with email only', async () => {
      await context.page.goto(`${baseUrl}/#contact`);
      await waitForElement(context.page, '#contact');

      await fillContactForm(context.page, VALID_CONTACT_EMAIL_ONLY);
      await submitContactForm(context.page);

      const hasSuccess = await hasSuccessToast(context.page);
      expect(hasSuccess).toBe(true);
    });

    it('should accept submission with WhatsApp only', async () => {
      await context.page.goto(`${baseUrl}/#contact`);
      await waitForElement(context.page, '#contact');

      await fillContactForm(context.page, VALID_CONTACT_WHATSAPP_ONLY);
      await submitContactForm(context.page);

      const hasSuccess = await hasSuccessToast(context.page);
      expect(hasSuccess).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should show error toast on API failure', async () => {
      await context.page.goto(`${baseUrl}/#contact`);
      await waitForElement(context.page, '#contact');

      // Intercept API request and force failure
      await context.page.setRequestInterception(true);

      context.page.once('request', (interceptedRequest) => {
        if (interceptedRequest.url().includes('/api/contact')) {
          interceptedRequest.respond({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Internal server error' }),
          });
        } else {
          interceptedRequest.continue();
        }
      });

      // Fill and submit
      await fillContactForm(context.page, VALID_CONTACT_FORM);
      await submitContactForm(context.page);

      // Should show error toast
      const hasError = await hasErrorToast(context.page);
      expect(hasError).toBe(true);

      // Clean up interception
      await context.page.setRequestInterception(false);
    });
  });
});
