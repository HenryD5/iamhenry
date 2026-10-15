import { afterEach, describe, expect, it, vi } from "vitest";
import {
  isTheme,
  resolveTheme,
  THEME_INLINE_SCRIPT,
} from "@/shared/utils/theme";

function runInlineScript({
  storedTheme,
  storageError,
}: {
  storedTheme: string | null;
  storageError?: Error;
}) {
  const getItem = storageError
    ? vi.fn().mockImplementation(() => {
        throw storageError;
      })
    : vi.fn().mockReturnValue(storedTheme);
  const matchMedia = vi.fn().mockReturnValue({ matches: true });
  const executeScript = new Function(
    "localStorage",
    "window",
    "document",
    THEME_INLINE_SCRIPT,
  );

  executeScript({ getItem }, { matchMedia }, document);

  return { getItem, matchMedia };
}

describe("theme utils", () => {
  afterEach(() => {
    document.documentElement.removeAttribute("data-theme");
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it.each([
    ["day", true],
    ["night", true],
    [null, false],
    ["sepia", false],
  ])("parses %s as a stored theme: %s", (value, expected) => {
    expect(isTheme(value)).toBe(expected);
  });

  it("uses a valid stored value", () => {
    expect(resolveTheme("day")).toBe("day");
    expect(resolveTheme("night")).toBe("night");
  });

  it("defaults to day for missing or invalid storage", () => {
    expect(resolveTheme(null)).toBe("day");
    expect(resolveTheme("invalid")).toBe("day");
  });

  it("sets night before paint when storage requests it", () => {
    const { getItem, matchMedia } = runInlineScript({
      storedTheme: "night",
    });

    expect(document.documentElement).toHaveAttribute("data-theme", "night");
    expect(getItem).toHaveBeenCalledWith("theme");
    expect(matchMedia).not.toHaveBeenCalled();
  });

  it("defaults to day when there is no stored choice", () => {
    const { matchMedia } = runInlineScript({
      storedTheme: null,
    });

    expect(matchMedia).not.toHaveBeenCalled();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("defaults to day when storage access is blocked", () => {
    const { getItem, matchMedia } = runInlineScript({
      storedTheme: null,
      storageError: new Error("Storage access denied"),
    });

    expect(getItem).toHaveBeenCalledWith("theme");
    expect(matchMedia).not.toHaveBeenCalled();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("removes a stale night attribute when day is resolved", () => {
    document.documentElement.setAttribute("data-theme", "night");
    runInlineScript({ storedTheme: "day" });

    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });
});
