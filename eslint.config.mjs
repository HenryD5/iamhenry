import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import checkFile from "eslint-plugin-check-file";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}", "test/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { "check-file": checkFile },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "default", format: ["camelCase"] },
        { selector: "function", format: ["camelCase", "PascalCase"] },
        { selector: "import", format: ["camelCase", "PascalCase"] },
        { selector: "objectLiteralProperty", format: null },
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
        { selector: "typeLike", format: ["PascalCase"] },
        {
          selector: "property",
          format: ["camelCase", "UPPER_CASE"],
          leadingUnderscore: "allow",
          filter: { regex: "^@", match: false },
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "forbid",
        },
        {
          selector: "variable",
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "has", "can", "should"],
        },
      ],
      "check-file/no-index": "error",
      "check-file/filename-naming-convention": [
        "error",
        { "src/**/*.ts": "KEBAB_CASE", "test/**/*.ts": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  {
    files: [
      "src/{modules/*/{components,views},shared/{components/*,layouts}}/**/*.tsx",
      "test/{modules/*/components,shared/components/*}/**/*.tsx",
    ],
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.tsx": "PASCAL_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  {
    files: ["src/app/**/*.tsx"],
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "src/app/**/*.tsx":
            "@(layout|page|loading|not-found|opengraph-image)",
        },
      ],
    },
  },
  {
    files: ["src/shared/seo/**/*.tsx", "test/{modules/*/hooks,utils}/**/*.tsx"],
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.tsx": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  {
    files: ["src/modules/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["@ark-ui/*"], message: "Los módulos usan wrappers Ui*." },
            {
              group: ["@/modules/*", "@/modules/**"],
              message:
                "Dentro de un módulo usa imports relativos y no cruces módulos.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/modules/*", "@/modules/**"],
              message: "shared no depende de modules.",
            },
          ],
        },
      ],
    },
  },
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "motion/**",
    "studio/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
