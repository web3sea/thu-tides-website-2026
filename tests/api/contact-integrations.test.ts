/**
 * Contact API integration-failure tests (in-process)
 *
 * The sibling contact.test.ts drives a running dev server over HTTP, which means
 * it cannot control the route's env vars or intercept the route's outbound calls
 * (its header notes exactly that). This file imports the route handler directly
 * instead and stubs global fetch, so the Slack and Brevo failure paths are
 * reachable without credentials and without a server.
 *
 * What it pins down: a failing integration has to reach the caller as a warning.
 * Slack used to swallow its own errors, so a dead webhook was indistinguishable
 * from a delivered message and an inquiry could be lost with the visitor told
 * "submitted successfully".
 */

import { describe, it, expect, beforeEach, afterAll, jest } from '@jest/globals';
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/contact/route';

const SLACK_URL = 'https://hooks.slack.com/services/TEST/WEBHOOK/URL';
const BREVO_CONTACTS = 'https://api.brevo.com/v3/contacts';

const realFetch = global.fetch;
const envBefore = { ...process.env };

// The route's rate limiter is module-scope state shared by every test here.
let ipCounter = 1;
const uniqueIp = () => `10.1.${Math.floor(ipCounter / 255)}.${ipCounter++ % 255}`;

function submit(overrides: Record<string, string> = {}) {
  return POST(
    new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-real-ip': uniqueIp(),
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        whatsapp: '+1234567890',
        inquiry: 'Test inquiry',
        ...overrides,
      }),
    })
  );
}

type Warning = { integration: string; failed: boolean };

/** Stub global fetch: `fail` names the hosts that should return a 500. */
function stubFetch(fail: { slack?: boolean; brevo?: boolean } = {}) {
  global.fetch = jest.fn(async (input: string | URL | Request) => {
    const url = String(input instanceof Request ? input.url : input);

    if (url.startsWith('https://hooks.slack.com')) {
      return fail.slack
        ? new Response('invalid_token', { status: 403 })
        : new Response('ok', { status: 200 });
    }
    if (url.startsWith('https://api.brevo.com')) {
      return fail.brevo
        ? new Response('{"message":"boom"}', { status: 500 })
        : new Response('{"id":1}', { status: 201 });
    }
    throw new Error(`Unexpected fetch to ${url}`);
  }) as unknown as typeof global.fetch;
}

describe('Contact API integration failures', () => {
  beforeEach(() => {
    process.env.SLACK_WEBHOOK_URL = SLACK_URL;
    process.env.BREVO_API_KEY = 'test-key';
    process.env.BREVO_LIST_ID = '101';
    delete process.env.BREVO_WELCOME_TEMPLATE_ID; // no template: route skips the email
  });

  afterAll(() => {
    global.fetch = realFetch;
    process.env = envBefore;
  });

  it('reports no warnings when both integrations succeed', async () => {
    stubFetch();
    const res = await submit();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.warnings).toBeUndefined();
  });

  it('reports Slack in warnings when the webhook rejects', async () => {
    stubFetch({ slack: true });
    const res = await submit();
    const body = await res.json();

    // Still 200: the visitor's submission is not the thing that failed.
    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect((body.warnings as Warning[]).map((w) => w.integration)).toEqual(['Slack']);
  });

  it('reports Brevo in warnings when the API rejects', async () => {
    stubFetch({ brevo: true });
    const res = await submit();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect((body.warnings as Warning[]).map((w) => w.integration)).toEqual(['Brevo']);
  });

  it('reports both when both fail', async () => {
    stubFetch({ slack: true, brevo: true });
    const res = await submit();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect((body.warnings as Warning[]).map((w) => w.integration).sort()).toEqual([
      'Brevo',
      'Slack',
    ]);
  });

  it('treats an unconfigured Slack webhook as a skip, not a failure', async () => {
    // CI and local dev run without it; the form is meant to keep working.
    delete process.env.SLACK_WEBHOOK_URL;
    stubFetch();
    const res = await submit();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.warnings).toBeUndefined();
  });

  it('does not call Slack or Brevo when validation fails', async () => {
    stubFetch();
    const res = await submit({ name: '' });

    expect(res.status).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('never sends the webhook a payload that could mention @channel', async () => {
    stubFetch();
    await submit({ inquiry: 'Ping <!channel> now & <!here> too' });

    const call = (global.fetch as unknown as jest.Mock).mock.calls.find((c) =>
      String(c[0]).startsWith('https://hooks.slack.com')
    );
    const sent = JSON.parse((call![1] as RequestInit).body as string);
    const text = JSON.stringify(sent);

    expect(text).not.toContain('<!channel>');
    expect(text).not.toContain('<!here>');
    expect(text).toContain('&lt;!channel&gt;');
  });
});

describe('Contact API rate limiting', () => {
  beforeEach(() => {
    process.env.SLACK_WEBHOOK_URL = SLACK_URL;
    process.env.BREVO_API_KEY = 'test-key';
    stubFetch();
  });

  it('429s the sixth request from one IP and leaves other IPs alone', async () => {
    const ip = uniqueIp();
    const fromIp = () =>
      POST(
        new NextRequest('http://localhost/api/contact', {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-real-ip': ip },
          body: JSON.stringify({
            name: 'Test User',
            email: 'test@example.com',
            whatsapp: '',
            inquiry: 'Test inquiry',
          }),
        })
      );

    for (let i = 0; i < 5; i++) {
      expect((await fromIp()).status).toBe(200);
    }
    expect((await fromIp()).status).toBe(429);

    // A different IP has its own budget.
    expect((await submit()).status).toBe(200);
  });
});
