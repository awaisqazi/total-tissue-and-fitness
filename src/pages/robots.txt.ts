import { withBase } from '../lib/paths';
import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) =>
  new Response(
    import.meta.env.PUBLIC_SITE_INDEXABLE === 'true'
      ? `User-agent: *\nAllow: /\nDisallow: ${withBase('/admin/')}\nSitemap: ${new URL(withBase('/sitemap.xml'), site)}\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
