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
  fields: [
    defineField({
      name: "judul",
      title: "Judul",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "judul", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipe",
      title: "Tipe",
      type: "string",
      options: {
        list: ["Berita", "Kegiatan", "Pengumuman", "Prestasi"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ringkasan",
      title: "Ringkasan",
      type: "text",
      rows: 3,
      description: "Disarankan 120–180 karakter",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "isi",
      title: "Isi Konten",
      type: "array",
      of: blockContent,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coverAlt",
      title: "Cover Alt Text",
      type: "string",
    }),
    defineField({
      name: "tanggalPublikasi",
      title: "Tanggal Publikasi",
      type: "date",
    }),
    defineField({
      name: "penulis",
      title: "Penulis",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Tampil di Sorotan",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "kategoriTambahan",
      title: "Kategori Tambahan",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tanggalMulai",
      title: "Tanggal Mulai (Khusus Kegiatan)",
      type: "date",
    }),
    defineField({
      name: "tanggalSelesai",
      title: "Tanggal Selesai (Khusus Kegiatan)",
      type: "date",
    }),
    defineField({
      name: "lokasi",
      title: "Lokasi Kegiatan",
      type: "string",
    }),
    defineField({
      name: "tautanPendaftaran",
      title: "Tautan Pendaftaran",
      type: "url",
    }),
    defineField({
      name: "seo",
      title: "SEO Override",
      type: "seo",
    }),
  ],
});
