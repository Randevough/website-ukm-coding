# UKM Coding Cyber University - Frontend Prototype

Proyek Astro ini adalah framework modern untuk UKM Coding Cyber University dengan antarmuka yang statis, responsif, dan terintegrasi dengan CMS Sanity.

## Memulai Pengembangan

1. **Install dependensi**
   ```bash
   npm install
   ```
2. **Jalankan server pengembangan**
   ```bash
   npm run dev
   ```
3. **Akses web**
   Buka `http://localhost:4321` di browser Anda.

## Integrasi Sanity CMS

Situs ini menggunakan Sanity sebagai Headless CMS. Studio editor tertanam (embedded) langsung di rute `/admin`.

### Langkah-langkah Setup Sanity

1. Buat proyek baru di [Sanity.io](https://www.sanity.io/).
2. Tambahkan URL website Anda (contoh: `http://localhost:4321` dan domain production) ke dalam **CORS Origins** pada pengaturan proyek Sanity dan aktifkan "Allow credentials" agar Studio dapat berjalan.
3. Buka file `.env.example` dan salin isinya ke file baru bernama `.env`.
4. Isi `PUBLIC_SANITY_PROJECT_ID` dengan ID proyek Sanity Anda.
5. (Opsional) Jika ingin melakukan migrasi data contoh dari prototype ke Sanity, Anda dapat membuat token **Editor** (Write) di pengaturan API Sanity dan isikan ke variabel `SANITY_SECRET_TOKEN` di `.env`.

### Melakukan Migrasi / Seed Data Awal

Situs ini dilengkapi dengan skrip migrasi data yang akan mengirim _dummy fixtures_ ke Sanity Anda. Semua data contoh akan memiliki prefiks `[FIXTURE]` agar dapat dibedakan.

Jalankan perintah ini:

```bash
npx tsx scripts/seed.ts
```

> **Catatan:** Jangan mempublikasikan `SANITY_SECRET_TOKEN` atau meng-commit file `.env` ke repository.

## Menulis Konten

Akses `http://localhost:4321/admin` untuk membuka Sanity Studio. Login dengan akun Anda untuk mulai mengelola pengaturan, proyek, arsip kegiatan, dan galeri.
