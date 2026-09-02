# Deployment & Operations Runbook
**UKM Coding Cyber University**

Dokumen ini berisi prosedur resmi deployment, konfigurasi CI/CD, manajemen domain & DNS, prosedur pemulihan (*rollback*), dan panduan serah terima akun teknis.

---

## 1. Konfigurasi CI/CD & Cloudflare Pages

Deployment website dikelola secara otomatis melalui GitHub Actions (`.github/workflows/deploy.yml`) ke Cloudflare Pages.

### Parameter Build:
- **Framework**: Astro (Static)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: `20.x` (LTS)
- **Production Branch**: `main`

---

## 2. Manajemen Environment Variables & Secrets

Berikut adalah daftar variabel lingkungan dan rahasia (*secrets*) yang dikelola:

### A. GitHub Actions Repository Secrets (Wajib untuk Deploy):
- `CLOUDFLARE_API_TOKEN`: Token API Cloudflare dengan izin *Cloudflare Pages:Edit*.
- `CLOUDFLARE_ACCOUNT_ID`: ID Akun Cloudflare organisasi.

### B. Public Environment Variables (`.env` & Cloudflare Settings):
- `PUBLIC_SANITY_PROJECT_ID`: `60a63q0u`
- `PUBLIC_SANITY_DATASET`: `production`
- `PUBLIC_SANITY_API_VERSION`: `2024-02-28`
- `PUBLIC_SITE_URL`: `https://ukmcoding.site`
- `PUBLIC_NOINDEX`: `false` (khusus production) / `true` (pada branch preview)

---

## 3. Webhook Publikasi Otomatis (Sanity → GitHub)

Untuk memicu build otomatis setiap kali admin menekan tombol **Publish** di Sanity Studio:

1. Buka dashboard Sanity di `https://sanity.io/manage`.
2. Pilih proyek UKM Coding → **API** → **Webhooks** → **Create Webhook**.
3. **URL**: `https://api.github.com/repos/<OWNER>/<REPO>/dispatches`
4. **Headers**:
   - `Accept`: `application/vnd.github.v3+json`
   - `Authorization`: `Bearer <GITHUB_PERSONAL_ACCESS_TOKEN>`
   - `User-Agent`: `Sanity-Webhook`
5. **Payload Format**:
   ```json
   {
     "event_type": "sanity-publish"
   }
   ```
6. **Trigger on**: `Create`, `Update`, `Delete` pada dataset `production`.

---

## 4. Prosedur Rollback (Pemulihan Darurat)

Jika terjadi kesalahan fatal pada rilis terbaru:

### Opsi A: Rollback Cepat via Cloudflare Pages Dashboard
1. Buka dashboard **Cloudflare Pages** → Pilih project `ukm-coding`.
2. Masuk ke tab **Deployments**.
3. Cari deployment stabil terakhir sebelum insiden terjadi.
4. Klik menu tiga titik `(...)` di samping deployment tersebut → Pilih **Rollback to this deployment**.

### Opsi B: Rollback via Git Revert
1. Jalankan `git revert <COMMIT_HASH>` pada branch lokal.
2. Buat Pull Request revert ke branch `main`.
3. Setelah di-merge, pipeline CI/CD akan membangun ulang versi stabil secara otomatis.

---

## 5. Prosedur Backup & Ekspor Data

1. **Ekspor Dataset Sanity**:
   ```bash
   npx sanity dataset export production backup-$(date +%F).tar.gz
   ```
2. **Simpan Backup**: Simpan berkas arsip `tar.gz` di Google Drive resmi pengurus UKM secara berkala (minimal 1 bulan sekali atau sebelum perombakan schema besar).

---

## 6. Checklist Serah Terima Kepengurusan (Handover)

Saat pergantian kepengurusan periode baru:
- [ ] Transfer peran *Owner/Admin* di GitHub Organization UKM Coding.
- [ ] Tambahkan email pengurus baru sebagai *Administrator* di Cloudflare Dashboard.
- [ ] Undang email pengurus baru sebagai *Administrator* di Sanity Studio.
- [ ] Pastikan Two-Factor Authentication (2FA) telah aktif di seluruh akun administrator.
- [ ] Rotasi GitHub Personal Access Token (PAT) dan Cloudflare API Token.
- [ ] Verifikasi perpanjangan domain aktif `ukmcoding.site`.
