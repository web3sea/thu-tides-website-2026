/**
 * Contact API Route Tests
 *
 * Tests the /api/contact POST endpoint including:
 * - Input validation
 * - Rate limiting
 * - Slack integration
 * - Brevo integration
 * - Error handling
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import nock from 'nock';

// Mock environment variables
process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/TEST/WEBHOOK/URL';
process.env.BREVO_API_KEY = 'test-brevo-api-key';
process.env.BREVO_LIST_ID = '1';
process.env.BREVO_WELCOME_TEMPLATE_ID = '1';

const API_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const CONTACT_ENDPOINT = `${API_URL}/api/contact`;

interface ContactPayload {
  name: string;
  email: string;
  whatsapp: string;
  inquiry: string;
}

describe('Contact API Tests', () => {
  beforeEach(() => {
    // Clean up any pending nock interceptors
    nock.cleanAll();
  });

  afterEach(() => {
    // Verify all nock interceptors were used
    nock.isDone();
  });

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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error.toLowerCase()).toContain('email');
    });

    it('should trim whitespace from all fields', async () => {
      // Mock Slack and Brevo
      const slackScope = nock('https://hooks.slack.com')
        .post('/services/TEST/WEBHOOK/URL')
        .reply(200, 'ok');

      const brevoScope = nock('https://api.brevo.com')
        .post('/v3/contacts')
        .reply((uri, requestBody: any) => {
          // Verify trimmed values are sent
          expect(requestBody.email).toBe('test@example.com');
          expect(requestBody.attributes.FIRSTNAME).toBe('Test User');
          return [200, { id: 123 }];
        })
        .post('/v3/smtp/email')
        .reply(200, { messageId: 'abc123' });

      const payload: ContactPayload = {
        name: '  Test User  ',
        email: '  test@example.com  ',
        whatsapp: '  +1234567890  ',
        inquiry: '  Test inquiry  ',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(200);

      slackScope.done();
      brevoScope.done();
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error.toLowerCase()).toContain('length');
    });
  });

  describe('Rate Limiting', () => {
    it('should return 429 when rate limit exceeded', async () => {
      // Mock Slack and Brevo for first 5 requests
      const slackScope = nock('https://hooks.slack.com')
        .post('/services/TEST/WEBHOOK/URL')
        .times(5)
        .reply(200, 'ok');

      const brevoScope = nock('https://api.brevo.com')
        .post('/v3/contacts')
        .times(5)
        .reply(200, { id: 123 })
        .post('/v3/smtp/email')
        .times(5)
        .reply(200, { messageId: 'abc123' });

      const validPayload: ContactPayload = {
        name: 'Test User',
        email: 'test@example.com',
        whatsapp: '',
        inquiry: 'Test inquiry',
      };

      // Make 5 successful requests (at limit)
      for (let i = 0; i < 5; i++) {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': '127.0.0.1',
          },
          body: JSON.stringify(validPayload),
        });
        expect(response.status).toBe(200);
      }

      // 6th request should be rate limited
      const rateLimitedResponse = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '127.0.0.1',
        },
        body: JSON.stringify(validPayload),
      });

      expect(rateLimitedResponse.status).toBe(429);
      const data = await rateLimitedResponse.json();
      expect(data.error.toLowerCase()).toContain('rate');

      slackScope.done();
      brevoScope.done();
    }, 30000); // Extend timeout for multiple requests
  });

  describe('Slack Integration', () => {
    it('should send formatted Block Kit message to Slack', async () => {
      const slackScope = nock('https://hooks.slack.com')
        .post('/services/TEST/WEBHOOK/URL', (body) => {
          // Verify Block Kit format
          expect(body.blocks).toBeDefined();
          expect(body.blocks[0].type).toBe('header');
          expect(body.blocks[0].text.text).toContain('New Contact Form Inquiry');

          // Verify data is included
          const bodyStr = JSON.stringify(body);
          expect(bodyStr).toContain('John Doe');
          expect(bodyStr).toContain('john@example.com');
          expect(bodyStr).toContain('+1234567890');
          expect(bodyStr).toContain('Test inquiry message');

          return true;
        })
        .reply(200, 'ok');

      const brevoScope = nock('https://api.brevo.com')
        .post('/v3/contacts')
        .reply(200, { id: 123 })
        .post('/v3/smtp/email')
        .reply(200, { messageId: 'abc123' });

      const payload: ContactPayload = {
        name: 'John Doe',
        email: 'john@example.com',
        whatsapp: '+1234567890',
        inquiry: 'Test inquiry message',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(200);

      slackScope.done();
      brevoScope.done();
    });

    it('should succeed even if Slack webhook fails', async () => {
      // Slack fails
      const slackScope = nock('https://hooks.slack.com')
        .post('/services/TEST/WEBHOOK/URL')
        .reply(500, 'Internal Server Error');

      // Brevo succeeds
      const brevoScope = nock('https://api.brevo.com')
        .post('/v3/contacts')
        .reply(200, { id: 123 })
        .post('/v3/smtp/email')
        .reply(200, { messageId: 'abc123' });

      const payload: ContactPayload = {
        name: 'Test User',
        email: 'test@example.com',
        whatsapp: '',
        inquiry: 'Test inquiry',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Should still return 200
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);

      slackScope.done();
      brevoScope.done();
    });
  });

  describe('Brevo Integration', () => {
    it('should add contact to Brevo list with correct attributes', async () => {
      const slackScope = nock('https://hooks.slack.com')
        .post('/services/TEST/WEBHOOK/URL')
        .reply(200, 'ok');

      const brevoScope = nock('https://api.brevo.com')
        .post('/v3/contacts', (body: any) => {
          // Verify contact data
          expect(body.email).toBe('jane@example.com');
          expect(body.attributes.FIRSTNAME).toBe('Jane Smith');
          expect(body.listIds).toEqual([1]);
          expect(body.updateEnabled).toBe(true);
          return true;
        })
        .reply(200, { id: 456 })
        .post('/v3/smtp/email')
        .reply(200, { messageId: 'abc123' });

      const payload: ContactPayload = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        whatsapp: '',
        inquiry: 'Collaboration inquiry',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(200);

      slackScope.done();
      brevoScope.done();
    });

    it('should send welcome email via Brevo template', async () => {
      const slackScope = nock('https://hooks.slack.com')
        .post('/services/TEST/WEBHOOK/URL')
        .reply(200, 'ok');

      const brevoScope = nock('https://api.brevo.com')
        .post('/v3/contacts')
        .reply(200, { id: 789 })
        .post('/v3/smtp/email', (body: any) => {
          // Verify email data
          expect(body.to[0].email).toBe('bob@example.com');
          expect(body.to[0].name).toBe('Bob Johnson');
          expect(body.templateId).toBe(1);
          expect(body.params.NAME).toBe('Bob Johnson');
          return true;
        })
        .reply(200, { messageId: 'xyz789' });

      const payload: ContactPayload = {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        whatsapp: '',
        inquiry: 'Service inquiry',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(200);

      slackScope.done();
      brevoScope.done();
    });

    it('should skip Brevo when no email provided', async () => {
      const slackScope = nock('https://hooks.slack.com')
        .post('/services/TEST/WEBHOOK/URL')
        .reply(200, 'ok');

      // No Brevo calls should be made

      const payload: ContactPayload = {
        name: 'WhatsApp User',
        email: '',
        whatsapp: '+628123456789',
        inquiry: 'WhatsApp only inquiry',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(200);

      slackScope.done();
      // No brevoScope.done() - no calls expected
    });

    it('should succeed even if Brevo API fails', async () => {
      const slackScope = nock('https://hooks.slack.com')
        .post('/services/TEST/WEBHOOK/URL')
        .reply(200, 'ok');

      // Brevo fails
      const brevoScope = nock('https://api.brevo.com')
        .post('/v3/contacts')
        .reply(500, 'Internal Server Error');

      const payload: ContactPayload = {
        name: 'Test User',
        email: 'test@example.com',
        whatsapp: '',
        inquiry: 'Test inquiry',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Should still return 200
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);

      slackScope.done();
      brevoScope.done();
    });
  });

  describe('Success Response', () => {
    it('should return 200 with success message on valid submission', async () => {
      const slackScope = nock('https://hooks.slack.com')
        .post('/services/TEST/WEBHOOK/URL')
        .reply(200, 'ok');

      const brevoScope = nock('https://api.brevo.com')
        .post('/v3/contacts')
        .reply(200, { id: 123 })
        .post('/v3/smtp/email')
        .reply(200, { messageId: 'abc123' });

      const payload: ContactPayload = {
        name: 'Success Test',
        email: 'success@example.com',
        whatsapp: '+1234567890',
        inquiry: 'This should succeed',
      };

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.message).toBeDefined();
      expect(data.message.toLowerCase()).toContain('success');

      slackScope.done();
      brevoScope.done();
    });
  });
});
