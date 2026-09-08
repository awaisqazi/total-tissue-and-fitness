# Claude maintenance guide

This repository is the source of truth for the Total Tissue & Fitness Astro website. Preserve the existing Total Tissue name, gold logo, and gold palette (`#d0a84c`, `#dabb6b`). Synaptyx Performance is a layout/style reference only. Do not introduce “Synaptyx Manual Therapy” or replace Total Tissue branding unless a later explicit user decision changes the identity.

## Before changing anything

1. Read this file, `README.md`, `docs/CONTENT_SOURCE_MAP.md`, `docs/DECISIONS.md`, and the files directly involved.
2. Inspect the working tree and preserve unrelated changes.
3. Identify the visitor goal, content owner, affected routes, and success check.
4. Search for existing content keys/components before adding another copy of the same fact.
5. If facts are missing, omit them from production or ask the owner. Never invent practitioner details, credentials, contact information, prices, testimonials, booking URLs, health claims, legal language, or brand rules.

## Content architecture rules

- Shared site facts, service summaries, media references, FAQs and booking destinations live in typed `src/data/site.ts`. Longer page-specific copy lives in its Astro page. Keep duplicated business facts synchronized and add an explicit schema when introducing external/CMS data.
- Keep common presentation in components and page-specific editorial copy in clearly named page files.
- Use Astro pages for route composition, small focused components for reusable presentation, and client-side JavaScript only for interaction that cannot be achieved accessibly with HTML/CSS.
- Keep secrets and provider credentials in environment variables. Document variable names, purpose, environments, and setup steps without recording values.
- Keep `docs/source-snapshot/` immutable as migration provenance. Do not serve raw Webflow HTML/CSS/scripts from it.
- Prefer locally owned, optimized media. Record source, rights owner, alt-text facts, and usage limits when adding an asset.
- Keep the POC dashboard static, visibly demonstrative, and populated exclusively with fictional data.
- Do not create or connect Supabase during the POC. A later production system must use a client-owned Supabase project and an approved variable-role/RLS design.

## Required change record

Update `docs/DECISIONS.md` in the same change whenever work alters brand rules, information architecture, content/data shape, integrations, forms, analytics, SEO/redirects, hosting, security/privacy behavior, or a repeated UI pattern. Record a concise rationale that can be reviewed; do not include private chain-of-thought or a chronological transcript.

A decision entry must state:

- date and status;
- the user/business goal;
- the selected approach and why it serves that goal;
- material alternatives/tradeoffs only when they affect future work;
- affected files/routes/integrations;
- validation performed;
- unresolved assumptions and named follow-up owner.

For a routine copy correction or dependency patch with no durable design/architecture impact, add a short change-note entry rather than manufacturing a major decision.

## Definition of done for every update

- Business facts are sourced or explicitly approved.
- Desktop, tablet, and mobile layout are considered for affected UI.
- Keyboard/focus, headings, labels, alt text, contrast, and reduced-motion behavior remain sound.
- Internal/external links and affected form/booking paths are tested.
- Page title, description, canonical, structured data, redirects, and sitemap implications are considered for route/content changes.
- Appropriate build, type, schema, lint, and focused behavior checks pass.
- `docs/DECISIONS.md`, `docs/CONTENT_SOURCE_MAP.md`, README/config examples, and launch/operations docs are updated when their assumptions change.
- The final handoff states what changed, why, validation evidence, risks, and unresolved owner input.

## Guardrails

- Do not make treatment guarantees or broaden health claims while “improving” copy.
- Do not silently change clinical terminology; ask the practitioner responsible for the service.
- Do not expose form submissions, email addresses intended to remain private, API keys, or client health details in logs/analytics.
- Do not convert the static dashboard demo into an operational dashboard or add a tracker/third-party script until its owner, data flow, roles, consent requirement, deletion path, and operational benefit are documented.
- Do not create a developer-owned Supabase project for production. The client must own the project, billing, recovery access, and administrator accounts.
- Do not remove redirects, old-domain support, policies, or accessible fallbacks merely because current pages still load.
- Do not publish placeholders such as `TBD`, `#` links, fake practitioner records, or guessed contact details.

## Maintaining the living record

Keep the newest entries at the top of `docs/DECISIONS.md`. Use stable IDs (`ADR-###` for durable decisions, `CHG-YYYY-MM-DD-short-name` for routine notes). When a decision changes, mark the old one **Superseded by ADR-###** rather than deleting it. That preserves context while making the current rule unambiguous.
