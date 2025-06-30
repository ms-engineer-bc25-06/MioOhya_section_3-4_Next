import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScriptの推奨設定
  js.configs.recommended,

  // Next.jsの推奨設定
  {
    extends: ["next/core-web-vitals"],
  },

  // Prettier連携
  {
    extends: ["plugin:prettier/recommended"],
  },

  // TypeScriptの推奨設定
  tseslint.configs.recommended,

  // ブラウザ＋Nodeのグローバル変数を有効化
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
