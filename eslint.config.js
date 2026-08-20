import eslintPluginAstro from "eslint-plugin-astro";
import tsEslint from "typescript-eslint";

export default [
  {
    ignores: [
      "docs/**",
      "ai-prompts/**",
      "node_modules/**",
      "dist/**",
      ".github/**",
    ],
  },
  ...tsEslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
];
