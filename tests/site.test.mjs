import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const read = (path) => readFileSync(path, 'utf8');
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
const indexable = process.env.PUBLIC_SITE_INDEXABLE === 'true';
const htmls = walk('dist').filter((path) => path.endsWith('.html'));
test('all pages have one h1, a unique title, description, canonical and correct indexing policy', () => {
  const titles = new Set();
  for (const path of htmls) {
    const html = read(path);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, path);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, path);
    assert.ok(!titles.has(title), 'Duplicate title ' + title);
    titles.add(title);
    assert.match(html, /<meta name="description" content="[^"]{30,}"/, path);
    assert.match(html, /<link rel="canonical" href="https:\/\//, path);
    const noindex = !indexable || /(?:admin|privacy)[\/]|404\.html$/.test(path);
    assert.ok(
      html.includes(
        `<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow'}"`,
      ),
      path,
    );
    assert.doesNotMatch(html, /Synaptyx Manual Therapy/, path);
  }
});
test('contact preview never transmits or persists visitor input', () => {
  const source = read('src/pages/contact.astro');
  assert.match(source, /Messages are not sent or saved/);
  assert.match(source, /event.preventDefault\(\)/);
  assert.doesNotMatch(source, /\bfetch\s*\(|localStorage|sessionStorage|XMLHttpRequest|sendBeacon/);
  assert.match(source, /type="email"/);
  assert.match(source, /required\s+minlength="10"/);
});
test('dashboard is explicitly fictional, temporary, and has no network/storage authentication facade', () => {
  const page = read('src/pages/admin/index.astro');
  const script = read('src/scripts/admin.ts');
  assert.match(page, /fictional sample data/);
  assert.match(page, /changes are not saved/);
  assert.match(script, /@example\.com/);
  assert.doesNotMatch(
    script,
    /\bfetch\s*\(|localStorage|sessionStorage|XMLHttpRequest|sendBeacon|supabase/,
  );
  assert.doesNotMatch(page, /type="password"/);
  assert.match(script, /textContent = text/);
});
test('preview indexing is blocked and admin is excluded from sitemap', () => {
  assert.match(read('dist/robots.txt'), indexable ? /Disallow: \/admin\// : /Disallow: \/\s*$/);
  assert.doesNotMatch(read('dist/sitemap.xml'), /admin/);
});
test('source testimonial names and compatibility anchors are retained', () => {
  const html = read('dist/index.html');
  for (const name of ['John', 'Mike', 'Amanda']) assert.ok(html.includes(name));
  for (const id of ['free-offer', 'testimonial', 'faq', 'returning-client'])
    assert.ok(html.includes(`id="${id}"`));
});
test('normal page assets do not depend on Webflow and autoplay is not forced', () => {
  for (const path of htmls) {
    const html = read(path);
    assert.doesNotMatch(html, /cdn\.prod\.website-files\.com/, path);
    assert.doesNotMatch(html, /<video[^>]*autoplay/, path);
    assert.doesNotMatch(html, /leadconnectorhq|klaviyo|embedly/, path);
  }
});
