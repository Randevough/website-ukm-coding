# Technical Specification

## 1. Stack terkunci

- **Framework:** Astro versi stabil terbaru saat implementasi.
- **Bahasa:** TypeScript dengan `strict: true`.
- **Package manager:** npm.
- **CMS:** Sanity Content Lake + Sanity Studio hosted.
- **Hosting:** Cloudflare Pages.
- **Source control:** repository GitHub baru.
- **Styling:** CSS existing yang dirapikan; jangan rewrite penuh ke Tailwind.
- **Interaktivitas:** JavaScript/TypeScript kecil atau Astro islands hanya saat diperlukan.
- **Database tambahan:** tidak ada pada MVP.

## 2. Prinsip implementasi

1. Port, jangan redesign.
2. Static-first; hindari server runtime jika tidak dibutuhkan.
3. Pertahankan design tokens, spacing, tipografi, dan motion behavior prototype.
4. Hapus JavaScript global yang tidak perlu dan jangan mengirim CMS client privileged ke browser.
5. Schema Sanity adalah kontrak konten; TypeScript types harus selaras.
6. Konten published diambil saat build. Draft tidak boleh bocor ke production.
7. Environment secret tidak boleh di-commit.
8. Aksesibilitas dan reduced motion bukan fitur opsional.

## 3. Struktur project target

```text
/
├── public/
│   ├── favicon.*
│   ├── robots.txt
│   └── static/
├── src/
│   ├── components/
│   │   ├── global/
│   │   ├── home/
│   │   ├── editorial/
│   │   └── projects/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── kegiatan/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── 404.astro
│   ├── lib/
│   │   ├── sanity/
│   │   ├── seo/
│   │   └── content/
│   ├── scripts/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── components/
│   └── types/
├── sanity/
│   ├── schemaTypes/
│   └── sanity.config.ts
├── tests/
├── docs/
├── ai-prompts/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Struktur dapat disesuaikan jika versi tooling memerlukan perubahan, tetapi pemisahan concern harus dipertahankan.

## 4. Pemetaan source prototype

- `assets/css/tokens.css` → `src/styles/tokens.css`.
- `base.css` → global/reset/layout dasar.
- `components.css` → CSS komponen terpisah secara bertahap.
- `pages.css`, `final-home.css`, `home-v2.css` → konsolidasikan berdasarkan route tanpa mengubah hasil visual.
- `data.js` → seed fixture sementara, lalu Sanity queries.
- `ui.js` → utility interaksi terisolasi.
- `motion.js` → script/module motion; hormati reduced motion.
- `render.js` → komponen Astro dan mapping data typed.
- `router.js` → hapus; gunakan routing Astro/browser standar. Transisi halaman hanya dipertahankan jika stabil dan accessible.
- `admin/*.html` → hapus dari production; fungsinya digantikan Sanity Studio.

## 5. Data fetching

- Gunakan Sanity client read-only.
- Gunakan API version berupa tanggal eksplisit.
- Production hanya membaca dokumen published.
- Query ditempatkan di `src/lib/sanity/queries.ts` atau folder terstruktur.
- Validasi data yang mungkin kosong.
- Sediakan fixture lokal untuk pengembangan dan test bila CMS belum tersedia.
- Build harus gagal dengan pesan jelas untuk konfigurasi wajib yang hilang, tetapi dokumentasikan mode fixture jika digunakan.

## 6. Environment variables

Contoh nama; sesuaikan dengan integrasi resmi terbaru:

```dotenv
PUBLIC_SANITY_PROJECT_ID=
PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=YYYY-MM-DD
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
PUBLIC_SITE_URL=https://subdomain-kampus.example
```

Token write tidak boleh dibutuhkan frontend. Token preview hanya digunakan di environment aman dan tidak diekspos sebagai `PUBLIC_*`.

## 7. Dependency policy

- Gunakan dependency sesedikit mungkin.
- Jangan menambah framework UI besar hanya untuk satu komponen.
- Gunakan package resmi Sanity/Astro bila tersedia.
- Lockfile `package-lock.json` wajib di-commit.
- Audit lisensi dan kerentanan dependency.
- Hindari dependency yang memerlukan layanan berbayar untuk fungsi inti MVP.

## 8. Testing

Minimal:

- Unit test untuk helper slug, tanggal, mapping konten, dan SEO.
- Component/integration test untuk state penting bila tooling memungkinkan.
- Build test seluruh static routes.
- Link checker untuk route internal.
- Lighthouse CI pada homepage, daftar kegiatan, detail kegiatan, daftar project, dan detail project fixture.
- Visual regression screenshot desktop 1440×900 dan mobile sekitar 390×844 untuk route utama.

## 9. Definition of done per perubahan

- Lint, format, typecheck, test, dan build lolos.
- Tidak ada perubahan desain yang tidak diminta.
- Desktop dan mobile diperiksa.
- Keyboard dan reduced-motion diperiksa jika interaksi berubah.
- Dokumentasi diperbarui bila kontrak, schema, command, atau environment berubah.
