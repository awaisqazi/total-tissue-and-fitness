import { defineConfig } from 'astro/config';
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.totaltissueandfitness.com',
  output: 'static',
  trailingSlash: 'always',
});
