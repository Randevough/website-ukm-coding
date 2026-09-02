// Fixture fallback data for offline development
"use strict";

// Pengaturan global
const settings = {
  nama: "UKM Coding Cyber University",
  tagline: "Unit kegiatan mahasiswa bidang teknologi di Cyber University",
  email: "ukmcoding@cyber-univ.ac.id",
  instagram: "@coding.cyberuniversity",
  instagramUrl: "https://www.instagram.com/coding.cyberuniversity/",
  linkedinUrl:
    "https://id.linkedin.com/in/ukm-coding-cyber-university-541459379",
  github: "github.com/ukmcoding",
  mediaPartnerUrl: "/?dummy-media-partner", // ganti dengan # jika ingin disembunyikan
  tahunBerdiri: "", // BELUM DIKETAHUI — sengaja dikosongkan
};

// Proof strip stats
const stats: any[] = [
  // TODO: Fakta statistik belum tersedia. Lihat CONTENT-QUESTIONS.md.
  // Data dummy telah dihapus untuk menghindari kebocoran sebagai fakta production.
];

// Press strip
const press = [
  {
    name: "Republika",
    note: "Pembukaan DECOMPE",
    url: "https://news.republika.co.id/berita/s0cgw2463/ukm-coding-cyber-university-resmi-buka-pendaftaran-decompe-30",
  },
  {
    name: "Republika",
    note: "Webinar Software Engineering",
    url: "https://news.republika.co.id/berita/s32bar349/ukm-coding-cyber-university-sukses-adakan-webinar-software-engineering",
  },
  {
    name: "Milenianews",
    note: "Webinar nasional gratis",
    url: "https://milenianews.com/event/cyber-university-akan-gelar-webinar-gratis-bagi-seluruh-mahasiswa-di-indonesia/",
  },
  {
    name: "Portal Cyber University",
    note: "Kolaborasi antar UKM",
    url: "https://portalv2.cyber-univ.ac.id/berita-detail.js/kolaborasi-ukm-kewirausahaan--ukm-coding-cyber-university-gelar-webinar-bangun-start-up",
  },
];

// Empat pilar kegiatan
const pillars = [
  {
    num: "01",
    title: "Kompetisi",
    text: "DECOMPE, kompetisi tahunan tingkat nasional yang kami rancang dan jalankan sendiri, dari sistem pendaftaran sampai penjurian.",
  },
  {
    num: "02",
    title: "Edukasi",
    text: "Webinar, bootcamp, dan sesi belajar internal. Materinya ditentukan dari kebutuhan anggota, bukan dari tren sesaat.",
  },
  {
    num: "03",
    title: "Pengabdian",
    text: "Program Artakarsa: membawa literasi teknologi ke sekolah dan komunitas di luar kampus.",
  },
  {
    num: "04",
    title: "Project & Riset",
    text: "Anggota membangun produk nyata, dari alat bantu internal sampai karya yang dibawa ke lomba.",
  },
];

// Struktur divisi
const divisions = [
  {
    name: "Program Development",
    text: "Merancang kurikulum internal, menjalankan bootcamp, dan mengawal project anggota dari ide sampai rilis.",
    focus: ["Kurikulum internal", "Mentoring project", "Riset teknologi"],
  },
  {
    name: "Media Design & Partnership",
    text: "Menjaga wajah publik UKM: konten, publikasi, dan hubungan dengan sponsor serta media partner.",
    focus: ["Konten & publikasi", "Sponsorship", "Media partner"],
  },
  {
    name: "Human Resource Development",
    text: "Rekrutmen, kaderisasi, dan menjaga agar anggota tetap tumbuh dan tidak berhenti di tengah jalan.",
    focus: ["Rekrutmen", "Kaderisasi", "Evaluasi anggota"],
  },
];

// Kategori berita
const postCategories = [
  "Semua",
  "DECOMPE",
  "Webinar & Bootcamp",
  "Pengabdian",
  "Pengumuman",
  "Liputan Media",
];

// Kategori showcase
const projectCategories = [
  "Semua",
  "Web App",
  "Mobile",
  "Data & AI",
  "IoT",
  "Tools",
];

const variants = ["blue", "orange", "mix", "neutral"];

// Projects
const projects = [
  {
    slug: "codequest",
    title: "CodeQuest",
    oneLiner:
      "Platform latihan soal pemrograman dengan penilaian otomatis, dipakai untuk seleksi internal UKM.",
    kategori: "Web App",
    tahun: 2026,
    jenis: "Internal",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    kontributor: "Tim Program Development",
    demoUrl: "",
    repoUrl: "",
    variant: "blue",
    featured: true,
    peran: "Produk internal",
    durasi: "4 bulan",
    status: "Aktif dipakai",
    masalah:
      "Seleksi anggota baru masih dinilai manual lewat pengumpulan file. Prosesnya lambat, sulit dibandingkan antar peserta, dan rawan kecurangan.",
    pendekatan: [
      "Menyusun bank soal berjenjang dari dasar sampai struktur data.",
      "Membangun runner terisolasi supaya kode peserta aman dijalankan di server.",
      "Papan skor real-time agar mentor bisa melihat progres tanpa menunggu rekap.",
    ],
    hasil: [
      "Waktu penilaian seleksi turun dari beberapa hari menjadi menit.",
      "Dipakai untuk dua gelombang rekrutmen dan satu sesi bootcamp.",
      "Menjadi basis sistem penjurian yang dipakai ulang di kompetisi.",
    ],
    pelajaran:
      "Bagian tersulit bukan algoritma penilaian, tapi menjaga sandbox tetap aman sekaligus cepat. Batas waktu eksekusi dan batas memori harus ditentukan sejak awal, bukan ditambal belakangan.",
  },
  {
    slug: "decompe-submission-portal",
    title: "DECOMPE Submission Portal",
    oneLiner:
      "Portal pendaftaran dan pengumpulan karya untuk kompetisi tingkat nasional, lengkap dengan kontrol akses juri.",
    kategori: "Web App",
    tahun: 2026,
    jenis: "Internal",
    stack: ["Next.js", "Supabase", "Tailwind", "Vercel"],
    kontributor: "Divisi IT, Data & Logistics",
    demoUrl: "",
    repoUrl: "",
    variant: "mix",
    featured: true,
    peran: "Infrastruktur acara",
    durasi: "3 bulan",
    status: "Dipakai di DECOMPE 5.0",
    masalah:
      "Pendaftaran lewat formulir umum dan pengumpulan lewat tautan drive membuat data peserta tersebar dan sulit diverifikasi.",
    pendekatan: [
      "Satu akun tim untuk seluruh alur: daftar, unggah, revisi, dan lihat status.",
      "Peran terpisah untuk peserta, juri, dan panitia dengan batas akses yang jelas.",
      "Rekap otomatis untuk kebutuhan laporan sponsor.",
    ],
    hasil: [
      "Verifikasi peserta tidak lagi dikerjakan manual satu per satu.",
      "Juri bisa menilai tanpa saling melihat skor satu sama lain.",
      "Data peserta jadi rapi dan bisa langsung dipakai untuk laporan.",
    ],
    pelajaran:
      "Kontrol akses lebih rumit dari perkiraan awal. Menulis daftar peran dan izinnya di atas kertas sebelum menyentuh kode menghemat banyak waktu.",
  },
  {
    slug: "artakarsa-school-connect",
    title: "Artakarsa School Connect",
    oneLiner:
      "Aplikasi pendataan sekolah mitra program pengabdian, bisa dipakai tanpa koneksi stabil.",
    kategori: "Mobile",
    tahun: 2026,
    jenis: "Internal",
    stack: ["React Native", "SQLite", "Expo"],
    kontributor: "Tim Artakarsa",
    demoUrl: "",
    repoUrl: "",
    variant: "orange",
    featured: true,
    peran: "Program pengabdian",
    durasi: "2 bulan",
    status: "Uji coba lapangan",
    masalah:
      "Pendataan di sekolah mitra dilakukan di atas kertas, lalu diketik ulang. Banyak data hilang di tengah jalan.",
    pendekatan: [
      "Menyimpan data di perangkat lebih dulu, lalu menyinkronkan saat sinyal tersedia.",
      "Formulir dibuat sesingkat mungkin karena diisi sambil berdiri.",
      "Ekspor rekap untuk laporan kegiatan.",
    ],
    hasil: [
      "Tidak ada lagi pengetikan ulang setelah kunjungan.",
      "Data satu kunjungan selesai dalam hitungan menit.",
    ],
    pelajaran:
      "Fitur offline harus dirancang dari awal. Menambahkannya setelah aplikasi jadi berarti menulis ulang lapisan datanya.",
  },
  {
    slug: "absensi-kegiatan-qr",
    title: "Absensi Kegiatan QR",
    oneLiner:
      "Pencatatan kehadiran acara lewat pemindaian kode, menggantikan daftar hadir kertas.",
    kategori: "Tools",
    tahun: 2025,
    jenis: "Internal",
    stack: ["Vue", "Firebase", "PWA"],
    kontributor: "Divisi HRD",
    demoUrl: "",
    repoUrl: "",
    variant: "neutral",
    featured: false,
    peran: "Alat bantu internal",
    durasi: "3 minggu",
    status: "Dipakai rutin",
    masalah:
      "Daftar hadir kertas sering tidak lengkap dan rekapnya memakan waktu berhari-hari.",
    pendekatan: [
      "Satu kode per sesi, dipindai peserta dari ponsel masing-masing.",
      "Rekap kehadiran langsung terlihat panitia.",
    ],
    hasil: ["Rekap kehadiran selesai di hari yang sama."],
    pelajaran:
      "Perkara terbesar justru sinyal di ruang acara, bukan aplikasinya. Mode antre-unggah menyelamatkan sesi pertama.",
  },
  {
    slug: "klasifikasi-sampah-vision",
    title: "Klasifikasi Sampah Vision",
    oneLiner:
      "Model pengenalan gambar untuk memisahkan jenis sampah, dibawa ke lomba data tingkat nasional.",
    kategori: "Data & AI",
    tahun: 2025,
    jenis: "Lomba",
    stack: ["Python", "PyTorch", "FastAPI"],
    kontributor: "Tim anggota UKM",
    demoUrl: "",
    repoUrl: "",
    variant: "blue",
    featured: false,
    peran: "Karya lomba",
    durasi: "6 minggu",
    status: "Selesai",
    masalah:
      "Pemisahan sampah di lingkungan kampus masih bergantung ketelitian orang, dan sering salah kotak.",
    pendekatan: [
      "Mengumpulkan dan melabeli dataset sendiri karena data publik tidak mewakili kondisi lokal.",
      "Melatih model ringan supaya bisa jalan di perangkat murah.",
      "Membungkus model jadi layanan agar mudah diuji.",
    ],
    hasil: [
      "Akurasi cukup untuk demo lapangan pada lima kategori sampah.",
      "Menjadi bahan sesi belajar internal tentang alur kerja model.",
    ],
    pelajaran:
      "Kualitas label jauh lebih menentukan daripada memilih arsitektur model yang canggih.",
  },
  {
    slug: "smart-hydro-esp32",
    title: "Smart Hydro ESP32",
    oneLiner:
      "Pemantau nutrisi dan pH tanaman hidroponik dengan papan pantau di web.",
    kategori: "IoT",
    tahun: 2025,
    jenis: "Lomba",
    stack: ["ESP32", "MQTT", "React", "InfluxDB"],
    kontributor: "Tim anggota UKM",
    demoUrl: "",
    repoUrl: "",
    variant: "mix",
    featured: false,
    peran: "Karya lomba",
    durasi: "2 bulan",
    status: "Selesai",
    masalah:
      "Pemilik kebun kecil harus mengukur pH manual tiap hari dan sering telat menyadari kondisi air memburuk.",
    pendekatan: [
      "Sensor mengirim data berkala lewat protokol ringan.",
      "Ambang batas bisa diatur, dengan notifikasi saat terlampaui.",
      "Grafik riwayat untuk melihat tren, bukan cuma angka saat ini.",
    ],
    hasil: ["Prototipe berjalan stabil selama dua minggu pengujian."],
    pelajaran:
      "Kalibrasi sensor adalah pekerjaan yang tidak boleh diremehkan. Data cantik tapi salah kalibrasi tetap tidak berguna.",
  },
  {
    slug: "ukm-inventory",
    title: "UKM Inventory",
    oneLiner:
      "Pencatatan peminjaman barang inventaris UKM beserta riwayat pemakaian per kegiatan.",
    kategori: "Tools",
    tahun: 2025,
    jenis: "Internal",
    stack: ["Laravel", "MySQL", "Alpine.js"],
    kontributor: "Divisi HRD",
    demoUrl: "",
    repoUrl: "",
    variant: "neutral",
    featured: false,
    peran: "Alat bantu internal",
    durasi: "1 bulan",
    status: "Dipakai rutin",
    masalah:
      "Barang pinjaman sering tidak kembali karena tidak ada catatan siapa membawa apa.",
    pendekatan: [
      "Satu catatan per peminjaman, dengan tenggat pengembalian.",
      "Riwayat pemakaian dikelompokkan per kegiatan.",
    ],
    hasil: ["Barang hilang berkurang drastis pada satu periode kepengurusan."],
    pelajaran:
      "Sistem sesederhana ini gagal kalau tidak dipakai. Adopsi datang setelah alurnya dipersingkat jadi tiga langkah.",
  },
  {
    slug: "jadwal-mentoring",
    title: "Jadwal Mentoring",
    oneLiner:
      "Penjadwalan sesi mentoring anggota dengan pencocokan waktu kosong mentor dan mentee.",
    kategori: "Web App",
    tahun: 2026,
    jenis: "Internal",
    stack: ["SvelteKit", "Postgres", "Prisma"],
    kontributor: "Program Development",
    demoUrl: "",
    repoUrl: "",
    variant: "blue",
    featured: false,
    peran: "Alat bantu internal",
    durasi: "5 minggu",
    status: "Aktif dipakai",
    masalah:
      "Mencari jadwal cocok antara mentor dan mentee memakan puluhan pesan di grup.",
    pendekatan: [
      "Mentor mengisi ketersediaan sekali, mentee memilih slot.",
      "Pengingat otomatis sehari sebelum sesi.",
    ],
    hasil: ["Sesi yang batal karena lupa turun jauh."],
    pelajaran:
      "Zona waktu dan format tanggal adalah sumber bug paling sering di fitur penjadwalan.",
  },
  {
    slug: "analisis-tren-lomba",
    title: "Analisis Tren Lomba",
    oneLiner:
      "Papan data tema kompetisi teknologi nasional untuk membantu anggota memilih lomba.",
    kategori: "Data & AI",
    tahun: 2026,
    jenis: "Internal",
    stack: ["Python", "Pandas", "Streamlit"],
    kontributor: "Program Development",
    demoUrl: "",
    repoUrl: "",
    variant: "orange",
    featured: false,
    peran: "Riset internal",
    durasi: "3 minggu",
    status: "Selesai",
    masalah:
      "Anggota memilih lomba secara acak dan sering tidak cocok dengan kemampuan tim.",
    pendekatan: [
      "Mengumpulkan data lomba beberapa tahun terakhir.",
      "Mengelompokkan berdasarkan tema dan tingkat kesulitan.",
    ],
    hasil: ["Jadi rujukan saat menyusun rencana lomba satu semester."],
    pelajaran:
      "Mengumpulkan data lomba jauh lebih melelahkan daripada menganalisisnya.",
  },
  {
    slug: "portal-alumni",
    title: "Portal Alumni",
    oneLiner:
      "Direktori alumni UKM beserta jalur karier mereka, dipakai untuk mencari pembicara.",
    kategori: "Web App",
    tahun: 2025,
    jenis: "Internal",
    stack: ["Astro", "Sanity", "Netlify"],
    kontributor: "Media Design & Partnership",
    demoUrl: "",
    repoUrl: "",
    variant: "neutral",
    featured: false,
    peran: "Alat bantu internal",
    durasi: "1 bulan",
    status: "Aktif dipakai",
    masalah:
      "Kontak alumni tersebar di catatan pribadi pengurus lama dan hilang tiap ganti kepengurusan.",
    pendekatan: [
      "Satu direktori dengan izin tampil yang diatur alumni sendiri.",
      "Penanda bidang keahlian untuk mempermudah pencarian pembicara.",
    ],
    hasil: ["Tiga pembicara webinar didapat dari direktori ini."],
    pelajaran:
      "Data orang harus punya tombol ‘jangan tampilkan’ sejak versi pertama.",
  },
  {
    slug: "generator-sertifikat",
    title: "Generator Sertifikat",
    oneLiner:
      "Pembuat sertifikat massal dari data peserta, siap kirim lewat surel.",
    kategori: "Tools",
    tahun: 2025,
    jenis: "Internal",
    stack: ["Node.js", "Puppeteer", "Nodemailer"],
    kontributor: "Divisi IT, Data & Logistics",
    demoUrl: "",
    repoUrl: "",
    variant: "mix",
    featured: false,
    peran: "Alat bantu internal",
    durasi: "2 minggu",
    status: "Dipakai rutin",
    masalah:
      "Membuat ratusan sertifikat secara manual setelah acara memakan waktu sampai seminggu.",
    pendekatan: [
      "Satu templat, data peserta dari berkas tabel.",
      "Pengiriman berkelompok supaya tidak dianggap surel massal mencurigakan.",
    ],
    hasil: ["Pengiriman sertifikat satu acara selesai dalam satu sore."],
    pelajaran:
      "Validasi alamat surel di awal jauh lebih murah daripada mengurus kiriman gagal di akhir.",
  },
  {
    slug: "papan-skor-decompe",
    title: "Papan Skor DECOMPE",
    oneLiner:
      "Tampilan skor langsung untuk babak final, ditayangkan di layar panggung.",
    kategori: "Web App",
    tahun: 2026,
    jenis: "Internal",
    stack: ["React", "WebSocket", "Redis"],
    kontributor: "Divisi IT, Data & Logistics",
    demoUrl: "",
    repoUrl: "",
    variant: "blue",
    featured: false,
    peran: "Infrastruktur acara",
    durasi: "3 minggu",
    status: "Dipakai di final",
    masalah:
      "Skor babak final ditulis di slide dan sering tertinggal dari penilaian juri.",
    pendekatan: [
      "Skor juri langsung tampil di layar tanpa perantara.",
      "Mode aman kalau koneksi terputus di tengah acara.",
    ],
    hasil: ["Tidak ada jeda pengumuman skor sepanjang babak final."],
    pelajaran:
      "Untuk hal yang tampil di panggung, rencana cadangan manual wajib ada.",
  },
];

/* =========================================================
	   POSTS — 14 entri berita
	   ========================================================= */
const posts = [
  {
    slug: "decompe-5-resmi-dibuka",
    title: "DECOMPE 5.0 resmi dibuka untuk pendaftaran nasional",
    kategori: "DECOMPE",
    tanggal: "2026-07-14",
    penulis: "Media Design & Partnership",
    excerpt:
      "Kompetisi tahunan UKM Coding kembali digelar dengan tiga cabang lomba dan babak final yang dilaksanakan secara hibrida.",
    variant: "mix",
    featured: true,
    baca: 5,
    fact: {
      tanggalAcara: "14 Juli – 30 Agustus 2026",
      format: "Hibrida",
      peserta: "Target 150 tim",
      kolaborator: "Cyber University",
    },
  },
  {
    slug: "webinar-software-engineering",
    title: "Webinar Software Engineering: dari kampus ke industri",
    kategori: "Webinar & Bootcamp",
    tanggal: "2026-06-28",
    penulis: "Program Development",
    excerpt:
      "Sesi bersama praktisi membahas apa yang sebenarnya dinilai perusahaan dari lulusan baru, dan bagian mana dari kuliah yang paling terpakai.",
    variant: "blue",
    featured: false,
    baca: 4,
    fact: {
      tanggalAcara: "28 Juni 2026",
      format: "Daring",
      peserta: "212 peserta terdaftar",
      kolaborator: "Praktisi industri",
    },
  },
  {
    slug: "artakarsa-sekolah-mitra",
    title: "Artakarsa membawa literasi teknologi ke tiga sekolah mitra",
    kategori: "Pengabdian",
    tanggal: "2026-06-09",
    penulis: "Program Development",
    excerpt:
      "Program pengabdian UKM Coding masuk ke sekolah menengah dengan materi dasar logika pemrograman dan keamanan digital.",
    variant: "orange",
    featured: false,
    baca: 6,
    fact: {
      tanggalAcara: "1 – 9 Juni 2026",
      format: "Tatap muka",
      peserta: "3 sekolah, 180 siswa",
      kolaborator: "Sekolah mitra",
    },
  },
  {
    slug: "bootcamp-frontend-angkatan-2",
    title: "Bootcamp frontend angkatan kedua ditutup dengan demo project",
    kategori: "Webinar & Bootcamp",
    tanggal: "2026-05-24",
    penulis: "Program Development",
    excerpt:
      "Delapan pekan belajar ditutup dengan presentasi karya. Setiap peserta wajib merilis satu aplikasi yang bisa diakses publik.",
    variant: "blue",
    featured: false,
    baca: 5,
    fact: {
      tanggalAcara: "29 Maret – 24 Mei 2026",
      format: "Hibrida",
      peserta: "24 peserta internal",
      kolaborator: "—",
    },
  },
  {
    slug: "liputan-republika-decompe",
    title: "Republika: UKM Coding Cyber University buka pendaftaran DECOMPE",
    kategori: "Liputan Media",
    tanggal: "2026-05-11",
    penulis: "Media Design & Partnership",
    excerpt:
      "Pembukaan kompetisi kami mendapat liputan media nasional. Berikut ringkasan dan tautan ke artikel aslinya.",
    variant: "neutral",
    featured: false,
    baca: 2,
    sumber: "Republika",
    sumberUrl:
      "https://news.republika.co.id/berita/s0cgw2463/ukm-coding-cyber-university-resmi-buka-pendaftaran-decompe-30",
  },
  {
    slug: "open-recruitment-2026",
    title: "Open recruitment anggota baru periode 2026 dibuka",
    kategori: "Pengumuman",
    tanggal: "2026-04-30",
    penulis: "Human Resource Development",
    excerpt:
      "Tiga divisi membuka kuota. Seleksi dilakukan lewat tes logika di CodeQuest dan wawancara singkat.",
    variant: "orange",
    featured: false,
    baca: 3,
    fact: {
      tanggalAcara: "30 April – 20 Mei 2026",
      format: "Daring",
      peserta: "96 pendaftar",
      kolaborator: "—",
    },
  },
  {
    slug: "decompe-4-rekap",
    title: "Rekap DECOMPE 4.0: 41 institusi dan babak final terpadat",
    kategori: "DECOMPE",
    tanggal: "2026-03-18",
    penulis: "Media Design & Partnership",
    excerpt:
      "Catatan lengkap penyelenggaraan tahun lalu: jumlah peserta, sebaran institusi, dan pelajaran yang kami bawa ke edisi berikutnya.",
    variant: "mix",
    featured: false,
    baca: 8,
    fact: {
      tanggalAcara: "Februari – Maret 2026",
      format: "Hibrida",
      peserta: "41 institusi",
      kolaborator: "Sponsor & media partner",
    },
  },
  {
    slug: "kolaborasi-ukm-kewirausahaan",
    title: "Kolaborasi dengan UKM Kewirausahaan: webinar bangun startup",
    kategori: "Webinar & Bootcamp",
    tanggal: "2026-02-22",
    penulis: "Media Design & Partnership",
    excerpt:
      "Dua UKM menggabungkan sudut pandang teknis dan bisnis dalam satu sesi tentang membangun produk dari nol.",
    variant: "blue",
    featured: false,
    baca: 4,
    fact: {
      tanggalAcara: "22 Februari 2026",
      format: "Daring",
      peserta: "148 peserta",
      kolaborator: "UKM Kewirausahaan",
    },
  },
  {
    slug: "codequest-dipakai-seleksi",
    title: "CodeQuest kini dipakai untuk seleksi anggota baru",
    kategori: "Pengumuman",
    tanggal: "2026-01-29",
    penulis: "Program Development",
    excerpt:
      "Platform latihan soal buatan anggota resmi menggantikan penilaian manual di tahap seleksi.",
    variant: "blue",
    featured: false,
    baca: 3,
  },
  {
    slug: "liputan-milenianews-webinar",
    title: "Milenianews: webinar gratis untuk mahasiswa se-Indonesia",
    kategori: "Liputan Media",
    tanggal: "2025-12-12",
    penulis: "Media Design & Partnership",
    excerpt:
      "Salah satu webinar terbuka kami diliput media nasional. Ringkasan dan tautan artikel ada di dalam.",
    variant: "neutral",
    featured: false,
    baca: 2,
    sumber: "Milenianews",
    sumberUrl:
      "https://milenianews.com/event/cyber-university-akan-gelar-webinar-gratis-bagi-seluruh-mahasiswa-di-indonesia/",
  },
  {
    slug: "study-club-struktur-data",
    title: "Study club struktur data berjalan sepuluh pekan berturut",
    kategori: "Webinar & Bootcamp",
    tanggal: "2025-11-20",
    penulis: "Program Development",
    excerpt:
      "Sesi mingguan kecil tanpa pembicara luar, dijalankan bergilir oleh anggota sendiri.",
    variant: "neutral",
    featured: false,
    baca: 4,
  },
  {
    slug: "artakarsa-sesi-perdana",
    title: "Artakarsa memulai sesi perdana di sekolah pinggiran kota",
    kategori: "Pengabdian",
    tanggal: "2025-10-08",
    penulis: "Program Development",
    excerpt:
      "Program pengabdian dimulai dari satu sekolah, dengan materi yang disusun ulang setelah kunjungan pertama.",
    variant: "orange",
    featured: false,
    baca: 5,
    fact: {
      tanggalAcara: "8 Oktober 2025",
      format: "Tatap muka",
      peserta: "52 siswa",
      kolaborator: "Sekolah mitra",
    },
  },
  {
    slug: "pengurus-baru-2026",
    title: "Serah terima kepengurusan periode 2026",
    kategori: "Pengumuman",
    tanggal: "2025-09-15",
    penulis: "Human Resource Development",
    excerpt:
      "Struktur kepengurusan disederhanakan menjadi tiga divisi agar alur kerja lebih jelas.",
    variant: "neutral",
    featured: false,
    baca: 3,
  },
  {
    slug: "decompe-3-penutupan",
    title: "Penutupan DECOMPE 3.0 dan catatan untuk edisi berikutnya",
    kategori: "DECOMPE",
    tanggal: "2025-08-02",
    penulis: "Media Design & Partnership",
    excerpt:
      "Edisi ketiga menutup rangkaian dengan babak final daring. Beberapa keputusan teknis di edisi ini masih kami pakai sampai sekarang.",
    variant: "mix",
    featured: false,
    baca: 6,
    fact: {
      tanggalAcara: "Juni – Agustus 2025",
      format: "Daring",
      peserta: "33 institusi",
      kolaborator: "Sponsor & media partner",
    },
  },
];

// Kartu Instagram
const instagram = [
  { caption: "Pengumuman DECOMPE 5.0", variant: "mix" },
  { caption: "Sesi study club pekan ini", variant: "blue" },
  { caption: "Rekap webinar Juni", variant: "neutral" },
  { caption: "Artakarsa di sekolah mitra", variant: "orange" },
  { caption: "Open recruitment dibuka", variant: "blue" },
  { caption: "Demo project bootcamp", variant: "mix" },
];

// Aktivitas admin
const adminActivity = [
  {
    aksi: "Menerbitkan",
    objek: "DECOMPE 5.0 resmi dibuka untuk pendaftaran nasional",
    oleh: "Randevough",
    waktu: "2 jam lalu",
  },
  {
    aksi: "Mengirim untuk review",
    objek: "Rekap bootcamp frontend angkatan kedua",
    oleh: "Editor Media",
    waktu: "5 jam lalu",
  },
  {
    aksi: "Menambah project",
    objek: "Papan Skor DECOMPE",
    oleh: "Editor Media",
    waktu: "Kemarin",
  },
  {
    aksi: "Memperbarui angka",
    objek: "Proof strip halaman depan",
    oleh: "Randevough",
    waktu: "3 hari lalu",
  },
];

// Media partner & sponsor
const partners = [
  { nama: "Republika", tier: "Media Partner", izinTampil: false, url: "" },
  { nama: "Milenianews", tier: "Media Partner", izinTampil: false, url: "" },
  { nama: "Cyber University", tier: "Institusi", izinTampil: false, url: "" },
  {
    nama: "UKM Kewirausahaan",
    tier: "Kolaborator",
    izinTampil: false,
    url: "",
  },
  { nama: "Slot Sponsor", tier: "Tersedia", izinTampil: false, url: "" },
  {
    nama: "Portal Kampus",
    tier: "Media Internal",
    izinTampil: false,
    url: "",
  },
  {
    nama: "Komunitas Dev Lokal",
    tier: "Kolaborator",
    izinTampil: false,
    url: "",
  },
  { nama: "Slot Sponsor", tier: "Tersedia", izinTampil: false, url: "" },
  { nama: "Slot Sponsor", tier: "Tersedia", izinTampil: false, url: "" },
  { nama: "Slot Sponsor", tier: "Tersedia", izinTampil: false, url: "" },
];

export const UKM_FIXTURE = {
  settings,
  stats,
  partners: partners.slice(0, 5),
  press,
  pillars,
  divisions,
  postCategories,
  projectCategories,
  variants,
  projects,
  posts,
  instagram,
  adminActivity,
};
