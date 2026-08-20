import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description:
        "Judul halaman untuk mesin pencari (opsional, default ke judul utama)",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Deskripsi singkat untuk hasil pencarian (150-160 karakter)",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Gambar saat dibagikan ke media sosial",
    }),
    defineField({
      name: "noIndex",
      title: "Sembunyikan dari mesin pencari (noindex)",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
