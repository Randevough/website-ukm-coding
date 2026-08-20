import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner & Kolaborator",
  type: "document",
  fields: [
    defineField({
      name: "nama",
      title: "Nama Organisasi",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tipe",
      title: "Tipe",
      type: "string",
      options: {
        list: ["Partner", "Sponsor", "Media", "Institusi", "Kolaborator"],
      },
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "izinTampilLogo",
      title: "Izin Tampil Logo",
      type: "boolean",
      description:
        "Aktifkan jika partner telah memberikan izin eksplisit pemasangan logo",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Tautan (URL)",
      type: "url",
    }),
    defineField({
      name: "urutan",
      title: "Urutan Tampil",
      type: "number",
    }),
    defineField({
      name: "aktif",
      title: "Aktif",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
