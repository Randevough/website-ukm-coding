# SEO, Performance, Accessibility & QA Standards
**UKM Coding Cyber University**

Dokumen ini berisi standar jaminan kualitas (*Quality Assurance*), pengoptimalan SEO, tolok ukur performa (*Performance Budget*), dan standar kepatuhan aksesibilitas.

---

## 1. Standar SEO Teknis (Search Engine Optimization)

Seluruh halaman publik secara otomatis menyertakan metadata SEO komprehensif melalui komponen `src/components/global/SEO.astro`:

- **Title & Description**: Judul terstruktur dengan format `[Nama Halaman] | UKM Coding Cyber University` dan deskripsi informatif maksimal 160 karakter.
- **Canonical URL**: Tag `<link rel="canonical" href="..." />` absolut berbasis domain resmi `https://ukmcoding.site`.
- **OpenGraph & Twitter Cards**: Metadata sosial dinamis lengkap dengan gambar pratinjau (`og:image`), rasio 1200×630 px.
- **Sitemap & Robots**:
  - `sitemap-index.xml` dihasilkan otomatis saat build via `@astrojs/sitemap`.
  - `public/robots.txt` mengizinkan pengindeksan untuk mesin pencari publik dan memblokir rute pratinjau/staging jika `PUBLIC_NOINDEX=true`.
- **Structured Data (JSON-LD)**:
  - `Organization` pada Beranda.
  - `Article` / `NewsArticle` pada detail `/updates/[slug]`.
  - `Event` pada artikel dengan tipe kegiatan terisi jadwal/lokasi.
  - `BreadcrumbList` pada rute katalog dan detail.

---

## 2. Performance Budget & Core Web Vitals

Situs ditargetkan mempertahankan skor Google Lighthouse **≥ 90** pada seluruh rute utama:

| Metrik | Target | Strategi Implementasi |
| :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | < 1.0s | Kompilasi HTML statis murni tanpa ketergantungan render JS. |
| **Largest Contentful Paint (LCP)** | < 2.0s | Pemuatan hero image prioritas (`fetchpriority="high"`, `loading="eager"`). |
| **Cumulative Layout Shift (CLS)** | **0.00** | `scrollbar-gutter: stable`, aspect-ratio eksplisit pada gambar dan kartu. |
| **Total Blocking Time (TBT)** | < 100ms | Zero-framework di sisi publik, script interaktif mini (< 15KB gzipped). |

---

## 3. Standar Aksesibilitas (WCAG 2.2 AA)

1. **Navigasi Keyboard**:
   - Terdapat **Skip Link** (`SkipLink.astro`) untuk langsung melompat ke konten utama (`#page`).
   - Focus outline terlihat jelas pada seluruh tautan, tombol, dan form input.
   - Mobile Drawer dan Project Quick-View Modal mengimplementasikan **focus trap** aktif, menutup dengan tombol `Escape`, dan mengembalikan fokus ke tombol pemantik (`preventScroll: true`).
2. **Kontras Teks**:
   - Teks utama (`--ink`, `--ink-deep`) di atas kertas hangat (`--paper`) memiliki rasio kontras > 7:1 (melebihi standar minimum AA 4.5:1).
3. **Reduced Motion**:
   - Seluruh animasi CSS dan efek partikel grid (`.grid-fx`) dinonaktifkan otomatis saat pengguna mengaktifkan mode hemat gerak (`@media (prefers-reduced-motion: reduce)`).
4. **Semantik HTML**:
   - Struktur heading menggunakan satu `<h1>` per halaman dengan hierarki logis `<h2>` dan `<h3>`.
   - Seluruh tombol memiliki `aria-label` yang deskriptif.

---

## 4. Pipeline CI Quality Gates (`.github/workflows/deploy.yml`)

Sebelum kode dapat digabungkan (*merge*) ke branch utama `main`, GitHub Actions menjalankan pemeriksaan:

1. **Dependency Audit**: `npm ci` instalasi bersih tanpa modifikasi package-lock.
2. **Code Formatting**: `npm run format:check` (Prettier).
3. **Static Analysis**: `npm run lint` (ESLint 9).
4. **Type-Check**: `astro check` (0 error TypeScript & template Astro).
5. **Unit Testing**: `npm run test` (Vitest).
6. **Production Build**: `npm run build` mengompilasi seluruh rute statis.
7. **Lighthouse CI**: Pengujian otomatis skor audit performa dan aksesibilitas.
