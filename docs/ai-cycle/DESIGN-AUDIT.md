# Design & UX Audit Report

_(Disusun pada Fase 1: Audit UI/UX dan Proposal Refinement)_

## Klasifikasi Temuan

| ID   | Severity           | Route                     | Masalah                                            | Bukti                                                                                                                                                               | Dampak                                                                                                  | Usulan                                                                                             | Risiko |
| ---- | ------------------ | ------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------ |
| A-01 | P1 (MUST FIX)      | `/kegiatan/[slug]`        | Proporsi gambar hero artikel rusak di mobile       | `pages.css` baris 711: `article__art` memakai `aspect-ratio: 21 / 9` tapi dipaksa `min-height: 280px`. Di layar 390px, min-height menang dan membuat crop portrait. | Gambar terpotong secara tidak wajar (wajah/teks hilang) di mobile.                                      | Hapus `min-height: 280px` pada layar mobile, atau ubah aspect ratio menjadi `16 / 9` untuk mobile. | Rendah |
| A-02 | P2 (MUST FIX)      | Global                    | Teks overlay pada IG Grid terlalu kecil            | `pages.css` baris 469: `.igtile__overlay` memakai `font-size: 10px`.                                                                                                | Kesulitan membaca teks, tidak memenuhi standar WCAG 2.2 AA.                                             | Ubah menjadi `var(--xxs)` atau minimal 12px dan atur padding.                                      | Rendah |
| A-03 | P2 (SHOULD REFINE) | `/projects`               | Tinggi `ProjectCard` berlebihan pada layout bento  | `final-home.css` baris 311: `#featuredProjects .pcard` dipaksa `min-height: 420px`.                                                                                 | Meninggalkan banyak _empty space_ jika _one-liner_ project pendek.                                      | Gunakan `height: 100%` dengan `min-height` wajar (mis. 320px) yang menyesuaikan isi.               | Rendah |
| A-04 | P3 (SHOULD REFINE) | `/kegiatan` & `/projects` | Tidak ada visual fallback untuk _Empty State_      | Tidak ada komponen _EmptyState_ yang menangani list data kosong.                                                                                                    | Layar terlihat rusak/kosong tanpa penjelasan jika data tidak ditemukan (misal pencarian/filter kosong). | Tambahkan komponen `EmptyState.astro` bergaya monospace dan garis minimal.                         | Rendah |
| A-05 | P3 (OPTIONAL)      | `/projects`               | Footer kartu tidak seimbang jika tech stack kosong | `ProjectCard.astro` hanya mengandalkan `stack.slice(0, 3)`.                                                                                                         | Jika data CMS kosong, `.pcard__foot` hanya akan memuat panah panah tanpa konten stack.                  | Berikan fallback "TBA" atau sembunyikan block `.mono` secara kondisional.                          | Rendah |

## Proposal Refinement (Batch Implementasi Fase 2)

### 1. MUST FIX

- **A-01: Perbaikan Crop Gambar Hero Artikel.** Menghilangkan paksaan `min-height` di mobile agar aspect ratio `21/9` atau `16/9` berjalan natural tanpa distorsi gambar.
- **A-02: Perbaikan Aksesibilitas Teks.** Menaikkan ukuran font overlay menjadi standar aksesibilitas minimum (12px / `var(--xxs)`).

### 2. SHOULD REFINE

- **A-03: Penyesuaian Ruang Card.** Mengurangi `min-height` pada kartu bento menjadi lebih fleksibel agar konten tidak terlihat mengambang di ruang kosong besar.
- **A-04: Empty State Komponen.** Membuat komponen _Empty State_ generik (contoh: "Belum ada kegiatan") untuk dipasang di rute daftar kegiatan atau pencarian kosong.
- **A-06: Penyelarasan Padding Hero Mobile.** Hero halaman `final-home.css` perlu sedikit pengurangan `gap` agar CTA (Tombol) tidak terdorong terlalu ke bawah lipatan layar (below the fold).

### 3. OPTIONAL (Polish)

- **A-05: Penanganan Data Kosong di Card.** Menyediakan fallback string ketika tech stack atau array belum diinput oleh editor CMS.
- **A-07: Motion Tweak.** Menurunkan skala transisi pada hover kartu dari `scale(1.06)` menjadi `scale(1.03)` agar tidak terlihat berlebihan.

---

**Status Audit:** Semua proposal di atas telah di-**APPROVE** secara eksplisit dan telah di-**IMPLEMENTASI** pada Fase 2 tanpa regresi visual yang diamati.
