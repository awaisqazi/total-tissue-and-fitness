# Total Tissue & Fitness Astro migration audit

Audit date: 2026-09-08  
Source captured: `https://www.totaltissueandfitness.com`  
Evidence: `docs/source-snapshot/manifest.json`, page HTML/text/element captures, and downloaded assets  
Current identity: **Total Tissue & Fitness**. Retain the existing gold logo and established gold palette (`#d0a84c` and `#dabb6b`). Synaptyx Performance is a layout, composition, and interaction reference only. “Synaptyx Manual Therapy” is a possible future partnership direction and is outside the current POC identity.

## Executive findings

The captured Webflow site contains three public routes: `/`, `/contrast-therapy`, and `/mentorship-program`. Most business content is concentrated on the home page. The site presents manual therapy/recovery, contrast therapy, a practitioner mentorship program, a couples workshop, testimonials, FAQs, and separate new/returning-client booking paths.

The content is usable as migration source material, but it is not launch-ready copy. It contains duplicated service descriptions, inconsistent technique lists, typographical errors, broad health claims that need client review, empty testimonial video containers, blank image alt text, stale-looking date/query parameters, and an internally inconsistent booking stack. The target site should preserve the useful facts and media while treating claims, pricing, practitioner details, contact details, and destinations as client-owned data that must be confirmed.

The mentorship inquiry is the only captured first-party form. It relies on Webflow's form runtime/backend and cannot be expected to submit from Astro. It must be replaced with a supported endpoint, submission storage or delivery path, spam protection, consent text, success/error behavior, and an owner-tested notification workflow.

## Captured route inventory

| Current route                     | Captured purpose                                                                                            | Recommended target                             | Migration action                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `/`                               | Overview, treatment approach, mentorship teaser, couples workshop, testimonials, returning client CTA, FAQs | `/`                                            | Retain Total Tissue & Fitness identity; tighten the service overview and proof; remove duplication |
| `/contrast-therapy`               | Benefits, process, cold plunge, hot plunge, infrared sauna, gallery, returning client CTA, FAQs             | `/contrast-therapy/`                           | Retain as a focused service page; review benefit/health language                                   |
| `/mentorship-program`             | Mentorship introduction and inquiry form                                                                    | `/mentorship-program/`                         | Retain program concept; replace Webflow form; expand only from approved client copy                |
| Home-page couples section         | Workshop inclusions, duration, price, Calendly CTA, YouTube video                                           | `/couples-workshop/` or a home/service section | Correct copy and confirm active offer, price, contents, and booking URL before publication         |
| Home-page manual therapy sections | General approach and technique lists                                                                        | `/manual-therapy/`                             | Consolidate into one canonical description                                                         |

Recommended top-level navigation: Home, Manual Therapy, Contrast Therapy, Mentorship, About, Contact/Book. Add Couples Workshop only if the client confirms it remains active. Avoid exposing empty routes merely to imitate the old navigation.

## Content findings

### Retain and reshape

- Education- and biomechanics-led positioning.
- Manual therapy and recovery methodology, after a practitioner reviews the final technique names and scope.
- Contrast therapy process: cold plunge, hot plunge/hot tub, and infrared sauna.
- Oswego, Illinois service-area statement, pending a complete approved address or service-area preference.
- Mentorship for physical therapists, manual therapists, and fitness professionals.
- Returning-client concept and separate booking pathway, if still required by the chosen scheduling platform.
- Testimonials and video evidence where media ownership, consent, attribution, and playback are confirmed.
- Couples workshop only after the offer details are re-approved.

### Revise before publication

- Preserve Total Tissue & Fitness naming, gold logo, and established gold palette. Do not introduce “Synaptyx Manual Therapy” into public-facing POC copy. A partnership rename requires a separate future decision and approved assets.
- Merge the two near-duplicate manual therapy descriptions into one source of truth.
- Resolve differing technique lists. The source alternately mentions Myotome testing, Muscle Pairing, Neuromuscular Activation Therapy, Fascial Adhesion Hydration/Release, cupping, Graston, body tempering, voodoo flossing, myofascial release, corrective/integration exercise, and “hygienic movement.” Do not normalize specialized terminology without practitioner approval.
- Edit errors including “cupping,,,” “GRAston,” “voo doo bangs,” “BOok,” and “first-hand-experience.” “Voo doo bangs” likely means bands, but that must be confirmed rather than silently changed.
- Review claims about inflammation, blood flow, tissue healing, metabolism, sciatica, plantar fasciitis, pelvic floor disorders, hypermobility, nerve pressure, pain, and recovery. Use accurate, supportable language within the practitioners' scope and add any required safety guidance.
- Reassess age-based session frequency guidance. It currently recommends intervals based primarily on age; publish only if the clinical owner approves it.
- Confirm whether “one hour of contrast therapy” is included with every manual-therapy client/session and describe the operational limits clearly.
- Replace “free educational” with client-approved wording, likely “free education session” or “consultation.”
- Confirm the November 1, 2026 Jane transition notice. As captured on September 8, 2026, it describes a future transition while current CTAs still use Vagaro and Calendly.

### Missing client-supplied information

Do not invent these fields. The site can use explicit draft placeholders outside production until the client supplies them.

- Practitioner names, credentials, bios, headshots, specialties, and approved scope descriptions.
- Final partnership logo/lockups, usage rules, legal business name, and naming hierarchy.
- Primary phone, public email, full address, map preference, hours, accessibility/parking notes, and service area.
- Final Jane booking URLs and whether distinct new-client, returning-client, contrast, mentorship, and workshop flows remain necessary.
- Inquiry recipients, response-time promise, privacy policy, terms, consent language, and data-retention preference.
- Social profile URLs.
- Approved service list, durations, prices, packages, eligibility/contraindications, and cancellation policy.
- Testimonial permissions, names/attribution rules, and final media list.
- Analytics/search accounts and ownership.

## Media and asset audit

The source manifest records downloaded logos, favicon files, a hero/background JPG, nine testimonial/gallery WebP images, three contrast-therapy JPGs, a background MP4/WebM pair, a mentorship WebM and poster, plus play/pause SVG controls. One mentorship MP4 download failed with HTTP 403, but a WebM version was captured. One combined source URL also reports 403 despite separate hero MP4/WebM files being present.

Actions before launch:

1. Keep the source snapshot immutable as provenance; copy selected media into the Astro public/content structure with descriptive names.
2. Confirm ownership and consent for every photo, video, testimonial, and logo.
3. Generate responsive image sizes and modern formats while preserving originals.
4. Supply meaningful alt text based on the actual subject and purpose; the captured images mostly use blank alt attributes.
5. Add poster images, captions/transcripts where needed, explicit dimensions/aspect ratios, reduced-motion behavior, and lazy loading below the fold.
6. Avoid copying Webflow scripts, jQuery, Embedly wrappers, or generated CSS into the target. Use native Astro components and direct privacy-aware YouTube embeds or linked posters.
7. Check the missing mentorship MP4 in Safari/iOS. Either acquire a client-owned MP4 fallback or transcode from an authorized source copy.

Captured YouTube IDs: `uBjppA4WRW4`, `nKuis2o6GUI`, `KmQdSmb7iec`, and `gRatHeEvmPw`. Two testimonial containers appear empty in the source; confirm whether John and Amanda videos exist.

## Link and integration audit

| Integration     | Captured destination                                                           | Purpose                                | Launch disposition                                                                    |
| --------------- | ------------------------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------- |
| Vagaro services | `https://www.vagaro.com/totaltissueandfitness/services`                        | General/new-client booking CTA         | Verify or replace with approved Jane route                                            |
| Vagaro book now | `https://www.vagaro.com/totaltissueandfitness/book-now`                        | Returning client CTA                   | Verify or replace with approved Jane route                                            |
| Calendly        | `https://calendly.com/thayercfitness/total-tissue-session-clone?month=2024-04` | First contrast-therapy session         | Verify owner and remove stale month parameter or replace                              |
| Calendly        | `https://calendly.com/contrast-therapy/contrast-therapy-clone`                 | Couples workshop                       | Verify the route maps to the workshop; the naming is ambiguous                        |
| LeadConnector   | `https://api.leadconnectorhq.com/widget/survey/sewamW1vizGBQSxW4B0D`           | Empty/hidden anchor near a testimonial | Determine whether intentional; remove if unused                                       |
| Webflow Forms   | No portable action endpoint captured                                           | Mentorship inquiry                     | Replace; Webflow backend dependency is a launch blocker                               |
| Klaviyo         | Company ID `VgANuy` script on captured pages                                   | On-site marketing behavior             | Confirm business ownership, consent needs, and intended behavior before carrying over |
| YouTube/Embedly | Four embeds                                                                    | Educational/testimonial/workshop media | Replace Embedly wrapper; confirm videos and consent                                   |

There are no confirmed social profile links, phone/email links, full street address, privacy-policy route, or valid terms route in the captured material. The mentorship form's “Terms” link points to `#`, so consent is not meaningfully linked.

## Design-reference direction

The current goal is a stronger Total Tissue & Fitness site informed by Synaptyx Performance's layout and interaction quality. Reuse reference patterns such as spacing rhythm, type hierarchy, card composition, button behavior, photography treatment, motion restraint, and navigation/footer structure while keeping Total Tissue's existing logo, name, and gold brand palette. Do not imply a public partnership or shared entity in this POC.

Required brand decisions before production:

- Confirm the existing Total Tissue logo variant and clear-space/minimum-size treatment.
- Confirm how the existing gold colors (`#d0a84c`, `#dabb6b`) map to accessible UI roles.
- Identify which Synaptyx-inspired layout/interaction patterns are appropriate without copying protected assets or implying affiliation.
- Licensed webfont files or an approved system/font-hosting strategy.
- Voice attributes and approved promise/tagline.
- Cross-link behavior between the Performance and Manual Therapy websites.

## SEO and migration controls

- Create one unique title, meta description, H1, canonical URL, and social image per indexable route.
- Preserve `/contrast-therapy` and redirect it permanently to `/contrast-therapy/` if the URL changes. Redirect `/mentorship-program` to `/mentorship-program/` if changed.
- Generate `sitemap-index.xml` or `sitemap.xml`, `robots.txt`, canonical tags, Open Graph/Twitter metadata, and a useful 404 page.
- Add `LocalBusiness`/appropriate subtype structured data only after legal name, contact data, address, hours, and canonical profiles are approved. Do not invent ratings or medical credentials.
- Use descriptive alt text and internal links; keep one H1 per page and use headings in order.
- Establish Search Console and analytics ownership, record the prelaunch baseline, and monitor crawl/index/404 data after the DNS change.
- Preserve the old domain as the canonical production domain unless the client explicitly selects a new domain. Test redirects at the edge before changing DNS.

## Operational architecture

Astro should keep low-frequency business content in versioned content files with schemas. Centralize services, practitioners, FAQs, testimonials, booking destinations, contact details, and site metadata so future agents do not edit repeated prose across components. Treat secrets and form credentials as environment variables; document only their names and purpose.

For the POC, the dashboard is a static demonstration populated only with fictional data. It proves navigation, information hierarchy, responsive behavior, and candidate admin workflows; it is not an authenticated operational system and must not receive real client information.

For production, a future client-owned Supabase project is planned. Its schema, authentication, row-level security, role matrix, audit needs, retention, backups, and environment ownership must be designed and approved before connection. Expected roles may vary, so the POC must not hard-code authorization assumptions. Repository-backed content with preview deployments remains a reliable interim workflow for public-site content.

The form pipeline should provide server-side validation, honeypot or rate limiting, accessible error states, a success confirmation, privacy consent where applicable, delivery retries/logging, and a tested owner notification. Never log sensitive message contents in general analytics.

## Priority risks

| Priority | Risk                                                                | Resolution                                                                                                        |
| -------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Blocker  | Mentorship form depends on Webflow backend                          | Select and test a replacement endpoint and notification owner                                                     |
| Blocker  | Booking platform and final URLs are unresolved                      | Client confirms Jane/Vagaro/Calendly workflow and supplies canonical URLs                                         |
| Blocker  | Contact, practitioner, legal, and brand identity inputs are missing | Collect and approve source-of-truth business data                                                                 |
| High     | Health/performance claims may overpromise                           | Practitioner/legal review and evidence-aware rewrite                                                              |
| High     | Media rights, testimonial consent, and missing fallbacks            | Verify rights; acquire/re-encode approved media                                                                   |
| High     | Domain/DNS, analytics, and account ownership are unknown            | Record owners and recovery contacts before cutover                                                                |
| Medium   | Old URLs can lose search equity                                     | Implement and test permanent redirects/canonicals                                                                 |
| High     | POC dashboard could be mistaken for operational software            | Label it as a static fictional-data demo; do not connect production data or credentials                           |
| High     | Future Supabase roles/data boundaries are undefined                 | Create client-owned project only after schema, roles, RLS, retention, backups, and account ownership are approved |
| Medium   | Klaviyo/LeadConnector may be stale or privacy-sensitive             | Confirm purpose and consent before reinstallation                                                                 |

## Definition of POC-complete

POC-complete means the Astro experience demonstrates the approved Total Tissue & Fitness identity, Synaptyx-inspired layout direction, representative responsive pages, content organization, and a clearly labeled static dashboard using fictional data. Navigation and demo interactions should work, but form submission, authentication, Supabase persistence, operational booking changes, production DNS, and real user roles are not implied.

## Definition of production-ready

Production-ready additionally requires that all content and claims have named owners; booking/form/social/contact destinations are production values; the Webflow form has been replaced and tested; a client-owned Supabase project is configured if the dashboard becomes operational; authentication, RLS, role permissions, data retention, backups, and monitoring pass review; redirects and metadata are active; media and accessibility checks pass; and production domain, SSL, DNS rollback, analytics, monitoring, account ownership, and recovery access are documented.
