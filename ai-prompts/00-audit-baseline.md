# Phase 0 — Audit and Baseline

Read `AGENTS.md` and every file in `docs/`. Do not modify production source yet.

## Objective

Create an evidence-based baseline of the existing HTML/CSS/JS prototype so later Astro work can be compared without redesign.

## Tasks

1. Inventory every HTML, CSS, JS, image, route, component, interaction, placeholder, and external dependency.
2. Run the prototype locally.
3. Capture each public route at 1440×900 and approximately 390×844.
4. Capture drawer open, project modal open, long-content/detail, empty or missing-image states that exist.
5. Record console errors, broken links, `href="#"`, fictional data, prototype notices, inaccessible controls, and nonfunctional UI.
6. Map `window.UKM` fields to the content model in `docs/04-CONTENT-MODEL.md`.
7. Produce `docs/audit/BASELINE-AUDIT.md`, a route/component matrix, and an asset inventory. Store screenshots under a clearly named baseline folder.
8. Do not fix findings in this phase.

## Constraints

- Do not redesign or normalize the visuals.
- Treat README claims as leads; verify them in code/runtime.
- Do not call placeholder content real.

## Acceptance checks

- Every public route and key state is represented.
- Desktop/mobile screenshots are readable.
- Nonfunctional controls and placeholder facts are enumerated.
- A migration mapping exists for every source JS/CSS file.

Return a concise summary, files created, commands run, and unresolved questions. Stop after Phase 0.
