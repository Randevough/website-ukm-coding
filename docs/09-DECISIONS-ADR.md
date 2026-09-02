# Architecture Decision Records (ADR)
**UKM Coding Cyber University**

Dokumen ini mencatat keputusan-keputusan arsitektur penting (*Architecture Decision Records*), konteks pertimbangan teknis, serta evaluasi konsekuensi dari setiap keputusan yang telah diambil dalam pembangunan website UKM Coding.

---

## ADR 01: Pemilihan Astro sebagai Core SSG Framework

- **Status**: Diterima (*Accepted*)
- **Konteks**: Situs ini adalah portal editorial dan etalase karya mahasiswa yang mengutamakan kecepatan muat, keterbacaan artikel, dan optimasi SEO. Tidak ada kebutuhan reaktivitas state yang kompleks di seluruh halaman.
- **Keputusan**: Menggunakan Astro 5 dengan mode Static Site Generation (SSG).
- **Konsekuensi Positif**:
  - Ukuran bundel JavaScript di sisi klien mendekati nol (Zero-JS by default).
  - Kecepatan pemuatan halaman instan (TTFB < 50ms di CDN Edge).
  - Skor performa Lighthouse 100/100 secara konsisten.
- **Konsekuensi Diterima**: Pembaruan konten memerlukan waktu build statis 1–2 menit (bukan pembaruan instan berbasis server-side rendering).

---

## ADR 02: Penggunaan Headless CMS Sanity & Embedded Studio (/admin)

- **Status**: Diterima (*Accepted*)
- **Konteks**: Diperlukan platform manajemen konten yang ramah bagi editor nonteknis untuk mengelola project, artikel, dan mitra tanpa perlu mengubah kode sumber atau database manual.
- **Keputusan**: Menggunakan Sanity Content Lake dengan Sanity Studio v3 yang disematkan langsung di rute `/admin`.
- **Konsekuensi Positif**:
  - Editor tidak perlu mengakses dashboard eksternal terpisah.
  - Skema konten didefinisikan secara deklaratif dan typed dalam kode TypeScript.
  - CDN gambar Sanity mengoptimalkan kompresi WebP dan penyesuaian hotspot secara otomatis.
- **Konsekuensi Diterima**: Bergantung pada kuota *free-tier* Sanity (yang sudah sangat memadai untuk skala organisasi kampus).

---

## ADR 03: Styling Murni (Vanilla CSS) Berbasis Design Tokens

- **Status**: Diterima (*Accepted*)
- **Konteks**: Diperlukan identitas visual yang khas dan presisi (*Spec Sheet Aesthetic*) tanpa overhead dependensi runtime besar atau kerumitan konfigurasi framework CSS utilitas.
- **Keputusan**: Menggunakan Vanilla CSS murni dengan modul token terstruktur (`tokens.css`, `global.css`, `components.css`).
- **Konsekuensi Positif**:
  - Fleksibilitas styling maksimal dan kontrol total terhadap performa compositor browser.
  - Nol ketergantungan pada build tool CSS pihak ketiga.
  - Waktu build lebih cepat dan ukuran CSS akhir sangat ringan (~15KB).

---

## ADR 04: Fallback Fixtures Lokal (`fixture.ts`)

- **Status**: Diterima (*Accepted*)
- **Konteks**: Proses pengembangan antarmuka dan pengujian otomatis tidak boleh terganggu jika API CMS eksternal mengalami gangguan jaringan atau dataset belum diisi.
- **Keputusan**: Menyediakan data cadangan (*fixtures*) lokal di `src/lib/content/fixture.ts` yang otomatis digunakan jika data Sanity kosong/gagal ditarik.
- **Konsekuensi Positif**:
  - Pengembang baru dapat langsung menjalankan `npm run dev` dan `npm run build` tanpa perlu konfigurasi API keys Sanity terlebih dahulu.
  - Pengujian CI/CD berjalan deterministik dan tidak rapuh terhadap fluktuasi jaringan luar.

---

## ADR 05: Hosting & Deployment di Cloudflare Pages

- **Status**: Diterima (*Accepted*)
- **Konteks**: Menjaga keandalan uptime situs 99.99% dengan anggaran operasional organisasi Rp0/bulan.
- **Keputusan**: Menghosting situs di Cloudflare Pages dengan deployment terotomatisasi dari GitHub Actions.
- **Konsekuensi Positif**:
  - Distribusi CDN global gratis, SSL otomatis, dan perlindungan DDoS.
  - Fitur branch preview otomatis untuk setiap Pull Request yang dibuat.
