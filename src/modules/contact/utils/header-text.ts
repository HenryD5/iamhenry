const LINE_BREAK_PATTERN = /[\r\n]/;
const LINE_BREAK_RUN_PATTERN = /[\r\n]+/g;

export function hasLineBreak(value: string): boolean {
  return LINE_BREAK_PATTERN.test(value);
}

export function sanitizeHeaderText(value: string): string {
  return value.replace(LINE_BREAK_RUN_PATTERN, " ").trim();
}
