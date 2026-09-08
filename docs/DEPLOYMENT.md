# Hosting, publication and rollback

## Current POC delivery model

The website is a static Astro build (`output: 'static'`) whose deployable public files are `dist/`. The authorized POC target is the public GitHub repository `awaisqazi/total-tissue-and-fitness`, deployed through GitHub Pages at <https://awaisqazi.github.io/total-tissue-and-fitness/>.

The POC URL is separate from the current Webflow domain. Neither DNS nor Webflow publishing has been modified. The earlier private Sites attempt failed during callback registration and is retained in `DEPLOYMENT_STATUS.md` as history; ADR-007 supersedes the prior private-only delivery rule. Do not create another Sites project for this POC.

## Configuration

Copy `.env.example` to `.env` for local use. `SITE_URL` sets the Pages origin and `BASE_PATH` sets the project subpath. The authorized POC values are:

```text
SITE_URL=https://awaisqazi.github.io
BASE_PATH=/total-tissue-and-fitness
PUBLIC_SITE_INDEXABLE=false
```

`PUBLIC_SITE_INDEXABLE=false` emits noindex/nofollow and a robots disallow for the entire site. Keep it false for the public POC. Only use `true` after production approval; admin and privacy-draft pages remain noindex.

Static hosting has no runtime secret configuration in this build. Do not put private keys in `PUBLIC_` variables. Future Supabase public project URL/publishable keys may enter the client; service-role credentials must remain server-only.

## Release sequence

1. Read CLAUDE.md, latest decisions and known launch blockers.
2. Install locked dependencies, update source and documentation together.
3. Set the Pages origin, repository base path, and non-indexing policy.
4. Run the complete validation with the same environment used by Pages:

   ```sh
   SITE_URL=https://awaisqazi.github.io BASE_PATH=/total-tissue-and-fitness PUBLIC_SITE_INDEXABLE=false npm run validate
   ```

5. Run focused browser QA under `/total-tissue-and-fitness/`.
6. Review the complete diff and ensure no secrets or real client data are in demo files.
7. Commit the exact validated source, including package-lock.json, to the public repository.
8. Merge/push to `main`; `.github/workflows/deploy.yml` validates and deploys with Node 24 through GitHub Pages.
9. Inspect the workflow conclusion and Pages environment URL.
10. Smoke-test the deployed homepage, assets, navigation, representative routes, non-sending form, fictional dashboard, 404 behavior, canonical/base-path output, and `noindex`/robots state.
11. Record the verified deployment commit, workflow run, URL, and checks in `CHANGELOG.md` and `docs/DEPLOYMENT_STATUS.md`.

## Production cutover — deferred

Before cutover, the business must confirm branding, address/contact/practitioner data, Jane and other booking destinations, workshop offer/price, image rights, legal policy, production inquiry backend, account ownership, and role permissions. See LAUNCH_CHECKLIST.md.

GitHub Pages is authorized only for the public POC. For production, confirm the long-term client-owned hosting/account arrangement. Record current DNS and email records, lower TTL if appropriate, and preserve MX/TXT records. Configure the domain and TLS at the chosen production host, test on its temporary URL, and only then change website DNS after explicit launch authorization. Keep Webflow recoverable until the new site is confirmed. Do not cancel Webflow or domain renewals during this prototype.

Preserve `/contrast-therapy` and `/mentorship-program`; the new build supports clean trailing-slash routes. Preserve home anchors `#free-offer`, `#testimonial`, `#faq`, and `#returning-client`. Host-specific redirect syntax is selected at cutover; test trailing-slash normalization and unknown-page 404s on the chosen host.

## Rollback

Keep the last validated commit and deployable version. If a release regresses, redeploy that version to the same host and verify the affected workflow. For a failed domain cutover, restore the recorded website DNS to Webflow without changing email records. Log the reason and recovery verification. Never perform a destructive database rollback to fix a marketing page.

## Future Supabase hosting

The client will create and own the Supabase organization/project. Connect it only when the role matrix, inquiry data scope, retention and responsibilities are agreed. Use separate development/production projects, migrations, RLS, and backups appropriate to the purchased plan. The static website can remain on its existing host while using protected Supabase services for auth, inquiries, and drafts. Publishing approved public content needs an explicit build/release workflow or a separately designed runtime CMS integration.
