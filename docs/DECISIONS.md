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
- **Status:** Accepted
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
