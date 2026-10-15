import {
  CODE_LANGUAGES,
  DEFAULT_CODE_LANGUAGE,
  type CodeLanguage,
} from "../content/code-languages";

function isCodeLanguage(value: string): value is CodeLanguage {
  return Object.hasOwn(CODE_LANGUAGES, value);
}

export function resolveCodeLanguage(language?: string | null): CodeLanguage {
  const normalized = language?.trim().toLowerCase() ?? "";
  return isCodeLanguage(normalized) ? normalized : DEFAULT_CODE_LANGUAGE;
}
