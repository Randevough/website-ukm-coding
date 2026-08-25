/**
 * Query, Filter, Sort & Pagination Pure Engine
 *
 * Provides pure, deterministic filtering, multi-field search, sorting,
 * and clamped pagination logic without any DOM or browser dependencies.
 */

export interface PaginationResult<T> {
  paginated: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export type SortMode = "Terbaru" | "Terlama" | "Nama A–Z";

/**
 * Filter items by category (case-insensitive).
 * If category is "Semua", returns all items.
 */
export function filterByCategory<T>(
  items: T[],
  category: string = "Semua",
  getCategory: (item: T) => string,
): T[] {
  if (
    !category ||
    !category.trim() ||
    category.trim().toLowerCase() === "semua"
  ) {
    return items;
  }

  const target = category.trim().toLowerCase();
  return items.filter((item) => {
    const itemCat = getCategory(item);
    return Boolean(itemCat && itemCat.trim().toLowerCase() === target);
  });
}

/**
 * Filter items by search query across multiple extracted fields.
 * Performs case-insensitive substring matching.
 */
export function filterBySearch<T>(
  items: T[],
  searchQuery: string,
  getSearchText: (
    item: T,
  ) => string | (string | undefined | null)[] | undefined,
): T[] {
  const query = (searchQuery || "").trim().toLowerCase();
  if (!query) {
    return items;
  }

  return items.filter((item) => {
    const extracted = getSearchText(item);
    if (!extracted) return false;

    if (Array.isArray(extracted)) {
      return extracted.some((val) => val && val.toLowerCase().includes(query));
    }

    return extracted.toLowerCase().includes(query);
  });
}

/**
 * Sort items based on date or title:
 * - 'Terbaru': newest date first
 * - 'Terlama': oldest date first
 * - 'Nama A–Z': alphabetical ascending
 */
export function sortItems<T>(
  items: T[],
  sortMode: SortMode | string = "Terbaru",
  getSortFields: (item: T) => {
    date?: string | number | Date | null;
    title?: string | null;
  },
): T[] {
  const cloned = [...items];

  cloned.sort((a, b) => {
    const fieldsA = getSortFields(a);
    const fieldsB = getSortFields(b);

    if (sortMode === "Nama A–Z") {
      const titleA = (fieldsA.title || "").trim();
      const titleB = (fieldsB.title || "").trim();
      return titleA.localeCompare(titleB, "id", { sensitivity: "base" });
    }

    const timeA = fieldsA.date ? new Date(fieldsA.date).getTime() : 0;
    const timeB = fieldsB.date ? new Date(fieldsB.date).getTime() : 0;

    if (sortMode === "Terlama") {
      return timeA - timeB;
    }

    // Default 'Terbaru'
    return timeB - timeA;
  });

  return cloned;
}

/**
 * Paginate items array with strict bounds clamping.
 * Page numbers < 1 are clamped to 1.
 * Page numbers > totalPages are clamped to totalPages.
 * If itemsPerPage <= 0, defaults to 10.
 */
export function paginateItems<T>(
  items: T[],
  page: number = 1,
  itemsPerPage: number = 10,
): PaginationResult<T> {
  const validItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 10;
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / validItemsPerPage));

  let clampedPage = Math.floor(page);
  if (isNaN(clampedPage) || clampedPage < 1) {
    clampedPage = 1;
  } else if (clampedPage > totalPages) {
    clampedPage = totalPages;
  }

  const start = (clampedPage - 1) * validItemsPerPage;
  const paginated = items.slice(start, start + validItemsPerPage);

  return {
    paginated,
    currentPage: clampedPage,
    totalPages,
    totalItems,
    hasPrev: clampedPage > 1,
    hasNext: clampedPage < totalPages,
  };
}
