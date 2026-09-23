import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../workers/contact/index.js';

const origin = 'https://awaisqazi.github.io';
const env = { TURNSTILE_SECRET: 'test-secret', GOOGLE_FORM_ID: 'test-form' };

function inquiry(token = 'test-token') {
  const data = new FormData();
  data.set('name', 'Synaptyx QA Test');
  data.set('email', 'synaptyx-qa@example.com');
  data.set('interest', 'A general question');
  data.set('profession', '');
  data.set('message', 'This is a non-personal test inquiry.');
  data.set('cf-turnstile-response', token);
  return new Request('https://contact.example.workers.dev/', {
    method: 'POST',
    headers: { Origin: origin },
    body: data,
  });
}

test('unverified inquiries never reach Google Forms', async () => {
  const originalFetch = globalThis.fetch;
  const destinations = [];
  globalThis.fetch = async (url) => {
    destinations.push(String(url));
    return Response.json({ success: false });
  };
  try {
    const response = await worker.fetch(inquiry(), env);
    assert.equal(response.status, 403);
    assert.deepEqual(destinations, ['https://challenges.cloudflare.com/turnstile/v0/siteverify']);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('a verified inquiry reaches the configured Google Form', async () => {
  const originalFetch = globalThis.fetch;
  const destinations = [];
  globalThis.fetch = async (url, options) => {
    destinations.push(String(url));
    if (destinations.length === 1)
      return Response.json({ success: true, hostname: 'awaisqazi.github.io', action: 'contact' });
    assert.match(String(options.body), /entry\.2023836652=Synaptyx\+QA\+Test/);
    assert.match(String(options.body), /entry\.671168868=/);
    return new Response('Your inquiry has been recorded');
  };
  try {
    const response = await worker.fetch(inquiry(), env);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(destinations.length, 2);
    assert.equal(destinations[1], 'https://docs.google.com/forms/d/e/test-form/formResponse');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('requests from another origin are rejected before validation', async () => {
  const request = new Request('https://contact.example.workers.dev/', {
    method: 'POST',
    headers: { Origin: 'https://other.example' },
  });
  const response = await worker.fetch(request, env);
  assert.equal(response.status, 403);
});

test('a token for another action cannot forward an inquiry', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return Response.json({ success: true, hostname: 'awaisqazi.github.io', action: 'other' });
  };
  try {
    const response = await worker.fetch(inquiry(), env);
    assert.equal(response.status, 403);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
