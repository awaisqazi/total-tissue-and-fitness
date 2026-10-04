# Publication status

## Production domain — October 3, 2026

Under ADR-015 the GitHub Pages deployment serves the business domain. Repo Pages setting: custom domain `www.totaltissueandfitness.com`. Build environment: `SITE_URL=https://www.totaltissueandfitness.com`, `BASE_PATH=/`, `PUBLIC_SITE_INDEXABLE=true`, same `PUBLIC_CONTACT_ENDPOINT`. GoDaddy DNS: `@` A → GitHub Pages (185.199.108–111.153), `www` CNAME → `awaisqazi.github.io`; all other records unchanged (`docs/DNS_EXPORT_2026-10-03.md`). Fill in the verified commit, workflow run, HTTPS enforcement, and smoke-test evidence below once the cutover is confirmed.

- Verified commit / workflow run: `0948ff8` via [37163-series run](https://github.com/awaisqazi/total-tissue-and-fitness/actions) (privacy notice + footer change); first domain build `957994e`, run [37162918383](https://github.com/awaisqazi/total-tissue-and-fitness/actions/runs/37162918383).
- DNS: GoDaddy records changed 2026-10-03 ~18:50 CDT; public resolvers (1.1.1.1, 8.8.8.8) returned the GitHub records by ~19:05. GitHub's own resolver held the old Webflow answer until ~19:48, during which `www` was reported as proxied and HTTPS-ineligible, so no certificate was requested. Webflow had sent HSTS (`max-age=31536000`), so returning visitors saw certificate errors for that window rather than the HTTP fallback. Lesson for any future host move: lower the TTL a day ahead and expect an HTTPS gap when the previous host used HSTS.
- HTTPS: Let's Encrypt certificate for `www.totaltissueandfitness.com` and `totaltissueandfitness.com` approved ~20:05 CDT (expires 2027-01-01); all four GitHub edge addresses served it by ~20:10; **Enforce HTTPS is on**. `http://` and the apex both 301 to `https://www…`.
- Live checks against the domain: `/`, `/contact/`, `/book/`, `/training/`, `/privacy/` 200 with correct titles and canonicals; `/contrast-therapy` → `/contrast-therapy/` 301; unknown path → branded 404; `robots.txt` allows and lists the sitemap; footer no longer links `/admin/`.
- Contact Worker: version `c9a8b9c3` deployed to the practice's Cloudflare account on 2026-10-03 with both origins; the Turnstile widget lists `awaisqazi.github.io` and `www.totaltissueandfitness.com`. Preflight from either origin returns 204, unknown origin 403, invalid token 403. A full Turnstile-protected submission from the live domain has not yet been re-run after cutover.

## Proof-of-concept publication — September 22, 2026 (superseded target)

### Previously authorized target

The user authorized a public GitHub repository and public GitHub Pages POC. The published targets are:

- Repository: `https://github.com/awaisqazi/total-tissue-and-fitness`
- Pages: `https://awaisqazi.github.io/total-tissue-and-fitness/`
- Build environment: `SITE_URL=https://awaisqazi.github.io`, `BASE_PATH=/total-tissue-and-fitness`, `PUBLIC_SITE_INDEXABLE=false`, `PUBLIC_CONTACT_ENDPOINT=https://synaptyx-contact.shiny-paper-ae5f.workers.dev/`
- Automation: `.github/workflows/deploy.yml`, validation and automatic deployment from `main` using Node 24

**Status: published and verified.** The repository is PUBLIC, HTTPS is enforced, and GitHub Actions completed successfully.

- Published site-code commit: `c7646a0236acd044d54405fefa5073064bdc2624`.
- Successful workflow: [35809795030](https://github.com/awaisqazi/total-tissue-and-fitness/actions/runs/35809795030), including `npm ci`, Astro check, static build, link checks, and eleven tests. The earlier contact integration also deployed successfully in [35808707411](https://github.com/awaisqazi/total-tissue-and-fitness/actions/runs/35808707411).
- Live contact page serves the Turnstile widget and points to the practice-owned Cloudflare Worker. The Worker rejected an invalid token with HTTP 403. A nonpersonal live-page submission showed success and increased Joshua's Google Form response count from one to two.
- Live contact and booking routes retain page-level `noindex`; the contact HTML contains no Google Forms URL. The live booking route shows one continuous white section, the Vagaro Services/Gift Cards/Book Now widget, and secondary About/Staff links without duplicate Services or Gift Cards cards.
- The public POC retains a fictional dashboard. The contact form now sends general inquiries through Cloudflare to the Joshua-owned Google Form. `totaltissueandfitness.com` and its DNS are unchanged.

## Previous published release

- September 8 site-code commit: `4b28a79dd46a6ce6ee94ba54223491e9ad7ea2e4`; successful workflow [34257990834](https://github.com/awaisqazi/total-tissue-and-fitness/actions/runs/34257990834).
- That release verified all 10 HTML routes, 19 asset URLs, canonical URLs, page-level noindex, sitemap, robots endpoint, branded HTTP 404, browser navigation, and fictional dashboard filtering. It had a non-sending inquiry preview and the earlier gold branding.

## Historical private Sites attempt

Before public GitHub Pages was authorized, source was pushed to a private Sites repository and **version 1 was saved successfully**. Private publishing failed twice because the hosting service returned an HTTP 409 conflict while registering its sign-in callback. This was a hosting configuration failure; no site-code build failure was reported. No Sites public URL was activated. ADR-007 supersedes the previous private-only delivery rule while preserving this history.

## Available deliverables

- Pages homepage: https://awaisqazi.github.io/total-tissue-and-fitness/
- Dashboard concept: https://awaisqazi.github.io/total-tissue-and-fitness/admin/
- Local homepage: http://127.0.0.1:4321/
- Local dashboard concept: http://127.0.0.1:4321/admin/
- Source: this project directory, with README.md and CLAUDE.md entry points.
- Validated public build: dist/ (regenerate with npm run build).
- Original live Webflow website and DNS: unchanged.

## Saved source and service references

- Site: `appgprj_6aa03acf325c8191bcc414aa72a25c72`
- Saved version 1: `appgprj_6aa03acf325c8191bcc414aa72a25c72~appgver_c08387c57a148191af1dd5d6bbad7af7`
- Source commit: `dbeda35b9bd54c229dac5b818f0a9c72fba35911`
- First failed deployment: `appgdep_6aa0419c30888191b80d44fb7b2db24c`
- Retry failed deployment: `appgdep_6aa041bb025881919010f9861c73a607`
- Both failures: HTTP `409 Conflict` in the hosting service's SIWC sign-in callback registration.

## Future updates

Push validated website changes to `main` to publish automatically. Record the successful run and live checks with each release. A documentation-only follow-up may use `[skip ci]` in its commit message; the deployed site remains the code commit listed above. A successful source push alone does not prove publication.
