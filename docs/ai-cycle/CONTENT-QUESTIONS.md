# Content Questions & Validation

Berikut adalah konten/fakta pada repository (terutama di `fixture.ts` dan dokumentasi) yang membutuhkan verifikasi manusia sebelum rilis karena masih bersifat placeholder atau karangan:

## 1. Fakta Organisasi

- **Tahun Berdiri:** Saat ini masih kosong/belum diverifikasi.
- **Statistik Utama:** Angka "24+ Kegiatan", "32 Anggota aktif", "41 Institusi", "27 Project" adalah angka **KARANGAN**. Butuh angka sebenarnya.
- **Kontak:** Verifikasi apakah `ukmcoding@cyber-univ.ac.id`, Instagram, LinkedIn, dan GitHub yang tertera benar dan memiliki admin aktif.

## 2. Aset & Media

- **Logo Partner/Sponsor:** Daftar partner saat ini menggunakan label `izinTampil: false` dan logo placeholder. Membutuhkan izin resmi (contoh: Republika, Milenianews, kampus, dsb).
- **Foto Profil/Kegiatan:** Pastikan aset gambar di CMS nantinya adalah karya sendiri yang memiliki hak guna publik.
- **Deck PDF:** URL deck saat ini menggunakan `#` (placeholder).

## 3. Akun Organisasi

- **Nama Editor:** Siapa saja (minimal 2 orang) yang akan menjadi admin Sanity?
- **Cloudflare/GitHub:** Siapa yang akan memiliki kunci otentikasi dan menerima serah terima sistem?
- **Subdomain Kampus:** Status pengajuan/finalisasi subdomain belum dikonfirmasi.

## 4. Referensi Konten Kegiatan & Project

- Apakah konten awal (seed data) yang ada di `fixture.ts` seluruhnya harus dihapus sebelum rilis, atau ada sebagian yang dipertahankan dan ditransformasikan menjadi data valid?
