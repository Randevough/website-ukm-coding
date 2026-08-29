import { defineField, defineType, defineArrayMember } from "sanity";

const blockContent = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
    ],
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
  }),
];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fieldsets: [
    { name: "meta", title: "Metadata Utama" },
    { name: "details", title: "Detail Teknis & Tim" },
    { name: "content", title: "Konten (Masalah, Pendekatan, Hasil)" },
  ],
  fields: [
    defineField({
      name: "nama",
      title: "Nama Project",
      type: "string",
      fieldset: "meta",
      description:
        "Nama publik aplikasi atau karya. Hindari nama yang terlalu panjang.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "meta",
      description:
        "URL tautan. Klik 'Generate' setelah mengisi Nama Project. Peringatan: mengubah slug setelah dipublikasikan akan merusak tautan lama.",
      options: { source: "nama", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ringkasan",
      title: "Ringkasan (One-liner)",
      type: "text",
      fieldset: "meta",
      description:
        "Tampil di kartu daftar project. Buat ringkas (maksimal 2 kalimat).",
      rows: 2,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "string",
      fieldset: "meta",
      options: {
        list: ["Web App", "Mobile", "Data & AI", "IoT", "Tools", "Internal"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Tampil di Sorotan",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "tahun",
      title: "Tahun",
      type: "number",
      fieldset: "details",
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      fieldset: "details",
      description: "Teknologi yang digunakan (misal: React, Node.js, Python).",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "kontributor",
      title: "Kontributor Utama",
      type: "string",
      fieldset: "details",
      description: "Nama divisi atau anggota kunci yang mengerjakan.",
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      description:
        "Gambar utama rasio horizontal (16:9 disarankan). Jangan gunakan teks berlebih pada gambar.",
      options: { hotspot: true },
    }),
    defineField({
      name: "githubUrl",
      title: "Tautan GitHub",
      type: "url",
      fieldset: "details",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "demoUrl",
      title: "Tautan Demo",
      type: "url",
      fieldset: "details",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "masalah",
      title: "Masalah",
      type: "array",
      fieldset: "content",
      description:
        "Jelaskan permasalahan awal yang coba diselesaikan oleh project ini.",
      of: blockContent,
    }),
    defineField({
      name: "pendekatan",
      title: "Pendekatan",
      type: "array",
      fieldset: "content",
      description:
        "Bagaimana cara tim menyelesaikan masalah tersebut? (Bisa pakai daftar/list).",
      of: blockContent,
    }),
    defineField({
      name: "hasil",
      title: "Hasil",
      type: "array",
      fieldset: "content",
      description:
        "Apa dampak atau hasil akhir dari project ini? (Contoh: hemat waktu 2 jam, dsb).",
      of: blockContent,
    }),
  ],
});
