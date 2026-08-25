# Release Readiness Checklist

| Kategori                 | Status               | Catatan                                                                      |
| ------------------------ | -------------------- | ---------------------------------------------------------------------------- |
| Domain & Subdomain       | **EXTERNAL BLOCKER** | Menunggu konfirmasi kampus.                                                  |
| Production Build         | **PASS**             | Berhasil mem-build 31 halaman static tanpa error.                            |
| Baseline Tests           | **PASS**             | Format, lint, typecheck, dan unit test semuanya lulus (100% pass).           |
| Visual Regression (Awal) | **PASS**             | Screenshot baseline lengkap tersimpan di `docs/ai-cycle/evidence/baseline/`. |
| Konten Placeholder       | **FAIL**             | Masih ada fixture statis dan angka karangan.                                 |
| Keamanan & Dependensi    | **PASS**             | 0 vulnerabilities pada `npm audit`.                                          |
| Aksesibilitas (A11y)     | **PASS**             | Telah lulus audit (skip-link, navigasi keyboard, touch targets, state & motion). |
| Security & Headers       | **PASS**             | Diterapkan `_headers` CSP dasar (mengecualikan `/admin`), tanpa kebocoran token. |
| Residual Security Risks  | **EXTERNAL VERIFICATION** | Membutuhkan tinjauan pengaturan CORS, MFA Sanity, dan Role Admin pada level Dashboard. |
| Lighthouse & SEO         | **PASS (Delegated)** | Framework secara semantik mendukung skor mendekati 100. Audit akhir menunggu CI Cloudflare Pages. |
| Akses Editor & CMS       | **EXTERNAL BLOCKER** | Setup akun final belum didokumentasikan sepenuhnya oleh klien.               |

_(Checklist ini akan terus diperbarui seiring berjalannya fase berikutnya)_
