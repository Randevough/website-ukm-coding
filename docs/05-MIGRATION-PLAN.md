# Migration Plan

## 1. Strategi

Seluruh website dipindahkan dalam satu proyek migrasi, tetapi pengerjaan tetap dibagi menjadi fase yang dapat diverifikasi. Jangan melakukan big-bang rewrite tanpa checkpoint. Production lama/prototype tidak diganti sebelum seluruh acceptance criteria utama lolos.

## 2. Inventaris source

Prototype memiliki:

- `index.html`.
- `berita.html` dan `berita-detail.html`.
- `showcase.html` dan `showcase-detail.html`.
- Mockup `admin/login.html`, `admin/index.html`, `admin/editor.html`.
- CSS tokens/base/components/pages/admin dan dua lapisan revisi homepage.
- JS data/ui/motion/render/router.
- Data contoh, tautan placeholder, dan visual geometris.

## 3. Pemetaan route

| Prototype                     | Production                              |
| ----------------------------- | --------------------------------------- |
| `index.html`                  | `/`                                     |
| `berita.html`                 | `/kegiatan`                             |
| `berita-detail.html?slug=x`   | `/kegiatan/x`                           |
| `showcase.html`               | `/projects`                             |
| `showcase-detail.html?slug=x` | `/projects/x`                           |
| `admin/*`                     | Sanity-hosted Studio, tidak dipindahkan |

Tambahkan redirect dari URL lama bila prototype pernah dipublikasikan.

## 4. Pemetaan fungsi

| Source                     | Tujuan                                             |
| -------------------------- | -------------------------------------------------- |
| `window.UKM`               | Sanity documents + fixture development             |
| String HTML di `render.js` | Komponen Astro typed                               |
| Query string slug          | Dynamic route `[slug].astro`                       |
| Filter visual              | Filter fungsional                                  |
| Pagination visual          | Pagination fungsional atau progressive enhancement |
| Login/admin mock           | Sanity Studio                                      |
| Upload mock                | Sanity assets                                      |
| Save/publish mock          | Draft/publish Sanity                               |
| `router.js`                | Routing native Astro                               |

## 5. Urutan fase

### Fase 0 — Baseline

- Jalankan prototype.
- Ambil screenshot route/state utama desktop dan mobile.
- Catat console error, link placeholder, dan data contoh.
- Buat manifest komponen dan checksum visual.

### Fase 1 — Scaffold Astro

- Inisialisasi Astro TypeScript menggunakan npm.
- Pindahkan aset statis, font strategy, tokens, reset, dan layout global.
- Konfigurasi lint, format, typecheck, test, dan build.
- Jangan menghubungkan Sanity dahulu.

### Fase 2 — Port UI

- Port seluruh halaman publik menggunakan fixture typed.
- Pecah header, drawer, footer, hero, cards, modal, archive, article, dan case study menjadi komponen.
- Hapus renderer string global.
- Pertahankan visual/motion dan accessibility behavior.

### Fase 3 — Sanity

- Buat schema sesuai Content Model.
- Buat Studio hosted.
- Masukkan seed/sample yang jelas ditandai.
- Buat queries dan types.
- Ganti fixture frontend dengan data Sanity.

### Fase 4 — Fitur production

- Filter, search, pagination.
- Dynamic routes dan 404.
- Share/copy link.
- Optimasi image.
- Fallback geometris.
- SEO teknis lengkap.
- Preview draft bila dapat diselesaikan tanpa mengorbankan keamanan/jadwal.

### Fase 5 — Cloudflare/GitHub

- Repository baru.
- Preview dan production deployments.
- Environment variables dan webhook rebuild.
- CI termasuk Lighthouse.
- Noindex untuk preview.

### Fase 6 — Content cutover dan handover

- Ganti seluruh data contoh yang terlihat publik.
- Verifikasi izin logo, gambar, nama, tanggal, dan angka.
- UAT editor.
- Hubungkan subdomain kampus.
- Serahkan akun, panduan editor, runbook, backup/export, dan akses organisasi.

## 6. Aturan anti-regresi

- Jangan mengubah copy, warna, spacing, typography, hierarchy, atau motion tanpa requirement.
- Perubahan struktur internal diperbolehkan selama hasil visual dan behavior tetap.
- Setiap route diuji 1440×900 dan 390×844.
- Unknown/unsupported existing behavior dicatat, bukan diam-diam dihapus.
- Jika CSS lama saling override, konsolidasikan bertahap dengan screenshot comparison.

## 7. Cutover checklist singkat

- Semua konten nyata telah diverifikasi pemilik konten.
- Label prototype dihapus.
- Tidak ada `EST. —`, angka karangan, atau partner palsu.
- Tidak ada `href="#"` tanpa behavior.
- DNS, SSL, canonical, sitemap, robots, dan redirects benar.
- Production build berasal dari commit/tag yang diketahui.
- Rollback telah diuji atau prosedurnya terdokumentasi.
