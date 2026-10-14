import { describe, expect, it } from "vitest";
import {
  formatArticleCardDate,
  formatArticleDetailDate,
  wasArticleUpdated,
} from "@/modules/blog/utils/article-date";

describe("article dates", () => {
  it("formats short and long Spanish dates in UTC", () => {
    const date = "2026-10-12T23:30:00.000Z";
    expect(formatArticleCardDate(date)).toBe("12 oct 2026");
    expect(formatArticleDetailDate(date)).toBe("12 de octubre de 2026");
  });

  it("detects only updates later than publication", () => {
    const publishedAt = "2026-10-12T10:00:00.000Z";
    expect(wasArticleUpdated(publishedAt, "2026-10-12T10:00:01.000Z")).toBe(
      true,
    );
    expect(wasArticleUpdated(publishedAt, publishedAt)).toBe(false);
    expect(wasArticleUpdated(publishedAt, "2026-10-11T10:00:00.000Z")).toBe(
      false,
    );
  });
});
