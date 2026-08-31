# 10 — Typography System Guide

> **Tujuan:** Panduan referensi tipografi yang harus diikuti oleh semua halaman dan komponen.
> Konsistensi ukuran teks adalah faktor tunggal terbesar yang membuat situs terasa premium atau murah.

---

## Breakpoint yang Digunakan

| Label       | Range           | Contoh perangkat                     |
| ----------- | --------------- | ------------------------------------ |
| **Mobile**  | `≤ 700px`       | Ponsel (iPhone SE–iPhone 15 Pro Max) |
| **Tablet**  | `701px – 960px` | iPad, tablet Android landscape       |
| **Desktop** | `> 960px`       | Laptop, monitor                      |

> Breakpoint **900px** digunakan khusus untuk utilitas `hide-sm` / `only-sm` (navigasi, dropdown filter).

---

## Token Ukuran (Design Tokens)

Semua ukuran didefinisikan di `src/styles/tokens.css`.
**Jangan pernah hardcode pixel di komponen** — selalu gunakan token atau `clamp()`.

| Token       | Nilai rem                      | approx px (16px base) | Penggunaan                          |
| ----------- | ------------------------------ | --------------------- | ----------------------------------- |
| `--d0`      | `clamp(3.4rem, 12.5vw, 11rem)` | 54–176px              | Hero display (hanya halaman utama)  |
| `--d1`      | `clamp(2.8rem, 7.4vw, 6.5rem)` | 45–104px              | Page hero title (updates, projects) |
| `--d2`      | `clamp(2.1rem, 4.6vw, 3.9rem)` | 34–62px               | Section hero                        |
| `--d3`      | `clamp(1.6rem, 2.9vw, 2.5rem)` | 26–40px               | Sub-hero, kartu besar               |
| `--h4`      | `1.3125rem`                    | 21px                  | H4, nama proyek, judul kartu kecil  |
| `--h5`      | `1.0625rem`                    | 17px                  | H5, sub-label                       |
| `--body`    | `1.0625rem`                    | 17px                  | Body teks utama                     |
| `--body-lg` | `1.1875rem`                    | 19px                  | Lead paragraph, deskripsi panjang   |
| `--sm`      | `0.9375rem`                    | 15px                  | Teks sekunder, meta, caption        |
| `--xs`      | `0.8125rem`                    | 13px                  | Label kecil, tag                    |
| `--xxs`     | `0.6875rem`                    | 11px                  | Badge, mono label uppercase         |

---

## Tabel Ukuran per Breakpoint (WAJIB IKUTI)

### Heading / Display

| Elemen                | Mobile (<=700px)                      | Tablet (701–960px)                  | Desktop (>960px)     |
| --------------------- | ------------------------------------- | ----------------------------------- | -------------------- |
| **Page hero H1**      | `clamp(2rem, 9vw, 2.8rem)` ~32–45px   | `clamp(2.8rem, 5vw, 4rem)` ~45–64px | `var(--d1)` 65–104px |
| **Section H2**        | `clamp(1.6rem, 6vw, 2.2rem)` ~26–35px | `clamp(2rem, 4vw, 2.8rem)` ~32–45px | `var(--d2)` 34–62px  |
| **Card title H3**     | `var(--h4)` 21px                      | `var(--d3)` 26px                    | `var(--d3)` 26–40px  |
| **Detail article H2** | `1.4rem` 22px                         | `1.6rem` 26px                       | `var(--d3)` 26–40px  |
| **Detail article H3** | `1.2rem` 19px                         | `1.3rem` 21px                       | `var(--h4)` 21px     |

### Body & UI Text

| Elemen                     | Mobile (<=700px)   | Tablet (701–960px)    | Desktop (>960px)      |
| -------------------------- | ------------------ | --------------------- | --------------------- |
| **Body teks**              | `var(--body)` 17px | `var(--body)` 17px    | `var(--body)` 17px    |
| **Lead / deskripsi utama** | `var(--body)` 17px | `var(--body-lg)` 19px | `var(--body-lg)` 19px |
| **Teks sekunder / meta**   | `var(--sm)` 15px   | `var(--sm)` 15px      | `var(--sm)` 15px      |
| **Label monospace**        | `var(--xs)` 13px   | `var(--xxs)` 11px     | `var(--xxs)` 11px     |
| **Tag / badge**            | `var(--xxs)` 11px  | `var(--xxs)` 11px     | `var(--xxs)` 11px     |
| **Navigation link**        | `var(--sm)` 15px   | `var(--sm)` 15px      | `var(--xs)` 13px      |

---

## Aturan Praktis (Rules of Thumb)

### DO

- Selalu pakai `clamp()` untuk heading (`--d0` s/d `--d3`) karena sudah responsif.
- Gunakan `var(--body)` untuk body mobile — jangan lebih besar dari 17px di mobile.
- Lead paragraph di mobile = `var(--body)` (17px), di desktop = `var(--body-lg)` (19px).
- Line-height untuk display: `--lh-display: 0.94`. Body: `--lh-body: 1.62`.
- Untuk judul kartu yang bisa overflow: tambahkan `-webkit-line-clamp`.

### DON'T

- Jangan hardcode ukuran pixel seperti `font-size: 32px` di komponen.
- Jangan pakai `--d0` atau `--d1` di dalam kartu atau komponen kecil.
- Jangan set `font-size` body lebih besar dari `var(--body-lg)` di mobile.
- Jangan mix `rem` dengan `em` dalam satu rule kecuali ada alasan struktural.

---

## Penerapan per Halaman

### Beranda (`/`)

| Elemen          | Token / clamp                            |
| --------------- | ---------------------------------------- |
| Hero display    | `--d0` via `.hero__display`              |
| Hero lead       | `--body-lg` desktop / `0.9rem` mobile    |
| Label atas hero | `--xxs`, `white-space: nowrap` di mobile |
| Section H2      | `--d2`                                   |
| About block H3  | `--h5`                                   |

### Updates (`/updates`) dan Projects (`/projects`)

| Elemen              | Token / clamp                                                                           |
| ------------------- | --------------------------------------------------------------------------------------- |
| Page H1             | `--d1`                                                                                  |
| Lead deskripsi      | `--body-lg` desktop / `--body` mobile                                                   |
| Magazine card title | `clamp(2rem, 4.5vw, 3.6rem)` desktop / `clamp(1.4rem, 6vw, 1.8rem)` mobile, max 2 baris |
| Post card title     | `--h4`                                                                                  |
| Filter chip         | `--xxs`                                                                                 |

### Detail Post (`/updates/[slug]`) dan Detail Project (`/projects/[slug]`)

| Elemen              | Token / clamp                |
| ------------------- | ---------------------------- |
| Article hero title  | `clamp(1.8rem, 4vw, 3.2rem)` |
| Article body text   | `--body-lg`                  |
| Article H2          | `clamp(1.4rem, 3vw, 2rem)`   |
| Article H3          | `--h4`                       |
| Meta (tanggal, tag) | `--sm`                       |

---

## Cara Menambahkan Mobile Override

Pola standar untuk override di mobile:

```css
/* Default (desktop) */
.komponen__judul {
  font-size: var(--d3);
}

/* Mobile override */
@media (max-width: 700px) {
  .komponen__judul {
    font-size: clamp(1.4rem, 6vw, 1.8rem);
  }
}
```

Atau gunakan `clamp()` langsung jika ukuran mobile dan desktop masih dalam satu kurva:

```css
.komponen__judul {
  /* min=mobile, preferred=fluid, max=desktop */
  font-size: clamp(1.4rem, 5vw, 2.5rem);
}
```

---

## Checklist Sebelum Push

- [ ] Semua `font-size` heading pakai token atau `clamp()`?
- [ ] Body text di mobile tidak melebihi `var(--body)` (17px)?
- [ ] Lead text di mobile menggunakan `var(--body)`, bukan `var(--body-lg)`?
- [ ] Heading hero di detail page menggunakan `clamp(1.8rem, 4vw, 3.2rem)` atau lebih kecil?
- [ ] Judul kartu dengan risiko overflow sudah ada `-webkit-line-clamp`?
- [ ] Tidak ada hardcoded pixel pada `font-size`?
