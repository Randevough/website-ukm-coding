/**
 * Safe link resolution and security sanitization for PortableText marks and user-supplied URLs.
 */

export interface ResolvedLink {
  href: string;
  isExternal: boolean;
  isMailOrTel: boolean;
}

export interface ResolvedLinkAttributes {
  href: string;
  target?: string;
  rel?: string;
}

/**
 * Parses and sanitizes a raw URL to prevent XSS, normalize protocols, and identify link targets.
 */
export function resolveLink(rawHref: unknown): ResolvedLink {
  if (typeof rawHref !== "string") {
    return { href: "#", isExternal: false, isMailOrTel: false };
  }

  const raw = rawHref.trim();
  if (!raw || raw === "#") {
    return { href: "#", isExternal: false, isMailOrTel: false };
  }

  // Neutralize dangerous protocols to prevent XSS (javascript:, data:, vbscript:, file:)
  const lower = raw.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("file:")
  ) {
    return { href: "#", isExternal: false, isMailOrTel: false };
  }

  // Contact protocols (mailto:, tel:)
  if (lower.startsWith("mailto:") || lower.startsWith("tel:")) {
    return { href: raw, isExternal: false, isMailOrTel: true };
  }

  // Bare email address auto-detection (e.g. ukmcoding@cyber-univ.ac.id)
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
    return { href: `mailto:${raw}`, isExternal: false, isMailOrTel: true };
  }

  // Internal relative URLs or anchors
  if (raw.startsWith("/") || raw.startsWith("#") || raw.startsWith("?")) {
    return { href: raw, isExternal: false, isMailOrTel: false };
  }

  // Fully-qualified web URLs
  if (lower.startsWith("http://") || lower.startsWith("https://")) {
    return { href: raw, isExternal: true, isMailOrTel: false };
  }

  // Domain-like external link without scheme (e.g., instagram.com/... or www.domain.com)
  if (/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(raw)) {
    return { href: `https://${raw}`, isExternal: true, isMailOrTel: false };
  }

  return { href: raw, isExternal: false, isMailOrTel: false };
}

/**
 * Extracts and resolves HTML link attributes from an astro-portabletext mark node.
 */
export function resolveLinkAttributes(node: any): ResolvedLinkAttributes {
  const rawHref =
    node?.markDef?.href || node?.markDef?.url || node?.href || node?.url || "";

  const { href, isExternal, isMailOrTel } = resolveLink(rawHref);

  // If node explicitly defines blank property, honor it (except for mailto/tel which should never open in new tab)
  const explicitBlank =
    typeof node?.markDef?.blank === "boolean" ? node.markDef.blank : undefined;
  const shouldOpenBlank = !isMailOrTel && (explicitBlank ?? isExternal);

  if (shouldOpenBlank) {
    return {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }

  return {
    href,
  };
}
