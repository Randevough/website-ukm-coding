import { defineField, defineType } from "sanity";

export const division = defineType({
  name: "division",
  title: "Divisi",
  type: "document",
  fields: [
    defineField({
      name: "nama",
      title: "Nama Divisi",
      type: "string",
      description:
        "Nama resmi divisi (contoh: Media Design & Partnership, Program Development, BPH).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deskripsi",
      title: "Deskripsi Singkat / Fokus",
      type: "string",
      description: "Penjelasan ringkas fokus kerja divisi (opsional).",
    }),
    defineField({
      name: "urutan",
      title: "Urutan Tampil",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "aktif",
      title: "Aktif",
      type: "boolean",
      description:
        "Matikan jika divisi ini sudah tidak aktif di kepengurusan periode baru.",
      initialValue: true,
    }),
  ],
});
