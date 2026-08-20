# Product Requirements Document (PRD)

## 1. Ringkasan

Website resmi **UKM Coding Cyber University** adalah portal publik untuk memperkenalkan UKM, mempublikasikan kegiatan dan pencapaian, menampilkan karya anggota, serta membangun kredibilitas kepada mahasiswa, publik, partner, dan sponsor.

Prototype saat ini hanya HTML/CSS/JS dengan data contoh. MVP production harus mempertahankan tampilan sedekat mungkin, mengganti data hard-coded dengan Sanity CMS, dan dapat dikelola 1–2 editor nonteknis.

## 2. Tujuan

1. Menjelaskan identitas, aktivitas, dan nilai UKM.
2. Menampilkan project/karya anggota secara meyakinkan.
3. Menjadi arsip berita, kegiatan, pengumuman, dan prestasi.
4. Menyediakan jalur kerja sama yang jelas melalui kontak; form publik belum termasuk MVP.
5. Memungkinkan editor memperbarui konten 1–2 kali per minggu tanpa menyentuh kode.
6. Beroperasi dengan target biaya Rp0/bulan di luar domain/subdomain.

## 3. Target pengguna

### Primer

- Mahasiswa Cyber University.
- Calon partner dan sponsor.
- Publik umum.

### Internal

- 1–2 editor/pengurus nonteknis.
- Developer mahasiswa atau AI coding agent sebagai maintainer teknis.

## 4. Aksi utama pengunjung

- Mengenal UKM.
- Melihat kegiatan dan perkembangan terbaru.
- Melihat karya anggota.
- Menghubungi UKM untuk kerja sama.

## 5. Ruang lingkup MVP

### Halaman publik

- Beranda.
- Profil/tentang UKM pada beranda.
- `/kegiatan` untuk koleksi editorial terpadu.
- `/kegiatan/[slug]` untuk detail konten.
- `/projects` untuk katalog project.
- `/projects/[slug]` untuk studi kasus project.
- Galeri dan partner pada beranda atau section terkait.
- Halaman 404.

### Jenis konten

Satu koleksi editorial dengan tipe:

- Berita.
- Kegiatan.
- Pengumuman.
- Prestasi.

Kegiatan dapat memiliki tanggal, lokasi, deskripsi, link pendaftaran, pembicara, dan jadwal.

### CMS

- Sanity Studio hosted oleh Sanity pada MVP.
- Login ditangani Sanity.
- Editor dapat membuat, mengedit, menyimpan draft, upload media, dan publish langsung.
- Preview merupakan fitur yang diinginkan, tetapi tidak boleh menghambat rilis MVP bila kompleksitasnya tinggi.

### Fitur publik

- Daftar dan detail konten.
- Filter kategori yang benar-benar bekerja.
- Pencarian ringan di sisi klien atau build-time.
- Pagination bila jumlah konten membutuhkannya.
- Daftar/detail project.
- Link GitHub dan demo bersifat opsional.
- Fallback visual geometris bila gambar tidak tersedia.
- Jalur kerja sama melalui email/tautan kontak, tanpa form publik.

## 6. Di luar ruang lingkup

- Akun anggota.
- Dashboard internal.
- Absensi.
- Sertifikat otomatis.
- Database operasional Supabase.
- Pembayaran.
- Komentar publik.
- Newsletter automation.
- Analytics pada MVP.
- Redesign visual.
- Aplikasi mobile.

## 7. Persyaratan UX

- Bahasa Indonesia saja.
- Desain harus sedekat mungkin dengan prototype.
- Reading order, interaksi keyboard, drawer mobile, modal, dan reduced motion harus tetap baik.
- Konten tanpa gambar tetap terlihat disengaja melalui visual geometris yang sudah menjadi identitas prototype.
- Editor tidak perlu mengetahui Git, Markdown, atau deployment.

## 8. Persyaratan nonfungsional

- Static-first dan dapat di-host di Cloudflare Pages.
- Lighthouse minimal 90 untuk Performance, Accessibility, Best Practices, dan SEO pada halaman utama yang diuji, dengan toleransi deviasi lingkungan CI yang didokumentasikan.
- Browser target: dua versi terbaru Chrome, Edge, Firefox, dan Safari; iOS Safari dan Chrome Android yang masih didukung vendor.
- Tidak ada error console pada alur utama.
- Tidak ada tautan internal rusak.
- TypeScript strict.
- SEO teknis lengkap.
- Preview deployment untuk pull request dan production deployment dari branch utama.

## 9. Acceptance criteria MVP

- Semua halaman prototype berhasil dipetakan ke route Astro yang disepakati.
- Tampilan desktop dan mobile tidak mengalami regresi visual besar.
- Tidak ada lagi data publik utama yang bergantung pada `assets/js/data.js`.
- Editor dapat membuat dan menerbitkan setiap tipe konten dari Sanity Studio.
- Konten published tampil di website setelah build/deploy.
- Draft tidak tampil di production.
- Gambar dioptimalkan dan memiliki alt text atau ditandai dekoratif dengan benar.
- Filter, pencarian, slug, navigasi previous/next, dan tautan share yang dipertahankan bekerja.
- Metadata, canonical URL, Open Graph, sitemap, robots.txt, dan structured data yang relevan tersedia.
- CI menjalankan lint, format check, typecheck, build, test, link check, dan Lighthouse CI.
- Dokumentasi editor, runbook teknis, akses akun, dan prosedur handover tersedia.

## 10. Indikator keberhasilan awal

Karena analytics belum termasuk MVP, validasi awal dilakukan melalui:

- Pengurus berhasil menerbitkan konten tanpa bantuan developer.
- Waktu penerbitan konten sederhana kurang dari 10 menit setelah materi siap.
- Tidak ada incident deployment pada empat minggu pertama.
- Partner dan mahasiswa dapat menemukan profil, kegiatan, project, dan kontak dalam maksimal tiga interaksi.
