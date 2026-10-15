import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePathname } from "next/navigation";
import { useActiveNavigation } from "@/shared/hooks/use-active-navigation";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const hrefs = ["/#stack", "/#experiencia", "/blog"];
let observerCallback: IntersectionObserverCallback;
const observe = vi.fn();
const disconnect = vi.fn();

class IntersectionObserverMock {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
  observe = observe;
  disconnect = disconnect;
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds = [];
}

describe("useActiveNavigation", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/");
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
    document.body.innerHTML =
      '<section id="stack"></section><section id="experiencia"></section>';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("starts inactive, observes home sections and cleans up", () => {
    const { result, unmount } = renderHook(() => useActiveNavigation(hrefs));
    expect(result.current).toBeNull();
    expect(observe).toHaveBeenCalledTimes(2);

    const stack = document.getElementById("stack")!;
    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target: stack,
            boundingClientRect: { top: 90 },
          } as unknown as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });
    expect(result.current).toBe("/#stack");

    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it("activates blog without creating an observer", () => {
    vi.mocked(usePathname).mockReturnValue("/blog/post");
    const { result } = renderHook(() => useActiveNavigation(hrefs));
    expect(result.current).toBe("/blog");
    expect(observe).not.toHaveBeenCalled();
  });
});
