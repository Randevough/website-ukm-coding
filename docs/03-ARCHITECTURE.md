# System Architecture & Infrastructure
**UKM Coding Cyber University**

Dokumen ini menjelaskan arsitektur sistem, alur data (*data pipeline*), topologi infrastruktur cloud, dan model keamanan untuk website resmi UKM Coding.

---

## 1. Topologi & Diagram Arsitektur

```text
┌────────────────────────┐
│     Tim Editor /       │
│      Pengurus          │
└───────────┬────────────┘
            │ 1. Kelola Konten & Media via `/admin`
            ▼
┌────────────────────────┐       2. Simpan Data & Aset        ┌────────────────────────┐
│  Sanity Studio v3      ├───────────────────────────────────►│ Sanity Content Lake    │
│  (Embedded at /admin)  │                                    │ & Asset CDN (Global)   │
└────────────────────────┘                                    └───────────┬────────────┘
                                                                          │
                                                                          │ 3. GROQ Query via Webhook /
                                                                          │    GitHub Actions Build
                                                                          ▼
┌────────────────────────┐       4. Compile Static HTML/CSS   ┌────────────────────────┐
│ GitHub Repository      ├───────────────────────────────────►│ Astro 5 Build Engine   │
│ (Source of Truth Code) │                                    │ (Static Generation)    │
└────────────────────────┘                                    └───────────┬────────────┘
                                                                          │
                                                                          │ 5. Deploy Static Artifacts
                                                                          ▼
                                                              ┌────────────────────────┐
                                                              │ Cloudflare Pages Edge  │
                                                              │ (Global CDN + SSL)     │
                                                              └───────────┬────────────┘
                                                                          │
                                                                          │ 6. Fast Edge Response (<100ms)
                                                                          ▼
                                                              ┌────────────────────────┐
                                                              │      Pengunjung &      │
                                                              │   Mahasiswa Kampus     │
                                                              └────────────────────────┘
```

---

## 2. Peran & Tanggung Jawab Komponen

### A. Astro 5 Engine (Frontend & Static Generation)
- Mengompilasi seluruh template menjadi berkas HTML, CSS, dan JS statis murni tanpa ketergantungan server Node.js aktif di runtime publik.
- Mengelola rute statis: `/`, `/projects`, `/projects/[slug]`, `/updates`, `/updates/[slug]`, dan `/404`.
- Mengimplementasikan `ClientRouter` untuk navigasi antar-halaman yang mulus (*instant transition*) tanpa memuat ulang aset global.
- Menghasilkan metadata SEO dinamis, OpenGraph, JSON-LD Structured Data, dan sitemap XML otomatis.

### B. Sanity Studio & Content Lake (Headless CMS)
- **Content Lake**: Database dokumen terkelola berbasis JSON dan Content Delivery Network (CDN) global untuk aset gambar.
- **Embedded Studio**: Panel editor Sanity Studio v3 tertanam di rute `/admin`, memungkinkan pengurus login langsung dari situs tanpa perlu membuka dashboard pihak ketiga yang terpisah.
- **Image Pipeline**: Pengoptimalan gambar otomatis melalui `@sanity/image-url` dengan format modern WebP/AVIF dan hotspot visual.

### C. Cloudflare Pages (Edge Hosting & CDN)
- Menghosting berkas statis di ratusan data center tepi (*edge*) di seluruh dunia.
- Menyediakan sertifikat SSL/TLS otomatis dan perlindungan DDoS bawaan.
- Memberikan waktu respons awal (TTFB) yang sangat cepat (< 50ms di Indonesia).

### D. GitHub & GitHub Actions (CI/CD Pipeline)
- Repositori utama (*source of truth*) untuk seluruh kode sumber dan riwayat komit.
- Pipeline otomatisasi di `.github/workflows/deploy.yml` yang menjalankan pemeriksaan kualitas kode (*type-check, formatting, linting, testing, Lighthouse CI*) sebelum proses rilis ke Cloudflare Pages.

---

## 3. Alur Pembaruan Konten (Publishing Workflow)

1. **Penyuntingan**: Editor membuat atau mengedit artikel/project di `/admin`.
2. **Drafting**: Setiap perubahan otomatis tersimpan sebagai *draft* aman yang tidak terlihat oleh publik.
3. **Penerbitan**: Saat editor menekan tombol **Publish**, dokumen masuk ke status *published* di Sanity Content Lake.
4. **Build & Deploy**: Webhook Sanity memicu proses build di GitHub Actions / Cloudflare Pages untuk memperbarui halaman statis dalam kurun waktu 1–2 menit.

---

## 4. Keamanan & Proteksi Data

- **Zero Client Privilege**: Frontend website hanya memiliki akses *read-only* ke dataset publik Sanity. Token dengan hak akses *write* tidak pernah disimpan di kode frontend.
- **Autentikasi Terisolasi**: Autentikasi editor dikelola sepenuhnya oleh infrastruktur OAuth Sanity yang aman.
- **Sanitasi Rich Text**: Konten teks bebas dari editor dirender secara aman menggunakan komponen `@portabletext/react` / `astro-portabletext`, mencegah injeksi Cross-Site Scripting (XSS).
- **Enkripsi Transit**: Seluruh komunikasi data dilindungi protokol HTTPS/TLS secara mutlak.
