# Dokumentasi Production — UKM Coding Cyber University

Dokumentasi ini menjadi sumber keputusan untuk mem-porting prototype HTML/CSS/JS ke website production.

## Dokumen

1. [PRD](01-PRD.md) — tujuan, pengguna, ruang lingkup, dan acceptance criteria.
2. [Technical Specification](02-TECH.md) — stack, struktur project, aturan implementasi.
3. [Architecture](03-ARCHITECTURE.md) — alur data, build, keamanan, dan environment.
4. [Content Model](04-CONTENT-MODEL.md) — schema Sanity dan aturan validasi.
5. [Migration Plan](05-MIGRATION-PLAN.md) — pemetaan prototype dan tahapan porting.
6. [Editorial Operations](06-EDITORIAL-OPERATIONS.md) — workflow editor nonteknis.
7. [SEO, Performance & QA](07-SEO-PERFORMANCE-QA.md) — quality gates dan checklist rilis.
8. [Deployment & Handover](08-DEPLOYMENT-HANDOVER.md) — preview, production, akun, dan serah terima.
9. [Decisions & Risks](09-DECISIONS-AND-RISKS.md) — keputusan terkunci dan risiko.
10. [AI Porting Prompts](../ai-prompts/README.md) — prompt eksekusi per fase.

## Urutan penggunaan

- Manusia membaca PRD, Tech, Architecture, dan Decisions terlebih dahulu.
- AI coding agent wajib membaca `AGENTS.md`, seluruh folder `docs/`, lalu prompt fase yang akan dijalankan.
- Satu fase harus selesai dan lolos pemeriksaan sebelum fase berikutnya.
- Jika implementasi membutuhkan perubahan desain atau ruang lingkup, berhenti dan minta persetujuan.

## Status

- Produk: MVP production portal UKM.
- Bahasa: Indonesia.
- Desain: port semirip mungkin; tidak boleh redesign.
- Stack: Astro + TypeScript + Sanity + Cloudflare Pages + GitHub.
- Biaya: target Rp0/bulan di luar domain/subdomain kampus.
