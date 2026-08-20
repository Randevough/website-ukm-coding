# Baseline Audit & Inventory

## 1. Asset & File Inventory

### HTML Routes

- `index.html` → Production Route: `/` (Homepage)
- `berita.html` → Production Route: `/kegiatan` (Updates/Blog List)
- `berita-detail.html` → Production Route: `/kegiatan/[slug]` (Update Detail)
- `showcase.html` → Production Route: `/projects` (Projects List)
- `showcase-detail.html` → Production Route: `/projects/[slug]` (Project Detail)
- `admin/*.html` → Out of scope for production MVP (Replaced by Sanity Studio).

### CSS Files

- `assets/css/tokens.css` (CSS variables, colors, spacing, typography)
- `assets/css/base.css` (Resets, global layout, grain texture, `.rails`)
- `assets/css/components.css` (Buttons, cards, modals, tickers, footer)
- `assets/css/pages.css` (Page-specific sections: pagehead, magazine layout, pillars)
- `assets/css/final-home.css` (Legacy homepage revisions)
- `assets/css/home-v2.css` (Final homepage revisions v3/v4)
- `assets/css/admin.css` (Admin panel styles - out of scope)

### JS Files

- `assets/js/data.js` (Data fixtures, mapping to CMS)
- `assets/js/ui.js` (Interactions: header, drawer, modal, utilities)
- `assets/js/motion.js` (Animations: reveal, parallax, counter, ticker)
- `assets/js/render.js` (String-based component renderer)
- `assets/js/router.js` (SPA-like page transitions)
- `assets/js/home-v2.js` (Homepage v2 logic)

### External Dependencies

- Google Fonts (`Plus Jakarta Sans`, `JetBrains Mono`, `Instrument Serif`)

## 2. Component Matrix

| Component    | Prototype Source                | Note                                                       |
| ------------ | ------------------------------- | ---------------------------------------------------------- |
| Site Header  | `header.site-header`            | Global across all pages. Contains burger menu.             |
| Drawer       | `#drawer`                       | Mobile navigation menu.                                    |
| Hero v2      | `.hero--v2`                     | Homepage hero with abstract card composition.              |
| Pagehead     | `.pagehead`                     | Header for inner pages (Updates & Projects).               |
| Project Card | `.pcard`, `.bento`              | Used in Homepage & Showcase. Opens modal.                  |
| Post Card    | `.pcard` (Article), `.magazine` | Used in Homepage & Updates list.                           |
| Filter Bar   | `.filterbar`, `.chips`          | Visual only in prototype. Needs functional implementation. |
| Pagination   | `.pagination`                   | Visual only in prototype.                                  |
| Modal        | `#projectModal`                 | Quick-view for projects. Needs to manage focus.            |
| Ticker       | `.ticker`                       | Used for partners (css animation).                         |
| Footer       | `.site-footer`                  | Contains partner logos, brand info, links.                 |

## 3. Data Model Mapping (`window.UKM` -> `Sanity`)

| `window.UKM` Object | Sanity Schema              | Status                                                                                           |
| ------------------- | -------------------------- | ------------------------------------------------------------------------------------------------ |
| `UKM.settings`      | `siteSettings` (Singleton) | Fields match exactly.                                                                            |
| `UKM.stats`         | `siteSettings.statistik`   | Mapped to array in singleton.                                                                    |
| `UKM.partners`      | `partner`                  | Needs `izinTampilLogo` handling.                                                                 |
| `UKM.press`         | _Mixed_                    | Can be part of `siteSettings` or `partner`.                                                      |
| `UKM.projects`      | `project`                  | Map keys: `title` -> `nama`, `oneLiner` -> `ringkasan`, `masalah/pendekatan/hasil` -> rich text. |
| `UKM.posts`         | `editorial`                | Map keys: `title` -> `judul`, `excerpt` -> `ringkasan`, `fact` -> custom fields.                 |
| `UKM.instagram`     | `galleryItem`              | Image mosaic on homepage.                                                                        |

## 4. Issues & Findings (Prototype State)

### Placeholders & Fictional Data

- "LOGO" text in header and footer.
- "PLACEHOLDER LOGO · AKAN DIGANTI DENGAN ASET RESMI" in footer.
- All numbers (`24+ Kegiatan`, `32 Anggota`, etc.) are fictional.
- The establishment year is missing (`EST. —`).
- Empty images are rendered via `.art` CSS geometry.

### Broken/Placeholder Links (`href="#"`)

- "Kerja sama" buttons (multiple places).
- "email" links in drawer and footer.
- "GitHub" links in footer.
- `demoUrl` and `repoUrl` in project data.
- Partner logos URLs.

### Inaccessible / Non-functional UI

- **Filter and Search**: The `.filterbar` exists but has no logic implemented.
- **Pagination**: The `.pagination` buttons are visual only.
- **Form Submissions**: Admin login and other forms do not function.

## 5. Console & Visual Check

_(Screenshots are saved in `docs/audit/baseline-screenshots/`)_

- `ERR_NAME_NOT_RESOLVED` for Google Fonts when offline is expected (as per README).
- No blocking console errors in main user flows.
- Drawer and Modal correctly trap focus and close via Escape (to be verified).
