# Website operations and admin model

## POC operating boundary

The current dashboard is a static prototype with fictional records. It may demonstrate prospective content, inquiry, resource, and booking-management views, but it has no authentication, Supabase database, real roles, notification pipeline, or permission enforcement. It must not accept, display, or imply storage of real client data.

The authorized POC is public source plus a public GitHub Pages URL under `awaisqazi/total-tissue-and-fitness`. It remains non-indexable. Under ADR-010, the contact page sends general inquiries through a Cloudflare Turnstile-validating Worker to a Google Form owned by the practice; the site and demo dashboard do not store those responses. Public visibility is not authentication, confidentiality, or production approval; commit no secrets, private business material, form submissions, or real client records. The original domain remains on Webflow.

## Recommended production model

Use the Astro repository as the controlled content system, with typed shared configuration and clearly named content pages, pull-request review, preview deployments, and a documented production promotion/rollback process. This is suitable for a small site whose high-risk content—services, credentials, claims, pricing, contact data, and booking destinations—benefits from review.

The planned production direction is a client-owned Supabase project supporting varying roles. This remains an architecture input rather than completed POC functionality. Before connection, answer:

- Who edits content and who approves it?
- Which exact records need self-service editing?
- How frequently do updates occur?
- Must inquiries be viewed in the dashboard, or should the system route them to an existing CRM/scheduling tool?
- What personal data is collected, who may access it, and how long is it retained?
- Which vendor/accounts will the business own and recover if a contractor leaves?
- Which roles exist, what each role can read/write/delete, and which policies enforce those boundaries?
- Which Supabase organization/project, billing method, MFA administrators, backup policy, and recovery contacts are client-owned?

Before production, document the schema and data classification, Auth providers, invite/offboarding flow, row-level security for every exposed table/view/function, Storage policies, server-only secrets, audit/event requirements, retention/deletion, backups/restores, environment separation, and migration/rollback process. Test each role against both allowed and denied actions.

## Roles

| Role                   | Responsibility                                                    | Minimum access                                           |
| ---------------------- | ----------------------------------------------------------------- | -------------------------------------------------------- |
| Business owner         | Approves brand, contact, pricing, offers, legal policy, providers | Repository/hosting/provider owner or durable admin       |
| Clinical content owner | Approves techniques, scope, claims, FAQs, safety language         | Review access; no infrastructure admin required          |
| Content editor         | Drafts central content changes and image metadata                 | Repository editor or future CMS editor                   |
| Technical maintainer   | Implements, tests, deploys, monitors, rolls back                  | Repository + hosting maintainer; limited provider access |
| Inquiry owner          | Receives/responds to submissions and manages retention            | Form/CRM inbox only                                      |

Named accounts, MFA, recovery contacts, and quarterly access review are required for repository, hosting, registrar/DNS, booking, forms/CRM, analytics, email delivery, and social accounts.

## Routine update workflow

1. Open an issue/change request stating the visitor or business goal, content source/owner, target routes, and deadline.
2. Update central content/config and related source map; do not patch repeated text in rendered components.
3. Update `docs/DECISIONS.md` when the change modifies a durable rule or integration.
4. Run the documented local checks and generate a preview.
5. Review the preview at mobile/tablet/desktop sizes and test affected links/forms.
6. Obtain content-owner approval for business facts, clinical claims, brand changes, or legal language.
7. For the POC, merge/push to `main`; the Node 24 GitHub Pages workflow validates and deploys with `SITE_URL=https://awaisqazi.github.io`, `BASE_PATH=/total-tissue-and-fitness`, and `PUBLIC_SITE_INDEXABLE=false`.
8. Confirm workflow and Pages success, then smoke-test the deployed base-path URL and record exact evidence in `docs/DEPLOYMENT_STATUS.md`.
9. Roll back to the previous known-good deployment when a production form, booking path, critical route, or security/privacy behavior fails.

## Inquiry operations

- The contact destination is a Google Form in Joshua Bruning's `info@totaltissueandfitness.com` account. New-response email notifications are on. Review responses in that account; never copy real responses into the public dashboard or repository. The site form requests name, email, inquiry category, optional profession, and a general message. It tells visitors to omit medical or sensitive health details.
- Google Forms' built-in new-response email contains a link to view the answers, not the answers themselves. The owner chose to keep this native notification rather than add a custom email script.
- The site sends to a Cloudflare Worker, which verifies Turnstile before forwarding. Store `TURNSTILE_SECRET` and `GOOGLE_FORM_ID` as Worker secrets; never put them in the repository, Pages variables, or client output. The public Worker URL is `PUBLIC_CONTACT_ENDPOINT` in the Pages build. The Google entry IDs are in `workers/contact/index.js`; if questions are deleted/recreated, update the mapping and test delivery. Keep the phone fallback available.
- A direct request to the public Google Form bypasses the Worker and Turnstile. Monitor Form responses and spam; this control only covers the site's inquiry endpoint.
- The account owner must set who monitors the inbox, a response target, retention and deletion rules, access removal, and an approved privacy policy before production launch.
- Collect only the fields necessary to route and answer the inquiry. The captured mentorship form uses name, email, profession, message, and a terms checkbox.
- Decide whether free-text messages may contain health information; instruct users accordingly and choose the form/provider workflow to match the decision.
- Document recipients, backup recipient, response target, spam handling, retention, deletion, export, and access removal.
- Keep server-side Turnstile validation active. Monitor delivery failure without putting message contents into analytics or general logs; decide whether rate limiting is needed after observing traffic.
- Test production delivery after every provider, domain, sender, environment, or form-schema change.

## Booking operations

Maintain a single structured registry containing CTA key, audience, label, provider, production URL, owner, last verification date, and fallback contact path. Verify all routes monthly and whenever the scheduling platform changes. Remove transition banners as soon as they cease to be useful.

## Incident and rollback outline

- **Broken content/layout:** restore the prior deployment, then fix through preview.
- **Form delivery failure:** place a verified alternative contact path prominently, pause the broken form, restore provider configuration, and test end-to-end.
- **Booking outage:** switch affected CTAs to the approved fallback/contact flow and record the incident.
- **Credential exposure:** revoke/rotate at the provider, remove the value from code/history using the repository owner's incident process, redeploy, and review logs/access.
- **DNS/domain issue:** use the saved pre-cutover DNS export and registrar recovery contacts.

Record date, impact, detection, response, resolution, and prevention in an incident note without including client submission contents or secrets.

## Suggested maintenance cadence

- Monthly: booking links, forms, primary CTAs, contact data, dependency/security updates, uptime and 404 review.
- Quarterly: access review, content/offer accuracy, clinical claims, privacy/legal links, testimonials/consent, accessibility smoke test, analytics/search trends.
- Annually: full restore/rollback rehearsal, domain/SSL/registrar ownership, vendor/data-retention review, performance and browser matrix refresh.
