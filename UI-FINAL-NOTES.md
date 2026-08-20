# Homepage UI Final — UKM Coding Cyber University

## Direction locked

- Homepage-first finalization
- Warm paper, clean editorial, light-only
- Blue + orange accents
- Hero: “Belajar. Membangun. Berbagi.”
- Profile-first composition
- Three featured projects with quick-view modal
- Updates: featured stories plus compact editorial list
- Gallery: editorial mosaic using prototype geometry placeholders
- Partnership and footer: high-contrast dark block
- Desktop motion retained; mobile presentation simplified

## Homepage sections

1. Hero
2. Tentang UKM / Manifesto
3. Featured Projects
4. Latest Updates
5. Gallery
6. Partnership
7. Partner row and footer

## Important

- Geometry visuals are intentional placeholders. Replace project visuals with product screenshots and gallery visuals with real documentation later.
- Current content and numbers remain prototype content and must be verified before public deployment.
- Homepage UI is the finalized scope in this iteration. Other public pages remain inherited from the original prototype for navigation continuity.

## Run locally

```bash
cd ukm-coding-ui-final
python3 -m http.server 5173
```

Open `http://localhost:5173`.

---

## Revisi v3 — Beranda (respons verdict)

File baru: `assets/css/home-v2.css` (dimuat paling akhir), `assets/js/home-v2.js` (dimuat setelah `App.boot()`).
Semua perubahan beranda berada di dua file ini + patch kecil pada `tokens.css`, `data.js`, `index.html`.

1. Cursor light di hero dihapus (`[data-cursor]` dicabut dari markup, `.cursor { display: none }`).
2. Tekstur hero: grain halus (SVG feTurbulence, multiply) + wash biru/oranye radial.
3. Padding atas hero dipangkas + fix descender `.lineMask`; hero utuh dalam 1440x900.
4. Panel "Ringkas" (institusi / bentuk / fokus) dihapus total; label hero diganti `Jakarta - Indonesia`.
5. Biru baru Klein blue `#2340d8` (`--blue`), hover `#1a32a6`; tombol utama solid biru, bukan hitam.
6. Marquee hero + marquee partner dihapus.
7. Tentang UKM dirombak: sticky heading kiri + alur teks kanan (3 blok bernomor + kutipan manifesto).
8. Quick-view project: modal diganti kartu mengembang di tempat (melebar penuh, spec + stack + CTA).
9. Updates: baris editorial (idx / kategori / judul / penulis / tanggal / arrow) dengan thumbnail saat hover.
10. Galeri: mosaic asimetris 6 frame (`grid-template-areas`), override aturan lama yang menyembunyikan frame ke-6.
11. Kerja sama: latar krem hangat, teks gelap, layout terpusat, satu CTA besar.
12. Media partner: 5 slot placeholder (`partners.slice(0, 5)`).

Catatan: font dimuat dari Google Fonts CDN, jadi pada preview offline tampil fallback sans/serif.
Ruang lingkup revisi ini: beranda saja.

## Revisi v3.1 — Beranda (putaran kedua)

1. Transisi hero -> section berikutnya: lapisan latar hero sekarang memakai `mask-image`
   gradasi vertikal, jadi memudar habis sebelum batas section. Tidak ada lagi warna terpotong.
2. Wash biru/oranye di hero diganti treatment monokrom: kisi blueprint tipis (garis ink 0.055 alpha),
   spotlight putih kiri-atas, bayangan halus kanan-bawah, plus grain. Warna hanya hidup di tipografi dan tombol.
3. Quick-view project kembali ke modal (kartu tidak melebar lagi). Blok `.pcard__detail` dan state
   `.is-open` dibuang dari `home-v2.js`.
4. Bug modal "jatuh ke bawah" akhirnya ketemu akarnya: `<main id="page">` punya animasi transform,
   sehingga `position: fixed` di dalamnya terikat ke `<main>`, bukan viewport (panel terukur top 2791px).
   Markup `#projectModal` dipindah keluar `</main>` menjadi anak langsung `<body>` + penegasan
   `position: fixed` dan center. Hasil ukur sekarang: top 153px, bottom 747px pada viewport 900px — utuh.
5. Section kerja sama tidak lagi krem. Kembali ke `--paper` seperti section lain, hairline atas-bawah,
   kisi tipis netral yang memudar di tepi, CTA solid Klein blue.
6. Serif italic dibatasi hanya untuk hero. Penekanan di Tentang UKM, kutipan manifesto, dan judul
   kerja sama kini sans tebal berwarna biru.

### Perbaikan v3.2 — footer nyangkut di depan

Saat markup `#projectModal` dipindah keluar `</main>`, satu `</div>` penutup ikut hilang,
sehingga `<footer class="site-footer">` menjadi anak dari `#projectModal` (`position: fixed; inset: 0`).
Akibatnya footer tergambar di atas seluruh halaman dan tidak ikut bergulir.
Penutup `</div>` sudah dikembalikan. Hasil verifikasi: `footer.parentElement === BODY`,
`position: relative`, top 6079px (mengikuti alur normal), dan modal tetap center (153–747px pada viewport 900px).

---

## Revisi v4 — Beranda (rombak hero + tekstur global)

Keputusan arah (dikunci lewat survey): kartu komposisi abstrak di kanan hero,
headline "Belajar bersama. / Membangun yang berguna.", tekstur dot field/halftone,
hero full viewport.

1. HERO ROMBAK TOTAL (`.hero--v2`): layout editorial asimetris 2 kolom —
   kiri: label, headline 3 baris (hitam / thin abu / serif italic biru), lead, 2 CTA;
   kanan: kartu komposisi abstrak (dot field halftone, aksen dot biru, dua cincin,
   label teknis "FIG.01 — RUANG BELAJAR", kata "kode → karya", strip meta bawah).
   Dasar hero: strip meta (Jakarta / Komunitas teknologi kampus / Belajar·Membangun·Berbagi)
   sebagai jembatan visual ke section berikutnya. `min-height: calc(100svh - header)`.
2. TEKSTUR GLOBAL: grid blueprint dihapus dari hero (`.hero__wash`/`.hero__grid` dicabut
   dari markup) dan dari artwork kartu (`.art__mesh` kotak → dot field 17px).
   Kerja sama: pola apa pun dihapus, paper bersih. Grain kertas tetap jadi satu-satunya
   tekstur global.
3. MANIFESTO dihapus sepenuhnya dari section Tentang.
4. TENTANG: padding baris diperlebar (`clamp(22px,2.8vw,32px)`), hover tidak lagi
   mengubah padding (penyebab wrapping/layout shift) — hanya background +
   `box-shadow: inset 2px 0 0 var(--blue)`.
5. KERJA SAMA: dari center-aligned menjadi editorial kiri memakai pola `.shead`
   yang sama dengan section lain. Kolom utama: headline + CTA biru + tautan alternatif.
   Kolom samping: deskripsi + 3 baris jenis kerja sama bernomor (01/02/03)
   beraksen hairline, bukan chips terpusat.
6. FOOTER: hover `.btn--onink` tidak lagi fill putih menyala — border biru +
   teks biru muda (#aebaff) + wash biru tipis.
7. Aksen italic heading Tentang diselaraskan ke serif italic biru (mengikuti hero);
   penekanan inline & judul kerja sama tetap sans tebal biru.
8. Perbaikan bug: (a) `width:100%` pada `.hero--v2 .hero__inner` menimpa lebar
   `.container` sehingga konten hero keluar gutter — dihapus; (b) media query
   responsif kalah cascade dari blok polish `.hero__split` sehingga di mobile kartu
   menimpa headline — override responsif dipindah ke blok final paling akhir file.

QA: desktop 1440×900 (hero pas satu viewport), transisi hero→tentang, hover baris
Tentang (tanpa wrap berubah), kerja sama, footer, mobile 390×844 (hero 1 kolom,
kartu di bawah CTA). Console bersih, tanpa exception.
