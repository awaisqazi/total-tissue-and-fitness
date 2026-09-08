# POC and production checklist

The first section defines POC completion. The remaining sections are production gates and must not be treated as completed merely because the static demo works.

## POC completion

- [x] Public pages retain the Total Tissue & Fitness name and existing gold logo.
- [x] Gold tokens preserve `#d0a84c` and `#dabb6b` with accessible text/background use.
- [x] Synaptyx Performance influences layout and style only; the POC does not replace Total Tissue’s identity with “Synaptyx Manual Therapy” as its identity.
- [x] Representative home, service, mentorship, and dashboard views work at desktop, tablet, and mobile widths.
- [x] Dashboard is clearly labeled as a static demo and uses fictional data exclusively.
- [x] No Supabase project, authentication, real client data, or operational role claims are present.
- [x] Known production placeholders and nonfunctional integrations are documented for handoff rather than presented as complete.

## Production release gates

## Business and content approval

- [ ] Total Tissue & Fitness public name, legal footer form, existing gold logo variant, and brand usage approved.
- [ ] Logo files, color tokens, font licensing/hosting, and usage rules approved.
- [ ] Practitioner names, credentials, bios, specialties, and headshots approved.
- [ ] Service names, descriptions, durations, pricing/packages, inclusions, and contraindication/safety copy approved.
- [ ] Contact email, phone, address/service area, hours, map/parking/accessibility details approved.
- [ ] Couples workshop active status, price, duration, included tools, and copy approved.
- [ ] Testimonials have documented publication consent and approved attribution.
- [ ] Health/performance claims reviewed by the accountable practitioner/business owner.
- [ ] Privacy policy, terms, cancellation policy, and form consent copy approved and linked.

## Booking, forms, and operations

- [ ] Canonical platform decision recorded: Jane, Vagaro, Calendly, or a documented combination.
- [ ] New-client, returning-client, contrast, mentorship, and workshop CTA URLs confirmed in production.
- [ ] November 1, 2026 Jane transition notice updated or removed according to the actual state at launch.
- [ ] Mentorship form no longer relies on Webflow; endpoint, environment values, spam controls, validation, and accessible errors are active.
- [ ] Test submissions completed on desktop and mobile using a non-production/test identity.
- [ ] Submission arrives at the correct owner; reply-to, sender authentication, retry/error reporting, and response ownership tested.
- [ ] Data storage, access, retention, deletion, and breach-contact responsibilities documented.
- [ ] Klaviyo and LeadConnector retained only if their owners and consent behavior are confirmed.
- [ ] If the dashboard becomes operational, the Supabase organization/project is client-owned and uses named accounts, MFA, recovery methods, and offboarding.
- [ ] Production role matrix and RLS policies are documented and tested for every role, including denied-access cases.
- [ ] Production and preview/staging environments, backups, restoration, migrations, audit needs, data retention, and secret ownership are verified.

## Pages, navigation, and links

- [ ] All approved routes appear in primary navigation and footer where appropriate.
- [ ] Every CTA has a clear label and verified destination.
- [ ] Internal links, logo/home link, anchors, external links, phone/email links, social links, and policy links tested.
- [ ] External booking behavior is consistent and warns users only when helpful.
- [ ] Custom 404 provides navigation and contact/booking recovery.
- [ ] No empty testimonial/video/card shells, `#` placeholders, draft text, Webflow URLs, or client-visible TODOs remain.

## Responsive and browser QA

- [ ] Pages reviewed at 320, 375, 768, 1024, 1440, and a wide desktop viewport.
- [ ] Navigation, forms, accordions, media, cards, long headings, and CTAs work with touch and keyboard.
- [ ] Current Chrome, Safari, Firefox, and Edge smoke tests pass; iOS Safari and Android Chrome tested on a real device or credible emulator.
- [ ] No horizontal overflow, clipped focus rings, overlapping fixed elements, unreadable text, or layout shift from unsized media.
- [ ] Hero and mentorship video provide compatible formats/posters and fail gracefully; Safari/iOS fallback specifically verified.

## Accessibility

- [ ] One descriptive H1 per page; headings form a logical outline.
- [ ] Landmarks, skip link, visible focus, keyboard order, form labels, errors, and status messages verified.
- [ ] Decorative images use empty alt; meaningful images have factually accurate alt text.
- [ ] Text, controls, and focus indicators meet WCAG AA contrast targets.
- [ ] Motion honors `prefers-reduced-motion`; video is not forced with sound and has accessible controls.
- [ ] Video captions/transcripts are supplied where content is necessary to understand the page.
- [ ] Automated accessibility scan has no serious/critical issues, followed by manual keyboard and screen-reader smoke tests.

## SEO and discoverability

- [ ] Unique page title, meta description, canonical URL, H1, Open Graph data, and social image on each indexable page.
- [ ] Robots directives correct in preview and production; production sitemap submitted.
- [ ] `/contrast-therapy` and `/mentorship-program` redirect tests pass if routes changed.
- [ ] Structured data contains only approved business facts and passes Google's validator.
- [ ] Image filenames, alt text, clean URLs, internal links, and page copy describe visitor intent naturally.
- [ ] Search Console property and analytics are owned by durable business accounts; consent behavior approved.
- [ ] Existing rankings/pages indexed, analytics baseline, and top inbound links recorded before cutover.

## Performance and engineering

- [ ] Production build/type/content-schema checks pass.
- [ ] No Webflow runtime, jQuery, Embedly wrapper, accidental tracking scripts, source maps containing secrets, or unused legacy CSS ship.
- [ ] Images are responsive and compressed; below-fold media lazy loads; fonts are subset/preloaded only when justified.
- [ ] Core Web Vitals checked on representative mobile and desktop pages; material regressions resolved.
- [ ] Environment variables are documented by name and purpose, never committed with values.
- [ ] Dependency update policy, runtime version, build command, preview workflow, and rollback procedure documented.

## Hosting, domain, and cutover

- [ ] Production hosting owner, billing owner, repository owner, deployment permissions, and recovery contacts recorded.
- [ ] Domain registrar and DNS access tested; current DNS exported before changes.
- [ ] Required DNS records, redirect rules, SSL, `www`/apex canonical behavior, and rollback plan validated.
- [ ] Preview approval recorded before DNS change.
- [ ] Post-cutover smoke test covers all routes, redirects, forms, booking CTAs, assets, SSL, sitemap, robots, analytics, and 404s.
- [ ] Webflow remains recoverable during an agreed rollback window; cancellation occurs only after stable production verification and asset/content export retention.
- [ ] 24-hour, 7-day, and 30-day checks scheduled for form delivery, crawl errors, 404s, traffic, uptime, and booking conversions.
