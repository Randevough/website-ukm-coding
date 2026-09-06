# Deployment & Operations Runbook

**UKM Coding Cyber University**

Dokumen ini berisi prosedur resmi deployment, konfigurasi CI/CD, manajemen domain & DNS, prosedur pemulihan (_rollback_), dan panduan serah terima akun teknis.

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

Berikut adalah daftar variabel lingkungan dan rahasia (_secrets_) yang dikelola:

### A. GitHub Actions Repository Secrets (Wajib untuk Deploy):

- `CLOUDFLARE_API_TOKEN`: Token API Cloudflare dengan izin _Cloudflare Pages:Edit_.
- `CLOUDFLARE_ACCOUNT_ID`: ID Akun Cloudflare organisasi.

### B. Public Environment Variables (`.env` & Cloudflare Settings):

- `PUBLIC_SANITY_PROJECT_ID`: `n3mnxpum`
- `PUBLIC_SANITY_DATASET`: `production`
- `PUBLIC_SANITY_API_VERSION`: `2026-08-19`
- `PUBLIC_SITE_URL`: `https://ukmcoding.site`
- `PUBLIC_NOINDEX`: `false` (khusus production) / `true` (pada branch preview)

---

## 3. Webhook Publikasi Otomatis (Sanity → GitHub)

Untuk memicu build dan deploy otomatis setiap kali admin menekan tombol **Publish** di Sanity Studio (tanpa perlu commit git manual):

### A. Buat GitHub Personal Access Token (PAT):

1. Buka GitHub: **Settings** → **Developer Settings** → **Personal Access Tokens** → **Tokens (classic)** (atau Fine-grained tokens).
2. Buat token baru:
   - **Note**: `Sanity CMS Auto Deploy Webhook`
   - **Scopes**: Centang `repo` (Full control of private repositories) jika Classic token, atau izin `Contents: Read and write` jika Fine-grained token.
   - **Expiration**: Pilih batas waktu sesuai kebijakan tim (atau set No Expiration / reminder kalender untuk rotasi).
3. Salin token tersebut (contoh: `ghp_...`).

### B. Konfigurasi Webhook di Sanity Dashboard:

1. Buka dashboard Sanity di `https://sanity.io/manage`.
2. Pilih proyek UKM Coding (`n3mnxpum`) → Tab **API** → **Webhooks** → **Create Webhook**.
3. Isi parameter konfigurasi berikut:
   - **Name**: `GitHub Actions Auto Deploy`
   - **URL**: `https://api.github.com/repos/randevough/website-ukm-coding/dispatches`
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **Filter**: `_type in ["editorial", "project", "partner", "siteSettings"]`
   - **HTTP method**: `POST`
   - **HTTP Headers**:
     - `Accept`: `application/vnd.github.v3+json`
     - `Authorization`: `Bearer <MASUKKAN_GITHUB_PAT_ANDA>`
     - `User-Agent`: `Sanity-Webhook`
   - **Payload Format**: Klik **Custom**, lalu masukkan JSON berikut:
     ```json
     {
       "event_type": "sanity-publish"
     }
     ```
4. Klik **Save**.

### C. Verifikasi & Debugging Webhook:

- Setiap kali Anda mempublikasikan dokumen di Sanity Studio, Sanity akan mengirim payload ke GitHub Actions.
- Pipeline akan menjalankan fast-track build & deploy ke Cloudflare Pages dalam kurun waktu ~60–90 detik.
- Jika deploy tidak muncul, periksa tab **API** → **Webhooks** → Klik Webhook Anda → Periksa bagian **Attempt log** untuk melihat status response HTTP dari GitHub.

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

- [ ] Transfer peran _Owner/Admin_ di GitHub Organization UKM Coding.
- [ ] Tambahkan email pengurus baru sebagai _Administrator_ di Cloudflare Dashboard.
- [ ] Undang email pengurus baru sebagai _Administrator_ di Sanity Studio.
- [ ] Pastikan Two-Factor Authentication (2FA) telah aktif di seluruh akun administrator.
- [ ] Rotasi GitHub Personal Access Token (PAT) dan Cloudflare API Token.
- [ ] Verifikasi perpanjangan domain aktif `ukmcoding.site`.
