import { describe, it, expect } from "vitest";
import {
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateEventSchema,
} from "../schema";
import {
  resolveBaseUrl,
  resolveCanonicalUrl,
  resolveOgImage,
  buildMetaTags,
  DEFAULT_SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "../meta";

describe("SEO Utilities & Structured Data Generators", () => {
  describe("Schema Generators (JSON-LD)", () => {
    it("should generate compliant Organization schema", () => {
      const schema = generateOrganizationSchema({
        siteName: "UKM Coding Cyber University",
        url: "https://ukmcoding.cyber-univ.ac.id",
        logo: "https://ukmcoding.cyber-univ.ac.id/og-default.jpg",
      });

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Organization");
      expect(schema.name).toBe("UKM Coding Cyber University");
      expect(schema.url).toBe("https://ukmcoding.cyber-univ.ac.id");
      expect(schema.logo).toBe(
        "https://ukmcoding.cyber-univ.ac.id/og-default.jpg",
      );
    });

    it("should generate compliant Article schema with nested author and publisher", () => {
      const schema = generateArticleSchema({
        headline: "Bootcamp Web Development 2026",
        datePublished: "2026-03-01T10:00:00.000Z",
        authorName: "Divisi Program Development",
        siteName: "UKM Coding Cyber University",
        logo: "https://ukmcoding.cyber-univ.ac.id/logo.png",
      });

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Article");
      expect(schema.headline).toBe("Bootcamp Web Development 2026");
      expect(schema.datePublished).toBe("2026-03-01T10:00:00.000Z");
      expect(schema.author).toEqual({
        "@type": "Person",
        name: "Divisi Program Development",
      });
      expect(schema.publisher).toEqual({
        "@type": "Organization",
        name: "UKM Coding Cyber University",
        logo: {
          "@type": "ImageObject",
          url: "https://ukmcoding.cyber-univ.ac.id/logo.png",
        },
      });
    });

    it("should generate compliant BreadcrumbList schema with 1-based indexing", () => {
      const breadcrumbs = [
        { name: "Beranda", item: "https://ukmcoding.cyber-univ.ac.id" },
        {
          name: "Kegiatan",
          item: "https://ukmcoding.cyber-univ.ac.id/kegiatan",
        },
        {
          name: "DECOMPE 2026",
          item: "https://ukmcoding.cyber-univ.ac.id/kegiatan/decompe-2026",
        },
      ];

      const schema = generateBreadcrumbSchema(breadcrumbs);
      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0]).toEqual({
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: "https://ukmcoding.cyber-univ.ac.id",
      });
      expect(schema.itemListElement[2].position).toBe(3);
    });

    it("should generate compliant Event schema with optional fields", () => {
      const schema = generateEventSchema({
        name: "DECOMPE 2026 Grand Final",
        startDate: "2026-05-20T09:00:00Z",
        endDate: "2026-05-20T17:00:00Z",
        location: "Auditorium Cyber University",
        siteName: "UKM Coding Cyber University",
        siteUrl: "https://ukmcoding.cyber-univ.ac.id",
      });

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Event");
      expect(schema.name).toBe("DECOMPE 2026 Grand Final");
      expect(schema.startDate).toBe("2026-05-20T09:00:00Z");
      expect(schema.endDate).toBe("2026-05-20T17:00:00Z");
      expect(schema.location.name).toBe("Auditorium Cyber University");
      expect(schema.organizer.name).toBe("UKM Coding Cyber University");
    });
  });

  describe("Metadata & URL Resolvers", () => {
    it("should resolve base URLs cleanly without trailing slashes", () => {
      expect(resolveBaseUrl("https://example.com/")).toBe(
        "https://example.com",
      );
      expect(resolveBaseUrl("https://example.com")).toBe("https://example.com");
      expect(resolveBaseUrl(undefined, "http://localhost:4321/")).toBe(
        "http://localhost:4321",
      );
      expect(resolveBaseUrl(undefined, undefined)).toBe(
        "https://ukmcoding.site",
      );
    });

    it("should resolve canonical URLs properly", () => {
      expect(resolveCanonicalUrl("https://custom-canonical.com")).toBe(
        "https://custom-canonical.com",
      );
      expect(
        resolveCanonicalUrl(undefined, "/kegiatan", "https://example.com"),
      ).toBe("https://example.com/kegiatan");
      expect(
        resolveCanonicalUrl(undefined, "projects", "https://example.com"),
      ).toBe("https://example.com/projects");
    });

    it("should resolve OpenGraph image paths with fallbacks and full URLs", () => {
      expect(resolveOgImage(undefined, "https://example.com")).toBe(
        `https://example.com${DEFAULT_OG_IMAGE}`,
      );
      expect(
        resolveOgImage(
          "https://cdn.sanity.io/image.jpg",
          "https://example.com",
        ),
      ).toBe("https://cdn.sanity.io/image.jpg");
      expect(
        resolveOgImage("/images/custom-og.png", "https://example.com"),
      ).toBe("https://example.com/images/custom-og.png");
      expect(
        resolveOgImage("images/custom-og.png", "https://example.com"),
      ).toBe("https://example.com/images/custom-og.png");
    });

    it("should build complete meta tags bundle with default fallbacks", () => {
      const meta = buildMetaTags({
        pathname: "/kegiatan",
        site: "https://ukmcoding.cyber-univ.ac.id",
      });

      expect(meta.title).toBe(DEFAULT_SITE_NAME);
      expect(meta.description).toBe(DEFAULT_DESCRIPTION);
      expect(meta.canonicalUrl).toBe(
        "https://ukmcoding.cyber-univ.ac.id/kegiatan",
      );
      expect(meta.ogImage).toBe(
        `https://ukmcoding.cyber-univ.ac.id${DEFAULT_OG_IMAGE}`,
      );
      expect(meta.noindex).toBe(false);
    });

    it("should respect explicit meta options overrides", () => {
      const meta = buildMetaTags({
        title: "DECOMPE 2026 | UKM Coding",
        description: "Kompetisi teknologi mahasiswa Cyber University",
        image: "https://cdn.sanity.io/cover.jpg",
        canonical: "https://ukmcoding.cyber-univ.ac.id/custom-decompe",
        noindex: true,
      });

      expect(meta.title).toBe("DECOMPE 2026 | UKM Coding");
      expect(meta.description).toBe(
        "Kompetisi teknologi mahasiswa Cyber University",
      );
      expect(meta.canonicalUrl).toBe(
        "https://ukmcoding.cyber-univ.ac.id/custom-decompe",
      );
      expect(meta.ogImage).toBe("https://cdn.sanity.io/cover.jpg");
      expect(meta.noindex).toBe(true);
    });
  });
});
