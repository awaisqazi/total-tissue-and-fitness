# QA record — September 8, 2026

The September 8 sections below record the original POC release. The September 22 sections record successive Vagaro changes; the newest layout supersedes the earlier pale-panel appearance.

## September 22, 2026 — Simplified booking layout

- Services and Gift Cards remain in Vagaro's generated widget; the redundant external cards were removed. About and Staff remain as links below the widget.
- The surrounding booking section is now white with a blue top edge and minimal phone-width inset. First-session instructions, Oakbrook Terrace address, direct Vagaro link, and phone fallback remain in the page.
- The generated widget HTML is unchanged. `npm run format:check` and root and Pages `npm run validate` passed: Astro check, ten-page build, link/fragment/asset check, and eleven tests.
- Chrome visual checks covered desktop, 768 px, and 320, 390, and 430 px phone widths. At a fresh 320 px load, the widget used its mobile layout without page overflow. Its menu exposed Services, Gift Cards, and Book Now; Gift Cards displayed categories, and Book Now's provider picker showed Josh Bruning and Casey Thayer. No booking or purchase was made.

## September 22, 2026 — Vagaro section and theme update

- Vagaro's widget builder showed Gift Cards enabled with Services and Book Now; after saving, its generated HTML changed and was placed on `/book/`.
- In Chrome, the embedded widget displayed Services, Gift Cards, and Book Now. Opening Gift Cards showed live categories. The public About, Staff, Services, and Gift Cards destinations loaded for this business.
- The pale blue booking panel, four destination cards, and white widget inset were visually checked on desktop and at 390 px width. At 390 px there was no horizontal document overflow. No booking or gift card purchase was completed.
- The browser's in-app preview sometimes left the third-party iframe blank; direct Vagaro links remain visible above and below it. Chrome rendered the same embed successfully.

## September 22, 2026 — Vagaro branding update

- Uploaded a 1200 × 800 Synaptyx logo image to Vagaro's Venue Gallery and set it as LOGO. It replaced the SMT placeholder on the public listing and in the embedded widget.
- The Vagaro widget builder showed the existing custom button color `#70C1F6`. Chrome displayed that blue booking button inside the site's newly blue-edged widget frame.
- Regenerated the sharing card with Oakbrook Terrace and inspected both local image assets. No booking or payment was made during this check.
- Vagaro's marketplace listing retains its shared layout and red Book Now control. The site's direct Vagaro link is the fallback when a browser does not render the embedded widget.

## September 22, 2026 — Vagaro booking update

- Root and GitHub Pages base-path `npm run validate` each passed: Astro check, 10-page build, local link/fragment/asset check, and seven Node tests. `npm run format:check` passed. An unused import hint found during the first pass was removed.
- The generated Vagaro widget rendered its public service menu in Chrome. Starting a returning-client booking exposed both Josh Bruning and Casey Thayer in the provider picker; no appointment was completed.
- The first-session service editor showed both providers enabled. Its description was changed from Jane to Vagaro booking after the required call, retaining the existing team contact methods, and the new text appeared in the public widget after reload.
- At 390 px width, the Vagaro widget rendered on mobile and document scroll width equaled the viewport width. The direct Vagaro link and business phone remain visible fallbacks.
- The owner confirmed 17W755 Butterfield Road, Oakbrook Terrace, IL 60181 for visits and Oswego for billing only. The public Vagaro listing showed that visit address and the business phone.
- The provider's own online visibility and booking rules determine which selected service categories appear publicly. No test booking, payment, or client record was created during the booking check.

## Automated verification

- Astro type checking and static generation succeeded for 10 HTML pages plus robots and sitemap endpoints.
- The built-site checker found no broken internal routes, section anchors, asset references, or Webflow runtime scripts.
- Seven Node tests cover page metadata/indexing, brand naming, contact non-delivery, fictional dashboard behavior contracts, sitemap exclusions, preserved testimonials/anchors, local media, and no forced video autoplay.
- npm reported zero known dependency vulnerabilities at installation. This is a point-in-time result, not a permanent guarantee.
- Original facility photographs and logo have optimized local derivatives. Raw originals remain archived. Normal site imagery and social-preview metadata no longer depend on the Webflow CDN.

## Chromium / Codex in-app browser

- Desktop homepage checked at normal preview width (1149px), including original gold logo, gold accents, facility hero, heading hierarchy and visible primary CTAs.
- Mobile viewport 390×844: homepage, manual therapy, contrast therapy, couples workshop, mentorship, booking, contact and dashboard checked. All inspected documents reported scrollWidth equal to viewport width and no broken completed images.
- Mobile navigation expanded correctly and Escape closed it.
- Tablet viewport 768×1024: homepage layout inspected; no horizontal overflow.
- FAQ disclosure opened and displayed its answer.
- YouTube disclosure created a privacy-enhanced iframe only on opening and removed it on closing. This verified activation behavior, not uninterrupted third-party playback or all video content.
- Contact preview rejected empty required fields, preserved the mentorship query selection, accepted fictional valid input, and explicitly reported that nothing was sent or saved.
- Dashboard filter returned two new fictional inquiries. Read-only role preview disabled editing. A sample draft rendered as a local preview, and reset restored original sample data. No real accounts or backend were involved.

## Safari / WebKit on the user’s Mac

- Homepage loaded with local fonts, original logo, background photo, gold gradient heading and working navigation layout.
- Native FAQ disclosure expanded and exposed the correct answer through the accessibility tree.
- This was a Safari smoke test, not a complete second-browser repetition of every flow.

## External destinations and unverified cases

- Calendly endpoints responded; the couples source link’s event metadata mismatched its label, so it is withheld from public CTAs pending confirmation.
- At the September 8 release, Vagaro automated requests encountered anti-bot protection. The September 22 browser check above supersedes that booking-menu limitation; no booking was created.
- At the September 8 release, practitioner bios, contact details, and social account URLs were not supplied in the public source. The September 22 Vagaro listing confirmed the public business phone and provider names.
- Firefox, Edge-specific behavior, assistive-technology user testing, formal WCAG certification, and live backend/email/payment flows were not tested.
- No production DNS/domain cutover, live inquiry delivery, Supabase roles, or client-account authentication is part of this POC.

## Final refinements

The contact form uses `method="dialog"` and a disabled submit button until its preview handler is installed, preventing accidental form transmission when JavaScript is unavailable. A final browser check confirmed the preview message receives focus and the URL does not gain form data. Dashboard heading/spacing was compacted so its role controls, sample metrics and inquiry section are visible sooner. No Chromium error logs were reported for the inspected dashboard.

## GitHub Pages publication

Both root-hosted and `/total-tissue-and-fitness/` builds passed Astro checking with zero errors, warnings, or hints, static integrity checks for 10 HTML pages, and seven automated tests. The added contract verifies canonical/social/sitemap URLs use the deployment origin and repository base.

GitHub Actions run 34257990834 passed installation, validation, artifact upload, and Pages deployment on Node 24. HTTPS verification passed for all 10 HTML routes and 19 referenced assets, canonical URLs, page-level noindex, sitemap/robots endpoints, and a branded HTTP 404 for an unknown route. The live in-app browser showed the original gold logo and colors without broken loaded images or desktop overflow. Manual Therapy navigation selected the correct active state; the dashboard New filter returned Alex and Jordan's fictional records. Existing form non-delivery contracts still pass; no real inquiry was sent.
