import globals from "globals";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  {
    rules: {
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "prefer-const": ["error"],
      "object-curly-spacing": ["error", "always"],
    }
  }
]);
