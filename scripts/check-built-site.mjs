#!/usr/bin/env node
/**
 * Static post-build QA for this Astro site. Run after `npm run build`:
 *   node /tmp/total-tissue-tests.mjs [dist-directory]
 * Uses only Node built-ins; exits nonzero on a broken local link, fragment,
 * asset reference, or legacy Webflow runtime reference.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');
const errors = [];
const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
const localFiles = existsSync(root) ? walk(root) : [];
if (!existsSync(root)) {
  console.error(`Build directory does not exist: ${root}`);
  process.exit(2);
}
const htmlFiles = localFiles.filter((file) => file.endsWith('.html'));
const outputPath = (pathname) => {
  const decoded = decodeURIComponent(pathname);
  const clean = decoded.replace(/^\/+/, '');
  if (!clean) return join(root, 'index.html');
  const direct = join(root, clean);
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  return join(root, clean, 'index.html');
};
const isExternal = (value) => /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value);
const assetExists = (htmlFile, value) => {
  const pathname = value.split(/[?#]/, 1)[0];
  if (!pathname || isExternal(pathname) || pathname.startsWith('#')) return true;
  const candidate = pathname.startsWith('/')
    ? join(root, pathname.slice(1))
    : resolve(join(htmlFile, '..'), pathname);
  return candidate.startsWith(root + '/') && existsSync(candidate);
};

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, 'utf8');
  const label =
    '/' +
    relative(root, htmlFile)
      .replace(/index\.html$/, '')
      .replace(/\\/g, '/');
  if (/<script\b[^>]*\bsrc=(?:"[^"]*webflow|\'[^\']*webflow)/i.test(html))
    errors.push(`${label}: contains a legacy Webflow script`);
  const ids = new Set(
    [...html.matchAll(/\bid=(?:"([^"]+)"|'([^']+)')/g)].map((match) => match[1] ?? match[2]),
  );
  for (const match of html.matchAll(/\b(href|src|poster)=(?:"([^"]+)"|'([^']+)')/g)) {
    const attribute = match[1];
    const raw = match[2] ?? match[3];
    if (attribute !== 'href' && !assetExists(htmlFile, raw))
      errors.push(`${label}: missing local asset ${raw}`);
    if (
      attribute === 'href' &&
      !raw.startsWith('#') &&
      !isExternal(raw) &&
      !/\.[a-z\d]{2,6}(?:[?#]|$)/i.test(raw)
    ) {
      const [pathnameWithQuery, fragment] = raw.split('#', 2);
      const pathname = pathnameWithQuery.split('?', 1)[0];
      const target = outputPath(pathname);
      if (!existsSync(target)) errors.push(`${label}: broken internal link ${raw}`);
      else if (fragment) {
        const targetHtml = readFileSync(target, 'utf8');
        const targetIds =
          target === htmlFile
            ? ids
            : new Set(
                [...targetHtml.matchAll(/\bid=(?:"([^"]+)"|'([^']+)')/g)].map(
                  (item) => item[1] ?? item[2],
                ),
              );
        if (!targetIds.has(fragment)) errors.push(`${label}: missing fragment target ${raw}`);
      }
    } else if (raw.startsWith('#') && !ids.has(raw.slice(1)))
      errors.push(`${label}: missing fragment target ${raw}`);
  }
}
if (errors.length) {
  console.error(`Static QA failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(
  `Static QA passed: ${htmlFiles.length} HTML page(s), no broken local URLs/fragments/assets, no Webflow runtime.`,
);
