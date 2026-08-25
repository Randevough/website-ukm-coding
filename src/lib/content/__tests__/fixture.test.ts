import { describe, it, expect } from "vitest";
import { UKM_FIXTURE } from "../fixture";

describe("UKM_FIXTURE Content & Schema Integrity", () => {
  it("should contain all top-level required collections", () => {
    expect(UKM_FIXTURE).toBeDefined();
    expect(UKM_FIXTURE.settings).toBeDefined();
    expect(Array.isArray(UKM_FIXTURE.stats)).toBe(true);
    expect(Array.isArray(UKM_FIXTURE.press)).toBe(true);
    expect(Array.isArray(UKM_FIXTURE.pillars)).toBe(true);
    expect(Array.isArray(UKM_FIXTURE.divisions)).toBe(true);
    expect(Array.isArray(UKM_FIXTURE.projects)).toBe(true);
    expect(Array.isArray(UKM_FIXTURE.posts)).toBe(true);
    expect(Array.isArray(UKM_FIXTURE.partners)).toBe(true);
    expect(Array.isArray(UKM_FIXTURE.instagram)).toBe(true);
  });

  describe("Site Settings", () => {
    it("should have valid organizational details and contact information", () => {
      const { settings } = UKM_FIXTURE;
      expect(settings.nama).toBe("UKM Coding Cyber University");
      expect(settings.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(settings.instagram).toMatch(/^@[\w.]+/);
      expect(settings.instagramUrl).toMatch(/^https?:\/\//);
      expect(settings.linkedinUrl).toMatch(/^https?:\/\//);
      expect(settings.github).toContain("github.com");
    });
  });

  describe("Proof Stats & Press Coverage", () => {
    it("should have 4 valid proof stats with positive numerical values", () => {
      expect(UKM_FIXTURE.stats.length).toBe(4);
      UKM_FIXTURE.stats.forEach((stat) => {
        expect(typeof stat.value).toBe("number");
        expect(stat.value).toBeGreaterThan(0);
        expect(typeof stat.label).toBe("string");
        expect(stat.label.trim().length).toBeGreaterThan(0);
      });
    });

    it("should contain valid press articles with valid URLs", () => {
      expect(UKM_FIXTURE.press.length).toBeGreaterThan(0);
      UKM_FIXTURE.press.forEach((item) => {
        expect(item.name).toBeTruthy();
        expect(item.note).toBeTruthy();
        expect(item.url).toMatch(/^https?:\/\//);
      });
    });
  });

  describe("Projects Schema & Uniqueness", () => {
    it("should contain properly structured projects with all required metadata", () => {
      expect(UKM_FIXTURE.projects.length).toBeGreaterThan(0);
      const validVariants = ["blue", "mix", "orange", "neutral"];

      UKM_FIXTURE.projects.forEach((proj) => {
        expect(proj.slug).toMatch(/^[a-z0-9-]+$/);
        expect(proj.title).toBeTruthy();
        expect(proj.kategori).toBeTruthy();
        expect(typeof proj.tahun).toBe("number");
        expect(proj.oneLiner).toBeTruthy();
        expect(Array.isArray(proj.stack)).toBe(true);
        expect(proj.stack.length).toBeGreaterThan(0);
        expect(validVariants).toContain(proj.variant);
        expect(proj.masalah).toBeTruthy();
        expect(proj.pendekatan).toBeTruthy();
        expect(proj.hasil).toBeTruthy();
      });
    });

    it("should have unique slugs across all projects with no collisions", () => {
      const slugs = UKM_FIXTURE.projects.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it("should have at least one featured project", () => {
      const featured = UKM_FIXTURE.projects.filter((p) => p.featured);
      expect(featured.length).toBeGreaterThan(0);
    });
  });

  describe("Editorial / Posts Schema & Uniqueness", () => {
    it("should contain properly structured editorial posts", () => {
      expect(UKM_FIXTURE.posts.length).toBeGreaterThan(0);
      const validVariants = ["blue", "mix", "orange", "neutral"];

      UKM_FIXTURE.posts.forEach((post) => {
        expect(post.slug).toMatch(/^[a-z0-9-]+$/);
        expect(post.title).toBeTruthy();
        expect(post.kategori).toBeTruthy();
        expect(post.tanggal).toBeTruthy();
        expect(post.penulis).toBeTruthy();
        expect(post.excerpt).toBeTruthy();
        expect(validVariants).toContain(post.variant);
        expect(typeof post.baca).toBe("number");
        expect(post.baca).toBeGreaterThan(0);
      });
    });

    it("should have unique slugs across all posts with no collisions", () => {
      const slugs = UKM_FIXTURE.posts.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it("should have at least one featured editorial post for Sorotan", () => {
      const featured = UKM_FIXTURE.posts.filter((p) => p.featured);
      expect(featured.length).toBeGreaterThan(0);
    });
  });

  describe("Partners & Divisions", () => {
    it("should contain active partners with valid names and tiers", () => {
      expect(UKM_FIXTURE.partners.length).toBeGreaterThan(0);
      UKM_FIXTURE.partners.forEach((partner) => {
        expect(partner.nama).toBeTruthy();
        expect(partner.tier).toBeTruthy();
      });
    });

    it("should contain valid division definitions", () => {
      expect(UKM_FIXTURE.divisions.length).toBeGreaterThan(0);
      UKM_FIXTURE.divisions.forEach((div) => {
        expect(div.name).toBeTruthy();
        expect(div.text).toBeTruthy();
        expect(Array.isArray(div.focus)).toBe(true);
        expect(div.focus.length).toBeGreaterThan(0);
      });
    });
  });
});
