# QA record — September 8, 2026

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
- Vagaro automated requests encountered anti-bot protection. Availability remains unconfirmed; no booking was created.
- No current Jane URL, practitioner bios, contact details, or social account URLs were supplied in the public source.
- Firefox, Edge-specific behavior, assistive-technology user testing, formal WCAG certification, and live backend/email/payment flows were not tested.
- No production DNS/domain cutover, live inquiry delivery, Supabase roles, or client-account authentication is part of this POC.

## Final refinements

The contact form uses `method="dialog"` and a disabled submit button until its preview handler is installed, preventing accidental form transmission when JavaScript is unavailable. A final browser check confirmed the preview message receives focus and the URL does not gain form data. Dashboard heading/spacing was compacted so its role controls, sample metrics and inquiry section are visible sooner. No Chromium error logs were reported for the inspected dashboard.

## GitHub Pages publication

Both root-hosted and `/total-tissue-and-fitness/` builds passed Astro checking with zero errors, warnings, or hints, static integrity checks for 10 HTML pages, and seven automated tests. The added contract verifies canonical/social/sitemap URLs use the deployment origin and repository base.

GitHub Actions run 34257990834 passed installation, validation, artifact upload, and Pages deployment on Node 24. HTTPS verification passed for all 10 HTML routes and 19 referenced assets, canonical URLs, page-level noindex, sitemap/robots endpoints, and a branded HTTP 404 for an unknown route. The live in-app browser showed the original gold logo and colors without broken loaded images or desktop overflow. Manual Therapy navigation selected the correct active state; the dashboard New filter returned Alex and Jordan's fictional records. Existing form non-delivery contracts still pass; no real inquiry was sent.
