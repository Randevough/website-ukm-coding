# Phase 3 — Integrate Sanity

Read `AGENTS.md`, all `docs/`, and completed phase notes.

## Objective

Replace public fixture data with a secure, typed Sanity content pipeline and provide a Sanity-hosted Studio suitable for 1–2 nontechnical editors.

## Tasks

1. Configure a Sanity project and hosted Studio using current official guidance. Never print or commit credentials.
2. Implement schemas from `docs/04-CONTENT-MODEL.md`: site settings, editorial, project, gallery item, partner, author, and reusable SEO objects.
3. Use Indonesian field labels, sensible groups, descriptions, validation, slug generation, previews, and ordering.
4. Implement read-only Sanity client and centralized typed queries.
5. Render only published documents in production.
6. Implement Portable Text safely with the allowed block set.
7. Implement responsive Sanity images with crop/hotspot and geometric fallback when absent.
8. Provide an idempotent seed/migration approach for prototype fixtures. Keep fictional data clearly marked and never silently publish it as fact.
9. Add editor setup documentation and `.env.example` without secrets.
10. Explore draft preview only as an optional secure enhancement. If not completed, document the gap; do not expose a token.

## Constraints

- No custom auth and no Supabase.
- No write token in the browser.
- Partner logo must respect `izinTampilLogo`.
- Optional GitHub/demo links must disappear cleanly when empty.

## Acceptance checks

- Editor can create, draft, upload, publish, and edit each content type.
- Published content builds into the expected routes.
- Draft content is absent from production.
- Missing images and optional fields do not break layouts.
- Schema/query/types are documented and checks pass.

Stop after Phase 3.
