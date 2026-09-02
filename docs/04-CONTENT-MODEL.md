# Content Model & Schema Contract
**UKM Coding Cyber University**

Dokumen ini mendefinisikan kontrak skema dokumen Sanity Content Lake, tipe field, aturan validasi, dan relasi data untuk website UKM Coding.

---

## 1. Skema Dokumen: `siteSettings` (Singleton)

Dokumen pengaturan global website.

| Nama Field | Tipe Data | Wajib? | Keterangan |
| :--- | :--- | :--- | :--- |
| `nama` | string | Ya | Nama resmi situs (contoh: `UKM Coding Cyber University`). |
| `tagline` | string | Tidak | Slogan singkat organisasi. |
| `deskripsi` | text | Ya | Deskripsi global untuk meta tag default. |
| `email` | string | Ya | Email resmi organisasi untuk tombol kontak/kerja sama. |
| `mediaPartnerUrl` | url | Tidak | Tautan pengunduhan proposal media partner (Google Drive / PDF). |
| `instagram` | url | Tidak | URL profil Instagram resmi. |
| `github` | url | Tidak | URL profil GitHub organisasi. |
| `linkedin` | url | Tidak | URL halaman LinkedIn organisasi. |
| `stats` | array of object | Tidak | Data statistik (maksimal 4 item): `label`, `value`, `order`. |
| `seo` | object (seo) | Tidak | Metadata fallback global. |

---

## 2. Skema Dokumen: `project`

Dokumen etalase studi kasus dan aplikasi karya mahasiswa.

| Nama Field | Tipe Data | Wajib? | Keterangan |
| :--- | :--- | :--- | :--- |
| `nama` | string | Ya | Nama resmi aplikasi/project. |
| `slug` | slug | Ya | Unique identifier URL (di-generate otomatis dari `nama`). |
| `kategori` | string (enum) | Ya | Pilihan: `Web App`, `Mobile`, `Data & AI`, `IoT / Hardware`, `Tools`, `Internal`, `Lainnya`. |
| `featured` | boolean | Tidak | Jika `true`, muncul di section *Project Pilihan* pada Beranda. |
| `ringkasan` | text | Ya | Deskripsi singkat (one-liner) maksimal 160 karakter untuk kartu preview. |
| `tahun` | string | Tidak | Tahun rilis (contoh: `2026`). |
| `techStack` | array of string | Tidak | Daftar nama teknologi utama (contoh: `React`, `TypeScript`, `Supabase`). |
| `kontributorUtama` | string | Tidak | Nama divisi atau tim pembuat. |
| `cover` | image | Tidak | Gambar cover rasio 16:9 dengan dukungan hotspot visual. |
| `coverAlt` | string | Tidak | Teks alternatif untuk aksesibilitas cover. |
| `githubUrl` | url | Tidak | URL repositori publik project. |
| `demoUrl` | url | Tidak | URL demo aplikasi aktif. |
| `masalah` | array (PortableText) | Tidak | Penjelasan latar belakang masalah nyata. |
| `pendekatan` | array (PortableText) | Tidak | Rincian arsitektur dan langkah penyelesaian. |
| `hasil` | array (PortableText) | Tidak | Dampak terukur dan pencapaian sistem. |
| `seo` | object (seo) | Tidak | Kustomisasi OpenGraph & meta description per project. |

---

## 3. Skema Dokumen: `editorial`

Dokumen koleksi konten artikel, dokumentasi kegiatan, pengumuman, dan prestasi.

| Nama Field | Tipe Data | Wajib? | Keterangan |
| :--- | :--- | :--- | :--- |
| `judul` | string | Ya | Judul artikel / kegiatan. |
| `slug` | slug | Ya | Unique identifier URL (di-generate otomatis dari `judul`). |
| `tipe` | string (enum) | Ya | Pilihan: `Berita`, `Kegiatan`, `Pengumuman`, `Prestasi`. |
| `ringkasan` | text | Ya | 120–180 karakter untuk kartu preview artikel. |
| `isi` | array (PortableText) | Ya | Konten lengkap tulisan dengan dukungan H2, H3, quotes, lists, dan inline image. |
| `cover` | image | Tidak | Gambar cover rasio 16:9 dengan hotspot. |
| `coverAlt` | string | Tidak | Alt text wajib diisi jika cover diunggah. |
| `tanggalPublikasi` | date | Ya | Tanggal rilis artikel. |
| `penulis` | reference (`author`) | Tidak | Referensi ke dokumen profil penulis. |
| `featured` | boolean | Tidak | Jika `true`, menjadi *Sorotan Utama* pada halaman `/updates`. |
| `seo` | object (seo) | Tidak | Kustomisasi SEO per artikel. |

### Field Khusus Tipe `Kegiatan`:
- `tanggalMulai` & `tanggalSelesai` (datetime): Waktu pelaksanaan event.
- `lokasi` (string): Lokasi fisik atau tautan ruang daring (contoh: *Lab Komputer Cyber University*).
- `urlPendaftaran` (url): Tautan form registrasi peserta.
- `statusKegiatan` (enum): `Akan Datang`, `Berlangsung`, `Selesai`.

---

## 4. Skema Dokumen Pendukung: `partner`, `author`, `galleryItem`

### A. `partner` (Kolaborator & Sponsor Footer)
- `nama` (string, wajib): Nama instansi / mitra.
- `tipe` (enum): `Partner`, `Sponsor`, `Media`, `Institusi`, `Kolaborator`.
- `logo` (image): Logo transparan rasio 1:1.
- `izinTampilLogo` (boolean, wajib): Status persetujuan resmi pemasangan logo.
- `url` (url): Website resmi partner.
- `urutan` (number): Urutan posisi render.
- `aktif` (boolean): Sakelar visibilitas dokumen.

### B. `author` (Profil Penulis)
- `nama` (string, wajib): Nama lengkap penulis.
- `peran` (string): Jabatan atau divisi (contoh: *Ketua UKM Coding*, *Divisi Web Dev*).
- `foto` (image): Foto profil lingkaran.
- `bio` (text): Profil singkat 1–2 kalimat.

### C. `galleryItem` (Foto Galeri Beranda)
- `gambar` (image, wajib): Foto kegiatan resolusi tinggi.
- `alt` (string, wajib): Deskripsi gambar untuk pembaca layar.
- `caption` (string): Keterangan singkat foto.
- `tampilDiBeranda` (boolean): Menampilkan foto di grid visual Beranda.
