# Development and editing guide

## Architecture

Astro statically renders the marketing pages. No React framework or Webflow runtime is required. Minimal client scripts handle mobile navigation dismissal, click-to-load YouTube players, the non-sending inquiry preview, the fictional dashboard UI, the scroll-reveal motion layer (`src/scripts/reveal.ts` + `src/styles/motion.css`), and the home hero loop control (`src/scripts/hero-video.ts`). Motion is progressive: without JavaScript or under `prefers-reduced-motion` every element stays static and visible. Main content, FAQ disclosures, navigation, original video controls, and external links work without client JavaScript.

`src/layouts/BaseLayout.astro` owns page HTML, metadata, noindex state, typography imports, navigation and footer. `src/styles/global.css` owns design tokens, layout and responsive rules. `src/data/site.ts` is the source of service summaries, brand/location facts, media references, FAQs and booking destinations.

Reusable components: Brand, Navigation, Footer, PageHero, Video, FAQ, CTA. Public pages remain separate files so a future maintainer can change a service without unraveling one enormous page. Local media eliminates dependence on the Webflow CDN for normal page imagery; the original Open Graph artwork is preserved as a local file, so social previews no longer require Webflow.

## Common changes

### Copy / service information

1. Check `docs/CONTENT_SOURCE_MAP.md` and source snapshots for provenance.
2. Edit the matching page in `src/pages/`; update shared service summaries in `src/data/site.ts` if necessary.
3. Keep pricing, included services, location, qualifications and clinical language consistent across all affected pages.
4. Update page title and meta description when scope changes.
5. Validate and record the business reason and source of the change.

### Branding and design

Keep the existing Total Tissue & Fitness logo and gold colors. Change shared CSS tokens before local overrides. The core source gold colors are #d0a84c and #dabb6b, with dark charcoal backgrounds and off-white body text. Manrope headings and Inter body text are self-hosted through Fontsource. The visual hierarchy follows Synaptyx, while the business identity remains Total Tissue.

Never replace logos or names with Synaptyx without a new explicit brand decision. The public partnership link can point to Synaptyx Performance; its Oakbrook Terrace address and staff do not belong to the Oswego location.

### Booking updates

All external destinations are in `src/data/site.ts`. Update only from client-supplied evidence and verify the event name, location, provider account, and new/returning eligibility. Test URLs manually without creating an appointment. After Jane is confirmed, update announcement text, FAQs, cards, and docs together. Do not switch booking based on date alone.

### Media

Use originals from `public/images` or `public/media`. Keep provenance in `docs/source-snapshot/manifest.json`. Run `npm run images:optimize` after changing the source photographs or logo to regenerate the smaller lossless-logo/WebP-photo derivatives. Give visible content images useful alt text and decorative images empty alt text. Declare dimensions, lazy-load below-fold imagery, and keep large native video downloads user-initiated (`preload="none"`). The only autoplaying media is the silent home hero loop; keep it muted, inline, poster-backed, and paired with the pause control, and re-encode with ffmpeg (`-crf 29` H.264 + VP9) if the source changes. Use → for internal links and reserve ↗ for links that open an external site. External YouTube players load only after disclosure is opened; closing the disclosure removes the player.

If replacing testimonial images, obtain text versions for equivalent screen-reader access. Current screenshot testimonials are retained as optional full-size historical images; primary quotes are HTML text. Never invent missing John/Amanda videos.

### Forms and dashboard

The current contact form is a **preview**, not a delivery system. Do not change its copy to claim a message was sent. The dashboard is a public static concept with fictional records and no authentication boundary. All demo data may be inspected in the page source. Never add real data to it.

For the future client-owned Supabase implementation, follow `docs/OPERATIONS.md` and the future integration reference. Use an approved role matrix, server-enforced authorization/RLS, authenticated sessions, protected writes, spam controls, and tested delivery. Do not use browser-only role toggles as security.

## Quality checks

`npm run validate` checks TypeScript/Astro diagnostics, production generation, built internal URLs/fragments/assets, required metadata, source runtime removal, and relevant demo contracts. Browser QA should cover 390px mobile, 768px tablet, desktop, keyboard navigation, mobile menu dismissal, FAQs, video activation, form validation/non-delivery, and dashboard interactions.

Use Chromium and Safari where available. Record browsers actually tested; never say all browsers were tested from one Chromium session. Do not submit real third-party bookings during QA.

## Dependency updates

Use `npm ci` for reproducible installs. Update intentionally in a focused change with the exact version and lockfile retained. Check official Astro release notes, run `npm audit`, `npm run validate`, and relevant browser flows. Avoid adding a frontend framework for interactions that a small script or native HTML can handle.
