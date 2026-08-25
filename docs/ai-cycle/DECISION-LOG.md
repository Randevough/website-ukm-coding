# Decision Log

| ID  | Tanggal    | Keputusan                                      | Alasan                                                                                   | Status   |
| --- | ---------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| 01  | 2026-08-20 | CMS Sanity-hosted Studio                       | Independen dari DNS kampus, mempercepat setup untuk 1-2 editor.                          | Terkunci |
| 02  | 2026-08-20 | Astro + TypeScript + Vanilla CSS               | Performa statis maksimal, mempertahankan konsistensi visual dari prototype.              | Terkunci |
| 03  | 2026-08-20 | Deploy via Cloudflare Pages                    | Hosting gratis dengan performa tinggi, pipeline deploy CI/CD otomatis.                   | Terkunci |
| 04  | 2026-08-20 | Tidak ada database relasional (Supabase)       | Fokus MVP hanya portal informasi statis; dashboard internal di luar scope.               | Terkunci |
| 05  | 2026-08-20 | Editor direct publish, tanpa approval berlapis | Untuk kecepatan publikasi dengan asumsi tim admin sangat kecil (1-2 orang).              | Terkunci |
| 06  | 2026-08-20 | Bahasa Indonesia Only                          | Sesuai target audiens primer yaitu mahasiswa Cyber University dan publik lokal.          | Terkunci |
| 07  | 2026-08-20 | Preview Deployment (Noindex)                   | Review PR harus melalui instance tersendiri di Pages yang tidak terindeks search engine. | Terkunci |
