# Proof-of-concept publication status — September 22, 2026

## Current authorized target

The user authorized a public GitHub repository and public GitHub Pages POC. The published targets are:

- Repository: `https://github.com/awaisqazi/total-tissue-and-fitness`
- Pages: `https://awaisqazi.github.io/total-tissue-and-fitness/`
- Build environment: `SITE_URL=https://awaisqazi.github.io`, `BASE_PATH=/total-tissue-and-fitness`, `PUBLIC_SITE_INDEXABLE=false`, `PUBLIC_CONTACT_ENDPOINT=https://synaptyx-contact.shiny-paper-ae5f.workers.dev/`
- Automation: `.github/workflows/deploy.yml`, validation and automatic deployment from `main` using Node 24

**Status: published and verified.** The repository is PUBLIC, HTTPS is enforced, and GitHub Actions completed successfully.

- Published site-code commit: `a37d1f9cb87b7667df45d8f466198d021a5d7c51`.
- Successful workflow: [35809049255](https://github.com/awaisqazi/total-tissue-and-fitness/actions/runs/35809049255), including `npm ci`, Astro check, static build, link checks, and eleven tests. The earlier contact integration also deployed successfully in [35808707411](https://github.com/awaisqazi/total-tissue-and-fitness/actions/runs/35808707411).
- Live contact page serves the Turnstile widget and points to the practice-owned Cloudflare Worker. The Worker rejected an invalid token with HTTP 403. A nonpersonal live-page submission showed success and increased Joshua's Google Form response count from one to two.
- Live contact and booking routes retain page-level `noindex`; the contact HTML contains no Google Forms URL, and the booking route serves the Vagaro widget, service links, and Gift Cards link.
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
