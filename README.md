# Synaptyx Manual Therapy (formerly Total Tissue & Fitness) — Astro website

A proof-of-concept migration of the public Total Tissue & Fitness Webflow website into Astro, rebranded as **Synaptyx Manual Therapy**, a separate sister company within the Synaptyx family alongside Synaptyx Health & Performance (ADR-008). The site uses the Synaptyx mark, blue/near-black palette and Inter typography, and carries clear “formerly Total Tissue & Fitness” notices. The original gold logo remains as the legacy mark in those notices.

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

| Route                  | Purpose                                                                      |
| ---------------------- | ---------------------------------------------------------------------------- |
| `/`                    | Services, approach, recovery, practitioners, workshop, testimonials, FAQs    |
| `/manual-therapy/`     | Assessment, tissue techniques, movement education, original explainer        |
| `/training/`           | Personal training and group fitness classes; call-to-ask until details exist |
| `/contrast-therapy/`   | Cold plunge, hot plunge, infrared sauna, original photos and explainer       |
| `/mentorship-program/` | Practitioner program overview and inquiry pathway                            |
| `/couples-workshop/`   | Original workshop offering, equipment, published price                       |
| `/book/`               | Live Vagaro booking and gift cards; smaller links to About and Staff         |
| `/contact/`            | General inquiry form with Turnstile verification and practice-owned delivery |
| `/admin/`              | Fictional-data operations-dashboard concept; no authentication or database   |
| `/privacy/`            | Draft plain-language website information, not approved legal policy          |
| `/404.html`            | Branded not-found page                                                       |

## Intentional proof-of-concept limits

The contact page uses a Cloudflare Turnstile challenge and Worker to verify general inquiries before forwarding them to a Google Form owned by the practice. Cloudflare and Google process the inquiry; the site does not put responses in its public demo dashboard. Visitors are asked not to include medical or sensitive health information. The admin concept has no real accounts, permissions, or persisted client records. No Supabase project was created. The current Webflow site and DNS have not been changed.

The owner confirmed that visits are at 17W755 Butterfield Road, Oakbrook Terrace, IL 60181; Oswego is used for billing only. The public Vagaro listing confirms the business phone, address, and both providers. The booking page uses a live, business-wide Vagaro widget with Services, Gift Cards, and Book Now tabs. It has smaller links to Vagaro's About and Staff sections and a direct booking fallback. Vagaro, not this site, handles appointments, gift card checkout, and resulting client records. New clients arrange a call using the contact methods in Vagaro's first-session listing, then book there with Josh or Casey.

The public source still does not provide approved practitioner biographies, email, social URLs, or a couples-workshop booking destination. The older contrast and workshop Calendly links remain in source provenance/config but are not used as booking CTAs. Workshop CTAs use the public business phone until a bookable offer is confirmed.

Do not call this production-ready until the remaining business, legal, inquiry, booking, and access gates in the launch checklist are resolved. The GitHub Pages POC is intentionally public so stakeholders can review it, but remains non-indexable. ADR-010 covers this general-inquiry path only; it does not authorize production client records, Supabase, or a change to the live domain.

## Source and ownership

The public Webflow capture is dated September 8, 2026. `docs/source-snapshot/manifest.json` records source URLs, file sizes, hashes, and capture failures. Raw HTML/CSS remains documentation only and is never executed by the Astro site. Photos, logos, original social image and downloaded videos are retained under `public/`; no Synaptyx practitioner identities or facility claims are imported.

## Every future update

Read the latest accepted decision first, make the smallest coherent change, validate it, then update `docs/DECISIONS.md` with the user goal, concise rationale, tradeoffs, evidence, result, and remaining questions. Update `CHANGELOG.md` for the actual behavior delivered. These files are collaborative project memory, not private reasoning transcripts.
