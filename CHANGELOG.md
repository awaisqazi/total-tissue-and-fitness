# Changelog

## 2026-09-22 — Simplified Vagaro booking page

- Removed separate Services and Gift Cards link cards because both already appear in Vagaro's widget. Kept About and Staff as smaller links below it.
- Replaced the pale outer panel and white inset with one continuous white booking section, a Synaptyx blue top edge, and tighter mobile spacing around the widget.
- Kept first-session call instructions, Oakbrook Terrace visit address, and direct Vagaro and phone fallbacks visible.

## 2026-09-22 — Vagaro sections and integrated gift cards

- Added Gift Cards to the Vagaro website widget and replaced the generated embed; Services and Book Now remain available.
- Added links from the booking page to Vagaro's live About, Staff, Services, and Gift Cards sections.
- Restyled the booking module as a pale blue panel around the white Vagaro widget, with Synaptyx blue accents and responsive navigation cards.

## 2026-09-22 — Vagaro branding and booking page polish

- Uploaded a Synaptyx Manual Therapy logo to Vagaro and set it as the business logo; it now appears on the public Vagaro listing and in the embedded booking widget.
- Confirmed Vagaro's widget button already uses Synaptyx blue (`#70C1F6`) and added a matching accent frame around the site's booking widget.
- Updated the site's social sharing card to say Oakbrook Terrace instead of Oswego.

## 2026-09-22 — Verified contact delivery

- Published a general inquiry form in Joshua Bruning's practice Google account and enabled response email notifications. A nonpersonal test submission reached the form.
- Added a native site form with Cloudflare Turnstile and a Worker that validates tokens before forwarding inquiries. Kept the Google destination out of page output, added a phone fallback and a sensitive-health-information warning. The fictional dashboard remains disconnected.
- Documented the two-provider inquiry path, its direct Google Form bypass limitation, and the remaining privacy and retention decisions (ADR-010). Worker and Pages deployment status is tracked separately.
- Kept Google Forms' native link-only response emails as requested; no custom email script or add-on was added.
- Deployed the Worker in Joshua's Cloudflare account and the site to GitHub Pages at commit `d8b9a7d` (workflow 35808707411). The Worker rejected an invalid token; a nonpersonal inquiry from the live page reached the Form, raising its response count from one to two.

## 2026-09-22 — Vagaro booking and visit location

- Added Vagaro's live business-wide booking widget for all currently bookable services with Josh or Casey, plus direct-link and phone fallbacks. Mentorship CTAs now lead to Vagaro's consultation listing; workshop CTAs call the business.
- Replaced the outdated Jane transition notice on the website with the first-session call requirement. Updated Vagaro's first-session description to direct clients to book there after the call, preserving its existing team contact methods.
- Corrected visitor-facing location copy and structured data to 17W755 Butterfield Road, Oakbrook Terrace, IL 60181. Oswego remains the billing address only.
- Updated booking guidance, privacy copy, and project records; the dashboard remains a fictional demo.

## 2026-09-08 — Synaptyx Manual Therapy rebrand and polish

- Rebranded to Synaptyx Manual Therapy (ADR-008): Synaptyx mark lockup, blue/near-black palette, Inter type, favicon/touch icon/social card, and “formerly Total Tissue & Fitness” notices (announcement bar, home transition section, FAQ, footer, structured data).
- Restored the original background video as the home hero with optimized encodes, poster fallback, reduced-motion handling and a pause control; added the mentorship clip with an MP4 fallback.
- Added progressive scroll-reveal and hover motion, header sizing/breakpoint fixes, larger minimum label sizes, consistent section spacing, styled selects, mobile-menu CTA, CTA bands on booking/404, and link-arrow conventions.
- Copy/QA: removed an unreviewed outcome testimonial, normalized service names, fixed 404/meta descriptions, and verified every live-site asset is present locally.

## 2026-09-08 — Public GitHub Pages delivery authorized

- Authorized public repository target: `awaisqazi/total-tissue-and-fitness`.
- Authorized GitHub Pages target: `https://awaisqazi.github.io/total-tissue-and-fitness/`.
- Defined the Pages validation environment: `SITE_URL=https://awaisqazi.github.io BASE_PATH=/total-tissue-and-fitness PUBLIC_SITE_INDEXABLE=false`.
- Kept the public POC non-indexable, the dashboard fictional/static, the inquiry form non-sending, and the original domain unchanged.
- Recorded the earlier failed private Sites deployment as historical context and superseded its private-only delivery rule.
- Public repository creation, Pages enablement, root/base-path Astro checks, 10-page integrity checks, and seven automated tests are complete. GitHub Actions run 34257990834 succeeded for site-code commit 4b28a79. All 10 deployed HTML routes, 19 asset URLs, metadata and branded 404 checks passed, along with live browser navigation and demo dashboard filtering.

## 2026-09-08 — Initial Astro proof of concept

- Migrated the public Webflow content into service, recovery, workshop, mentorship, booking, and inquiry-preview pages.
- Preserved Total Tissue & Fitness’s name, original gold logo and gold palette; adopted Synaptyx-inspired page composition.
- Archived original source pages, images, native videos, testimonials and verified external link inventory.
- Replaced Webflow runtime dependencies with static Astro components, native disclosures and minimal scripts.
- Added page metadata, canonical links, sitemap, local fonts, accessible navigation and preview noindex defaults.
- Added a clearly labeled non-sending inquiry preview and interactive fictional-data dashboard concept.
- Added Claude maintenance instructions, content audit, development/deployment guides, operational plan and living decision log.
- Production booking confirmation, client contact/practitioner details, legal policy and client-owned Supabase are deferred.
