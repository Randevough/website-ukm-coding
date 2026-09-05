import { defineField, defineType, defineArrayMember } from "sanity";

const blockContent = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "Quote", value: "blockquote" },
    ],
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
    marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
      ],
    },
  }),
  defineArrayMember({
    type: "image",
    options: { hotspot: true },
    fields: [
      {
        name: "alt",
        type: "string",
        title: "Alternative text",
      },
      {
        name: "caption",
        type: "string",
        title: "Caption",
      },
    ],
  }),
];

export const editorial = defineType({
  name: "editorial",
  title: "Editorial (Updates)",
  type: "document",
  fieldsets: [
    { name: "meta", title: "Metadata Konten" },
    { name: "event", title: "Detail Kegiatan (Hanya untuk tipe Kegiatan)" },
  ],
  fields: [
    defineField({
      name: "judul",
      title: "Judul",
      type: "string",
      fieldset: "meta",
      description:
        "Judul utama yang akan tampil di halaman depan dan daftar. Buat ringkas dan jelas.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "meta",
      description:
        "URL tautan. Klik 'Generate' setelah mengisi Judul. Peringatan: mengubah slug setelah dipublikasikan akan merusak tautan lama.",
      options: { source: "judul", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipe",
      title: "Tipe / Kategori Utama",
      type: "string",
      fieldset: "meta",
      description:
        "Pilih 'Kegiatan' untuk memunculkan input jadwal dan lokasi.",
      options: {
        list: [
          { title: "Berita", value: "Berita" },
          { title: "Kegiatan", value: "Kegiatan" },
          { title: "Pengumuman", value: "Pengumuman" },
          { title: "Prestasi", value: "Prestasi" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ringkasan",
      title: "Ringkasan (Lead Paragraph)",
      type: "text",
      fieldset: "meta",
      rows: 3,
      description:
        "Paragraf pembuka yang menarik (120–180 karakter). Tampil di halaman daftar dan metadata.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "isi",
      title: "Isi Lengkap",
      type: "array",
      of: blockContent,
      description:
        "Konten lengkap artikel. Gunakan subjudul (H2/H3) dan daftar poin untuk keterbacaan.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Foto Sampul",
      type: "image",
      fieldset: "meta",
      options: { hotspot: true },
      description: "Format landscape 16:9 disarankan. Maksimal 2MB.",
    }),
    defineField({
      name: "coverAlt",
      title: "Teks Alternatif Foto Sampul (A11y)",
      type: "string",
      fieldset: "meta",
      description:
        "Deskripsikan isi foto untuk pembaca tunanetra dan SEO Google Images.",
    }),
    defineField({
      name: "tanggalPublikasi",
      title: "Tanggal Publikasi",
      type: "date",
      fieldset: "meta",
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "penulis",
      title: "Divisi Penulis",
      type: "string",
      fieldset: "meta",
      description:
        "Nama divisi pembuat konten (contoh: Divisi Media & Komunikasi, Divisi Web Development, Tim Redaksi).",
      initialValue: "Tim Redaksi",
    }),
    defineField({
      name: "featured",
      title: "Tampil di Sorotan",
      type: "boolean",
      fieldset: "meta",
      initialValue: false,
    }),
    defineField({
      name: "kategoriTambahan",
      title: "Kategori Tambahan",
      type: "array",
      fieldset: "meta",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tanggalMulai",
      title: "Tanggal Mulai (Khusus Kegiatan)",
      type: "date",
      fieldset: "event",
      hidden: ({ document }) => document?.tipe !== "Kegiatan",
    }),
    defineField({
      name: "tanggalSelesai",
      title: "Tanggal Selesai (Khusus Kegiatan)",
      type: "date",
      fieldset: "event",
      hidden: ({ document }) => document?.tipe !== "Kegiatan",
    }),
    defineField({
      name: "lokasi",
      title: "Lokasi Kegiatan",
      type: "string",
      fieldset: "event",
      hidden: ({ document }) => document?.tipe !== "Kegiatan",
    }),
    defineField({
      name: "tautanPendaftaran",
      title: "Tautan Pendaftaran",
      type: "url",
      fieldset: "event",
      hidden: ({ document }) => document?.tipe !== "Kegiatan",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
});
