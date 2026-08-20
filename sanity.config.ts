import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId =
  import.meta.env?.PUBLIC_SANITY_PROJECT_ID ||
  process.env?.PUBLIC_SANITY_PROJECT_ID ||
  "n3mnxpum";
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
