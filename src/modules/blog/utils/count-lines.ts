export function countLines(code: string): number {
  return code.replace(/\n+$/, "").split("\n").length;
}
