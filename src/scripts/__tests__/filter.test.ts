import { describe, it, expect } from "vitest";
import {
  initKegiatanFilter,
  initProjectsFilter,
  renderPagination,
} from "../filter";
import {
  filterByCategory,
  filterBySearch,
  sortItems,
  paginateItems,
} from "../../lib/content/queryEngine";

describe("Filter, Search, Sort & Pagination Engine", () => {
  const mockDataset = [
    { title: "CodeQuest", kategori: "Website", date: "2026-03-01" },
    { title: "DECOMPE Portal", kategori: "Website", date: "2026-01-15" },
    { title: "Artakarsa Connect", kategori: "Mobile", date: "2026-02-10" },
    {
      title: "Smart Hydroponic",
      kategori: "IoT / Hardware",
      date: "2025-11-20",
    },
    { title: "Bot Telegram UKM", kategori: "Tool", date: "2025-08-05" },
  ];

  describe("Integration with Production queryEngine", () => {
    it("should filter items by category using production filterByCategory", () => {
      const websites = filterByCategory(
        mockDataset,
        "website",
        (i) => i.kategori,
      );
      expect(websites.length).toBe(2);
      expect(websites.every((i) => i.kategori === "Website")).toBe(true);

      const all = filterByCategory(mockDataset, "Semua", (i) => i.kategori);
      expect(all.length).toBe(5);
    });

    it("should filter items by search query using production filterBySearch", () => {
      const searchRes = filterBySearch(mockDataset, "quest", (i) => i.title);
      expect(searchRes.length).toBe(1);
      expect(searchRes[0].title).toBe("CodeQuest");
    });

    it("should sort items using production sortItems", () => {
      const sorted = sortItems(mockDataset, "Terbaru", (i) => ({
        date: i.date,
        title: i.title,
      }));
      expect(sorted[0].title).toBe("CodeQuest");
      expect(sorted[sorted.length - 1].title).toBe("Bot Telegram UKM");
    });

    it("should paginate items using production paginateItems", () => {
      const page1 = paginateItems(mockDataset, 1, 2);
      expect(page1.totalPages).toBe(3);
      expect(page1.paginated.length).toBe(2);
    });
  });

  describe("DOM Handlers SSR Safety", () => {
    it("should execute initKegiatanFilter safely in Node environment without throwing", () => {
      expect(() => initKegiatanFilter()).not.toThrow();
    });

    it("should execute initProjectsFilter safely in Node environment without throwing", () => {
      expect(() => initProjectsFilter()).not.toThrow();
    });

    it("should handle null or invalid container in renderPagination safely", () => {
      expect(() => renderPagination(null, 1, 5, () => {})).not.toThrow();
    });
  });
});
