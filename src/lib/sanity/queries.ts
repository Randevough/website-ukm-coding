export const siteSettingsQuery = `
  *[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
    "nama": namaSitus,
    "tagline": deskripsiSingkat,
    email,
    instagram,
    instagramUrl,
    linkedinUrl,
    github,
    deckUrl
  }
`;

export const allEditorialsQuery = `
  *[_type == "editorial" && !(_id in path("drafts.**"))] | order(tanggalPublikasi desc) {
    judul,
    "slug": slug.current,
    tipe,
    ringkasan,
    isi,
    cover,
    coverAlt,
    tanggalPublikasi,
    penulis,
    featured,
    kategoriTambahan,
    tanggalMulai,
    tanggalSelesai,
    lokasi,
    tautanPendaftaran
  }
`;

export const editorialBySlugQuery = `
  *[_type == "editorial" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    judul,
    "slug": slug.current,
    tipe,
    ringkasan,
    isi,
    cover,
    coverAlt,
    tanggalPublikasi,
    penulis,
    featured,
    kategoriTambahan,
    tanggalMulai,
    tanggalSelesai,
    lokasi,
    tautanPendaftaran,
    seo
  }
`;

export const allProjectsQuery = `
  *[_type == "project" && !(_id in path("drafts.**"))] | order(tahun desc, _createdAt desc) {
    nama,
    "slug": slug.current,
    ringkasan,
    kategori,
    status,
    featured,
    tahun,
    techStack,
    kontributor,
    cover,
    githubUrl,
    demoUrl,
    masalah,
    pendekatan,
    hasil
  }
`;

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    nama,
    "slug": slug.current,
    ringkasan,
    kategori,
    status,
    featured,
    tahun,
    techStack,
    kontributor,
    cover,
    githubUrl,
    demoUrl,
    masalah,
    pendekatan,
    hasil
  }
`;

export const partnersQuery = `
  *[_type == "partner" && aktif == true && !(_id in path("drafts.**"))] | order(urutan asc) {
    nama,
    tipe,
    logo,
    izinTampilLogo,
    url
  }
`;

export const galleryQuery = `
  *[_type == "galleryItem" && tampilDiBeranda == true && !(_id in path("drafts.**"))] | order(urutan asc) {
    gambar,
    alt
  }
`;
