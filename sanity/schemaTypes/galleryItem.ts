import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Galeri",
  type: "document",
  fields: [
    defineField({
      name: "gambar",
      title: "Gambar",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Teks Alternatif (Alt)",
      type: "string",
      description: "Wajib untuk aksesibilitas (kecuali dekoratif)",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "tanggal",
      title: "Tanggal",
      type: "date",
    }),
    defineField({
      name: "urutan",
      title: "Urutan",
      type: "number",
    }),
    defineField({
      name: "tampilDiBeranda",
      title: "Tampil di Beranda",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
