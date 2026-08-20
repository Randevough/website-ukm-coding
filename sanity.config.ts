import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

// Provide fallbacks if env vars are missing so the build doesn't crash unnecessarily
const projectId =
  import.meta.env?.PUBLIC_SANITY_PROJECT_ID ||
  process.env?.PUBLIC_SANITY_PROJECT_ID ||
  "demo";
const dataset =
  import.meta.env?.PUBLIC_SANITY_DATASET ||
  process.env?.PUBLIC_SANITY_DATASET ||
  "production";

export default defineConfig({
  name: "default",
  title: "UKM Coding Studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
