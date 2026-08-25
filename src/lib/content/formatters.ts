/**
 * Content Formatters & Utilities
 */

const BULAN_INDONESIA = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/**
 * Formats a Date object, ISO string, or timestamp into human-readable Indonesian date:
 * e.g., "15 Januari 2026" or "Januari 2026"
 */
export function formatIndonesianDate(
  dateInput: string | number | Date | null | undefined,
  includeDay: boolean = true,
): string {
  if (!dateInput) return "";

  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";

  const day = d.getDate();
  const month = BULAN_INDONESIA[d.getMonth()];
  const year = d.getFullYear();

  if (!month) return "";

  return includeDay ? `${day} ${month} ${year}` : `${month} ${year}`;
}

/**
 * Calculates estimated reading time in minutes based on text length.
 * Standard average reading speed: 200 words per minute.
 */
export function calculateReadingTime(
  content: string | null | undefined,
  wordsPerMinute: number = 200,
): number {
  if (!content || typeof content !== "string") {
    return 1;
  }

  const cleanText = content.replace(/<[^>]*>/g, " ").trim();
  if (!cleanText) return 1;

  const words = cleanText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Converts a title string into a URL-friendly slug.
 */
export function slugify(text: string): string {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars except hyphen
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}
