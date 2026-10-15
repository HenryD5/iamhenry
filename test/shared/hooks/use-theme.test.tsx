import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTheme } from "@/shared/hooks/use-theme";

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

    const { result } = renderHook(() => useTheme());

    await waitFor(() => expect(result.current.isMounted).toBe(true));
    expect(result.current.theme).toBe("night");
    expect(result.current.isNight).toBe(true);
    expect(document.documentElement).toHaveAttribute("data-theme", "night");
  });

  it("defaults to day even when the system prefers dark", async () => {
    const matchMedia = vi.fn().mockReturnValue({ matches: true });
    vi.stubGlobal("matchMedia", matchMedia);
    const { result } = renderHook(() => useTheme());
    await waitFor(() => expect(result.current.isMounted).toBe(true));

    expect(result.current.theme).toBe("day");
    expect(result.current.isNight).toBe(false);
    expect(document.documentElement).not.toHaveAttribute("data-theme");
    expect(matchMedia).not.toHaveBeenCalled();
  });

  it("defaults to day when storage access is blocked", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage access denied");
    });
    document.documentElement.setAttribute("data-theme", "night");

    const { result } = renderHook(() => useTheme());
    await waitFor(() => expect(result.current.isMounted).toBe(true));

    expect(result.current.theme).toBe("day");
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("toggles the html attribute and persists the explicit choice", async () => {
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
