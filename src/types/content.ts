export interface SiteSettings {
  nama: string;
  tagline: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  linkedinUrl: string;
  github: string;
  deckUrl: string;
  tahunBerdiri: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Press {
  name: string;
  note: string;
  url: string;
}

export interface Pillar {
  num: string;
  title: string;
  text: string;
}

export interface Division {
  name: string;
  text: string;
  focus: string[];
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  kategori: string;
  tahun: number;
  jenis: string;
  stack: string[];
  kontributor: string;
  demoUrl: string;
  repoUrl: string;
  variant: string;
  featured: boolean;
  peran: string;
  durasi: string;
  status: string;
  masalah: string;
  pendekatan: string[];
  hasil: string[];
  pelajaran: string;
}

export interface PostFact {
  tanggalAcara?: string;
  format?: string;
  peserta?: string;
  kolaborator?: string;
}

export interface Post {
  slug: string;
  title: string;
  kategori: string;
  tanggal: string;
  penulis: string;
  excerpt: string;
  variant: string;
  featured: boolean;
  baca: number;
  sumber?: string;
  sumberUrl?: string;
  fact?: PostFact;
  body?: string;
}

export interface Instagram {
  caption: string;
  variant: string;
}

export interface AdminActivity {
  aksi: string;
  objek: string;
  oleh: string;
  waktu: string;
}

export interface Partner {
  nama: string;
  tier: string;
  izinTampil: boolean;
  url: string;
}
