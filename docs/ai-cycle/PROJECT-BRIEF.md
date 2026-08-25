# Project Brief

## Tujuan Produk

Website resmi UKM Coding Cyber University adalah portal publik untuk memperkenalkan UKM, mempublikasikan kegiatan, menampilkan karya anggota, dan membangun kredibilitas. Platform ini digunakan sebagai etalase publik dan tidak mencakup operasional internal.

## Audiens

1. Mahasiswa Cyber University.
2. Calon partner dan sponsor.
3. Publik umum.

## Stack

- Framework: Astro (Static Site Generation).
- Bahasa: TypeScript & Vanilla JS.
- Styling: Vanilla CSS (Design token, tanpa framework CSS eksternal seperti Tailwind).
- CMS: Sanity-hosted Studio.
- Infrastruktur: Cloudflare Pages & GitHub Actions.

## Route

- `/` (Beranda)
- `/kegiatan` (Daftar Kegiatan)
- `/kegiatan/[slug]` (Detail Kegiatan)
- `/projects` (Daftar Project)
- `/projects/[slug]` (Detail Project)
- `404`

## Requirement Terkunci

- Bahasa website Indonesia.
- Identitas visual dan motion prototype dipertahankan sedekat mungkin; tidak boleh redesign.
- Static-first (target Cloudflare Pages gratis).
- Dashboard editor ditangani Sanity-hosted.
- Editor nonteknis (1-2 orang) dapat publish tanpa menyentuh kode.

## Design Constraints

- Fallback visual geometris bila gambar tidak tersedia.
- Mempertahankan struktur aksesibilitas (reading order, interaksi keyboard, focus trap, reduced motion).
- Tanpa dependensi pihak ketiga berat.

## Security Constraints

- Tidak mengekspos token/secrets di frontend atau di source control.
- Tidak ada form publik pada MVP.

## Acceptance Criteria

- Pemetaan halaman ke route Astro 100%.
- Tidak ada regresi visual besar antara Desktop (1440x900) dan Mobile (390x844).
- CMS berfungsi (create, edit, draft, publish) dari Sanity Studio.
- Search, filter, pagination bekerja (baik statis atau client-side ringan).
- Lighthouse CI minimal skor 90 (Performance, A11y, Best Practices, SEO).

## Release Blocker

- Adanya placeholder teks atau angka (contoh: "EST. —", "angka karangan").
- Error pada konsol atau broken links (href="#").
- Kegagalan integrasi Sanity dengan Astro Build.

## Hal yang Membutuhkan Verifikasi Manusia

- Domain/Subdomain kampus resmi.
- Setup DNS Cloudflare oleh institusi.
- Data operasional, statistik riil, izin media, dan kontak.
- Pembuatan dan handover akun organisasi (Sanity, GitHub, Cloudflare).
