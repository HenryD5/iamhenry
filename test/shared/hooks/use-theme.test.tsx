import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTheme } from "@/shared/hooks/use-theme";

interface MatchMediaController {
  setMatches: (matches: boolean) => void;
}

function mockMatchMedia(initialMatches: boolean): MatchMediaController {
  let isMatching = initialMatches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((media: string) => ({
      get matches() {
        return isMatching;
      },
      media,
      onchange: null,
      addEventListener: (type: string, listener: (event: MediaQueryListEvent) => void) => {
        if (type === "change") listeners.add(listener);
      },
      removeEventListener: (type: string, listener: (event: MediaQueryListEvent) => void) => {
        if (type === "change") listeners.delete(listener);
      },
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  return {
    setMatches(nextMatches) {
      isMatching = nextMatches;
      const event = {
        matches: isMatching,
        media: "(prefers-color-scheme: dark)",
      } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("hydrates from storage and the html attribute", async () => {
    localStorage.setItem("theme", "night");
    document.documentElement.setAttribute("data-theme", "night");
    mockMatchMedia(false);

    const { result } = renderHook(() => useTheme());

    await waitFor(() => expect(result.current.isMounted).toBe(true));
    expect(result.current.theme).toBe("night");
    expect(result.current.isNight).toBe(true);
    expect(document.documentElement).toHaveAttribute("data-theme", "night");
  });

  it("falls back to the system and follows it until the user chooses", async () => {
    const media = mockMatchMedia(false);
    const { result } = renderHook(() => useTheme());
    await waitFor(() => expect(result.current.isMounted).toBe(true));

    act(() => media.setMatches(true));
    await waitFor(() => expect(result.current.theme).toBe("night"));
    expect(document.documentElement).toHaveAttribute("data-theme", "night");

    act(() => result.current.setTheme("day"));
    expect(localStorage.getItem("theme")).toBe("day");
    expect(document.documentElement).not.toHaveAttribute("data-theme");

    act(() => media.setMatches(true));
    expect(result.current.theme).toBe("day");
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("toggles the html attribute and persists the explicit choice", async () => {
    mockMatchMedia(false);
    const setItem = vi.spyOn(localStorage, "setItem");
    const { result } = renderHook(() => useTheme());
    await waitFor(() => expect(result.current.isMounted).toBe(true));

    act(() => result.current.setTheme("night"));
    expect(setItem).toHaveBeenCalledWith("theme", "night");
    expect(document.documentElement).toHaveAttribute("data-theme", "night");
    expect(result.current.isNight).toBe(true);

    act(() => result.current.setTheme("day"));
    expect(setItem).toHaveBeenCalledWith("theme", "day");
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });
});
