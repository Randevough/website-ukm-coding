# Panduan Pengelolaan Konten CMS (Sanity Studio)

**UKM Coding Cyber University**

Panduan ringkas ini dibuat untuk tim internal (Humas, Media, dan Pengurus) agar bisa menambah atau memperbarui konten di website UKM Coding lewat Sanity Studio dengan mudah dan rapi.

---

## 1. Akses & Cara Kerja Dasar

- **Link Akses Lokal**: `http://localhost:4321/admin`
- **Link Akses Produksi**: `https://ukmcoding.site/admin` (atau domain aktif saat ini)
- **Login**: Masuk menggunakan akun Google/email yang sudah didaftarkan ke proyek Sanity.

### Cara Simpan & Publikasi

- Saat kamu mengetik atau mengunggah gambar, Sanity otomatis menyimpannya sebagai **Draft**.
- Konten baru **belum muncul di website publik** sebelum kamu menekan tombol hijau **Publish** di pojok kanan bawah.
- Setelah tombol Publish ditekan, website butuh waktu sekitar 1-2 menit untuk memperbarui halaman secara otomatis.

---

## 2. Mengisi Konten Karya (Project)

Menu **Project** dipakai untuk memamerkan aplikasi atau karya buatan mahasiswa dan tim UKM Coding. Form ini dibagi menjadi 3 tab utama:

### Tab 1: Metadata Utama

- **Nama Project** (Wajib): Nama resmi aplikasi (contoh: `Papan Skor DECOMPE`).
- **Slug** (Wajib): Klik tombol **Generate** setelah mengisi nama. Jangan ubah slug jika project sudah pernah disebar link-nya.
- **Ringkasan (One-liner)** (Wajib): Maksimal 160 karakter (1-2 kalimat). Teks ini tampil di kartu preview halaman depan.
- **Kategori** (Wajib): Pilih salah satu: `Website`, `Mobile`, `Data & AI`, `IoT / Hardware`, `Tools`, atau `Lainnya`.
- **Status** (Opsional): Keterangan kondisi project (contoh: `Aktif`, `Selesai`, `Dalam Pengembangan`).
- **Tampil di Sorotan** (Toggle): Nyalakan jika ingin karya ini muncul di bagian karya unggulan pada Beranda.

### Tab 2: Detail Teknis & Tim

- **Tahun** (Opsional): Tahun rilis project (contoh: `2026`).
- **Tech Stack** (Opsional): Klik _Add item_ lalu masukkan nama teknologi satu per satu (contoh: `React`, `Supabase`, `Tailwind`).
- **Kontributor Utama** (Opsional): Nama divisi atau tim pembuat (contoh: `Divisi Web Development`). Disarankan maksimal 45 karakter agar pas di header.
- **Cover Image** (Opsional): Gambar utama rasio 16:9 (disarankan minimal 1200x675 px). Setelah upload, klik gambar lalu atur lingkaran **Hotspot** ke titik fokus visual agar tidak terpotong sembarangan.
- **Tautan GitHub** (Opsional): Link repositori publik (harus diawali `https://`).
- **Tautan Demo** (Opsional): Link aplikasi live atau situs demo.

### Tab 3: Konten (Masalah, Pendekatan, Hasil)

- **Masalah**: Jelaskan masalah apa yang melatarbelakangi pembuatan aplikasi ini.
- **Pendekatan**: Ceritakan cara tim menyelesaikannya (bisa gunakan format daftar poin).
- **Hasil**: Tulis dampak atau hasil nyata setelah sistem digunakan.

---

## 3. Menulis Berita, Acara, & Pengumuman (Editorial)

Menu **Editorial** dipakai untuk mempublikasikan artikel, rekapan kegiatan, kabar pengumuman, dan prestasi.

### Kolom Utama

- **Judul** (Wajib): Judul artikel yang jelas dan menarik.
- **Slug** (Wajib): Klik tombol **Generate** dari judul.
- **Tipe / Kategori Utama** (Wajib): Pilih antara `Berita`, `Kegiatan`, `Pengumuman`, atau `Prestasi`.
- **Ringkasan (Lead Paragraph)** (Wajib): Tulis 1-2 kalimat pengantar (120-180 karakter) untuk teks preview kartu.
- **Isi Lengkap** (Wajib): Tulis isi artikel. Gunakan subjudul `H2` atau `H3` untuk bagian topik baru. Kamu juga bisa menyisipkan gambar langsung di dalam teks.
- **Foto Sampul** & **Teks Alternatif Foto Sampul (A11y)**: Upload gambar 16:9. Wajib isi teks alternatif (deskripsi visual singkat, misal: `Suasana peserta workshop web development`).
- **Divisi Penulis** (Opsional): Pilih divisi resmi dari menu pilihan Divisi (misal: `Media Design & Partnership`, `Program Development`, atau `BPH`).
- **Penulis Kustom / Kepanitiaan Ad-hoc** (Opsional): Kolom khusus jika artikel dibuat oleh kepanitiaan acara tertentu (contoh: `Panitia DECOMPE 2026`). Jika diisi, teks ini otomatis menggantikan pilihan divisi di atas.
- **Tampil di Sorotan** (Toggle): Nyalakan jika artikel ini ingin dijadikan sorotan utama di bagian atas halaman `/updates`.
- **Kategori Tambahan** (Opsional): Tag atau kata kunci tambahan terkait isi artikel.

### Khusus Jika Memilih Tipe "Kegiatan"

Jika kamu memilih tipe `Kegiatan`, form detail jadwal akan muncul otomatis:

- **Tanggal Mulai (Khusus Kegiatan)**: Tanggal acara dimulai.
- **Tanggal Selesai (Khusus Kegiatan)**: Tanggal acara berakhir.
- **Lokasi Kegiatan**: Tempat fisik atau link daring (contoh: `Lab Komputer Cyber University` atau `Zoom Meeting`).
- **Tautan Pendaftaran**: Link Google Form / formulir registrasi peserta.

> **Catatan Status Kegiatan**: Di website, label status seperti _Akan Datang_ atau _Selesai_ dihitung secara otomatis dari tanggal yang kamu masukkan. Jadi kamu tidak perlu memilih status manual.

---

## 4. Logo Mitra & Sponsor (Partner & Kolaborator)

Menu ini mengatur logo instansi, komunitas, sponsor, dan media partner di bagian bawah (footer) website.

### Aturan Gambar Logo

1. **Wajib format PNG transparan atau SVG**.
2. **Tidak boleh ada background kotak warna** (tanpa latar putih, abu-abu, atau hitam).
3. **Bentuk persegi (rasio 1:1)** dengan posisi logo pas di tengah.

### Kolom yang Diisi

- **Nama Organisasi** (Wajib): Nama resmi mitra (contoh: `BEM Cyber University`).
- **Tipe**: Pilih `Partner`, `Sponsor`, `Media Partner`, `Institusi`, atau `Kolaborator`.
- **Logo**: Upload file logo transparan sesuai aturan di atas.
- **Izin Tampil Logo** (Wajib): **Nyalakan toggle ini** jika pihak mitra sudah resmi memberi izin pemasangan logo. Jika belum dapat izin tertulis, matikan toggle agar aman secara legalitas.
- **Tautan (URL)** (Opsional): Link ke website atau akun Instagram resmi mitra.
- **Urutan Tampil** (Opsional): Angka urutan (misal: `1`, `2`, `3`).
- **Aktif** (Toggle): Nyalakan untuk menampilkan di web. Matikan jika masa kerja sama sudah selesai tanpa perlu menghapus datanya.

---

## 5. Pengaturan Dokumen Lainnya

### A. Pengaturan Situs (Site Settings)

Dokumen tunggal untuk profil utama website:

- **Nama Situs & Deskripsi Singkat**: Teks identitas yang muncul di footer.
- **Email Resmi**: Email penerima untuk tombol kontak kerja sama.
- **URL Instagram & LinkedIn**: Link akun media sosial resmi UKM.
- **File Proposal Media Partner (PDF)**: Upload file PDF proposal kerja sama terbaru untuk tombol unduh di Beranda.

### B. Galeri (Gallery Item)

- **Gambar & Alt**: Foto dokumentasi kegiatan resolusi tajam beserta deskripsi singkatnya.
- **Caption & Tanggal**: Keterangan foto dan waktu kegiatan.
- **Tampil di Beranda**: Nyalakan jika ingin foto ini masuk ke grid foto di halaman depan.

### C. Divisi (Master Data Divisi)

Menu **Divisi** digunakan untuk mengelola daftar divisi resmi UKM Coding:

- **Nama Divisi**: Nama resmi divisi (contoh: `Media Design & Partnership`, `Program Development`, `Badan Pengurus Harian (BPH)`).
- **Deskripsi Singkat / Fokus**: Penjelasan ringkas tugas divisi (opsional).
- **Urutan Tampil**: Urutan tampilan divisi di menu pilihan.
- **Aktif** (Toggle): Matikan jika divisi sudah dilebur pada periode kepengurusan baru. Data artikel lama yang pernah dibuat oleh divisi ini tetap aman dan tidak akan hilang.
- **Rombak Divisi di Periode Baru**: Jika kepengurusan baru merombak atau menambah divisi (misal dari 3 menjadi 5), kamu cukup klik **Create Divisi Baru** di Sanity Studio tanpa perlu mengubah codingan website.

---

## 6. Kendala yang Sering Terjadi (FAQ)

**Q: Saya sudah klik Publish, kenapa di website belum berubah?**  
A: Website butuh waktu proses sekitar 1-2 menit setelah publish. Coba refresh halaman dengan tombol `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac).

**Q: Logo partner tidak muncul di footer?**  
A: Cek dua hal: pastikan toggle **"Aktif"** menyala dan toggle **"Izin Tampil Logo"** juga menyala.

**Q: Boleh tidak ganti slug artikel yang sudah lama dipublish?**  
A: Jangan diubah jika link artikel tersebut sudah pernah disebar di media sosial atau grup, karena link lama akan menjadi rusak (error 404).
