# Product Requirements Document (PRD)
**Portal Resmi UKM Coding Cyber University**

---

## 1. Ringkasan Eksekutif

Website resmi **UKM Coding Cyber University** (`ukmcoding.site`) adalah portal publik resmi untuk memperkenalkan UKM, mempublikasikan kegiatan dan pencapaian, menampilkan karya rekayasa perangkat lunak mahasiswa, serta membangun kredibilitas kepada mahasiswa, civitas akademika, partner industri, dan sponsor.

Situs ini beroperasi secara dinamis melalui integrasi Headless CMS (Sanity Studio) yang tersemat pada rute `/admin`, memungkinkan pengurus dan editor memperbarui konten secara mandiri tanpa menyentuh kode sumber.

---

## 2. Tujuan & Sasaran Produk

1. **Eksplorasi & Identitas**: Menjelaskan identitas, visi, program kerja, dan nilai kolaborasi UKM Coding.
2. **Showcase Karya**: Menjadi etalase studi kasus project mahasiswa (Web, Mobile, IoT, Data/AI, Tools) dengan rincian arsitektur, tantangan, dan teknologi.
3. **Pusat Informasi & Arsip**: Menjadi arsip terstruktur untuk berita, dokumentasi kegiatan, pengumuman rekrutmen, dan prestasi.
4. **Jalur Kolaborasi**: Menyediakan alur komunikasi langsung untuk pengajuan media partnership, sponsorship, dan kolaborasi project.
5. **Kemandirian Konten**: Editor nonteknis dapat menerbitkan dan memperbarui konten kapan saja dengan antarmuka CMS yang intuitif.
6. **Efisiensi Infrastruktur**: Beroperasi dengan keandalan tinggi dan biaya hosting Rp0/bulan menggunakan arsitektur Jamstack di Cloudflare Pages.

---

## 3. Profil Pengguna (User Personas)

### Pengguna Eksternal (Publik)
- **Mahasiswa Cyber University**: Mencari informasi pendaftaran, jadwal workshop, materi belajar, dan inspirasi karya.
- **Calon Partner & Sponsor**: Mempelajari portofolio organisasi, mengunduh proposal kerja sama, dan menghubungi tim via email.
- **Komunitas & Publik**: Mengikuti perkembangan kegiatan tech dan membaca artikel edukatif.

### Pengguna Internal
- **Editor & Pengurus UKM**: Memasukkan berita, mengelola data project, mengunggah foto kegiatan, dan memperbarui partner.
- **Developer / Maintainer**: Menjaga integritas kode, performa, keamanan, dan pembaruan dependencies.

---

## 4. Peta Halaman & Fitur Publik

| Rute Halaman | Fungsi & Komponen Utama |
| :--- | :--- |
| `/` | **Beranda**: Hero editorial interaktif (Grid reveal FX), section Tentang UKM, 3 Project Pilihan, Updates Terbaru, Galeri Instagram, Jalur Kerja Sama, dan Footer Partner. |
| `/projects` | **Katalog Karya**: Direktori lengkap project mahasiswa dengan filter kategori dinamis (*Web App, Mobile, IoT, Data/AI, dll.*), filter tahun, dan pencarian instan sisi klien. |
| `/projects/[slug]` | **Detail Studi Kasus**: Rincian latar belakang masalah, pendekatan arsitektur, tech stack, galeri tangkapan layar, link GitHub/Demo, dan navigasi previous/next. |
| `/updates` | **Arsip Editorial**: Daftar berita, dokumentasi kegiatan, pengumuman, dan prestasi dengan sorotan utama (*magazine layout*) dan filter kategori. |
| `/updates/[slug]` | **Detail Artikel / Kegiatan**: Isi artikel lengkap (Rich Text PortableText), info penulis, tanggal rilis, tombol bagikan sosial, serta info jadwal/lokasi/link pendaftaran khusus event. |
| `/admin` | **Sanity Studio**: Dasbor pengelolaan konten terautentikasi langsung di browser. |
| `/404` | **Halaman 404**: Desain responsif kustom dengan navigasi kembali ke Beranda. |

---

## 5. Ruang Lingkup & Batasan Sistem

### Termasuk dalam Lingkup (In-Scope)
- Rendering statis berkecepatan tinggi dengan Astro SSG.
- Pengelolaan konten headless terpusat di Sanity Content Lake.
- Quick-view modal interaktif pada katalog project.
- Sistem tema monokrom hangat (*Spec Sheet*) dengan aksen biru kobalt dan oranye.
- Dukungan fallback grafis geometris otomatis jika konten tidak memiliki gambar cover.
- Dukungan aksesibilitas penuh (WCAG 2.2 AA, keyboard navigation trap, reduced-motion).
- Optimasi SEO lengkap (OpenGraph, Twitter Cards, Canonical URL, JSON-LD Schema.org, Sitemap XML).

### Di Luar Lingkup (Out-of-Scope)
- Sistem login/autentikasi umum untuk mahasiswa (hanya admin/editor yang login ke Sanity).
- Database relasional transaksional atau sistem pembayaran.
- Forum diskusi atau kolom komentar publik.
- Sistem absensi otomatis atau generator sertifikat dinamis.

---

## 6. Standar Kualitas & Non-Fungsional

1. **Performa & Audit Web**:
   - Skor Google Lighthouse minimal **90+** untuk *Performance, Accessibility, Best Practices, dan SEO*.
   - Target Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID/INP < 100ms.
2. **Dukungan Peramban (Browser Support)**:
   - Modern evergreen browsers: Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, Brave.
   - Perangkat seluler: iOS Safari dan Android Chromium.
3. **Keandalan & Aksesibilitas**:
   - Bebas layout shift (CLS 0) saat membuka/menutup drawer dan modal.
   - Mode *prefers-reduced-motion* menonaktifkan efek animasi berat secara otomatis.
