import { describe, it, expect } from "vitest";
import { schemaTypes } from "../index";
import { editorial } from "../editorial";
import { project } from "../project";
import { siteSettings } from "../siteSettings";
import { partner } from "../partner";
import { galleryItem } from "../galleryItem";
import { division } from "../division";

describe("Sanity CMS Schema Definitions", () => {
  it("should register all 6 required core schemas in schemaTypes", () => {
    expect(schemaTypes).toBeDefined();
    expect(schemaTypes.length).toBe(6);

    const schemaNames = schemaTypes.map((s: any) => s.name);
    expect(schemaNames).toContain("siteSettings");
    expect(schemaNames).toContain("editorial");
    expect(schemaNames).toContain("project");
    expect(schemaNames).toContain("galleryItem");
    expect(schemaNames).toContain("partner");
    expect(schemaNames).toContain("division");
  });

  describe("Editorial Schema", () => {
    it("should define a document type with all required editorial fields", () => {
      expect(editorial.name).toBe("editorial");
      expect(editorial.type).toBe("document");

      const fieldNames = editorial.fields.map((f: any) => f.name);
      expect(fieldNames).toContain("judul");
      expect(fieldNames).toContain("slug");
      expect(fieldNames).toContain("tipe");
      expect(fieldNames).toContain("ringkasan");
      expect(fieldNames).toContain("isi");
      expect(fieldNames).toContain("cover");
      expect(fieldNames).toContain("tanggalPublikasi");
      expect(fieldNames).toContain("divisiPenulis");
      expect(fieldNames).toContain("penulisKustom");
      expect(fieldNames).toContain("penulis");
      expect(fieldNames).toContain("featured");
    });
  });

  describe("Project Schema", () => {
    it("should define a document type with case study and technical stack fields", () => {
      expect(project.name).toBe("project");
      expect(project.type).toBe("document");

      const fieldNames = project.fields.map((f: any) => f.name);
      expect(fieldNames).toContain("nama");
      expect(fieldNames).toContain("slug");
      expect(fieldNames).toContain("ringkasan");
      expect(fieldNames).toContain("kategori");
      expect(fieldNames).toContain("tahun");
      expect(fieldNames).toContain("techStack");
      expect(fieldNames).toContain("kontributor");
      expect(fieldNames).toContain("masalah");
      expect(fieldNames).toContain("pendekatan");
      expect(fieldNames).toContain("hasil");
    });
  });

  describe("Site Settings Schema", () => {
    it("should define active global settings fields", () => {
      expect(siteSettings.name).toBe("siteSettings");
      expect(siteSettings.type).toBe("document");

      const fieldNames = siteSettings.fields.map((f: any) => f.name);
      expect(fieldNames).toContain("namaSitus");
      expect(fieldNames).toContain("deskripsiSingkat");
      expect(fieldNames).toContain("email");
      expect(fieldNames).toContain("instagramUrl");
      expect(fieldNames).toContain("linkedinUrl");
      expect(fieldNames).toContain("proposalMediaPartner");
    });
  });

  describe("Partner & Gallery Schemas", () => {
    it("should define partner document with logo permissions and ordering", () => {
      expect(partner.name).toBe("partner");
      const fieldNames = partner.fields.map((f: any) => f.name);
      expect(fieldNames).toContain("nama");
      expect(fieldNames).toContain("tipe");
      expect(fieldNames).toContain("aktif");
      expect(fieldNames).toContain("urutan");
    });

    it("should define gallery item document with homepage visibility", () => {
      expect(galleryItem.name).toBe("galleryItem");
      const fieldNames = galleryItem.fields.map((f: any) => f.name);
      expect(fieldNames).toContain("gambar");
      expect(fieldNames).toContain("alt");
      expect(fieldNames).toContain("tampilDiBeranda");
    });
  });

  describe("Division Schema", () => {
    it("should define a division document with name and active status", () => {
      expect(division.name).toBe("division");
      expect(division.type).toBe("document");
      const fieldNames = division.fields.map((f: any) => f.name);
      expect(fieldNames).toContain("nama");
      expect(fieldNames).toContain("aktif");
      expect(fieldNames).toContain("urutan");
    });
  });
});
