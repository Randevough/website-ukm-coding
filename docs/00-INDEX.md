# Dokumentasi Resmi — UKM Coding Cyber University

Dokumentasi ini adalah pusat referensi teknis, arsitektur sistem, panduan konten, dan standar operasional untuk situs web resmi **UKM Coding Cyber University** (`ukmcoding.site`).

---

## 📚 Daftar Dokumen

| No | Dokumen | Deskripsi | Target Pembaca |
| :--- | :--- | :--- | :--- |
| 1 | [01-PRD.md](01-PRD.md) | **Product Requirements Document** — Visi, audiens target, cakupan fitur, dan standar kualitas produk. | Tim Pengurus, Lead Developer |
| 2 | [02-TECH.md](02-TECH.md) | **Technical Specification** — Stack teknologi, struktur direktori, data fetching, dan konvensi kode. | Developer, Maintainer |
| 3 | [03-ARCHITECTURE.md](03-ARCHITECTURE.md) | **System Architecture** — Alur data headless, pipeline CI/CD, hosting Cloudflare Pages, dan keamanan. | Architect, DevOps, Maintainer |
| 4 | [04-CONTENT-MODEL.md](04-CONTENT-MODEL.md) | **Content Model & Schemas** — Kontrak skema Sanity Studio, definisi field, tipe TypeScript, dan validasi data. | Developer, Content Admin |
| 5 | [05-DESIGN-SYSTEM.md](05-DESIGN-SYSTEM.md) | **Design Tokens & Typography** — Panduan visual "Spec Sheet", token CSS (warna, spasi, tipografi), dan motion. | UI/UX Designer, Frontend |
| 6 | [06-CMS-MANUAL.md](06-CMS-MANUAL.md) | **Panduan Pengelolaan Konten (CMS)** — SOP dan panduan praktis input project, artikel, dan partner di Sanity Studio. | Editor, Tim Media & Publikasi |
| 7 | [07-SEO-PERFORMANCE-QA.md](07-SEO-PERFORMANCE-QA.md) | **SEO, Performance & QA** — Standar audit Lighthouse, metadata OpenGraph, aksesibilitas (WCAG 2.2 AA), dan testing. | QA, Developer |
| 8 | [08-DEPLOYMENT-OPS.md](08-DEPLOYMENT-OPS.md) | **Deployment & Operations** — Panduan rilis, environment variables, GitHub Actions, DNS, dan serah terima akun. | DevOps, Lead Developer |
| 9 | [09-DECISIONS-ADR.md](09-DECISIONS-ADR.md) | **Architecture Decision Records (ADR)** — Catatan keputusan teknis utama dan mitigasi risiko arsitektur. | Developer, Pengurus |

---

## 🚀 Ringkasan Teknis Singkat

- **Arsitektur**: Jamstack / Static Site Generation (SSG) dengan Astro 5 + TypeScript.
- **Headless CMS**: Sanity Studio v3 tersemat pada rute `/admin`.
- **Styling**: Vanilla CSS murni dengan sistem Design Token (`tokens.css`, `global.css`, `components.css`).
- **Infrastruktur & Hosting**: GitHub Actions CI/CD ke Cloudflare Pages CDN.
- **Biaya Operasional**: Target Rp0/bulan (memanfaatkan free-tier Cloudflare Pages, GitHub, dan Sanity Free).
