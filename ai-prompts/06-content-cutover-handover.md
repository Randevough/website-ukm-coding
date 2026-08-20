# Phase 6 — Content Cutover and Handover

Read all documentation and prior phase reports. This phase changes public-facing facts, so do not guess missing information.

## Objective

Replace prototype content with verified material, connect the approved campus subdomain, complete UAT, and transfer operational ownership.

## Tasks

1. Create a content inventory with owner/verification status for profile, statistics, contacts, editorial entries, projects, gallery assets, and partners.
2. Import verified content and assets. Leave unverified items unpublished or explicitly marked for review.
3. Verify image/logo usage permission and `izinTampilLogo`.
4. Remove prototype banners, fictional numbers, placeholder slots, dead links, and `EST. —` from production.
5. Run editor UAT: create draft, upload image, preview if available, publish, correct, and unpublish/archive.
6. Run the complete QA matrix and Lighthouse CI on the release candidate.
7. Coordinate the campus subdomain using confirmed DNS instructions; verify HTTPS, canonical, sitemap, robots, and redirects.
8. Complete account transfer, MFA, two-owner redundancy, token rotation, backup/export, editor guide, technical runbook, and known-issues list.
9. Tag the release and record the deployed commit.
10. Confirm rollback path before declaring go-live.

## Constraints

- Never fabricate missing official information.
- Never share secrets in the report.
- Do not add the future internal dashboard.
- Do not redesign during cutover.

## Acceptance checks

- Every visible fact has a verified source/owner.
- No prototype label, fictional statistic, dead action, or unauthorized logo remains.
- Editor and maintainer can follow the runbooks without the original developer.
- Domain, HTTPS, SEO, routes, CI, and rollback are verified.
- Handover recipient confirms access before original access is reduced.

Return a final release report, remaining known issues, and ownership matrix.
