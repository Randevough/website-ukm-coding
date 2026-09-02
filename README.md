# UKM Coding Cyber University

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![Sanity](https://img.shields.io/badge/Sanity-v3-F03E2F?style=flat-square&logo=sanity&logoColor=white)](https://www.sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

Situs web resmi dan arsip project UKM Coding Cyber University. Dibangun sebagai etalase editorial untuk karya rekayasa perangkat lunak mahasiswa, dokumentasi workshop teknis, dan inisiatif komunitas kampus.

---

## Konsep Desain: "Spec Sheet"

Antarmuka dirancang dengan pendekatan visual lembar spesifikasi fisik (_spec sheet_), bukan tampilan dasbor web generik:

- **Kertas & Tinta**: Latar bernuansa kertas hangat dipadukan dengan tipografi tinta kontras tinggi untuk kenyamanan membaca teks panjang.
- **Rangka Hairline**: Garis pandu vertikal dan garis pemisah tipis menyusun tata letak tanpa mengandalkan bayangan tebal atau kotak kartu yang berlebihan.
- **Tipografi Editorial**: Kombinasi terkurasi antara _Instrument Serif_ untuk judul besar, _JetBrains Mono_ untuk label dan metadata teknis, serta _Plus Jakarta Sans_ untuk keterbacaan teks utama.
- **Aksen Terukur**: Biru kobalt dan oranye digunakan secara selektif sebagai penanda fokus tunggal pada tiap halaman.

---

## Fitur & Kemampuan Utama

- **Direktori & Studi Kasus Project**: Dokumentasi karya terstruktur (Web, Mobile, IoT, Data/AI, Tools) yang membedah masalah nyata, pendekatan teknis, teknologi yang dipakai, dan pelajaran yang didapat. Dilengkapi fitur pencarian instan dan filter kategori di sisi klien.
- **Arsip Updates & Kegiatan**: Artikel editorial, pengumuman rekrutmen, dan liputan acara dengan kontrol filter terpadu.
- **Sanity Studio Tertanam**: Alur kerja pengelolaan konten mandiri langsung di rute `/admin` tanpa memerlukan dasbor eksternal terpisah.
- **Gaya Murni (Zero-Framework)**: Ditulis menggunakan Vanilla CSS murni berbasis variabel token desain, menjaga ukuran berkas akhir tetap ramping dan cepat dimuat.
- **Ketahanan Offline / Fallback**: Dilengkapi data _fixtures_ lokal bawaan sehingga situs tetap bisa dibangun dan dipratinjau dengan mulus meski tanpa koneksi langsung ke Sanity CMS.

---

## Teknologi

- **Framework**: Astro 5 (ClientRouter View Transitions, Static Site Generation)
- **CMS**: Sanity Studio v3 (`@sanity/astro`)
- **Runtime / UI**: React 19 (Sanity Studio & komponen interaktif)
- **Styling**: Vanilla CSS (Sistem Token Desain)
- **Kualitas Kode**: TypeScript, ESLint, Prettier, Vitest

---

## Lisensi

- **Kode Sumber**: [MIT License](LICENSE) — bebas dipelajari, dimodifikasi, dan digunakan kembali sesuai ketentuan lisensi MIT.
- **Merek & Konten**: Hak Cipta © 2026 UKM Coding Cyber University. Seluruh hak cipta dilindungi undang-undang. Logo, identitas visual, foto kegiatan, dan materi editorial tidak termasuk dalam lisensi MIT dan tidak boleh digunakan untuk keperluan komersial tanpa izin tertulis.
