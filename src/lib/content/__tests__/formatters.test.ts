import { describe, it, expect } from "vitest";
import {
  formatIndonesianDate,
  calculateReadingTime,
  slugify,
} from "../formatters";

describe("Content Formatters & String Utilities", () => {
  describe("formatIndonesianDate", () => {
    it("should format ISO date strings to Indonesian full date", () => {
      expect(formatIndonesianDate("2026-01-15T00:00:00.000Z")).toBe(
        "15 Januari 2026",
      );
      expect(formatIndonesianDate("2026-08-17")).toBe("17 Agustus 2026");
      expect(formatIndonesianDate("2025-12-31")).toBe("31 Desember 2025");
    });

    it("should format month and year only when includeDay is false", () => {
      expect(formatIndonesianDate("2026-03-01", false)).toBe("Maret 2026");
      expect(formatIndonesianDate("2025-11-20", false)).toBe("November 2025");
    });

    it("should handle Date objects and numeric timestamps", () => {
      const d = new Date(2026, 4, 10); // May 10, 2026
      expect(formatIndonesianDate(d)).toBe("10 Mei 2026");

      const timestamp = new Date(2026, 0, 1).getTime();
      expect(formatIndonesianDate(timestamp)).toBe("1 Januari 2026");
    });

    it("should return empty string for null, undefined, or invalid date values", () => {
      expect(formatIndonesianDate(null)).toBe("");
      expect(formatIndonesianDate(undefined)).toBe("");
      expect(formatIndonesianDate("")).toBe("");
      expect(formatIndonesianDate("invalid-date-string")).toBe("");
    });
  });

  describe("calculateReadingTime", () => {
    it("should return minimum 1 minute for short or empty text", () => {
      expect(calculateReadingTime("")).toBe(1);
      expect(calculateReadingTime(null)).toBe(1);
      expect(calculateReadingTime(undefined)).toBe(1);
      expect(calculateReadingTime("Hello world")).toBe(1);
    });

    it("should calculate reading time proportionally based on word count", () => {
      // 400 words at 200 wpm = 2 minutes
      const words400 = Array(400).fill("kata").join(" ");
      expect(calculateReadingTime(words400)).toBe(2);

      // 450 words at 200 wpm = ceil(2.25) = 3 minutes
      const words450 = Array(450).fill("kata").join(" ");
      expect(calculateReadingTime(words450)).toBe(3);
    });

    it("should strip HTML tags before counting words", () => {
      const htmlContent = `
        <article>
          <h1>Judul Artikel</h1>
          <p>Paragraf pertama dengan beberapa kata penting.</p>
          <div><p>Paragraf kedua untuk penjelas.</p></div>
        </article>
      `;
      const time = calculateReadingTime(htmlContent);
      expect(time).toBe(1);
    });
  });

  describe("slugify", () => {
    it("should transform title strings to lowercase kebab-case", () => {
      expect(slugify("DECOMPE 2026: Kompetisi Nasional")).toBe(
        "decompe-2026-kompetisi-nasional",
      );
      expect(slugify("Workshop Web & Mobile Development")).toBe(
        "workshop-web-mobile-development",
      );
      expect(slugify("  Spaced   Title   With   Extra   Spaces  ")).toBe(
        "spaced-title-with-extra-spaces",
      );
    });

    it("should remove special characters and symbols", () => {
      expect(slugify("Belajar React + Astro (100% Praktis!)")).toBe(
        "belajar-react-astro-100-praktis",
      );
    });

    it("should return empty string for empty input", () => {
      expect(slugify("")).toBe("");
      expect(slugify(null as any)).toBe("");
    });
  });
});
