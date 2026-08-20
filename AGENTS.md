# Instructions for AI Coding Agents

You are porting the UKM Coding Cyber University prototype to production.

## Read first

Before editing code, read every file in `docs/` and the relevant file in `ai-prompts/`. Treat those files as the product and technical source of truth.

## Non-negotiable rules

- Port the existing visual design; do not redesign.
- Use Astro + TypeScript + npm, Sanity, and Cloudflare Pages.
- Do not add Supabase or another database to the MVP.
- Do not implement the future internal dashboard.
- Do not turn the project into a client-rendered SPA.
- Keep JavaScript minimal and static-first.
- Preserve accessibility, keyboard behavior, and reduced motion.
- Never publish prototype facts as real facts.
- Never commit secrets.
- Do not expose Sanity write/preview tokens to browser bundles.
- Do not invent domain, contact details, organization facts, partner permissions, or production credentials.
- Stop and ask before any visual redesign, scope expansion, paid dependency, or destructive migration.

## Working method

- Execute one prompt phase at a time.
- Inspect existing files before changing them.
- Keep a concise change log and list commands run.
- Run the required checks at each phase.
- Compare desktop and mobile renders to the baseline.
- Mark placeholders explicitly rather than silently guessing values.
- Update docs when implementation changes a documented command or contract.

## Definition of done

A phase is not complete because code was written. It is complete only when its acceptance checks pass and no known regression is hidden.
