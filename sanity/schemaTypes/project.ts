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
  fields: [
    defineField({
      name: "nama",
      title: "Nama Project",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nama" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ringkasan",
      title: "Ringkasan (One-liner)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "string",
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
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "kontributor",
      title: "Kontributor Utama",
      type: "string",
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "githubUrl",
      title: "Tautan GitHub",
      type: "url",
    }),
    defineField({
      name: "demoUrl",
      title: "Tautan Demo",
      type: "url",
    }),
    defineField({
      name: "masalah",
      title: "Masalah",
      type: "array",
      of: blockContent,
    }),
    defineField({
      name: "pendekatan",
      title: "Pendekatan",
      type: "array",
      of: blockContent,
    }),
    defineField({
      name: "hasil",
      title: "Hasil",
      type: "array",
      of: blockContent,
    }),
  ],
});
