import { describe, it, expect } from "vitest";
import {
  filterByCategory,
  filterBySearch,
  sortItems,
  paginateItems,
} from "../queryEngine";

interface TestItem {
  id: number;
  title: string;
  category: string;
  date: string;
  tags?: string[];
}

const testItems: TestItem[] = [
  {
    id: 1,
    title: "CodeQuest Platform",
    category: "Website",
    date: "2026-03-01",
    tags: ["astro", "react"],
  },
  {
    id: 2,
    title: "DECOMPE Portal",
    category: "Website",
    date: "2026-01-15",
    tags: ["competition", "nextjs"],
  },
  {
    id: 3,
    title: "Artakarsa Mobile Connect",
    category: "Mobile",
    date: "2026-02-10",
    tags: ["flutter", "dart"],
  },
  {
    id: 4,
    title: "Smart Hydroponic IoT",
    category: "IoT / Hardware",
    date: "2025-11-20",
    tags: ["arduino", "c++"],
  },
  {
    id: 5,
    title: "Bot Telegram UKM",
    category: "Tool",
    date: "2025-08-05",
    tags: ["python", "bot"],
  },
];

describe("Query Engine (Pure Business Logic)", () => {
  describe("filterByCategory", () => {
    it("should return all items when category is 'Semua', undefined, or empty", () => {
      expect(
        filterByCategory(testItems, "Semua", (i) => i.category),
      ).toHaveLength(5);
      expect(
        filterByCategory(testItems, "semua", (i) => i.category),
      ).toHaveLength(5);
      expect(filterByCategory(testItems, "", (i) => i.category)).toHaveLength(
        5,
      );
      expect(filterByCategory(testItems, "  ", (i) => i.category)).toHaveLength(
        5,
      );
    });

    it("should filter items by category case-insensitively and trim spaces", () => {
      const websites = filterByCategory(
        testItems,
        "website",
        (i) => i.category,
      );
      expect(websites).toHaveLength(2);
      expect(websites.map((w) => w.id)).toEqual([1, 2]);

      const mobile = filterByCategory(testItems, " Mobile ", (i) => i.category);
      expect(mobile).toHaveLength(1);
      expect(mobile[0].title).toBe("Artakarsa Mobile Connect");
    });

    it("should return empty array when no items match category", () => {
      const res = filterByCategory(
        testItems,
        "Nonexistent Category",
        (i) => i.category,
      );
      expect(res).toHaveLength(0);
    });

    it("should handle empty dataset safely", () => {
      const res = filterByCategory([], "Website", (i: any) => i.category);
      expect(res).toEqual([]);
    });
  });

  describe("filterBySearch", () => {
    it("should return all items when query is empty or whitespace", () => {
      expect(filterBySearch(testItems, "", (i) => i.title)).toHaveLength(5);
      expect(filterBySearch(testItems, "   ", (i) => i.title)).toHaveLength(5);
    });

    it("should perform case-insensitive substring search on single string field", () => {
      const result = filterBySearch(testItems, "quest", (i) => i.title);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("CodeQuest Platform");
    });

    it("should perform multi-field search when array of strings is returned", () => {
      const result = filterBySearch(testItems, "flutter", (i) => [
        i.title,
        ...(i.tags || []),
      ]);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(3);

      const multiMatch = filterBySearch(testItems, "competition", (i) => [
        i.title,
        ...(i.tags || []),
      ]);
      expect(multiMatch).toHaveLength(1);
      expect(multiMatch[0].title).toBe("DECOMPE Portal");
    });

    it("should return empty array when query does not match any items", () => {
      const result = filterBySearch(testItems, "xyz999", (i) => i.title);
      expect(result).toHaveLength(0);
    });

    it("should safely handle null/undefined fields returned by extractor", () => {
      const dirtyItems = [
        { id: 1, title: null as any },
        { id: 2, title: "Valid Title" },
      ];
      const result = filterBySearch(dirtyItems, "valid", (i) => i.title);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(2);
    });
  });

  describe("sortItems", () => {
    it("should sort items by newest date for 'Terbaru' (default)", () => {
      const sorted = sortItems(testItems, "Terbaru", (i) => ({
        date: i.date,
        title: i.title,
      }));
      expect(sorted[0].id).toBe(1); // 2026-03-01
      expect(sorted[1].id).toBe(3); // 2026-02-10
      expect(sorted[2].id).toBe(2); // 2026-01-15
      expect(sorted[3].id).toBe(4); // 2025-11-20
      expect(sorted[4].id).toBe(5); // 2025-08-05
    });

    it("should sort items by oldest date for 'Terlama'", () => {
      const sorted = sortItems(testItems, "Terlama", (i) => ({
        date: i.date,
        title: i.title,
      }));
      expect(sorted[0].id).toBe(5); // 2025-08-05
      expect(sorted[sorted.length - 1].id).toBe(1); // 2026-03-01
    });

    it("should sort items alphabetically for 'Nama A–Z'", () => {
      const sorted = sortItems(testItems, "Nama A–Z", (i) => ({
        title: i.title,
      }));
      const titles = sorted.map((s) => s.title);
      expect(titles).toEqual([
        "Artakarsa Mobile Connect",
        "Bot Telegram UKM",
        "CodeQuest Platform",
        "DECOMPE Portal",
        "Smart Hydroponic IoT",
      ]);
    });

    it("should not mutate original array during sorting", () => {
      const originalFirstId = testItems[0].id;
      sortItems(testItems, "Terlama", (i) => ({ date: i.date }));
      expect(testItems[0].id).toBe(originalFirstId);
    });

    it("should handle invalid or missing dates gracefully without crashing", () => {
      const unkItems = [
        { id: 1, title: "A", date: "invalid-date" },
        { id: 2, title: "B", date: "2026-01-01" },
        { id: 3, title: "C", date: null as any },
      ];
      expect(() =>
        sortItems(unkItems, "Terbaru", (i) => ({ date: i.date })),
      ).not.toThrow();
    });
  });

  describe("paginateItems", () => {
    const list = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

    it("should correctly partition items, calculate pages, and provide navigation flags", () => {
      const page1 = paginateItems(list, 1, 10);
      expect(page1.currentPage).toBe(1);
      expect(page1.totalPages).toBe(3);
      expect(page1.totalItems).toBe(25);
      expect(page1.paginated).toHaveLength(10);
      expect(page1.paginated[0].id).toBe(1);
      expect(page1.paginated[9].id).toBe(10);
      expect(page1.hasPrev).toBe(false);
      expect(page1.hasNext).toBe(true);

      const page2 = paginateItems(list, 2, 10);
      expect(page2.currentPage).toBe(2);
      expect(page2.paginated).toHaveLength(10);
      expect(page2.paginated[0].id).toBe(11);
      expect(page2.hasPrev).toBe(true);
      expect(page2.hasNext).toBe(true);

      const page3 = paginateItems(list, 3, 10);
      expect(page3.currentPage).toBe(3);
      expect(page3.paginated).toHaveLength(5);
      expect(page3.paginated[4].id).toBe(25);
      expect(page3.hasPrev).toBe(true);
      expect(page3.hasNext).toBe(false);
    });

    it("should clamp invalid and out-of-range page numbers", () => {
      const overflow = paginateItems(list, 100, 10);
      expect(overflow.currentPage).toBe(3);
      expect(overflow.paginated).toHaveLength(5);

      const underflow = paginateItems(list, -5, 10);
      expect(underflow.currentPage).toBe(1);
      expect(underflow.paginated[0].id).toBe(1);

      const zero = paginateItems(list, 0, 10);
      expect(zero.currentPage).toBe(1);

      const nanPage = paginateItems(list, NaN, 10);
      expect(nanPage.currentPage).toBe(1);
    });

    it("should handle empty array with totalPages = 1 and empty paginated slice", () => {
      const empty = paginateItems([], 1, 10);
      expect(empty.totalItems).toBe(0);
      expect(empty.totalPages).toBe(1);
      expect(empty.paginated).toEqual([]);
      expect(empty.hasPrev).toBe(false);
      expect(empty.hasNext).toBe(false);
    });

    it("should default invalid itemsPerPage to 10", () => {
      const res = paginateItems(list, 1, 0);
      expect(res.paginated).toHaveLength(10);
      const resNeg = paginateItems(list, 1, -5);
      expect(resNeg.paginated).toHaveLength(10);
    });
  });
});
