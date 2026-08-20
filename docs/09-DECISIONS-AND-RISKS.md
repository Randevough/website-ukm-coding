# Decisions & Risks

## Keputusan terkunci

- Nama: UKM Coding Cyber University.
- Audience: mahasiswa Cyber University, partner/sponsor, publik.
- Tujuan: profil, kerja sama, karya anggota.
- Bahasa: Indonesia.
- MVP: profil, editorial, kegiatan, projects, galeri, partner.
- Editorial: satu koleksi dengan tipe berita, kegiatan, pengumuman, prestasi.
- Editor: 1–2 orang, direct publish.
- Update: 1–2 kali/minggu.
- Tidak ada form publik pada MVP.
- Astro + TypeScript + npm.
- Sanity-hosted Studio dan Sanity Content Lake.
- Cloudflare Pages, GitHub repository baru.
- Preview dan production.
- Route: `/kegiatan` dan `/projects`.
- Migrasi seluruh situs; port tanpa redesign.
- Fallback gambar: visual geometris.
- GitHub/demo project opsional.
- SEO teknis lengkap.
- CI lengkap + Lighthouse CI; target skor ≥90.
- Analytics ditunda.
- Domain: meminta subdomain kampus.
- Dashboard internal di luar perencanaan.
- Docs berada di project ZIP dan prompt AI disusun per fase.

## Risiko dan mitigasi

### Free tier berubah

Mitigasi: verifikasi pricing/limits sebelum implementasi dan saat handover; jangan membuat fungsi inti bergantung pada paid-only feature.

### Editor publish tanpa approval

Mitigasi: checklist editorial, MFA, akun individual, revision history, dan training.

### Build webhook gagal

Mitigasi: retry manual, monitoring dashboard, runbook, production lama tetap aktif.

### Data contoh ikut rilis

Mitigasi: content audit dan release blocker untuk label prototype, angka karangan, placeholder, `href="#"`.

### CSS hasil port berubah

Mitigasi: baseline screenshot, visual regression, port tanpa redesign, route/state matrix.

### DNS kampus lambat

Mitigasi: production dapat diuji pada domain Cloudflare sementara; jangan hard-code domain sebelum final.

### Gambar bebas merusak layout

Mitigasi: hotspot/crop, responsive image, aspect-ratio container, fallback, panduan editor.

### Slug berubah setelah publish

Mitigasi: validasi editor, redirect map, larangan perubahan tanpa redirect.

### Akun awal sulit diwariskan

Mitigasi: organisasi, minimal dua owner, handover checklist, MFA, rotasi token.

## Open items sebelum go-live

- Subdomain kampus final.
- Profil, tahun berdiri, statistik, kontak, dan tautan resmi yang telah diverifikasi.
- Daftar aset nyata dan bukti izin.
- Nama editor serta akun organisasi final.
- Batas free tier terkini saat implementasi.
- Apakah draft preview masuk MVP atau segera setelah MVP.
