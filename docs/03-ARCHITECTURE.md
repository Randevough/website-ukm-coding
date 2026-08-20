# Architecture

## 1. Gambaran sistem

```text
Editor nonteknis
    │ login/edit/publish
    ▼
Sanity Studio hosted
    │ menyimpan dokumen dan aset
    ▼
Sanity Content Lake + Asset CDN
    │ webhook/build request
    ▼
GitHub / Cloudflare Pages build
    │ Astro mengambil konten published
    ▼
Static HTML/CSS/JS
    │
    ▼
Cloudflare CDN → Pengunjung
```

## 2. Tanggung jawab komponen

### Astro

- Rendering halaman static.
- Routing `/`, `/kegiatan`, `/kegiatan/[slug]`, `/projects`, dan `/projects/[slug]`.
- SEO, sitemap, structured data, dan UI interaktif ringan.

### Sanity

- Database konten publik.
- Penyimpanan gambar.
- Autentikasi editor.
- Draft/publish dan revision history sesuai kemampuan plan.
- Panel editor hosted.

### Cloudflare Pages

- Build dan hosting static.
- Preview deployment per branch/PR.
- Production dari branch utama.
- SSL/CDN/custom subdomain kampus.

### GitHub

- Source of truth kode.
- Pull request dan review.
- CI dan riwayat perubahan.

## 3. Environment

### Preview

- Dibuat untuk pull request/branch.
- Boleh memakai dataset production read-only atau dataset terpisah bila kuota dan workflow mendukung.
- Harus diberi `noindex` bila dapat diakses publik.
- Secret preview hanya berada di environment Cloudflare/GitHub.

### Production

- Branch utama, disarankan `main`.
- Domain berupa subdomain kampus.
- Hanya konten published.
- Tidak pernah memuat token preview/write ke browser.

## 4. Strategi build konten

MVP menggunakan static generation:

1. Editor publish di Sanity.
2. Webhook memicu build Cloudflare.
3. Astro mengambil konten published.
4. Route detail dihasilkan dari slug.
5. Cloudflare menyajikan hasil static.

Konsekuensi yang diterima:

- Perubahan konten tidak benar-benar instan; menunggu build.
- Website tetap cepat dan aman tanpa server origin yang selalu aktif.
- Jika webhook gagal, editor/maintainer perlu trigger rebuild manual.

## 5. Keamanan

- Editor login melalui Sanity; jangan buat autentikasi custom.
- Aktifkan MFA pada akun GitHub, Cloudflare, Sanity, dan email pemilik.
- Jangan memakai akun bersama bila platform mendukung akun individual.
- Gunakan least privilege.
- Jangan menyimpan token pada repository atau kode client.
- Rotasi token saat serah terima.
- Tetapkan minimal dua pemilik organisasi agar akun tidak terkunci pada satu orang.
- Validasi URL eksternal dan file upload melalui schema.
- Konten rich text harus dirender melalui renderer aman; jangan memasukkan HTML mentah tanpa sanitasi.

## 6. Reliability dan fallback

- Jika gambar kosong, render visual geometris prototype.
- Jika optional field kosong, hilangkan elemen tanpa meninggalkan ruang rusak.
- Jika Sanity tidak tersedia saat runtime, halaman static terakhir tetap dapat diakses.
- Jika Sanity gagal saat build, build harus gagal tanpa mengganti production sebelumnya.
- Sediakan prosedur rollback deployment dan export konten.

## 7. Skalabilitas

Arsitektur ini cukup untuk trafik <1.000 kunjungan/bulan dan dapat melayani trafik jauh lebih besar selama berbasis static. Dashboard internal masa depan secara eksplisit berada di luar proyek ini dan harus dievaluasi sebagai sistem terpisah, bukan dimasukkan diam-diam ke CMS portal publik.

## 8. Keputusan lokasi CMS

MVP memakai **Sanity-hosted Studio** karena:

- Tidak bergantung pada akses DNS kampus.
- Deployment CMS terpisah dari website publik.
- Lebih mudah bagi 1–2 editor.
- Mengurangi kompleksitas route `/admin` dan bundle website.

Subdomain Studio dapat dipertimbangkan setelah kepemilikan DNS dan operasional stabil.
