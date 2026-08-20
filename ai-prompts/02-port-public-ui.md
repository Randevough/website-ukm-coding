# Phase 2 — Port the Public UI

Read `AGENTS.md`, all `docs/`, baseline audit, and previous phase results.

## Objective

Port every public prototype page to Astro components using typed fixtures while preserving the existing visual design and behavior.

## Tasks

1. Implement `/`, `/kegiatan`, `/kegiatan/[slug]`, `/projects`, `/projects/[slug]`, and `/404`.
2. Extract reusable header, navigation, drawer, footer, cards, section headers, modal, archive, article, and project case-study components.
3. Convert string-based rendering in `render.js` to safe Astro templates.
4. Replace query-string detail routing with static dynamic routes.
5. Port working drawer, modal, previous/next navigation, mail links, motion, and reduced-motion behavior.
6. Keep nonfunctional production features clearly disabled until Phase 4; do not fake functionality.
7. Preserve geometric image fallbacks.
8. Consolidate CSS only where visual parity can be demonstrated.
9. Remove the need for `router.js`; use native navigation. Preserve page transitions only if accessible and stable.

## Constraints

- No redesign, rewritten copy, new color system, or layout simplification.
- Do not hide difficult mobile elements merely to pass screenshots.
- Avoid full-page hydration.
- Preserve semantic HTML and keyboard operation.

## Acceptance checks

- All public routes render from fixtures.
- Desktop/mobile visual comparison shows no material regression.
- Drawer and modal work with keyboard, Escape, focus management, and reduced motion.
- No page depends on `window.UKM`, `render.js`, or `router.js`.
- Build and project checks pass.

Report visual deviations explicitly and stop after Phase 2.
