import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Situs",
  type: "document",
  fields: [
    defineField({
      name: "namaSitus",
      title: "Nama Situs",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deskripsiSingkat",
      title: "Deskripsi Singkat / Tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Resmi",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "instagramUrl",
      title: "URL Instagram",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "URL LinkedIn",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "URL GitHub",
      type: "url",
    }),
    defineField({
      name: "lokasi",
      title: "Lokasi (Kota, Negara)",
      type: "string",
      initialValue: "Jakarta, Indonesia",
    }),
    defineField({
      name: "tahunBerdiri",
      title: "Tahun Berdiri",
      type: "string",
      description: "Misal: 2026. Kosongkan jika belum dipastikan.",
    }),
    defineField({
      name: "statistik",
      title: "Statistik Beranda",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Nilai (Angka)", type: "number" },
            { name: "suffix", title: "Akhiran (Misal: +)", type: "string" },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "seoDefault",
      title: "SEO Default",
      type: "seo",
    }),
  ],
});
