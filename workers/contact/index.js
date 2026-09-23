const siteOrigin = 'https://awaisqazi.github.io';
const allowedInterests = new Set([
  'My first visit',
  'Manual Therapy',
  'Contrast Therapy',
  'Couples Workshop',
  'Practitioner Mentorship',
  'A general question',
]);
const entry = {
  name: 'entry.2023836652',
  email: 'entry.2052483362',
  interest: 'entry.1066020907',
  profession: 'entry.924913666',
  message: 'entry.671168868',
};

function reply(origin, status, body) {
  return new Response(status === 204 ? null : JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      Vary: 'Origin',
    },
  });
}

function field(data, key) {
  const value = data.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    if (origin !== siteOrigin) return new Response(null, { status: 403 });
    if (request.method === 'OPTIONS') return reply(origin, 204, {});
    if (request.method !== 'POST') return reply(origin, 405, { error: 'method' });
    if (Number(request.headers.get('Content-Length') || 0) > 16_384)
      return reply(origin, 413, { error: 'size' });

    let data;
    try {
      data = await request.formData();
    } catch {
      return reply(origin, 400, { error: 'form' });
    }
    if (JSON.stringify([...data]).length > 16_384) return reply(origin, 413, { error: 'size' });
    const name = field(data, 'name');
    const email = field(data, 'email');
    const interest = field(data, 'interest');
    const profession = field(data, 'profession');
    const message = field(data, 'message');
    const token = field(data, 'cf-turnstile-response');
    if (
      name.length < 1 ||
      name.length > 100 ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !allowedInterests.has(interest) ||
      profession.length > 120 ||
      message.length < 10 ||
      message.length > 2000 ||
      token.length < 1 ||
      token.length > 2048
    )
      return reply(origin, 400, { error: 'fields' });
    if (!env.TURNSTILE_SECRET || !env.GOOGLE_FORM_ID)
      return reply(origin, 503, { error: 'configuration' });

    try {
      const verification = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token }),
          signal: AbortSignal.timeout(8000),
        },
      );
      if (!verification.ok) return reply(origin, 502, { error: 'verification' });
      const result = await verification.json();
      if (
        !result.success ||
        result.hostname !== 'awaisqazi.github.io' ||
        result.action !== 'contact'
      )
        return reply(origin, 403, { error: 'verification' });

      const answers = new URLSearchParams({
        [entry.name]: name,
        [entry.email]: email,
        [entry.interest]: interest,
        [entry.profession]: profession,
        [entry.message]: message,
      });
      const destination = `https://docs.google.com/forms/d/e/${env.GOOGLE_FORM_ID}/formResponse`;
      const delivery = await fetch(destination, {
        method: 'POST',
        body: answers,
        signal: AbortSignal.timeout(10000),
      });
      const confirmation = await delivery.text();
      if (!delivery.ok || !confirmation.includes('Your inquiry has been recorded'))
        return reply(origin, 502, { error: 'delivery' });
      return reply(origin, 200, { ok: true });
    } catch {
      return reply(origin, 502, { error: 'upstream' });
    }
  },
};
