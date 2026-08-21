# Deployment & Handover Runbook

## 1. Akun dan kepemilikan

Implementasi awal dipegang pemilik proyek saat ini, lalu diserahterimakan. Target akhir:

- GitHub repository berada dalam organisasi/akun resmi yang dapat diwariskan.
- Cloudflare memiliki minimal dua admin/pemilik yang sah.
- Sanity project memiliki minimal dua admin yang sah.
- Email recovery bukan satu-satunya email pribadi yang akan kehilangan akses.
- MFA aktif.

Jangan mengirim password atau token melalui dokumentasi ini.

## 2. Branch dan deployment

- `main` → production.
- Pull request/branch → preview deployment.
- Direct push ke `main` dibatasi. Wajib menggunakan Pull Request (Branch Protection Rule).
- Merge hanya setelah CI/CD lolos (Status checks: `build-and-test`, `lighthouse`, `link-check`).
- Preview diberi `noindex` secara otomatis.

## 3. Konfigurasi Cloudflare Pages

Catat saat implementasi:

- **Build command aktual:** `npm run build`
- **Output directory aktual:** `dist`
- **Node version:** `20.x`
- **Environment variables preview dan production:**
  - `PUBLIC_SANITY_PROJECT_ID` (publik, misal: `2y0qj3p4`)
  - `PUBLIC_SANITY_DATASET` (publik, misal: `production`)
  - `PUBLIC_NOINDEX` (khusus preview/staging: set `true` agar tidak diindeks mesin pencari)
- **Production branch:** `main`
- **Webhook/deploy hook dari Sanity:** Konfigurasi webhook di Sanity Dashboard untuk memicu GitHub Action.
  - Payload URL: `https://api.github.com/repos/<OWNER>/<REPO>/dispatches`
  - Secret/Header: Gunakan GitHub Personal Access Token (PAT) dengan akses `repo`.
  - Body: `{"event_type": "sanity-publish"}`
- **Domain/subdomain kampus:** (Menunggu setup tim kampus)

Jangan menebak nilai; ikuti dokumentasi resmi versi tooling yang digunakan.

## 4. DNS subdomain kampus

Sebelum cutover, minta pihak kampus:

- Nama subdomain yang disetujui.
- Jenis record yang dibutuhkan oleh Cloudflare Pages.
- Kontak teknis DNS.
- Jadwal perubahan.
- Kebijakan SSL dan branding kampus.

Setelah perubahan:

- Verifikasi DNS resolution.
- Verifikasi HTTPS dan certificate.
- Verifikasi redirect HTTP→HTTPS.
- Verifikasi canonical dan sitemap memakai domain final.

## 5. Publish dan rebuild

- Sanity publish memicu GitHub Actions via `repository_dispatch` webhook.
- Deployment dikelola sepenuhnya melalui GitHub Actions (`.github/workflows/deploy.yml`), yang mencakup build, testing, check link, dan Lighthouse sebelum upload ke Cloudflare.
- Jika hook gagal, maintainer dapat menjalankan retry deployment dari menu "Actions" di GitHub.
- Production sebelumnya tidak akan tergantikan bila build atau test gagal (Aman secara arsitektur).
- Dokumentasikan estimasi waktu publish→live setelah diuji.

## 6. Rollback

1. Identifikasi deployment terakhir yang sehat di tab Actions GitHub atau dashboard Cloudflare Pages.
2. Rollback deployment tersebut:
   - **Lewat GitHub**: Jalankan _revert commit_ terhadap perubahan bermasalah, lalu gabungkan PR revert tersebut ke `main`.
   - **Lewat Cloudflare Pages** (darurat konten statis): Di dashboard Cloudflare Pages, buka deployment lama yang sehat dan pilih "Rollback" (menjadikannya alias untuk domain utama).
3. Jika masalah berasal dari konten Sanity, unpublish/koreksi konten lalu simpan ulang (akan memicu rebuild).
4. Catat penyebab, dampak, dan perbaikan.

## 7. Backup/export

- Lakukan export dataset Sanity sebelum perubahan schema besar dan pada handover.
- Simpan source code dan lockfile di GitHub.
- Simpan dokumentasi asset ownership/izin secara aman.
- Jangan mengandalkan salinan lokal satu orang sebagai backup utama.

## 8. Paket handover wajib

- Daftar akun dan pemilik, tanpa password.
- Diagram arsitektur.
- Daftar environment variables beserta lokasi penyimpanannya, tanpa nilai secret di dokumen publik.
- Panduan editor.
- Panduan deploy, retry, rollback, dan export.
- Daftar domain/subdomain dan kontak DNS.
- Daftar dependency/service free tier serta tanggal terakhir diverifikasi.
- Dokumentasi lisensi (`LICENSE`: MIT untuk kode, All Rights Reserved untuk merek/media).
- Known issues dan backlog.
- Sesi demo untuk editor dan maintainer.
- Konfirmasi akses penerima sebelum akses pemberi dicabut.
