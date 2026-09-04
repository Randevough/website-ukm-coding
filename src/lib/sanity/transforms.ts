/**
 * Sanity Data Normalizers & Transformers
 *
 * Provides safe fallback and mapping between Sanity CMS payloads
 * and unified frontend TypeScript models.
 */

import type { Project, Post } from "../../types/content";

export function normalizeProject(raw: any): Project {
  if (!raw) {
    throw new Error("Cannot normalize null or undefined project");
  }

  const stack = Array.isArray(raw.techStack)
    ? raw.techStack
    : Array.isArray(raw.stack)
      ? raw.stack
      : [];

  const pendekatan = Array.isArray(raw.pendekatan)
    ? raw.pendekatan
    : raw.pendekatan
      ? [String(raw.pendekatan)]
      : [];

  const hasil = Array.isArray(raw.hasil)
    ? raw.hasil
    : raw.hasil
      ? [String(raw.hasil)]
      : [];

  const rawKategori = raw.kategori === "Web App" ? "Website" : raw.kategori;

  return {
    slug: raw.slug || "",
    title: raw.nama || raw.title || "Untitled Project",
    oneLiner: raw.ringkasan || raw.oneLiner || "",
    kategori: rawKategori || "Website",
    tahun: Number(raw.tahun) || new Date().getFullYear(),
    jenis: raw.jenis || "Internal Project",
    stack,
    kontributor: raw.kontributor || "UKM Coding Team",
    demoUrl: raw.demoUrl || "#",
    repoUrl: raw.githubUrl || raw.repoUrl || "#",
    variant: raw.variant || "neutral",
    featured: Boolean(raw.featured),
    peran: raw.peran || "Development",
    durasi: raw.durasi || "Ongoing",
    status: raw.status || "Aktif",
    masalah: typeof raw.masalah === "string" ? raw.masalah : "",
    pendekatan,
    hasil,
    pelajaran: raw.pelajaran || "",
  };
}

export function normalizeEditorial(raw: any): Post {
  if (!raw) {
    throw new Error("Cannot normalize null or undefined editorial");
  }

  return {
    slug: raw.slug || "",
    title: raw.judul || raw.title || "Untitled Post",
    kategori: raw.tipe || raw.kategori || "Artikel",
    tanggal: raw.tanggalPublikasi || raw.tanggal || new Date().toISOString(),
    penulis: raw.penulis || "Redaksi UKM Coding",
    excerpt: raw.ringkasan || raw.excerpt || "",
    variant: raw.variant || "neutral",
    featured: Boolean(raw.featured),
    baca: Number(raw.baca) || 3,
    sumber: raw.sumber,
    sumberUrl: raw.sumberUrl,
    body: typeof raw.isi === "string" ? raw.isi : raw.body || "",
  };
}
