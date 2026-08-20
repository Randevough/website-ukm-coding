# Editorial Operations

## 1. Pengguna CMS

MVP memiliki 1–2 editor. Editor dapat membuat, mengedit, dan publish langsung. Karena tidak ada approval berlapis, checklist editorial wajib dilakukan sebelum publish.

## 2. Workflow standar

1. Login ke Sanity Studio hosted.
2. Pilih jenis konten.
3. Buat dokumen baru.
4. Isi field wajib.
5. Upload gambar bila tersedia; sistem tetap menyediakan fallback geometris.
6. Periksa slug, tanggal, link, alt text, dan preview.
7. Simpan draft.
8. Lakukan self-review menggunakan checklist.
9. Publish.
10. Pastikan build berhasil dan halaman production dapat dibuka.

## 3. Checklist sebelum publish

- Judul ringkas dan spesifik.
- Ringkasan dapat dipahami tanpa membuka artikel.
- Tipe konten benar: berita, kegiatan, pengumuman, atau prestasi.
- Tanggal dan lokasi benar.
- Link pendaftaran diuji dan deadline masih berlaku.
- Nama pembicara, partner, dan institusi telah diverifikasi.
- Tidak ada nomor telepon, email pribadi, atau data anggota tanpa izin.
- Gambar memiliki izin penggunaan.
- Alt text menjelaskan informasi penting pada gambar.
- Slug bersih dan tidak perlu diubah lagi.
- Preview desktop/mobile terlihat baik jika tersedia.
- CTA tidak menjanjikan fungsi yang belum ada.

## 4. Kebijakan gambar

Editor boleh mengunggah gambar dengan berbagai ukuran; sistem melakukan crop/resize responsif. Namun panduan yang disarankan:

- Gunakan gambar tajam, tidak berupa screenshot chat.
- Hindari file asli yang sangat besar; kompres bila praktis.
- Landscape disarankan untuk cover.
- Jangan menambahkan teks penting hanya di dalam gambar.
- Logo partner hanya ditampilkan bila izin telah tercatat.
- Video diletakkan di platform video dan ditautkan/embed sesuai kebijakan, bukan diunggah sebagai file besar.

Jika tidak ada gambar, gunakan fallback geometris; jangan memakai stock photo acak.

## 5. Perubahan dan koreksi

- Koreksi typo dapat dipublish langsung.
- Perubahan fakta penting harus diverifikasi.
- Jangan mengubah slug published kecuali redirect dibuat.
- Konten usang dapat diarsipkan/unpublish, bukan dihapus permanen tanpa alasan.
- Catat incident salah publikasi dalam runbook untuk pembelajaran.

## 6. Operasional akun

- Gunakan akun individual, bukan password bersama, bila plan memungkinkan.
- Aktifkan MFA.
- Hapus akses pengurus yang sudah tidak bertugas.
- Minimal dua pemilik organisasi saat handover.
- Review akses tiap pergantian kepengurusan.

## 7. Kegagalan publish

Jika perubahan belum muncul:

1. Pastikan dokumen berstatus published.
2. Periksa build Cloudflare terakhir.
3. Trigger ulang deployment bila webhook gagal.
4. Jangan publish dokumen berulang kali tanpa memeriksa status.
5. Hubungi maintainer dengan URL dokumen, waktu publish, dan screenshot error—tanpa mengirim token/password.
