# Content Model — Sanity

## 1. Prinsip

- Nama field di Studio menggunakan bahasa Indonesia yang mudah dipahami editor.
- Field teknis seperti slug dibuat otomatis tetapi tetap dapat dikoreksi.
- Optional field tidak boleh merusak layout.
- Validasi mencegah konten tidak lengkap, bukan mempersulit editor.
- Satu koleksi `editorial` menampung berita, kegiatan, pengumuman, dan prestasi.

## 2. `siteSettings` — singleton

Field:

- `namaSitus` — wajib.
- `deskripsiSingkat` — wajib.
- `email` — wajib dan valid.
- `instagramUrl`, `linkedinUrl`, `githubUrl` — opsional, URL valid.
- `lokasi` — default Jakarta, Indonesia bila telah diverifikasi.
- `tahunBerdiri` — opsional; jangan tampilkan `EST. —` di production.
- `statistik[]` — label, nilai, suffix, urutan.
- `seoDefault` — title, description, ogImage.
- `kontakKerjaSama` — heading, deskripsi, email/URL CTA.

## 3. `editorial`

Field utama:

- `judul` — wajib, panjang yang wajar.
- `slug` — wajib, unik, dibuat dari judul.
- `tipe` — enum: `berita`, `kegiatan`, `pengumuman`, `prestasi`.
- `ringkasan` — wajib, disarankan 120–180 karakter.
- `isi` — Portable Text, wajib.
- `cover` — opsional; hotspot/crop aktif.
- `coverAlt` — wajib bila cover ada dan informatif.
- `tanggalPublikasi` — wajib saat published.
- `penulis` — referensi author atau string terkontrol.
- `featured` — boolean.
- `kategoriTambahan[]` — opsional.
- `seo` — optional override.

Field khusus kegiatan:

- `tanggalMulai`, `tanggalSelesai` — opsional untuk konten non-kegiatan; tanggal mulai wajib untuk kegiatan mendatang.
- `lokasi` — teks atau objek online/offline.
- `tautanPendaftaran` — opsional, URL valid.
- `batasPendaftaran` — opsional.
- `pembicara[]` — nama, peran, institusi, foto opsional.
- `jadwal[]` — waktu, judul sesi, deskripsi opsional.
- `statusKegiatan` — `mendatang`, `berlangsung`, `selesai`, `dibatalkan`; dapat dihitung tetapi editor boleh override untuk pembatalan.

Aturan:

- Draft tidak muncul di production.
- Slug yang sudah published tidak diubah tanpa redirect.
- Jika cover kosong, frontend memakai visual geometris.
- Jangan memaksa link pendaftaran pada kegiatan yang tidak membutuhkan registrasi.

## 4. `project`

Field:

- `nama` — wajib.
- `slug` — wajib dan unik.
- `ringkasan` — wajib.
- `deskripsi` — Portable Text.
- `kategori` — wajib.
- `status` — opsional.
- `featured` — boolean.
- `tahun` atau `tanggal` — opsional.
- `tim[]` — nama dan peran; jangan mempublikasikan data personal tanpa izin.
- `techStack[]` — string terkontrol.
- `cover` dan `coverAlt` — cover opsional.
- `galeri[]` — gambar, alt, caption.
- `githubUrl` — opsional.
- `demoUrl` — opsional.
- `hasilDampak[]` — label dan nilai/teks.
- `tantangan`, `solusi`, `pembelajaran` — rich text opsional.
- `seo` — optional override.

Jika GitHub dan demo kosong, area CTA terkait disembunyikan.

## 5. `galleryItem`

Field:

- `gambar` — wajib.
- `alt` — wajib kecuali dekoratif.
- `caption` — opsional.
- `tanggal` — opsional.
- `editorialRef` — referensi konten terkait.
- `urutan` — number.
- `tampilDiBeranda` — boolean.

## 6. `partner`

Field:

- `nama` — wajib.
- `tipe` — partner, sponsor, media, institusi, kolaborator.
- `logo` — opsional.
- `izinTampilLogo` — boolean wajib, default false.
- `url` — opsional.
- `urutan` — number.
- `aktif` — boolean.

Frontend hanya menampilkan logo jika `izinTampilLogo` true; jika false tampilkan nama secara tekstual bila masih relevan.

## 7. `author`

Field minimal:

- `namaTampil`.
- `peran` opsional.
- `foto` opsional.
- `bioSingkat` opsional.

Jangan tampilkan email pribadi.

## 8. SEO object reusable

- `metaTitle`.
- `metaDescription`.
- `ogImage`.
- `noIndex`.
- Canonical umumnya dihitung frontend dan hanya dioverride bila diperlukan.

## 9. Portable Text blocks

Izinkan seperlunya:

- Paragraf, H2, H3.
- Bold, italic, link.
- Bulleted/numbered list.
- Quote.
- Gambar dengan alt/caption.
- Callout sederhana bila desain mendukung.

Jangan mengizinkan arbitrary HTML, script, iframe bebas, warna teks bebas, atau layout builder kompleks pada MVP.
