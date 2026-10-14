import { afterEach, describe, expect, it, vi } from "vitest";
import {
  isTheme,
  resolveTheme,
  THEME_INLINE_SCRIPT,
} from "@/shared/utils/theme";

function runInlineScript({
  storedTheme,
  prefersNight,
  storageError,
}: {
  storedTheme: string | null;
  prefersNight: boolean;
  storageError?: Error;
}) {
  const getItem = storageError
    ? vi.fn().mockImplementation(() => {
        throw storageError;
      })
    : vi.fn().mockReturnValue(storedTheme);
  const matchMedia = vi.fn().mockReturnValue({ matches: prefersNight });
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

  it("prefers a valid stored value over the system preference", () => {
    expect(resolveTheme("day", true)).toBe("day");
    expect(resolveTheme("night", false)).toBe("night");
  });

  it("falls back to the system preference for missing or invalid storage", () => {
    expect(resolveTheme(null, true)).toBe("night");
    expect(resolveTheme("invalid", false)).toBe("day");
  });

  it("sets night before paint when storage requests it", () => {
    const { getItem, matchMedia } = runInlineScript({
      storedTheme: "night",
      prefersNight: false,
    });

    expect(document.documentElement).toHaveAttribute("data-theme", "night");
    expect(getItem).toHaveBeenCalledWith("theme");
    expect(matchMedia).not.toHaveBeenCalled();
  });

  it("uses the system preference when there is no stored choice", () => {
    const { matchMedia } = runInlineScript({
      storedTheme: null,
      prefersNight: true,
    });

    expect(matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
    expect(document.documentElement).toHaveAttribute("data-theme", "night");
  });

  it("uses the system preference when storage access is blocked", () => {
    const { getItem, matchMedia } = runInlineScript({
      storedTheme: null,
      prefersNight: true,
      storageError: new Error("Storage access denied"),
    });

    expect(getItem).toHaveBeenCalledWith("theme");
    expect(matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
    expect(document.documentElement).toHaveAttribute("data-theme", "night");
  });

  it("removes a stale night attribute when day is resolved", () => {
    document.documentElement.setAttribute("data-theme", "night");
    runInlineScript({ storedTheme: "day", prefersNight: true });

    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });
});
