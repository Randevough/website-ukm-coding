process.env.SANITY_ASTRO_DISABLE_MODULE_DEDUPE = "true";

import { defineConfig } from "astro/config";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: env.PUBLIC_SITE_URL || "https://ukmcoding.site",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/admin"),
    }),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID || "n3mnxpum",
      dataset: env.PUBLIC_SANITY_DATASET || "production",
      apiVersion: env.SANITY_API_VERSION || "2026-08-19",
      useCdn: env.SANITY_USE_CDN === "false" ? false : true,
      studioBasePath: "/admin",
    }),
  ],
});
