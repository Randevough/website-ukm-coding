# Panduan Pengelolaan Konten CMS (Sanity Studio)

**UKM Coding Cyber University**

Dokumen ini adalah panduan praktis dan standar operasional resmi bagi admin, editor, dan pengurus untuk memasukkan, mengedit, serta mempublikasikan konten pada situs resmi UKM Coding Cyber University.

---

## 1. Akses Sanity Studio

- **Lingkungan Lokal**: `http://localhost:4321/admin`
- **Lingkungan Produksi**: `https://ukmcoding.site/admin` (atau domain produksi aktif)
- **Login**: Gunakan akun email yang telah didaftarkan ke proyek Sanity.

> **Catatan Alur Kerja**: Setiap perubahan yang Anda ketik akan otomatis disimpan sebagai _Draft_. Perubahan baru akan muncul di website publik setelah Anda menekan tombol hijau **Publish** di pojok kanan bawah.

---

## 2. Struktur Dokumen & Panduan Input

### A. Project (Karya & Studi Kasus)

Menu **Project** digunakan untuk mendokumentasikan aplikasi, prototipe, dan karya rekayasa perangkat lunak mahasiswa.

| Kolom (_Field_)           | Tipe        | Status     | Panduan & Standar Penulisan                                                                                                                                                  |
| :------------------------ | :---------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nama Project**          | Teks        | Wajib      | Tuliskan nama resmi aplikasi/produk (contoh: `Papan Skor DECOMPE`). Hindari nama yang terlalu panjang.                                                                       |
| **Slug**                  | Slug        | Wajib      | Klik tombol **Generate** setelah mengisi nama. **Pantangan:** Jangan ubah slug setelah project dipublikasikan karena akan merusak tautan yang telah dibagikan.               |
| **Ringkasan (One-liner)** | Teks Pendek | Wajib      | Maksimal 160 karakter. Tulis 1–2 kalimat padat yang menjelaskan fungsi utama aplikasi. Teks ini tampil di kartu pratinjau.                                                   |
| **Kategori**              | Pilihan     | Wajib      | Pilih salah satu: `Website`, `Mobile`, `Data & AI`, `IoT / Hardware`, `Tools`, `Lainnya`.                                                                                    |
| **Tampil di Sorotan**     | Toggle      | Opsional   | Aktifkan (`true`) jika ingin project ini muncul di section _Project Pilihan_ di halaman Beranda.                                                                             |
| **Tahun**                 | Angka       | Opsional   | Tahun project selesai atau dirilis (contoh: `2026`).                                                                                                                         |
| **Tech Stack**            | Tag / Array | Opsional   | Masukkan nama teknologi utama satu per satu (contoh: `React`, `Node.js`, `Supabase`, `Tailwind`).                                                                            |
| **Kontributor Utama**     | Teks        | Opsional   | Nama divisi atau tim pembuat (contoh: `Divisi IT & Data`).                                                                                                                   |
| **Cover Image**           | Gambar      | Opsional   | Gunakan gambar rasio horizontal **16:9** (minimal 1200×675 px). Klik gambar lalu sesuaikan lingkaran **Hotspot** ke titik fokus visual. Hindari gambar berisi teks berlebih. |
| **Tautan GitHub / Demo**  | URL         | Opsional   | URL repositori publik atau situs live demo (wajib diawali `https://`).                                                                                                       |
| **Masalah**               | Teks / Blok | Disarankan | Jelaskan permasalahan nyata di lapangan yang melatarbelakangi pembuatan aplikasi ini.                                                                                        |
| **Pendekatan**            | Teks / Blok | Disarankan | Gunakan format daftar poin (_bullet points_) untuk menjelaskan arsitektur dan langkah penyelesaian tim.                                                                      |
| **Hasil**                 | Teks / Blok | Disarankan | Uraikan hasil nyata atau dampak terukur setelah sistem digunakan.                                                                                                            |

---

### B. Editorial (Updates, Berita & Kegiatan)

Menu **Editorial** digunakan untuk mempublikasikan artikel, pengumuman, dokumentasi acara, dan rekapan kegiatan.

| Kolom (_Field_)       | Tipe          | Status     | Panduan & Standar Penulisan                                                                                                                             |
| :-------------------- | :------------ | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Judul**             | Teks          | Wajib      | Judul artikel yang jelas, lugas, dan informatif.                                                                                                        |
| **Slug**              | Slug          | Wajib      | Klik tombol **Generate** dari judul artikel.                                                                                                            |
| **Tipe**              | Pilihan       | Wajib      | Pilih salah satu: `Berita`, `Kegiatan`, `Pengumuman`, atau `Prestasi`.                                                                                  |
| **Ringkasan**         | Teks          | Wajib      | 120–180 karakter. Kalimat pengantar yang memikat pembaca di daftar artikel.                                                                             |
| **Isi Konten**        | Rich Text     | Wajib      | Tulis isi lengkap tulisan. Gunakan heading `H2` atau `H3` untuk sub-bagian, bukan cetak tebal biasa. Anda bisa menambahkan gambar inline di dalam teks. |
| **Cover & Cover Alt** | Gambar + Teks | Disarankan | Gambar utama rasio 16:9. Wajib mengisi _Cover Alt Text_ untuk aksesibilitas (jelaskan isi visual gambar secara singkat).                                |
| **Tanggal Publikasi** | Tanggal       | Wajib      | Tanggal terbit artikel.                                                                                                                                 |
| **Penulis**           | Referensi     | Opsional   | Pilih profil dari dokumen _Penulis_ yang sudah dibuat.                                                                                                  |

> **Khusus Tipe "Kegiatan"**:
> Jika memilih tipe `Kegiatan`, form detail jadwal akan muncul. Wajib melengkapi:
>
> - **Tanggal Mulai & Selesai**
> - **Lokasi** (contoh: `Lab Komputer Cyber University` atau `Online via Zoom`)
> - **URL Pendaftaran** (tautan Google Form / formulir registrasi)
> - **Status Kegiatan**: `Akan Datang`, `Berlangsung`, atau `Selesai`.

---

### C. Partner & Kolaborator (Logo Footer)

Menu **Partner & Kolaborator** mengatur daftar instansi, komunitas, sponsor, dan media partner di area footer.

#### ⚠️ Standar Mutlak Aset Logo:

1. **Format Wajib**: **PNG Transparan** atau **SVG**.
2. **Latar Belakang**: **Wajib transparan (tanpa warna solid putih, hitam, abu-abu, pink, atau kotak warna bawaan gambar)**.
3. **Bentuk & Rasio**: Rasio **1:1 (persegi)** dengan logo berada tepat di tengah kanvas.
4. **Resolusi Minimal**: 300×300 px (kualitas tajam, tidak pecah).

| Kolom (_Field_)      | Panduan Pengisian                                                                                                                                                          |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nama Organisasi**  | Nama resmi instansi / partner (contoh: `Cyber University`, `BEM Cyber University`).                                                                                        |
| **Tipe**             | Pilih: `Partner`, `Sponsor`, `Media`, `Institusi`, atau `Kolaborator`.                                                                                                     |
| **Logo**             | Unggah file logo transparan sesuai standar di atas.                                                                                                                        |
| **Izin Tampil Logo** | **Wajib dicentang (`true`)** jika pihak partner telah menyetujui pemasangan logo. Jika belum, biarkan tidak dicentang agar nama tetap tampil tanpa logo placeholder rusak. |
| **Tautan (URL)**     | URL website atau profil Instagram partner (opsional).                                                                                                                      |
| **Urutan**           | Angka urutan tampilan (misal: `1`, `2`, `3`).                                                                                                                              |
| **Aktif**            | Toggle untuk mengaktifkan / menonaktifkan tampilan partner tanpa menghapus datanya.                                                                                        |

---

### D. Pengaturan Situs (Site Settings)

Dokumen tunggal (_singleton_) untuk mengelola informasi inti organisasi:

| Kolom (_Field_)                 | Tipe       | Status   | Panduan & Standar Penulisan                                                                             |
| :------------------------------ | :--------- | :------- | :------------------------------------------------------------------------------------------------------ |
| **Nama Situs**                  | Teks       | Wajib    | Identitas resmi UKM (contoh: `UKM Coding Cyber University`).                                            |
| **Deskripsi Singkat / Tagline** | Teks       | Wajib    | Deskripsi singkat atau slogan resmi yang tampil di bawah logo pada area Footer.                         |
| **Email Resmi**                 | Teks/Email | Wajib    | Alamat email resmi organisasi untuk menerima pesan dari tombol kerja sama dan narahubung.               |
| **URL Instagram**               | URL        | Opsional | Tautan profil Instagram resmi organisasi (contoh: `https://www.instagram.com/coding.cyberuniversity/`). |
| **URL LinkedIn**                | URL        | Opsional | Tautan profil/halaman LinkedIn resmi organisasi.                                                        |
| **File Proposal Media Partner** | File (PDF) | Opsional | Unggah dokumen proposal resmi dalam format **PDF** untuk tombol unduh _Media Partner_ di Beranda.       |

> **Catatan SEO & Copyright**: Seluruh metadata SEO (Google Search & pratinjau media sosial) di-generate secara otomatis oleh sistem web dari judul, ringkasan, dan cover gambar. Tahun hak cipta pada footer juga diperbarui secara otomatis setiap tahun tanpa perlu konfigurasi manual.

---

### E. Penulis & Galeri

- **Penulis (Author)**: Profil pengurus atau anggota penulis artikel (nama, divisi, foto profil lingkaran, bio singkat).
- **Galeri (Gallery Item)**: Foto arsip kegiatan atau postingan Instagram terpilih (wajib gambar resolusi tajam, lengkapi kolom _Alt Text_, centang _Tampil di Beranda_ jika ingin ditampilkan di grid galeri depan).

---

## 3. Checklist Sebelum Menekan Tombol "Publish"

Gunakan daftar periksa ini sebelum mempublikasikan konten baru:

- [ ] **Slug Valid**: Slug sudah di-generate dari judul dan tidak ada karakter aneh.
- [ ] **Bebas Typo**: Nama project, judul artikel, dan nama instansi sudah diperiksa ejaannya.
- [ ] **Aturan Gambar & Hotspot**: Gambar horizontal (16:9) dan titik fokus (_hotspot_) sudah diarahkan ke objek utama.
- [ ] **Logo Transparan**: Logo partner tidak membawa kotak latar belakang warna solid.
- [ ] **Izin Logo**: Toggle `Izin Tampil Logo` sudah sesuai status persetujuan partner.
- [ ] **Validasi Sukses**: Tidak ada tanda seru merah / error validasi pada form Sanity.

---

## 4. Troubleshooting & Pertanyaan Umum

**T: Saya sudah klik Publish, tapi website belum berubah?**

> **J**: Cek apakah Sanity Studio Anda terhubung ke dataset `production`. Pada mode pengembangan lokal, lakukan _hard refresh_ browser (`Ctrl + Shift + R` atau `Cmd + Shift + R`). Di production, website akan melakukan build otomatis dalam 1–2 menit setelah publish.

**T: Kenapa logo kolaborator tidak muncul di footer website?**

> **J**: Pastikan toggle **"Izin Tampil Logo"** dan toggle **"Aktif"** sudah dalam keadaan menyala (`true`).

**T: Apakah boleh mengubah slug project / artikel yang sudah lama tayang?**

> **J**: Sangat tidak disarankan. Mengubah slug akan membuat URL lama menghasilkan halaman _404 Not Found_ jika tautan tersebut sudah terlanjur disebar di media sosial atau proposal.
