import { createClient } from "@sanity/client";
import { UKM_FIXTURE } from "../src/lib/content/fixture.js";
import * as dotenv from "dotenv";

dotenv.config();

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_SECRET_TOKEN;

if (!projectId || projectId === "demo" || !token) {
  console.error(
    "Missing PUBLIC_SANITY_PROJECT_ID or SANITY_SECRET_TOKEN in .env",
  );
  console.error("Skipping seed process.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: "2026-08-19",
});

function toBlock(text: string) {
  return {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text }],
  };
}

function toBlockList(items: string[]) {
  return items.map((text) => ({
    _type: "block",
    style: "normal",
    listItem: "bullet",
    children: [{ _type: "span", text }],
  }));
}

async function main() {
  console.log("Seeding data to Sanity...");
  const { settings, projects, posts, partners, stats } = UKM_FIXTURE;

  // 1. Site Settings
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    namaSitus: settings.nama,
    deskripsiSingkat: settings.tagline,
    email: settings.email,
    instagramUrl: settings.instagramUrl,
    linkedinUrl: settings.linkedinUrl,
    githubUrl:
      settings.github !== "#" ? `https://${settings.github}` : undefined,
    tahunBerdiri: settings.tahunBerdiri || undefined,
    statistik: stats.map((s) => ({
      _key: s.label,
      label: s.label,
      value: s.value,
      suffix: s.suffix,
    })),
  });
  console.log("✅ Site Settings");

  // 2. Projects
  for (const p of projects) {
    const masalahBlock = Array.isArray(p.masalah)
      ? toBlockList(p.masalah)
      : [toBlock(p.masalah)];
    const pendekatanBlock = Array.isArray(p.pendekatan)
      ? toBlockList(p.pendekatan)
      : [toBlock(p.pendekatan)];
    const hasilBlock = Array.isArray(p.hasil)
      ? toBlockList(p.hasil)
      : [toBlock(p.hasil)];

    await client.createOrReplace({
      _id: `project-${p.slug}`,
      _type: "project",
      nama: `[FIXTURE] ${p.title}`,
      slug: { current: p.slug },
      ringkasan: p.oneLiner,
      kategori: p.kategori,
      status: p.status,
      featured: p.featured,
      tahun: p.tahun,
      techStack: p.stack,
      kontributor: p.kontributor,
      githubUrl: p.repoUrl !== "#" ? p.repoUrl : undefined,
      demoUrl: p.demoUrl !== "#" ? p.demoUrl : undefined,
      masalah: masalahBlock,
      pendekatan: pendekatanBlock,
      hasil: hasilBlock,
    });
  }
  console.log(`✅ Projects (${projects.length})`);

  // 3. Editorial (Posts)
  for (const p of posts) {
    await client.createOrReplace({
      _id: `editorial-${p.slug}`,
      _type: "editorial",
      judul: `[FIXTURE] ${p.title}`,
      slug: { current: p.slug },
      tipe: p.kategori,
      ringkasan: p.excerpt,
      isi: [toBlock((p as any).body || p.excerpt)],
      tanggalPublikasi: p.tanggal,
      penulis: p.penulis,
      featured: p.featured,
      tanggalMulai: p.fact?.tanggalAcara || undefined,
      lokasi: p.fact?.format || undefined,
    });
  }
  console.log(`✅ Editorials (${posts.length})`);

  console.log("Seeding completed successfully!");
}

main().catch(console.error);
