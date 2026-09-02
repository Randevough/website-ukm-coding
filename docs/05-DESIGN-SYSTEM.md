# Design System & Typography Guide
**UKM Coding Cyber University**

Dokumen ini adalah referensi resmi sistem desain (*Spec Sheet Aesthetic*), token CSS, palet warna, tipografi responsif, dan aturan tata letak visual pada website UKM Coding.

---

## 1. Konsep Visual: "Spec Sheet"

Antarmuka website mengadopsi bahasa visual lembar spesifikasi teknis fisik (*physical spec sheet*):
- **Kertas Hangat & Tinta**: Memadukan warna dasar kertas hangat (`--paper: #f6f5f2`) dengan kontras teks tajam (`--ink-deep: #0c0e11`).
- **Garis Hairline**: Batas elemen menggunakan garis tipis terstruktur (`--line: rgba(22, 24, 28, 0.14)`), bukan bayangan tebal atau kotak kartu yang bertumpuk.
- **Aksen Tunggal**: Warna biru kobalt (`--blue: #2340d8`) dan oranye (`--orange: #dc5a12`) digunakan secara selektif sebagai penanda fokus (*mark*).
- **Tipografi Tiga Pilar**:
  1. *Instrument Serif*: Keanggunan editorial pada kata kunci (*emphasis*).
  2. *JetBrains Mono*: Presisi teknis pada label, metadata, badge, dan tanggal.
  3. *Plus Jakarta Sans*: Keterbacaan optimal pada seluruh teks utama dan judul tebal.

---

## 2. Breakpoint & Sistem Grid Responsif

| Kategori | Rentang Lebar | Target Perangkat |
| :--- | :--- | :--- |
| **Mobile** | `≤ 700px` | Smartphone (360px – 430px viewport) |
| **Tablet** | `701px – 960px` | iPad / Tablet portrait & landscape |
| **Desktop** | `> 960px` | Laptop dan monitor widescreen (max-width container: `1240px`) |

> *Catatan*: Utilitas navigasi `hide-sm` dan `only-sm` beralih pada breakpoint **900px**.

---

## 3. Skala Tipografi & Token Desain (`tokens.css`)

| Token | Nilai Fluid / Rem | Perkiraan px | Peruntukan Elemen |
| :--- | :--- | :--- | :--- |
| `--d0` | `clamp(3.4rem, 12.5vw, 11rem)` | 54–176px | Hero display utama Beranda (`/`) |
| `--d1` | `clamp(2.8rem, 7.4vw, 6.5rem)` | 45–104px | Page hero title (`/projects`, `/updates`) |
| `--d2` | `clamp(2.1rem, 4.6vw, 3.9rem)` | 34–62px | Heading section level 2 |
| `--d3` | `clamp(1.6rem, 2.9vw, 2.5rem)` | 26–40px | Sub-hero, kartu sorotan besar |
| `--h4` | `1.3125rem` | 21px | Judul kartu project / post standar |
| `--h5` | `1.0625rem` | 17px | Sub-heading & judul kartu kecil |
| `--body-lg`| `1.1875rem` | 19px | Paragraf pembuka / lead desktop |
| `--body` | `1.0625rem` | 17px | Teks body utama artikel |
| `--sm` | `0.9375rem` | 15px | Teks sekunder, deskripsi kartu, kutipan |
| `--xs` | `0.8125rem` | 13px | Tag kategori kartu, filter chip |
| `--xxs` | `0.6875rem` | 11px | Label monospace uppercase, badge status |

---

## 4. Hirarki Tipografi Responsif per Halaman

### A. Beranda (`/`)
- **Display Title**: `--d0` dengan masking line animation.
- **Hero Lead**: `clamp(1.05rem, 1.3vw, 1.2rem)` di desktop / `0.9rem (line-height: 1.5)` di mobile.
- **Section Heading**: `--d2` dengan italic accent serif.

### B. Katalog & Arsip (`/projects` & `/updates`)
- **Pagehead Title**: `--d1` di desktop / `clamp(1.65rem, 7.8vw, 2.5rem)` di mobile.
- **Pagehead Lead**: `clamp(1.05rem, 1.3vw, 1.2rem)` di desktop / `0.9rem` di mobile.
- **Magazine Card Title**: `clamp(2rem, 4.5vw, 3.6rem)` di desktop / `clamp(1.4rem, 6vw, 1.8rem)` di mobile.

### C. Detail Artikel & Studi Kasus (`/projects/[slug]` & `/updates/[slug]`)
- **Detail Hero Title**: `clamp(1.8rem, 4vw, 3.2rem)`.
- **Detail Content H2**: `clamp(1.4rem, 3vw, 2rem)`.
- **Detail Content H3**: `--h4` (21px).
- **Detail Body**: `--body-lg` (19px) dengan `line-height: 1.75`.

---

## 5. Standar Komponen & Perilaku Motion

1. **Card Labels**: Label kategori pada kartu (`.pcard` dan `.ncard`) wajib rata kiri (*flush left*) sejajar dengan judul dan gambar tanpa padding horizontal berlebih.
2. **Radial Grid Reveal (`.grid-fx`)**:
   - Efek spotlight grid berjalan halus melalui akselerasi GPU compositor (`contain: paint`).
   - Dinonaktifkan secara otomatis saat pengguna mengaktifkan mode aksesibilitas `prefers-reduced-motion: reduce`.
3. **Drawer & Modal Transitions**:
   - Animasi backdrop menggunakan transisi `opacity` murni di atas layer `backdrop-filter: blur(6px)` statis.
   - `scrollbar-gutter: stable` diterapkan pada elemen `html` untuk mencegah pergeseran layout (*layout shift*) saat scrollbar dikunci.
