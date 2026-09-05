import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("sanity:client", () => ({
  sanityClient: {
    fetch: vi.fn(),
  },
}));

import * as queries from "../queries";
import { fetchSanity } from "../client";
import { urlFor } from "../urlFor";
import { normalizeProject, normalizeEditorial } from "../transforms";

describe("Sanity Queries & Integration", () => {
  describe("GROQ Query Definitions", () => {
    it("should export valid siteSettingsQuery querying _type == 'siteSettings'", () => {
      expect(queries.siteSettingsQuery).toBeDefined();
      expect(queries.siteSettingsQuery).toContain('_type == "siteSettings"');
      expect(queries.siteSettingsQuery).toContain("email");
      expect(queries.siteSettingsQuery).toContain("instagram");
    });

    it("should export valid allEditorialsQuery with chronological ordering", () => {
      expect(queries.allEditorialsQuery).toBeDefined();
      expect(queries.allEditorialsQuery).toContain('_type == "editorial"');
      expect(queries.allEditorialsQuery).toContain('"slug": slug.current');
      expect(queries.allEditorialsQuery).toContain(
        "order(tanggalPublikasi desc)",
      );
    });

    it("should export valid editorialBySlugQuery with slug parameter filter", () => {
      expect(queries.editorialBySlugQuery).toBeDefined();
      expect(queries.editorialBySlugQuery).toContain('_type == "editorial"');
      expect(queries.editorialBySlugQuery).toContain("slug.current == $slug");
      expect(queries.editorialBySlugQuery).toContain("isi");
    });

    it("should export valid allProjectsQuery with year ordering", () => {
      expect(queries.allProjectsQuery).toBeDefined();
      expect(queries.allProjectsQuery).toContain('_type == "project"');
      expect(queries.allProjectsQuery).toContain('"slug": slug.current');
      expect(queries.allProjectsQuery).toContain("order(tahun desc");
      expect(queries.allProjectsQuery).toContain("techStack");
    });

    it("should export valid projectBySlugQuery with slug parameter filter", () => {
      expect(queries.projectBySlugQuery).toBeDefined();
      expect(queries.projectBySlugQuery).toContain('_type == "project"');
      expect(queries.projectBySlugQuery).toContain("slug.current == $slug");
      expect(queries.projectBySlugQuery).toContain("masalah");
      expect(queries.projectBySlugQuery).toContain("pendekatan");
      expect(queries.projectBySlugQuery).toContain("hasil");
    });

    it("should export valid partnersQuery filtering active partners", () => {
      expect(queries.partnersQuery).toBeDefined();
      expect(queries.partnersQuery).toContain('_type == "partner"');
      expect(queries.partnersQuery).toContain("aktif == true");
      expect(queries.partnersQuery).toContain("order(urutan asc)");
    });

    it("should export valid galleryQuery filtering featured gallery items", () => {
      expect(queries.galleryQuery).toBeDefined();
      expect(queries.galleryQuery).toContain('_type == "galleryItem"');
      expect(queries.galleryQuery).toContain("tampilDiBeranda == true");
      expect(queries.galleryQuery).toContain("order(urutan asc)");
    });
  });

  describe("fetchSanity Client Execution & Resilience", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should return null gracefully without throwing when unconfigured or in demo mode", async () => {
      const result = await fetchSanity(queries.siteSettingsQuery);
      // In local demo environment (default), it returns null and falls back to fixture
      expect(result === null || typeof result === "object").toBe(true);
    });

    it("should handle custom parameters safely", async () => {
      const result = await fetchSanity(queries.projectBySlugQuery, {
        slug: "codequest",
      });
      expect(result === null || typeof result === "object").toBe(true);
    });
  });

  describe("urlFor Image Builder Utility", () => {
    it("should safely handle null or empty source without crashing", () => {
      expect(() => urlFor(null)).not.toThrow();
      const res = urlFor(null);
      expect(res === null || typeof res === "object").toBe(true);
    });
  });

  describe("Sanity Data Normalization (transforms.ts)", () => {
    it("should normalize Sanity project into unified Project interface", () => {
      const rawSanityProject = {
        slug: "smart-campus",
        nama: "Smart Campus IoT",
        ringkasan: "Sistem otomasi kampus berbasis IoT",
        kategori: "IoT / Hardware",
        tahun: 2026,
        techStack: ["ESP32", "MQTT", "Node.js"],
        kontributor: "Divisi Riset",
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/ukmcoding/smart-campus",
        featured: true,
        masalah: "Kebutuhan efisiensi energi kampus",
        pendekatan: ["Implementasi sensor PIR", "Protokol MQTT"],
        hasil: ["Hemat energi hingga 30%"],
      };

      const normalized = normalizeProject(rawSanityProject);
      expect(normalized.slug).toBe("smart-campus");
      expect(normalized.title).toBe("Smart Campus IoT");
      expect(normalized.oneLiner).toBe("Sistem otomasi kampus berbasis IoT");
      expect(normalized.stack).toEqual(["ESP32", "MQTT", "Node.js"]);
      expect(normalized.repoUrl).toBe(
        "https://github.com/ukmcoding/smart-campus",
      );
      expect(normalized.featured).toBe(true);
      expect(normalized.masalah).toBe("Kebutuhan efisiensi energi kampus");
      expect(normalized.pendekatan).toHaveLength(2);
      expect(normalized.hasil).toHaveLength(1);
    });

    it("should fallback gracefully when project fields are missing or alternate naming is used", () => {
      const rawMinimal = {
        slug: "minimal-proj",
        title: "Fallback Title",
        oneLiner: "Fallback One Liner",
        stack: ["Astro"],
      };

      const normalized = normalizeProject(rawMinimal);
      expect(normalized.title).toBe("Fallback Title");
      expect(normalized.oneLiner).toBe("Fallback One Liner");
      expect(normalized.stack).toEqual(["Astro"]);
      expect(normalized.featured).toBe(false);
      expect(normalized.demoUrl).toBe("#");
      expect(normalized.repoUrl).toBe("#");
    });

    it("should throw an error when normalizing null or undefined", () => {
      expect(() => normalizeProject(null)).toThrow();
      expect(() => normalizeEditorial(undefined)).toThrow();
    });

    it("should normalize Sanity editorial post into unified Post interface", () => {
      const rawEditorial = {
        slug: "rekap-decompe-2026",
        judul: "Rekapitulasi DECOMPE 2026",
        tipe: "Berita",
        tanggalPublikasi: "2026-06-01",
        penulis: "Divisi Media",
        ringkasan: "DECOMPE 2026 sukses digelar dengan 40+ kampus",
        featured: true,
        baca: 4,
        isi: "Konten lengkap artikel...",
      };

      const normalized = normalizeEditorial(rawEditorial);
      expect(normalized.slug).toBe("rekap-decompe-2026");
      expect(normalized.title).toBe("Rekapitulasi DECOMPE 2026");
      expect(normalized.kategori).toBe("Berita");
      expect(normalized.tanggal).toBe("2026-06-01");
      expect(normalized.penulis).toBe("Divisi Media");
      expect(normalized.excerpt).toBe(
        "DECOMPE 2026 sukses digelar dengan 40+ kampus",
      );
      expect(normalized.featured).toBe(true);
      expect(normalized.baca).toBe(4);
      expect(normalized.body).toBe("Konten lengkap artikel...");
    });

    it("should normalize Sanity editorial post with division name author", () => {
      const rawEditorial = {
        slug: "workshop-react-2026",
        judul: "Workshop React Modern",
        tipe: "Kegiatan",
        tanggalPublikasi: "2026-07-10",
        penulis: "Divisi Web Development",
        ringkasan: "Belajar React dari dasar hingga mahir",
        featured: false,
        isi: "Konten workshop...",
      };

      const normalized = normalizeEditorial(rawEditorial);
      expect(normalized.penulis).toBe("Divisi Web Development");
    });
  });
});
