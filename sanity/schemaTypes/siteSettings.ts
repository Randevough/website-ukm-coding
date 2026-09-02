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
      name: "proposalMediaPartner",
      title: "File Proposal Media Partner (PDF)",
      type: "file",
      options: {
        accept: "application/pdf",
      },
    }),
  ],
});
