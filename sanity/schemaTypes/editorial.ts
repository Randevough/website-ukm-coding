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
    { name: 'meta', title: 'Metadata Konten' },
    { name: 'event', title: 'Detail Kegiatan (Hanya untuk tipe Kegiatan)' },
    { name: 'seo', title: 'SEO & Visibilitas' }
  ],
  fields: [
    defineField({
      name: "judul",
      title: "Judul",
      type: "string",
      fieldset: 'meta',
      description: "Judul utama yang akan tampil di halaman depan dan daftar. Buat ringkas dan jelas.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: 'meta',
      description: "URL tautan. Peringatan: Mengubah slug yang sudah tayang dapat memunculkan error 404 pada pengunjung sebelumnya.",
      options: { source: "judul", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipe",
      title: "Tipe",
      type: "string",
      fieldset: 'meta',
      description: "Pilih 'Kegiatan' untuk memunculkan input jadwal dan lokasi.",
      options: {
        list: ["Berita", "Kegiatan", "Pengumuman", "Prestasi"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ringkasan",
      title: "Ringkasan",
      type: "text",
      fieldset: 'meta',
      rows: 3,
      description: "Paragraf pembuka yang menarik (120–180 karakter). Tampil di halaman daftar dan metadata.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "isi",
      title: "Isi Konten",
      type: "array",
      of: blockContent,
      description: "Isi tulisan secara lengkap.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      fieldset: 'meta',
      options: { hotspot: true },
    }),
    defineField({
      name: "coverAlt",
      title: "Cover Alt Text",
      type: "string",
      fieldset: 'meta',
      description: "Teks alternatif untuk aksesibilitas tunanetra. Jelaskan isi gambar secara deskriptif.",
    }),
    defineField({
      name: "tanggalPublikasi",
      title: "Tanggal Publikasi",
      type: "date",
      fieldset: 'meta',
    }),
    defineField({
      name: "penulis",
      title: "Penulis",
      type: "string",
      fieldset: 'meta',
    }),
    defineField({
      name: "featured",
      title: "Tampil di Sorotan",
      type: "boolean",
      fieldset: 'seo',
      initialValue: false,
    }),
    defineField({
      name: "kategoriTambahan",
      title: "Kategori Tambahan",
      type: "array",
      fieldset: 'meta',
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tanggalMulai",
      title: "Tanggal Mulai (Khusus Kegiatan)",
      type: "date",
      fieldset: 'event',
      hidden: ({ document }) => document?.tipe !== 'Kegiatan',
    }),
    defineField({
      name: "tanggalSelesai",
      title: "Tanggal Selesai (Khusus Kegiatan)",
      type: "date",
      fieldset: 'event',
      hidden: ({ document }) => document?.tipe !== 'Kegiatan',
    }),
    defineField({
      name: "lokasi",
      title: "Lokasi Kegiatan",
      type: "string",
      fieldset: 'event',
      hidden: ({ document }) => document?.tipe !== 'Kegiatan',
    }),
    defineField({
      name: "tautanPendaftaran",
      title: "Tautan Pendaftaran",
      type: "url",
      fieldset: 'event',
      hidden: ({ document }) => document?.tipe !== 'Kegiatan',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: "seo",
      title: "SEO Override",
      type: "seo",
      fieldset: 'seo',
      description: "Gunakan bila metadata bawaan dirasa kurang memadai untuk mesin pencari.",
    }),
  ],
});
