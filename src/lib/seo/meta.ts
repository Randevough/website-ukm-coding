/**
 * SEO Metadata & OpenGraph Utility Functions
 */

export interface MetaOptions {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  pathname?: string;
  site?: string | URL;
  origin?: string;
}

export const DEFAULT_SITE_NAME = "UKM Coding Cyber University";
export const DEFAULT_DESCRIPTION =
  "Unit kegiatan mahasiswa bidang teknologi di Cyber University";
export const DEFAULT_OG_IMAGE = "/og-default.jpg";

export function resolveBaseUrl(site?: string | URL, origin?: string): string {
  if (site) {
    const s = site.toString();
    return s.endsWith("/") ? s.slice(0, -1) : s;
  }
  if (origin) {
    return origin.endsWith("/") ? origin.slice(0, -1) : origin;
  }
  return "https://ukmcoding.site";
}

export function resolveCanonicalUrl(
  canonical?: string,
  pathname: string = "/",
  site?: string | URL,
  origin?: string,
): string {
  if (canonical) {
    return canonical;
  }

  const base = resolveBaseUrl(site, origin);
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${normalizedPath}`;
}

export function resolveOgImage(
  image?: string,
  site?: string | URL,
  origin?: string,
): string {
  if (!image) {
    const base = resolveBaseUrl(site, origin);
    return `${base}${DEFAULT_OG_IMAGE}`;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const base = resolveBaseUrl(site, origin);
  const normalizedImage = image.startsWith("/") ? image : `/${image}`;
  return `${base}${normalizedImage}`;
}

export function buildMetaTags(opts: MetaOptions) {
  const finalTitle = opts.title ? opts.title : DEFAULT_SITE_NAME;
  const finalDescription = opts.description || DEFAULT_DESCRIPTION;
  const canonicalUrl = resolveCanonicalUrl(
    opts.canonical,
    opts.pathname,
    opts.site,
    opts.origin,
  );
  const ogImage = resolveOgImage(opts.image, opts.site, opts.origin);

  return {
    title: finalTitle,
    description: finalDescription,
    canonicalUrl,
    ogImage,
    noindex: Boolean(opts.noindex),
  };
}
