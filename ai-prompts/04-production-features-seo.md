# Phase 4 — Production Features, SEO, and Accessibility

Read all governing documentation and prior phase results.

## Objective

Complete functional public features and production-grade SEO, accessibility, and performance without redesigning the prototype.

## Tasks

1. Make editorial type filters functional.
2. Implement lightweight search and pagination appropriate for a static site; retain usable URLs/state where practical.
3. Implement project filtering if present in the prototype.
4. Implement copy-link and valid share URLs; remove dead share actions.
5. Ensure previous/next navigation uses real ordering.
6. Add canonical, per-page metadata, Open Graph, sitemap, robots, organization/article/event/breadcrumb JSON-LD as applicable.
7. Ensure preview environments can be noindexed via configuration.
8. Optimize images, loading, dimensions, fonts, and client JavaScript.
9. Complete WCAG-oriented keyboard, focus, landmarks, heading, alt text, contrast, modal, drawer, and reduced-motion checks.
10. Remove or replace every unexplained `href="#"`, prototype notice, and fake production control.

## Constraints

- Do not add analytics yet.
- Do not add a public form.
- Do not invent organization facts for metadata or JSON-LD.
- Do not sacrifice essential content on mobile.

## Acceptance checks

- Search/filter/pagination behavior is real and tested.
- SEO technical checklist in `docs/07-SEO-PERFORMANCE-QA.md` passes.
- No broken internal links or console errors on core flows.
- Route/state visual QA passes on desktop/mobile.
- Lighthouse target is at least 90 or any environment-specific exception is documented with evidence and an issue.

Stop after Phase 4.
