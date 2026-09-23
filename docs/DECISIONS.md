# Living decisions and change record

This file preserves the public, reviewable reasoning behind the website. It is not a private chain-of-thought log. Keep explanations concise and evidence-based. Add new entries at the top, below these instructions.

## Entry template

### ADR-### — Decision title

- **Date:** YYYY-MM-DD
- **Status:** Proposed | Accepted | Superseded by ADR-###
- **Goal:** What visitor or business outcome this supports.
- **Decision:** The chosen approach.
- **Rationale:** Why this approach fits the goal and known constraints.
- **Tradeoffs:** Consequences future maintainers need to understand.
- **Affected:** Routes, files, content models, providers, or workflows.
- **Validation:** Review, test, metric, or evidence used.
- **Unresolved:** Assumption, required input, owner, and expected resolution.

### CHG-YYYY-MM-DD-short-name — Small change title

- **Goal:**
- **Change and rationale:**
- **Affected:**
- **Validation:**
- **Unresolved:** None, or the explicit follow-up and owner.

---

### CHG-2026-09-22-vagaro-branding — Match booking surfaces to Synaptyx

- **Goal:** Make the Vagaro booking experience recognizable as Synaptyx Manual Therapy when visitors move between the website and Vagaro.
- **Change and rationale:** Made a 1200 × 800 logo from the existing Synaptyx mark and Inter wordmark, uploaded it to Vagaro's Venue Gallery, and set it as the business logo in place of the old SMT image. Confirmed the widget builder already uses `#70C1F6` for its button. Added a matching blue edge to the site's widget frame and regenerated the sharing card with Oakbrook Terrace instead of the stale Oswego location.
- **Affected:** Vagaro Venue Gallery and public listing, `/book/` widget frame, `public/images/synaptyx/{vagaro-business-logo.png,social-card.jpg}`, `src/styles/global.css`.
- **Validation:** Vagaro labeled the new image LOGO; the public listing and embedded Chrome widget displayed it. The widget builder showed `#70C1F6`, and Chrome displayed a blue booking button and frame. The uploaded image met Vagaro's size requirements.
- **Unresolved:** Vagaro's public marketplace listing and embedded booking interface retain their shared layout and some fixed control colors. The site's direct Vagaro link remains available if the iframe is blocked. Synaptyx mark approval remains a production gate under ADR-008.

### ADR-010 — Route verified contact inquiries to a practice-owned Google Form

- **Date:** 2026-09-22
- **Status:** Accepted; supersedes the non-sending contact-form assumption in ADR-007 and ADR-009
- **Goal:** Let visitors send a general question from the site's contact page to the practice without introducing site accounts or a database.
- **Decision:** Use a published Google Form owned by Joshua Bruning's `info@totaltissueandfitness.com` account as the response destination. The native site form collects five general-inquiry fields and a Cloudflare Turnstile token. A Cloudflare Worker validates the token server-side, checks its hostname and action, then maps the fields to the Google Form and checks Google's confirmation. Keep the Google destination, entry IDs, and provider branding out of visitor-facing page output. Use the business phone as a fallback. The Form is open to anyone with its link, does not require sign-in, and notifies the owner account of new responses. Instruct visitors not to include medical or sensitive health information; keep submissions out of the fictional dashboard.
- **Rationale:** The owner requested an unobtrusive Google Form integration and Cloudflare bot protection, and supplied access to the correct signed-in accounts. A Worker is required because Turnstile tokens must be validated on a server before forwarding; the static GitHub Pages site cannot keep the validation secret.
- **Tradeoffs:** The Worker receives contact details and passes them to Google; both services are part of the inquiry data path. Cloudflare's public Worker URL is inspectable, but the Google destination is held in a Worker secret. Anyone who discovers the public Google Form URL can still submit to it directly and bypass this site's Turnstile gate. Changing Google Form questions can break the mapping. The Worker checks a confirmation marker, but upstream changes and retries can still cause delivery errors or duplicates. Google's native new-response email links to the answers rather than including them; the owner chose not to add custom email automation. The website's factual information is not an approved production privacy policy.
- **Affected:** `/contact/`, `/privacy/`, `src/data/contactForm.ts`, `workers/contact/index.js`, tests, deployment workflow/configuration, README, maintainer/operations/deployment docs, content map, launch checklist, Joshua-owned Google Form.
- **Validation:** The published responder page and its five entry IDs, required fields, option labels, and response action were checked. A nonpersonal test submission returned Google's confirmation and triggered the account's new-response notification. The Worker passed a Wrangler dry run; four tests cover token rejection, forwarding, origin rejection, and action mismatch. Root and Pages-base-path validation passed Astro check, build, link checks, and eleven tests. Live Worker and site delivery remain to be verified after deployment.
- **Unresolved:** Joshua must approve the full privacy policy, retention/deletion rules, inbox coverage and response target before production launch. Direct submissions to the public Google Form remain possible; monitor spam and delivery. Deploying the Worker and public Pages site are separate release steps.

### ADR-009 — Use Vagaro for live website booking and Oakbrook Terrace for visits

- **Date:** 2026-09-22
- **Status:** Accepted; supersedes the booking-path assumptions in ADR-006 and the Oswego visit-location assumption in ADR-008. Its contact-form preview assumption is superseded by ADR-010.
- **Goal:** Let visitors book an available service with Josh or Casey from the website and send them to the correct visit location.
- **Decision:** Embed the business-wide Vagaro booking widget on `/book/`, including all service categories currently bookable in Vagaro and both providers. Use Vagaro's generated code unchanged, with a direct Vagaro link and public business phone as fallbacks. New clients schedule a call first, then book the first session in Vagaro; the Vagaro service description was updated to match, retaining its existing team contact methods. Use 17W755 Butterfield Road, Oakbrook Terrace, IL 60181 for visitor-facing location copy and structured data; Oswego is the billing address only and is not shown as the visit location.
- **Rationale:** The owner confirmed the Vagaro account, both providers, all service options, and the Oakbrook Terrace visit address. The widget keeps availability and service options in Vagaro rather than duplicating them in this static site. The address and phone were also verified on the public Vagaro listing. Vagaro's [widget instructions](https://support.vagaro.com/hc/en-us/articles/204347860-Add-the-Booking-Widget-to-Your-Site) say its generated HTML is static and should be regenerated when settings change.
- **Tradeoffs:** Opening `/book/` loads Vagaro's third-party widget; booking details and any resulting client records are handled by Vagaro, not this site's contact form or demo dashboard. The widget needs regeneration if its Vagaro settings change. A direct link remains available if third-party scripts or frames are blocked. The POC remains non-indexable and does not gain a local database or account system.
- **Affected:** `/book/`, related booking CTAs, public location copy and metadata, `src/data/site.ts`, `src/styles/global.css`, privacy copy, source map, launch checklist, README.
- **Validation:** Root and GitHub Pages base-path validation each passed Astro check, static build, link/asset checks, and seven tests; formatting passed. In Chrome, the local widget loaded the Vagaro service menu and the returning-client booking flow offered both Josh Bruning and Casey Thayer as providers; the first-session service editor shows both enabled. At 390 px width the widget loaded without horizontal overflow. The updated first-session wording was verified in the public widget after saving.
- **Unresolved:** The business owner must review the live Vagaro service menu, prices, provider assignments, booking rules, and final privacy policy before production use. Contrast and workshop availability in Vagaro remains provider-managed; the site does not promise a dedicated listing.

### ADR-008 — Rebrand the site to Synaptyx Manual Therapy with legacy notices

- **Date:** 2026-09-08
- **Status:** Accepted; supersedes ADR-005 (identity clause) and realizes the intent of ADR-002. Its Oswego visit-location assumption is superseded by ADR-009.
- **Goal:** Present Total Tissue & Fitness as Synaptyx Manual Therapy, a separate sister company (subdivision) within the Synaptyx family alongside Synaptyx Health & Performance, while making sure existing clients recognize the practice.
- **Decision:** The public identity is “Synaptyx Manual Therapy”. Use the Synaptyx mark (trimmed from the partner’s logo) in a “SYNAPTYX / Manual Therapy” lockup, the partner’s tokens (blue `#70c1f6`, near-black `#101010`, grey `#7c91a0`), and Inter for all type. Retire the gold palette and Manrope. Keep the original gold logo only as a legacy mark. Every public page carries a “formerly Total Tissue & Fitness” signal: a site-wide announcement bar, a home transition section (`/#formerly`), an FAQ entry, footer/copyright text, page descriptions, and JSON-LD `alternateName`, `brand`/`memberOf` Synaptyx, and `affiliation` with the sister company. Copy says “sister company”, never “partnership”.
- **Rationale:** The user explicitly requested Synaptyx branding, colors and logos with notices about the former name, and clarified that the entity is a sister company within Synaptyx rather than a partnership with Synaptyx Health & Performance, which is the “later explicit user decision” the previous rule required. Legacy notices protect search recognition and returning clients during the transition.
- **Tradeoffs:** Testimonials and videos were recorded under the former name and are attributed accordingly. Logo rights and the exact lockup wording belong to Synaptyx Health & Performance and need their approval before production. The gold identity remains in archived assets and can be restored by reverting tokens and the Brand component.
- **Affected:** `src/data/site.ts`, `src/components/{Brand,Announcement,Footer,PageHero}.astro`, `src/layouts/BaseLayout.astro`, all pages, `src/styles/{global,admin,motion}.css`, `public/images/synaptyx/`, tests, CLAUDE.md, README, checklist, content map.
- **Validation:** Astro check, build, built-link check and seven tests pass for root and Pages base paths; contrast of blue/grey/white text on `#101010` exceeds WCAG AA; desktop 1440 and mobile 375 browser checks of home, booking and 404 (lockup, announcement, menu CTA, transition section).
- **Unresolved:** Synaptyx approval of logo usage, lockup, legal entity name and structured-data organization model, and when to retire the legacy notices (owner: Josh and Synaptyx principals). The practitioner’s name was supplied verbally as “Josh” only; it is not published until full name, credentials and headshot are approved. Old-domain redirects and SEO handling of the name change remain production gates.

### CHG-2026-09-08-polish — Motion, hero video, media, copy and QA polish

- **Goal:** Make the site feel finished on desktop and mobile with smooth motion, and bring every captured asset into use.
- **Change and rationale:** Added a progressive scroll-reveal system and hero entrance (`reveal.ts`, `motion.css`) that stays static under reduced motion or without JavaScript. Restored the original background video as the home hero (re-encoded to ~2 MB MP4 / ~1.4 MB WebM, muted, looping, poster fallback, Save-Data/reduced-motion pause, visible pause control). Re-encoded the mentorship WebM to MP4+WebM and placed it on the Mentorship page. Applied Opus/Sonnet audit findings: header sizing and 760px nav breakpoint, full-height short pages, left-aligned privacy prose, label sizes floored at 10–11px, consistent section spacing, mobile-menu CTA button, styled selects, header-aware anchor offsets, CTA bands on booking and 404, → for internal links and ↗ only for external. Copy: removed the unreviewed “No more pain!” testimonial, Title Case service names, “Mentorship” nav label, distinct 404 description, partner URL sourced from data, removed unused `transitionDate` duplication.
- **Affected:** Layout, components, all pages, styles, scripts, `public/media/optimized/`, tests, DEVELOPMENT.md, CONTENT_SOURCE_MAP.md.
- **Validation:** Live site re-crawled 2026-09-08 and found byte-identical to the snapshot; all live assets confirmed present. Check/build/links/tests pass; browser checks as in ADR-008.
- **Unresolved:** Practitioner to confirm “Voodoo flossing/Floss bands” wording and the integration-vs-corrective exercise term; owner sign-off on the $1,200 workshop package; captions if either native video has narration.

### ADR-007 — Publish the non-indexable POC through public GitHub Pages

- **Date:** 2026-09-08
- **Status:** Accepted; published and verified
- **Goal:** Give stakeholders a durable review URL and public source repository without changing the live business domain or representing the POC as production-ready.
- **Decision:** Publish source publicly at `awaisqazi/total-tissue-and-fitness` and deploy `main` through GitHub Pages at `https://awaisqazi.github.io/total-tissue-and-fitness/`. Build with `SITE_URL=https://awaisqazi.github.io`, `BASE_PATH=/total-tissue-and-fitness`, and `PUBLIC_SITE_INDEXABLE=false`. Use `.github/workflows/deploy.yml` with Node 24 for validation and automatic Pages deployment.
- **Rationale:** The user explicitly authorized public GitHub and GitHub Pages after the private Sites callback failure. The repository subpath requires base-aware links and canonical output. Keeping noindex preserves the review-only intent even though anyone with the URL can access the POC.
- **Tradeoffs:** A public repository and Pages URL expose all committed source and static demo content. No secrets or real client data may be committed. Noindex is a crawler directive, not access control. GitHub Pages does not make the form, dashboard, authentication, or Supabase operational.
- **Affected:** Repository visibility/delivery, GitHub Pages base path, build-time URL/indexing variables, CI workflow, README, deployment/status/operations documentation.
- **Validation:** User authorization is explicit. The public repository exists, Pages is enabled, root and Pages-base-path Astro checks report zero errors/warnings/hints, 10 built pages pass link/asset/fragment checks, and seven tests pass. GitHub Actions run 34257990834 succeeded for site-code commit 4b28a79. All 10 deployed HTML routes, 19 asset URLs, metadata and branded 404 checks passed, along with live browser navigation and demo dashboard filtering.
- **Unresolved:** Record the published commit, workflow run, live Pages response, and deployed smoke-test evidence after deployment. Production hosting/domain, real forms, client-owned Supabase, roles, booking, legal, and business-content approvals remain deferred.

### CHG-2026-09-08-private-hosting — Keep review available after a hosting service failure

- **Goal:** Deliver the working POC without changing the live business site or widening access.
- **Change and rationale:** Saved source version 1 and attempted owner-private publication twice. Both attempts failed with the same service-side sign-in callback HTTP 409 conflict. Retain the local preview and full portable source as review deliverables; record exact service references in DEPLOYMENT_STATUS.md.
- **Affected:** Private hosting status and handoff documentation only. Site behavior is unchanged.
- **Validation:** Source push succeeded, version save succeeded, both deployment statuses were terminal failed; local site/build checks passed.
- **Unresolved:** Superseded for POC delivery by ADR-007. The callback failure remains historical evidence; no further Sites retry is planned.

### ADR-006 — Deliver a portable Astro POC with explicit operational boundaries

- **Date:** 2026-09-08
- **Status:** Accepted
- **Goal:** Demonstrate the migrated website and future admin workflow while making Claude maintenance straightforward.
- **Decision:** Use Astro static pages, self-hosted Inter/Manrope fonts, original gold branding, optimized local media, minimal client scripts and no Webflow runtime. Preserve original page paths and useful home anchors. Provide a non-sending contact form and a fictional, memory-only dashboard concept. The private-only publication clause is superseded by ADR-007; noindex remains required for the public POC.
- **Rationale:** This satisfies the corrected visual and POC scope with a portable build and minimal operational overhead. Real account/data work remains with the future client-owned Supabase project.
- **Tradeoffs:** Long-form copy lives in its route file; shared facts and destinations live in typed configuration. Dashboard drafts do not change public pages or persist. The original social artwork remains rather than inventing new branding.
- **Affected:** src/, public/, scripts/, tests/, README.md, CLAUDE.md, development/deployment/operations documentation.
- **Validation:** Astro checks/build, built route/fragment/asset integrity, six automated contracts, Chromium desktop/mobile/tablet and Safari homepage/FAQ smoke tests. See QA.md.
- **Unresolved:** Client-approved Jane and other booking destinations, workshop price/package, practitioner/contact/social information, production privacy policy, domain cutover, real forms and future Supabase roles.

### CHG-2026-09-08-booking-and-provenance — Avoid a mislabeled workshop destination

- **Goal:** Prevent a couples-workshop visitor from entering an unrelated contrast-trial calendar.
- **Change and rationale:** Keep the original URL in source provenance/config but route workshop CTAs to the clearly labeled inquiry prototype. Remove a hidden unrelated LeadConnector survey from the visitor flow. Remove the contrast calendar’s fixed April 2024 month query. Preserve Jane transition information without guessing a Jane URL.
- **Affected:** book.astro, couples-workshop.astro, data/site.ts, source audit.
- **Validation:** Source link metadata reviewed; internal pathways tested. Vagaro anti-bot behavior remains inconclusive.
- **Unresolved:** Business owner supplies and verifies current booking pathways before production.

### ADR-005 — Retain Total Tissue identity and bound the dashboard to a static POC

- **Date:** 2026-09-08
- **Status:** Identity clause superseded by ADR-008; dashboard/Supabase clauses remain Accepted
- **Goal:** Demonstrate the Astro redesign accurately without prematurely changing the public brand or implying production data infrastructure.
- **Decision:** Keep the Total Tissue & Fitness name, existing gold logo, and gold colors `#d0a84c`/`#dabb6b`. Use Synaptyx Performance only as a layout/style reference. Keep the POC dashboard static and populated exclusively with fictional data. Do not create Supabase in the POC; a future operational dashboard is planned around a client-owned Supabase project with varying roles defined and enforced later.
- **Rationale:** The user clarified that “Synaptyx Manual Therapy” is a future partnership discussion, not the current identity. Separating a static demonstration from production authentication/data work keeps the POC honest and avoids hard-coding unresolved roles or creating infrastructure under the wrong owner.
- **Tradeoffs:** The POC can validate information architecture, responsive design, and workflow concepts, but it cannot validate real authentication, persistence, notifications, RLS, backups, or operational administration.
- **Affected:** Global branding, design tokens, public copy, dashboard UI/data, environment setup, README/operations guidance, launch definition.
- **Validation:** Direct user correction specifying Total Tissue identity, existing gold logo/colors, Synaptyx as visual reference only, fictional demo data, no current Supabase, and future client-owned Supabase with varying roles.
- **Unresolved:** Before production, the client must approve role definitions, data model, RLS, authentication, retention, backups, account ownership, and whether the future partnership changes public naming.

### ADR-004 — Replace the Webflow mentorship form before launch

- **Date:** 2026-09-08
- **Status:** Accepted for future production; current POC is a non-sending preview
- **Goal:** Preserve mentorship inquiries after the Astro migration and give the business a reliable, accountable response process.
- **Decision:** Rebuild the form against a supported server-side endpoint with validation, spam controls, accessible success/error states, and tested owner delivery. Treat provider selection and data-retention policy as launch inputs.
- **Rationale:** The captured form uses Webflow's form runtime/backend and has no portable action endpoint. Copying its markup would create a form that appears functional but cannot be trusted to deliver.
- **Tradeoffs:** A replacement provider requires configuration, privacy review, monitoring, and an owner; it also removes the Webflow runtime dependency.
- **Affected:** `/mentorship-program/`, environment configuration, privacy/terms content, notification workflow, launch QA.
- **Validation:** Snapshot HTML shows Webflow form fields and success/error shells without a standalone submission endpoint.
- **Unresolved:** Business owner must choose the receiving workflow, recipients, retention/deletion policy, consent wording, and response-time owner.

### ADR-003 — Centralize editable business content

- **Date:** 2026-09-08
- **Status:** Accepted
- **Goal:** Let Claude and human maintainers update services, people, CTAs, and contact data consistently without reintroducing duplicated copy.
- **Decision:** Store shared business facts and destinations in typed src/data/site.ts. Keep long-form copy in the relevant Astro page. Add runtime schemas when external/CMS input is introduced.
- **Rationale:** The source repeats FAQs, booking CTAs, and overlapping service descriptions across pages. A single source reduces drift and supports type checking and built-link validation before publication.
- **Tradeoffs:** Repository editing is less visual than a CMS but is auditable and has low operational overhead. Add a CMS/dashboard later only when editor roles and frequency justify it.
- **Affected:** Global navigation/footer, services, practitioners, FAQs, testimonials, booking, contact, SEO metadata.
- **Validation:** Content/source map identifies the repeated source material and ownership gaps.
- **Unresolved:** Define who will edit content, how often, and whether a nontechnical dashboard is required after launch; business owner accountable.

### ADR-002 — Use a Synaptyx sibling design system with a clear Manual Therapy identity

- **Date:** 2026-09-08
- **Status:** Superseded by ADR-005
- **Goal:** Make the partnership feel like one credible entity while ensuring visitors understand the manual-therapy offer.
- **Decision:** Apply the Synaptyx Performance system at the token and component level—typography roles, colors, spacing, navigation/footer patterns, cards, buttons, media treatment, and motion—then use an approved “Manual Therapy” descriptor and lockup throughout.
- **Rationale:** Shared design rules create a stronger organizational relationship than copying isolated visual details, while the service descriptor prevents brand ambiguity.
- **Tradeoffs:** Exact logo hierarchy, font licensing, colors, and shared-versus-distinct elements need owner approval before this becomes Accepted.
- **Affected:** Global shell, design tokens, page templates, SEO naming, social images, cross-site links.
- **Validation:** User brief explicitly requests integration with Synaptyx Performance and the name Synaptyx Manual Therapy.
- **Unresolved:** This interpretation is no longer current. Any future partnership rename requires a new approved decision rather than reactivating this proposal.

### ADR-001 — Preserve useful source content while requiring approval for sensitive facts

- **Date:** 2026-09-08
- **Status:** Accepted
- **Goal:** Make migration progress without publishing invented or unverified business and clinical information.
- **Decision:** Use the captured Webflow copy and assets as provenance, not automatic publication approval. Retain stable high-level concepts; gate practitioner/contact/legal/booking/pricing/claims details on accountable client approval.
- **Rationale:** The snapshot is incomplete and internally inconsistent, including multiple booking systems, typographical errors, duplicated descriptions, missing contact/practitioner data, empty media containers, and broad health claims.
- **Tradeoffs:** Some production sections remain omitted or draft-only until inputs arrive; this protects accuracy and makes each dependency visible.
- **Affected:** All public routes, content model, forms, booking CTAs, SEO/structured data, launch checklist.
- **Validation:** Audit of the three captured routes, element inventories, link destinations, and asset manifest.
- **Unresolved:** See `CONTENT_SOURCE_MAP.md` and `LAUNCH_CHECKLIST.md` for assigned approval inputs.

### CHG-2026-09-08-final-qa — Make the preview clear and maintainable

- **Goal:** Keep the proof of concept safe to explore and easy for Claude to update.
- **Change and rationale:** Prevent no-JavaScript inquiry submission, move status focus to the preview result, compact the dashboard heading, format source consistently, and retain only Total Tissue branding in deployed image assets. Save a QA report describing actual browser coverage and untested production flows.
- **Affected:** contact.astro, admin page/styles, scripts/tests, documentation, design-reference archive.
- **Validation:** Final Astro check/build, built links/assets, six Node tests and focused Chromium form/dashboard checks. See QA.md for scope.
- **Unresolved:** Production launch requirements remain in LAUNCH_CHECKLIST.md.
