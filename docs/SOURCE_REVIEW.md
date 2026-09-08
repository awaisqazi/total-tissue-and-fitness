# Total Tissue source audit — 2026-09-08

> Historical research memo from the earlier rebrand interpretation. Branding recommendations below are superseded by ADR-005: preserve Total Tissue’s logo/name/gold colors. Factual source and external-link findings remain relevant.

Scope: read-only review of `docs/source-snapshot`, downloaded media/assets, and public URL checks. This is evidence from the legacy site, not approval to reuse former branding or unverified clinical claims.

## Priority migration findings

1. **Do not carry forward the legacy announcement.** It says: “New Clients! We have a new company booking system (Jane). All new appointments need to be manually scheduled after your free educational!” and “Existing clients will be transitioning … starting November 1st 2026!” This conflicts with the current legacy CTAs, which still point to Vagaro and Calendly. Treat all booking destinations as needing owner confirmation before production.
2. **Remove/replace all legacy marks.** Source assets are JB / Total Tissue gold logos and a gold/black style. They are not Synaptyx assets.
3. **Missing interaction dependencies:** the home page’s John and Amanda testimonial video containers are empty. Only Mike has an embedded video. The gallery’s nine `w-lightbox` anchors each contain an empty `{}` `w-json` payload, so they look clickable but have no original lightbox media to reproduce.
4. **Mentorship form has no actionable endpoint in the snapshot.** It is a Webflow `method="get"` form with name/email/profession/message plus a required checkbox. Its Terms link is `#`. Do not silently ship it as a working inquiry form without a new destination/consent policy.

## Complete embedded-media inventory

The raw HTML has four YouTube embeds (including the inline custom Embedly wrappers that a generic element inventory can obscure):

| Page / role                   | ID            | Direct destination                            | Source title                    |
| ----------------------------- | ------------- | --------------------------------------------- | ------------------------------- |
| `/` hero explainer            | `uBjppA4WRW4` | `https://www.youtube.com/watch?v=uBjppA4WRW4` | `JB vsl 2024`                   |
| `/` Couples Workshop          | `nKuis2o6GUI` | `https://www.youtube.com/watch?v=nKuis2o6GUI` | `Massage Therapists - Workshop` |
| `/` Mike testimonial          | `KmQdSmb7iec` | `https://www.youtube.com/watch?v=KmQdSmb7iec` | `YouTube embed`                 |
| `/contrast-therapy` explainer | `gRatHeEvmPw` | `https://www.youtube.com/watch?v=gRatHeEvmPw` | `What is Contrast Therapy`      |

On the home page, **John** and **Amanda** both have a testimonial name, quote, and `testimonial-video w-video w-embed` container, but no iframe/source. Their quotes are respectively “The knowledge and professionalism... I’m dealing with someone who does their research” and “No more pain!” These are structural gaps, not videos missed by the downloader.

Downloaded native media:

| Local asset                                                                                                                       | Intended placement                  | Properties        | Notes                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `public/media/6625ab15d06cde3819d95ae7_jb-total-background-video-transcode.mp4` and `.webm`                                       | Home and mentorship hero background | 1280×720, 32.27 s | Both formats downloaded; use only if the legacy branding is acceptable in the footage. Poster is adjacent JPG. |
| `public/media/65f1cd38d5c13f0914954f48-67c9e6e9d3b1a49af9199e97_video-output-9470F004-2040-489A-81D3-A0D5D1757FB9-transcode.webm` | Mentorship adjacent visual          | 404×720, 47.58 s  | The corresponding MP4 source returned 403 during capture, but WebM and poster were downloaded.                 |

## Booking and lead links

| Legacy target                                                                  | Where used                                                    | Read-only check                                                                                                                                          | Migration assessment                                                                                                                                 |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `https://www.vagaro.com/totaltissueandfitness/services`                        | Global “Book a session” CTAs                                  | Vagaro returned HTTP 403 to this automated request (anti-bot); cannot establish availability from that status.                                           | Stale brand/booking-system conflict. Confirm manually with owner.                                                                                    |
| `https://www.vagaro.com/totaltissueandfitness/book-now`                        | Returning-client CTA                                          | Automated request could not complete after Vagaro’s anti-bot response.                                                                                   | Same: do not assume it is current.                                                                                                                   |
| `https://calendly.com/contrast-therapy/contrast-therapy-clone`                 | Home contrast-therapy CTA                                     | HTTP 200. Page metadata says **“Contrast therapy Trial Session - josh bruning”** and “Bathing suit/ preferred clothing is required!towels are provided!” | Reachable, but `-clone` is a strong stale/internal-looking URL and carries a legacy practitioner name.                                               |
| `https://calendly.com/thayercfitness/total-tissue-session-clone?month=2024-04` | Contrast page first-session CTA                               | HTTP 200; rendered page did not expose event metadata in the response.                                                                                   | The fixed `month=2024-04` is stale, and `-clone` needs replacement/owner confirmation.                                                               |
| `https://api.leadconnectorhq.com/widget/survey/sewamW1vizGBQSxW4B0D`           | Empty anchor nested in Mike testimonial (not visibly labeled) | HTTP 200. It is a multi-step intake survey hosted for **Daily Value Media**, asking health/pain and contact questions.                                   | It is an unintended/hidden dependency in the testimonial markup; remove it unless explicitly desired. It is not suitable as an unlabeled public CTA. |

The lead survey’s visible terms URL is `https://www.example.com`, another broken/stale dependency. It also collects phone/email and pain/health information, so it should not be embedded or linked without an intentional intake/privacy setup.

## Content and identity clues preserved from legacy source

- Location stated in the FAQ and metadata: **Oswego, IL**. No street address, phone number, email address, social URL, or named practitioner is present in the captured site content.
- The Calendly metadata names **josh bruning**. That is an external booking-account clue, not an on-site practitioner bio.
- Legacy home title: `JB-TOTAL TISSUE HAVOC | OSWEGO, IL`. The page claims a recovery/training focus and lists Myotome testing, Muscle Pairing, Neuromuscular Activation Therapy, Fascial Adhesion Hydration/Release, cupping, Graston, body tempering, voodoo flossing, myofascial release, integration/corrective exercise, plus cold plunge, hot tub, and infrared sauna.
- Legacy mentorship target audience: physical therapists, manual therapists, and fitness professionals. Couples Workshop source copy advertises a 3–4 hour class, tools to take home, and **$1,200 per couple**. These are historic copy/price claims and should be reconfirmed.
- The existing FAQ makes condition-specific efficacy claims (sciatica, plantar fasciitis, pelvic floor disorders, hypermobility). Preserve only after clinical/legal review; it at least says sessions should complement a professionally supervised treatment plan.

## Local assets and known limitations

- Nine portrait testimonial/gallery images are intact under `public/images/65f1fc8*.webp` (all 1200px wide, 1707–2004px high). They are usable as static images, but the source has no lightbox content definition for them.
- Three 1798×1200 JPGs—`EGC_6179`, `EGC_6234`, `EGC_6167`—belong to the contrast-therapy image group.
- `JB-FINAL-webflow.jpg` is 2688×1200 and was the legacy OG image. It should be replaced with a Synaptyx-specific social image.
- Source styling is Montserrat with `#d0a84c` / `#dabb6b` gold and `#141414` dark panels. This is legacy Total Tissue styling.

## Public Synaptyx brand reference (restricted to visual identity)

The live Synaptyx homepage CSS defines: **Inter**; `--color-synaptyx-blue: #70c1f6`; `--color-synaptyx-black: #101010`; `--color-synaptyx-grey: #7c91a0`. Public logo asset URL: `https://www.synaptyxperformance.com/logo.png`. These are appropriate reference points for the requested rebrand; no live-site staff, facility, contact, or service facts should be imported into the Oswego migration without authorization.

## Broken or placeholder links in legacy pages

- Home nav: `#free-offer`, `#testimonial`, and three `#faq` links; confirm target section IDs before recreating navigation.
- Many nav entries are `#` placeholders: Couples Workshop, Testimonials, Returning Client, FAQ (on mentorship), and both home/mentorship logo anchors.
- Mentorship “Terms” is `#`.
- Gallery image anchors are `#` and their required lightbox JSON is empty.
- In contrast-therapy nav, “Couples Workshop” incorrectly links to `/` and the global booking CTA remains Vagaro despite the Jane announcement.

## Recommended handoff

Launch only with the confirmed Synaptyx visual system and a single owner-approved booking path. Retain the verified YouTube IDs only if the owner approves the legacy footage; otherwise omit the empty testimonial/video slots and all broken lightbox behavior. Reconfirm physical address/contact details, practitioner attribution, offers/prices, and clinical language before publication.
