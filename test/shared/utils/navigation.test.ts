import { describe, expect, it } from "vitest";
import {
  getActiveNavigationHref,
  getNavigationAriaCurrent,
  getNavigationSectionId,
} from "@/shared/utils/navigation";

const hrefs = ["/#stack", "/#experiencia", "/blog"];

describe("navigation utilities", () => {
  it("extracts only home section ids", () => {
    expect(getNavigationSectionId("/#experiencia")).toBe("experiencia");
    expect(getNavigationSectionId("/blog")).toBeNull();
  });

  it("maps the visible home section to its href", () => {
    expect(getActiveNavigationHref("/", "stack", hrefs)).toBe("/#stack");
    expect(getActiveNavigationHref("/", null, hrefs)).toBeNull();
  });

  it("maps the blog index and articles to the blog href", () => {
    expect(getActiveNavigationHref("/blog", null, hrefs)).toBe("/blog");
    expect(getActiveNavigationHref("/blog/article", null, hrefs)).toBe("/blog");
  });

  it("returns the matching aria-current value", () => {
    expect(getNavigationAriaCurrent("/#stack")).toBe("location");
    expect(getNavigationAriaCurrent("/blog")).toBe("page");
  });
});
