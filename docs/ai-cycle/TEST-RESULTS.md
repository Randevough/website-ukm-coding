# Test Results

## Environment

- OS: Windows (x64)
- Current Branch: `main`
- Commit Hash: `83cfd5b5e4204433e2eeadd2f2aee651b9fe20e6`
- Tanggal Eksekusi: 25 Agustus 2026

## Ringkasan Eksekusi Baseline

| No  | Check / Command        | Hasil       | Keterangan / Kegagalan                                                                                           |
| :-- | :--------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------- |
| 1   | `npm ci` / `install`   | **PASS**    | Dependensi terinstal dengan benar tanpa error (setelah pembersihan folder node_modules sebelumnya).              |
| 2   | `npm run format:check` | **PASS**    | Seluruh file kode dan markdown (termasuk docs/ai-cycle) telah diformat sesuai standar.                           |
| 3   | `npm run lint`         | **PASS**    | `eslint` selesai tanpa error (0 errors, 4 minor unused var warnings).                                            |
| 4   | `npm run build`        | **PASS**    | `astro check && astro build` berhasil merender 31 halaman static tanpa error tipe.                               |
| 5   | `npm run test`         | **PASS**    | Vitest melaporkan 80 tests passing (100% success rate).                                                          |
| 6   | `npm audit`            | **PASS**    | 0 vulnerabilities (kerentanan sebelumnya telah ditangani menggunakan `overrides` di `package.json`).             |
| 7   | Internal link check    | **UNKNOWN** | Tidak dapat dieksekusi secara lokal karena absennya script di `package.json`, dijalankan pada CI (`deploy.yml`). |
| 8   | Dev Server (Lokal)     | **PASS**    | Berhasil merespons dengan HTTP 200 pada halaman yang diminta.                                                    |
| 9   | Lighthouse             | **UNKNOWN** | Dijalankan pada CI (Cloudflare Pages).                                                                           |
| 10  | Visual Evidence        | **PASS**    | (Fase 1 & Fase 2) Screenshot berhasil diambil untuk desktop & mobile dan tersimpan rapi di direktori evidence.   |
| 11  | Accessibility (Fase 3) | **PASS**    | Evaluasi perbaikan A11y telah dilakukan. Skip-link, inert dialog/drawer, aria-current, touch target terverifikasi. |
| 12  | Security (Fase 4)      | **PASS**    | Tidak ada kebocoran draft, `set:html` dibersihkan, external links memakai `noopener noreferrer`. Security Headers / CSP ada. |
| 13  | Reliability (Fase 4)   | **PASS**    | Build akan _fail_ jika fetch Sanity gagal di mode PROD, mencegah pengambilalihan fakta oleh fixture.             |
| 14  | SEO & Metadata (Fase 5)| **PASS**    | Canonical URL absolut, open graph, noindex preview 404, dan Structured Data (JSON-LD) valid terpasang.             |
| 15  | Performance (Fase 5)   | **PASS**    | LCP images di set ke eager load & fetchpriority high. Gambar Sanity dimuat menggunakan format otomatis (WebP/AVIF). Dimensi diset explicit (mengurangi CLS).   |

_(Sesuai aturan Fase 0, kegagalan ini tidak diperbaiki saat ini dan dicatat sebagai blocker untuk diselesaikan pada fase implementasi teknis)_
