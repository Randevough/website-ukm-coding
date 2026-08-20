# AI Porting Prompts

Gunakan prompt secara berurutan. Berikan satu file prompt kepada AI coding agent dalam satu sesi/tahap. Agent wajib membaca `AGENTS.md` dan seluruh `docs/` terlebih dahulu.

1. `00-audit-baseline.md`
2. `01-scaffold-astro.md`
3. `02-port-public-ui.md`
4. `03-integrate-sanity.md`
5. `04-production-features-seo.md`
6. `05-ci-cloudflare.md`
7. `06-content-cutover-handover.md`

Jangan menjalankan fase berikutnya sebelum acceptance checks fase aktif lolos. Prompt sengaja tidak berisi nomor versi dependency yang cepat usang; agent harus memilih versi stabil dan memverifikasi dokumentasi resmi saat eksekusi.
