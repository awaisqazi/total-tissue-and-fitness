# Content source map

This file separates evidence from editorial decisions. “Captured” means present in the September 8, 2026 Webflow snapshot; it does not mean approved for launch.

| Target content key                        | Target surface        | Captured source                                                                       | Status / editorial instruction                                                   | Owner approval needed                 |
| ----------------------------------------- | --------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------- |
| `site.name`                               | Global                | User correction                                                                       | Keep “Total Tissue & Fitness”                                                    | Confirm exact legal footer form only  |
| `site.logo`                               | Header/footer/social  | Existing captured assets + user correction                                            | Use existing Total Tissue gold logo                                              | Confirm preferred source file/variant |
| `site.colors.gold`                        | Global tokens         | User correction                                                                       | Preserve `#d0a84c` and `#dabb6b`; assign accessible roles                        | Contrast validation                   |
| `site.designReference`                    | Layout/components     | User correction                                                                       | Synaptyx Performance guides layout/style; do not replace Total Tissue’s identity | Pattern-by-pattern design review      |
| `site.futurePartnershipName`              | None in current POC   | Earlier brief, later corrected                                                        | “Synaptyx Manual Therapy” is deferred future discussion; do not publish          | Separate future approval              |
| `site.locationShort`                      | Global/SEO            | Home FAQ: Oswego, IL                                                                  | Retain as service-area level only                                                | Address and map preference            |
| `booking.newClient`                       | Global CTAs           | Vagaro `/services`; notice says new clients manually scheduled after free educational | Do not guess; replace with approved Jane/intake route                            | URL, label, workflow                  |
| `booking.returningClient`                 | Global/FAQ            | Vagaro `/book-now`                                                                    | Do not guess; replace or confirm                                                 | URL and eligibility                   |
| `booking.contrastFirst`                   | Contrast page         | Calendly URL with `month=2024-04`                                                     | Verify; remove stale query if platform remains                                   | URL and flow                          |
| `booking.couplesWorkshop`                 | Workshop              | Calendly `contrast-therapy-clone`                                                     | Naming mismatch; verify before publishing                                        | URL and active offer                  |
| `services.manualTherapy.summary`          | Home + Manual Therapy | Two overlapping home descriptions                                                     | Consolidate; preserve education/biomechanics focus                               | Practitioner review                   |
| `services.manualTherapy.techniques`       | Manual Therapy        | Differing captured technique lists                                                    | Store as structured list; publish only approved names                            | Practitioner review                   |
| `services.manualTherapy.includedContrast` | Manual Therapy/FAQ    | “each client receives one hour...”                                                    | Clarify whether universal, per-session, and included in price                    | Operations                            |
| `services.contrast.summary`               | Home/Contrast         | Contrast page content                                                                 | Retain three-stage experience                                                    | Practitioner review                   |
| `services.contrast.benefits`              | Contrast              | Metabolism, mental fortitude, physical recovery                                       | Rewrite cautiously and substantiate                                              | Practitioner/legal review             |
| `services.contrast.steps`                 | Contrast              | Cold plunge, hot plunge, infrared sauna                                               | Retain with approved terminology and safety context                              | Practitioner review                   |
| `mentorship.audience`                     | Home/Mentorship       | PTs, manual therapists, fitness professionals                                         | Retain                                                                           | Program owner                         |
| `mentorship.curriculum`                   | Home/Mentorship       | Soft tissue, biomechanics, recovery, contrast protocols                               | Condense and correct; no new promises                                            | Program owner                         |
| `mentorship.form`                         | Mentorship            | Name, email, profession, message, terms checkbox                                      | Rebuild with real endpoint; terms link is currently `#`                          | Privacy/legal + recipient             |
| `workshop.couples`                        | Home or Workshop      | Package, 3–4 hours, $1,200/couple                                                     | Draft only; correct suspected typos after confirmation                           | Offer, price, contents                |
| `testimonials.john`                       | Home                  | Short quote; empty video container                                                    | Keep quote only if permission; find video or omit empty UI                       | Consent/attribution                   |
| `testimonials.mike`                       | Home                  | Short quote + YouTube `KmQdSmb7iec`                                                   | Verify identity/consent and video ownership                                      | Consent/attribution                   |
| `testimonials.amanda`                     | Home                  | “No more pain!”; empty video container                                                | Health-result claim needs special review; omit if not approved                   | Consent/claim review                  |
| `testimonials.gallery`                    | Home                  | Nine downloaded WebP images                                                           | Inspect, rename, document subjects, and write alt text                           | Rights + alt facts                    |
| `faq.location`                            | Global/Contact        | Oswego, IL                                                                            | Retain pending complete location data                                            | Business owner                        |
| `faq.frequency`                           | FAQ                   | Age-based intervals                                                                   | Hold until practitioner approves or replaces                                     | Practitioner review                   |
| `faq.conditions`                          | FAQ                   | Sciatica, plantar fasciitis, pelvic floor, hypermobility claims                       | Rewrite to avoid diagnosis/outcome promises                                      | Practitioner/legal review             |
| `social.*`                                | Header/footer         | None captured                                                                         | Leave absent until supplied                                                      | URLs                                  |
| `contact.*`                               | Contact/footer        | None captured                                                                         | Draft placeholders must never ship                                               | Phone/email/address/hours             |
| `legal.privacy`                           | Footer/form           | None captured                                                                         | Required before form launch                                                      | Approved policy URL/text              |
| `legal.terms`                             | Footer/form           | Form link points to `#`                                                               | Replace with real route or remove checkbox per approved design                   | Approved terms                        |

## Media mapping

- Original gold Total Tissue logos and favicon: retained as the current identity. The logo is also optimized as a lossless WebP derivative.
- Hero background video: candidate for selective reuse if it fits the new brand, rights are confirmed, and performance is acceptable.
- Nine gallery WebPs: candidate testimonial/proof gallery; inspect before assigning names or alt text.
- Three `EGC_*.jpg` images: captured on Contrast Therapy page; candidate service gallery.
- Mentorship video WebM and poster: candidate hero/media block; MP4 fallback is missing from the capture.
- Play/pause SVG assets: Webflow UI assets; replace with accessible site-native controls.
- YouTube videos: retain by ID only after consent and availability checks; use direct privacy-aware embeds rather than Embedly.

## Implemented route and redirect map

| Old URL               | Proposed canonical URL                           | Redirect requirement                                         |
| --------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `/`                   | `/`                                              | None                                                         |
| `/contrast-therapy`   | `/contrast-therapy/`                             | Existing path retained; host normalizes trailing slash       |
| `/mentorship-program` | `/mentorship-program/`                           | Existing path retained; host normalizes trailing slash       |
| Home `#free-offer`    | `/couples-workshop/` plus retained `#free-offer` | Update internal links; redirect fragments are not dependable |
| Home `#testimonial`   | `/#testimonial`                                  | Update links consistently                                    |
| Home `#faq`           | `/#faq`                                          | Home FAQ is canonical; contrast page reuses shared content   |

## Rules for future editors

1. Change shared facts in the central content source, never in individual view components.
2. Every externally supplied fact records a source/owner and approval date in the pull request or decision log.
3. Never infer credentials, prices, contact data, medical claims, booking URLs, or consent.
4. If a field is unknown, omit it from production UI; do not render “TBD.”
5. Update this map when a route, CTA destination, integration, or ownership source changes.
6. Keep POC dashboard records fictional and visibly identified as demo data. Do not add Supabase credentials or real client data.
7. A production dashboard must use a client-owned Supabase project with an approved role/RLS model; roles are intentionally unresolved in the POC.
