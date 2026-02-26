/**
 * Contact API Route Tests
 *
 * Tests the /api/contact POST endpoint including:
 * - Input validation
 * - Rate limiting
 * - Success response
 *
 * Note: Slack and Brevo integration tests are excluded because nock cannot
 * intercept HTTP calls made from the Next.js server process (only same-process
 * calls can be intercepted). Those integrations should be tested via manual
 * testing or with real credentials in a staging environment.
 */

import { describe, it, expect } from '@jest/globals';

const API_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const CONTACT_ENDPOINT = `${API_URL}/api/contact`;

interface ContactPayload {
  name: string;
  email: string;
  whatsapp: string;
  inquiry: string;
}

// Use a unique IP prefix per test run to avoid rate limit state bleeding
// between tests. Each test that needs to avoid rate limiting gets a unique IP.
let testIpCounter = 1;
function uniqueTestIp(): string {
  return `10.0.${Math.floor(testIpCounter / 255)}.${testIpCounter++ % 255}`;
}

describe('Contact API Tests', () => {
  describe('Input Validation', () => {
    it('should return 400 for missing name', async () => {
      const payload: Partial<ContactPayload> = {
        name: '',
        email: 'test@example.com',
        whatsapp: '',
        inquiry: 'Test inquiry',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': uniqueTestIp(),
        },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toContain('required');
    });

    it('should return 400 for missing inquiry', async () => {
      const payload: Partial<ContactPayload> = {
        name: 'Test User',
        email: 'test@example.com',
        whatsapp: '',
        inquiry: '',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': uniqueTestIp(),
        },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toContain('required');
    });

    it('should return 400 when neither email nor WhatsApp provided', async () => {
      const payload: Partial<ContactPayload> = {
        name: 'Test User',
        email: '',
        whatsapp: '',
        inquiry: 'Test inquiry',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': uniqueTestIp(),
        },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error.toLowerCase()).toContain('email');
      expect(data.error.toLowerCase()).toContain('whatsapp');
    });

    it('should return 400 for invalid email format', async () => {
      const payload: ContactPayload = {
        name: 'Test User',
        email: 'not-an-email',
        whatsapp: '',
        inquiry: 'Test inquiry',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': uniqueTestIp(),
        },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error.toLowerCase()).toContain('email');
    });

    it('should return 400 when name exceeds max length', async () => {
      const payload: ContactPayload = {
        name: 'A'.repeat(201), // Max is 200
        email: 'test@example.com',
        whatsapp: '',
        inquiry: 'Test inquiry',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': uniqueTestIp(),
        },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error.toLowerCase()).toContain('length');
    });

    it('should return 400 when inquiry exceeds max length', async () => {
      const payload: ContactPayload = {
        name: 'Test User',
        email: 'test@example.com',
        whatsapp: '',
        inquiry: 'A'.repeat(5001), // Max is 5000
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': uniqueTestIp(),
        },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error.toLowerCase()).toContain('length');
    });

    it('should accept whitespace-padded fields and return 200', async () => {
      // The API trims whitespace before validation and processing.
      // Slack/Brevo calls may fail in CI (no credentials) but are non-blocking.
      const payload: ContactPayload = {
        name: '  Test User  ',
        email: '  test@example.com  ',
        whatsapp: '  +1234567890  ',
        inquiry: '  Test inquiry  ',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': uniqueTestIp(),
        },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(200);
    });
  });

  describe('Rate Limiting', () => {
    it('should return 429 when rate limit exceeded', async () => {
      // Use a dedicated IP so this test does not interfere with others
      const testIp = '192.168.99.1';
      const validPayload: ContactPayload = {
        name: 'Rate Test User',
        email: 'ratetest@example.com',
        whatsapp: '',
        inquiry: 'Rate limit test inquiry',
      };

      // Make 5 successful requests (the limit)
      for (let i = 0; i < 5; i++) {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': testIp,
          },
          body: JSON.stringify(validPayload),
        });
        // Each should return 200 (Slack/Brevo failures are non-blocking)
        expect(response.status).toBe(200);
      }

      // 6th request should be rate limited
      const rateLimitedResponse = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': testIp,
        },
        body: JSON.stringify(validPayload),
      });

      expect(rateLimitedResponse.status).toBe(429);
      const data = await rateLimitedResponse.json();
      expect(data.error.toLowerCase()).toContain('rate');
    }, 30000);
  });

  describe('Success Response', () => {
    it('should return 200 with success message on valid submission', async () => {
      const payload: ContactPayload = {
        name: 'Success Test',
        email: 'success@example.com',
        whatsapp: '+1234567890',
        inquiry: 'This should succeed',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': uniqueTestIp(),
        },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });
  });
});
