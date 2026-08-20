import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID || "n3mnxpum",
    dataset: process.env.PUBLIC_SANITY_DATASET || "production",
  },
});
