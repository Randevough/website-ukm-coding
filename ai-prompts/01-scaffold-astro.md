# Phase 1 — Scaffold Astro

Read `AGENTS.md`, all `docs/`, and Phase 0 outputs.

## Objective

Create a production-ready Astro TypeScript foundation without changing the rendered design and without integrating live Sanity data yet.

## Tasks

1. Initialize Astro using npm and stable compatible packages.
2. Enable strict TypeScript and Astro checking.
3. Configure formatter, ESLint, tests, build scripts, and environment example.
4. Establish the target folders in `docs/02-TECH.md`.
5. Create global layout, SEO shell, error/404 shell, and route placeholders.
6. Move design tokens, fonts, static assets, reset, and essential global styles carefully.
7. Create typed fixtures derived from existing prototype data; label all fictional values.
8. Ensure no admin mockup is treated as production authentication.
9. Document actual local commands in the project README.

## Constraints

- Do not add Tailwind unless the docs are explicitly amended by an approved decision.
- Do not add React globally or create an SPA.
- Do not integrate Supabase.
- Do not delete original prototype files until comparison is no longer needed.

## Acceptance checks

- `npm ci`, format check, lint, typecheck, tests, and production build pass.
- All target routes compile, even if still placeholders.
- Design tokens and fonts load without console exceptions.
- No secret is committed.

Report changes and stop after Phase 1.
