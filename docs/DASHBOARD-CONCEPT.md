# Partner dashboard concept

This proof of concept preserves **Total Tissue & Fitness** branding and uses black/gold styling inspired by the supplied visual direction. `/admin/` is a public, noindex demonstration page. Its three inquiries are explicitly fictional; all edit state lives only in JavaScript memory and resets on reload. There is no login, Supabase client, remote request, browser persistence, inquiry submission, or publishing integration in the active page.

Try inquiry filtering, temporary status changes, service-copy preview, a read-only role preview, and reset. The persistent banner states: “Dashboard concept · fictional sample data · changes are not saved.” The proposed roles are owner, partner, and read-only collaborator. The selector demonstrates how controls might differ; it offers no actual authorization.

Active integration files are only:

- `src/pages/admin/index.astro`
- `src/scripts/admin.ts`
- `src/styles/admin.css`

They depend on the site's existing Manrope/Inter font packages and existing Total Tissue & Fitness logo in `public/images`. The page uses its own layout. Resources link to existing `/book/` and `/manual-therapy/` routes plus the Synaptyx partner website. The contact page remains the main site's responsibility; this concept adds no contact form.

## Future integration (not implemented)

See OPERATIONS.md and DEPLOYMENT.md for the plan for a client-owned Supabase project. Reconfirm proposed roles with the business before schema design. Use individually authenticated accounts, database-enforced access, validated inquiry submission, and reviewed publication. This repository intentionally does not include untested SQL or an inactive backend that could be mistaken for a supported production setup.
