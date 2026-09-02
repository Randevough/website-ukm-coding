# Technical Specification & Developer Guide
**UKM Coding Cyber University**

Dokumen ini berisi spesifikasi teknis resmi, arsitektur kode, standar rekayasa perangkat lunak, dan panduan kontributor pengembang untuk repositori website UKM Coding.

---

## 1. Stack Teknologi Resmi

- **Core Framework**: [Astro 5](https://astro.build/) (Static Site Generation / SSG dengan ClientRouter view transitions)
- **Bahasa**: [TypeScript 5](https://www.typescriptlang.org/) dengan konfigurasi ketat (`strict: true`)
- **Headless CMS**: [Sanity v3](https://www.sanity.io/) (`@sanity/astro` & `@sanity/client`)
- **Panel Admin**: Sanity Studio tertanam langsung pada rute `/admin` via `@sanity/astro` & React 19
- **Styling**: Vanilla CSS murni berbasis Design Tokens (tanpa framework CSS eksternal seperti Tailwind/Bootstrap)
- **Format & Linting**: Prettier (`prettier-plugin-astro`), ESLint 9 (`eslint-plugin-astro`, `eslint-plugin-jsx-a11y`)
- **Testing**: Vitest untuk unit tests helper & formatter
- **Deployment & Hosting**: Cloudflare Pages via GitHub Actions CI/CD pipeline

---

## 2. Struktur Direktori Proyek

```text
/
├── public/                     # Aset statis murni (logo, favicon, manifest, robots.txt, _headers)
├── sanity/                     # Konfigurasi & Skema Dokumen Sanity Studio
│   ├── schemaTypes/            # Skema: project, editorial, partner, author, settings, blockContent
│   ├── sanity.config.ts        # Inisialisasi plugin & dataset Sanity Studio
│   └── sanity.cli.ts           # CLI metadata Sanity
├── src/
│   ├── components/             # Komponen UI Astro
│   │   ├── global/             # Header, Footer, Drawer, Rails, Modal, Art, SEO
│   │   ├── sanity/             # PortableTextComponent, SanityImage
│   │   └── ui/                 # ProjectCard, PostCard, MagazineCard, EmptyState
│   ├── layouts/
│   │   └── Layout.astro        # Base HTML wrapper, font loader, meta tags, script inject
│   ├── lib/
│   │   ├── content/            # Fixture lokal, helper format tanggal, sanitasi
│   │   └── sanity/             # Sanity client, GROQ queries, image builder
│   ├── pages/                  # Rute Halaman File-based Astro
│   │   ├── index.astro         # Beranda (/)
│   │   ├── admin/              # Sanity Studio CMS (/admin)
│   │   ├── projects/           # Katalog (/projects) & Detail ([slug].astro)
│   │   ├── updates/            # Arsip (/updates) & Detail ([slug].astro)
│   │   └── 404.astro           # Halaman 404
│   ├── scripts/                # Script interaksi klien (filter, hero-effects, motion, quick-view)
│   ├── styles/                 # Sistem Styling CSS
│   │   ├── tokens.css          # Variabel warna, tipografi, radius, shadow, easing
│   │   ├── global.css          # CSS reset, base tags, grid utility, layout rules
│   │   └── components/         # Modul komponen (components.css, pages.css, hero-effects.css, dll)
│   └── types/                  # Definisi antarmuka TypeScript (content.ts)
├── tests/                      # Unit test suites (Vitest)
├── docs/                       # Dokumentasi resmi proyek
├── astro.config.mjs            # Konfigurasi Astro & integrasi Sanity/React/Sitemap
├── package.json                # Dependencies & NPM scripts
└── tsconfig.json               # Konfigurasi compiler TypeScript
```

---

## 3. Strategi Data Fetching & Offline Resilience

1. **Build-Time Fetching**:
   - Seluruh konten publik ditarik pada saat build (`getStaticPaths` dan server frontmatter Astro).
   - Menggunakan query GROQ teroptimasi di `src/lib/sanity/queries.ts`.
   - Hanya dokumen dengan status *published* yang ditarik ke dalam static bundle.

2. **Fallback Fixture (`fixture.ts`)**:
   - Jika koneksi API Sanity mengalami kendala saat proses development lokal atau dataset masih kosong, sistem otomatis fallback ke data lokal `src/lib/content/fixture.ts`.
   - Hal ini menjamin halaman tetap dapat dirender tanpa memblokir proses pengembangan antarmuka.

---

## 4. Environment Variables

Berikut adalah konfigurasi variabel lingkungan yang digunakan (`.env`):

```dotenv
# Sanity CMS Public Keys
PUBLIC_SANITY_PROJECT_ID=60a63q0u
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2024-02-28

# Sanity Studio Embedded Keys
SANITY_STUDIO_PROJECT_ID=60a63q0u
SANITY_STUDIO_DATASET=production

# Canonical Base URL
PUBLIC_SITE_URL=https://ukmcoding.site

# Preview & Indexing Control
PUBLIC_NOINDEX=false
```

> ⚠️ **Catatan Keamanan**: Jangan pernah menyertakan `SANITY_API_TOKEN` berhak akses *write* di sisi klien (frontend). Frontend hanya memerlukan akses *read-only* ke dataset publik.

---

## 5. Perintah Pengembang (NPM Scripts)

| Perintah | Fungsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan lokal (`http://localhost:4321`) |
| `npm run build` | Menjalankan type-check (`astro check`) dan build static ke folder `dist/` |
| `npm run preview` | Menjalankan preview lokal dari hasil build statis di folder `dist/` |
| `npm run format:check` | Memeriksa apakah seluruh berkas mematuhi standar format Prettier |
| `npm run format` | Menjalankan auto-formatting Prettier ke seluruh berkas |
| `npm run lint` | Menjalankan ESLint untuk mengecek kesalahan kode dan aksesibilitas |
| `npm run test` | Menjalankan unit tests menggunakan Vitest |

---

## 6. Standar Kualitas (Definition of Done)

Setiap kontribusi kode baru wajib memenuhi kriteria berikut sebelum digabungkan (*merge*):
1. **Type-Safety**: Lolos `astro check` dengan **0 error**.
2. **Format & Lint**: Lolos `npm run format:check` dan `npm run lint`.
3. **Responsif**: Teruji pada viewport Mobile (360px–414px), Tablet (768px–1024px), dan Desktop (1440px+).
4. **Bebas Layout Shift**: Tidak ada pergeseran elemen yang merusak pengalaman baca (CLS 0).
5. **Aksesibilitas**: Kontras warna memenuhi WCAG AA, interaksi keyboard berjalan lancar, dan mendukung `prefers-reduced-motion`.
