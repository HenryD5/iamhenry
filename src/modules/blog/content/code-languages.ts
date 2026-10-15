export const CODE_LANGUAGES = {
  bash: "Bash",
  sh: "Shell",
  json: "JSON",
  javascript: "JavaScript",
  typescript: "TypeScript",
  tsx: "TSX",
  markdown: "Markdown",
  text: "Texto",
} as const;

export type CodeLanguage = keyof typeof CODE_LANGUAGES;

export const DEFAULT_CODE_LANGUAGE: CodeLanguage = "text";
