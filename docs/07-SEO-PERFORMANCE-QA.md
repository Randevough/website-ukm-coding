# SEO, Performance, Accessibility & QA

## 1. SEO teknis MVP

Wajib:

- Title dan meta description unik.
- Canonical URL absolut.
- Open Graph dan Twitter/X card.
- Sitemap XML.
- `robots.txt`.
- Preview deployment `noindex`.
- Semantic headings.
- Clean slug.
- Redirect URL lama bila relevan.
- JSON-LD `Organization` pada situs.
- JSON-LD `Article`/`NewsArticle` untuk konten editorial sesuai tipe.
- JSON-LD `Event` untuk kegiatan yang memenuhi data.
- Breadcrumb structured data pada detail bila breadcrumb ditampilkan.
- `lang="id"`.

Jangan mengarang alamat, nomor telepon, tahun berdiri, rating, atau fakta organisasi untuk structured data.

## 2. Performance budget

Target Lighthouse minimal 90 pada route utama.

Pedoman:

- Static HTML sebagai default.
- JavaScript client hanya untuk drawer, modal, filter/search, dan motion yang benar-benar dibutuhkan.
- Hindari hydration seluruh halaman.
- Optimalkan gambar responsif dan lazy-load di bawah fold.
- Tetapkan dimensi media untuk mengurangi layout shift.
- Font memiliki fallback dan strategi loading yang tidak memblokir berlebihan.
- Hindari library animasi besar bila CSS/IntersectionObserver cukup.
- Jangan autoplay video.

## 3. Accessibility

- WCAG 2.2 AA sebagai target praktis.
- Skip link berfungsi.
- Semua fungsi dapat digunakan keyboard.
- Focus visible jelas.
- Dialog/modal mengelola fokus, Escape, label, dan focus return.
- Drawer tidak membuat fokus masuk ke konten belakang.
- Target sentuh minimal sekitar 44×44 px.
- Normal text memenuhi kontras 4.5:1.
- Respect `prefers-reduced-motion`.
- Alt text tepat; gambar dekoratif memakai alt kosong.
- Form CMS berada di Sanity; UI publik MVP tidak memiliki form custom.

## 4. Browser target

Dukung dua versi terbaru:

- Chrome.
- Edge.
- Firefox.
- Safari.
- iOS Safari dan Chrome Android yang masih didukung vendor.

Progressive enhancement: konten dan navigasi inti harus tetap tersedia jika motion atau sebagian JavaScript gagal.

## 5. CI quality gates

Setiap pull request menjalankan:

1. `npm ci`.
2. Format check.
3. ESLint.
4. TypeScript/Astro check.
5. Unit/integration tests.
6. Production build.
7. Internal link check.
8. Lighthouse CI.

CI tidak boleh menyimpan secret di log.

## 6. Matriks QA minimum

Route:

- `/`.
- `/kegiatan`.
- Satu detail dari tiap tipe editorial.
- `/projects`.
- Satu detail project dengan gambar/link lengkap.
- Satu detail project tanpa gambar/link.
- `/404`.

Viewport:

- Desktop 1440×900.
- Mobile sekitar 390×844.
- Tambahan tablet bila layout breakpoint bermasalah.

State:

- Menu mobile terbuka.
- Modal project terbuka.
- Empty search/filter.
- Konten tanpa cover.
- Judul panjang.
- Reduced motion.
- Keyboard-only.

## 7. Release blockers

- Build/typecheck gagal.
- Draft atau secret terlihat publik.
- Data prototype/karangan masih tampil sebagai fakta.
- Tautan internal rusak.
- Navigasi mobile atau keyboard tidak dapat dipakai.
- Overflow/overlap signifikan.
- Lighthouse di bawah target tanpa waiver tertulis dan issue tindak lanjut.
- Canonical/domain production salah.
- Gambar atau logo digunakan tanpa izin.
