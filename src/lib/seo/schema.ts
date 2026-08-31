/**
 * SEO JSON-LD Structured Data Schema Generators
 */

export interface OrganizationSchemaOptions {
  siteName: string;
  url: string;
  logo: string;
}

export interface ArticleSchemaOptions {
  headline: string;
  datePublished: string;
  authorName: string;
  siteName: string;
  logo: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface EventSchemaOptions {
  name: string;
  startDate: string;
  endDate?: string;
  location?: string;
  siteName: string;
  siteUrl: string;
}

export function generateOrganizationSchema(opts: OrganizationSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: opts.siteName,
    url: opts.url,
    logo: opts.logo,
    description:
      "Unit Kegiatan Mahasiswa bidang teknologi dan coding di Cyber University",
  };
}

export function generateArticleSchema(opts: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    datePublished: opts.datePublished,
    author: {
      "@type": "Person",
      name: opts.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: opts.siteName,
      logo: {
        "@type": "ImageObject",
        url: opts.logo,
      },
    },
  };
}

export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

export function generateEventSchema(opts: EventSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: opts.name,
    startDate: opts.startDate,
    ...(opts.endDate ? { endDate: opts.endDate } : {}),
    location: {
      "@type": "Place",
      name: opts.location || "Cyber University",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta",
        addressCountry: "ID",
      },
    },
    organizer: {
      "@type": "Organization",
      name: opts.siteName,
      url: opts.siteUrl,
    },
  };
}
