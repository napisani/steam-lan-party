import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["node_modules/*", ".next/*", "dist/*"]
  },
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": "@typescript-eslint/eslint-plugin"
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": ["error", {}, { usePrettierrc: true }]
    }
  }
];

export default eslintConfig;
