# Phase 5 — CI, GitHub, and Cloudflare Pages

Read all documentation and use current official provider documentation for exact configuration.

## Objective

Create repeatable preview and production delivery with full quality gates and zero committed secrets.

## Tasks

1. Prepare the new GitHub repository conventions, branch protection recommendations, issue/PR templates if useful, and CODEOWNERS where ownership is known.
2. Configure CI for npm clean install, format check, lint, typecheck, tests, build, link check, and Lighthouse CI.
3. Configure Cloudflare Pages preview deployments and production from `main`.
4. Configure Node/build settings and environment variables separately for preview and production.
5. Ensure preview is noindex.
6. Configure a secure Sanity publish deploy hook if supported by the chosen workflow.
7. Document retry, failed build, rollback, and manual deploy procedures.
8. Validate that a failed build does not replace the last healthy production deployment.
9. Do not connect the final campus subdomain until authorization and DNS values are confirmed.

## Constraints

- Never put tokens in workflow files, logs, screenshots, or documentation.
- Do not assume provider limits; record the date and official source when verifying free tiers.
- Avoid paid CI/service dependencies.

## Acceptance checks

- Pull request creates a preview and runs every required check.
- Merge to `main` deploys production only after passing gates.
- Preview has correct noindex behavior.
- Sanity publish triggers or has a documented manual rebuild path.
- Rollback procedure is tested or safely rehearsed and documented.

Stop after Phase 5.
