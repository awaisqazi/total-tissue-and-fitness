# Total Tissue & Fitness — Astro website

A proof-of-concept migration of the public Webflow website into Astro. **Total Tissue & Fitness keeps its existing name, gold logo, and gold palette.** Synaptyx Performance inspires the layout, typography hierarchy, dark surfaces, and polished presentation. It is not a rebrand to Synaptyx Manual Therapy.

The project includes the marketing website, locally archived source content/media, a clearly labeled static operations-dashboard concept, and a documented path to a future client-owned Supabase backend.

The public proof of concept is live at <https://awaisqazi.github.io/total-tissue-and-fitness/>. Source and maintenance documentation are at <https://github.com/awaisqazi/total-tissue-and-fitness>. Publication and live checks passed; see [publication status](docs/DEPLOYMENT_STATUS.md).

## Start here

- Maintainer instructions: [CLAUDE.md](CLAUDE.md).
- Evolving project context, decisions and tradeoffs: [docs/DECISIONS.md](docs/DECISIONS.md).
- Existing content audit: [docs/MIGRATION_AUDIT.md](docs/MIGRATION_AUDIT.md).
- Implementation and routine edits: [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).
- Hosting, release and rollback: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
- Operational model: [docs/OPERATIONS.md](docs/OPERATIONS.md).
- POC vs production gates: [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md).

## Run locally

Use an even-numbered Node.js release supported by Astro, at least 22.12.0. This checkout was created with Node 26.0.0 and npm 11.12.1. Exact dependencies are pinned in package.json and package-lock.json.

```sh
npm ci
npm run dev
```

Astro reports the local URL, normally http://127.0.0.1:4321. Astro 7 may manage development as a background process; use `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop` to inspect and stop it.

```sh
npm run validate   # Astro type checking, static build, and integrity tests
npm run preview    # Inspect the production build locally
```

To validate the exact GitHub Pages build, provide all three build-time variables to the full validation command:

```sh
SITE_URL=https://awaisqazi.github.io BASE_PATH=/total-tissue-and-fitness PUBLIC_SITE_INDEXABLE=false npm run validate
```

## What exists

| Route                  | Purpose                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| `/`                    | Services, approach, recovery, couples workshop, original testimonials, FAQs |
| `/manual-therapy/`     | Assessment, tissue techniques, movement education, original explainer       |
| `/contrast-therapy/`   | Cold plunge, hot plunge, infrared sauna, original photos and explainer      |
| `/mentorship-program/` | Practitioner program overview and inquiry pathway                           |
| `/couples-workshop/`   | Original workshop offering, equipment, published price                      |
| `/book/`               | Distinct new/returning/contrast/workshop booking pathways                   |
| `/contact/`            | Clearly labeled non-sending inquiry-form prototype                          |
| `/admin/`              | Fictional-data operations-dashboard concept; no authentication or database  |
| `/privacy/`            | Draft plain-language website information, not approved legal policy         |
| `/404.html`            | Branded not-found page                                                      |

## Intentional proof-of-concept limits

No real inquiry is sent or saved. The admin concept has no real accounts, permissions, or persisted client records. No Supabase project was created. The current Webflow site and DNS have not been changed.

The public source does not provide confirmed practitioner biographies, street address, phone, email, social URLs, or a Jane booking URL. These are not invented. Vagaro and the first-contrast Calendly URL are retained as legacy destinations, subject to client confirmation. The source link labeled a couples workshop opens an event whose metadata calls it a contrast trial; that link is preserved in the audit/config but withheld from visitor CTAs. Workshop CTAs lead to the inquiry preview until the correct destination is supplied.

Do not call this production-ready until the remaining business, legal, inquiry, booking, and access gates in the launch checklist are resolved. The GitHub Pages POC is intentionally public so stakeholders can review it, but remains non-indexable. Public access does not authorize real submissions, production data, Supabase, or a change to the live domain.

## Source and ownership

The public Webflow capture is dated September 8, 2026. `docs/source-snapshot/manifest.json` records source URLs, file sizes, hashes, and capture failures. Raw HTML/CSS remains documentation only and is never executed by the Astro site. Photos, logos, original social image and downloaded videos are retained under `public/`; no Synaptyx practitioner identities or facility claims are imported.

## Every future update

Read the latest accepted decision first, make the smallest coherent change, validate it, then update `docs/DECISIONS.md` with the user goal, concise rationale, tradeoffs, evidence, result, and remaining questions. Update `CHANGELOG.md` for the actual behavior delivered. These files are collaborative project memory, not private reasoning transcripts.
