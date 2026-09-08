# Hosting, publication and rollback

## Current delivery model

The website is a static Astro build (`output: 'static'`) whose deployable public files are `dist/`. Hosting is portable to a static host such as Cloudflare Pages, Netlify, or another provider supporting clean directory URLs and custom 404 pages. The private proof-of-concept uses Sites; its project ID is stored in `.openai/hosting.json`.

Do not create a replacement Sites project for routine updates. The proof-of-concept URL is separate from the current Webflow domain. Neither DNS nor Webflow publishing has been modified.

## Configuration

Copy `.env.example` to `.env` for local use. `SITE_URL` sets canonical and sitemap origins at build time. Use the private preview origin for preview builds and the verified production origin for launch. `PUBLIC_SITE_INDEXABLE=false` is the default. This emits noindex/nofollow and a robots disallow for the entire site. Only use `true` after production approval; admin and privacy-draft pages remain noindex.

Static hosting has no runtime secret configuration in this build. Do not put private keys in `PUBLIC_` variables. Future Supabase public project URL/publishable keys may enter the client; service-role credentials must remain server-only.

## Release sequence

1. Read CLAUDE.md, latest decisions and known launch blockers.
2. Install locked dependencies, update source and documentation together.
3. Set the correct build-time canonical origin and indexing policy.
4. Run `npm run validate` and focused browser QA.
5. Review the complete diff and ensure no secrets or real client data are in demo files.
6. Commit the exact validated source, including package-lock.json.
7. Publish `dist/` to the selected preview environment. With Sites, use the Sites source/version/deployment workflow for the existing project, and inspect terminal deployment success.
8. Smoke-test the deployed homepage and changed routes; confirm correct audience and indexing state.
9. Record release/version and tests in CHANGELOG.md / docs/DECISIONS.md.

## Production cutover — deferred

Before cutover, the business must confirm branding, address/contact/practitioner data, Jane and other booking destinations, workshop offer/price, image rights, legal policy, production inquiry backend, account ownership, and role permissions. See LAUNCH_CHECKLIST.md.

Choose a client-owned hosting account. Record current DNS and email records, lower TTL if appropriate, and preserve MX/TXT records. Configure the domain and TLS at the new host, test on its temporary URL, and only then change the website DNS after explicit launch authorization. Keep Webflow recoverable until the new site is confirmed. Do not cancel Webflow or domain renewals during this prototype.

Preserve `/contrast-therapy` and `/mentorship-program`; the new build supports clean trailing-slash routes. Preserve home anchors `#free-offer`, `#testimonial`, `#faq`, and `#returning-client`. Host-specific redirect syntax is selected at cutover; test trailing-slash normalization and unknown-page 404s on the chosen host.

## Rollback

Keep the last validated commit and deployable version. If a release regresses, redeploy that version to the same host and verify the affected workflow. For a failed domain cutover, restore the recorded website DNS to Webflow without changing email records. Log the reason and recovery verification. Never perform a destructive database rollback to fix a marketing page.

## Future Supabase hosting

The client will create and own the Supabase organization/project. Connect it only when the role matrix, inquiry data scope, retention and responsibilities are agreed. Use separate development/production projects, migrations, RLS, and backups appropriate to the purchased plan. The static website can remain on its existing host while using protected Supabase services for auth, inquiries, and drafts. Publishing approved public content needs an explicit build/release workflow or a separately designed runtime CMS integration.
