import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Penulis",
  type: "document",
  fields: [
    defineField({
      name: "namaTampil",
      title: "Nama Tampil",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "peran",
      title: "Peran / Divisi",
      type: "string",
    }),
    defineField({
      name: "foto",
      title: "Foto Profil",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bioSingkat",
      title: "Bio Singkat",
      type: "text",
      rows: 3,
    }),
  ],
});
