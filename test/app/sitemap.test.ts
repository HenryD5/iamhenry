import { afterEach, describe, expect, it, vi } from "vitest";

const { getBlogSitemapEntriesMock } = vi.hoisted(() => ({
  getBlogSitemapEntriesMock: vi.fn(),
}));

vi.mock("@/modules/blog/utils/sitemap", () => ({
  getBlogSitemapEntries: getBlogSitemapEntriesMock,
}));
vi.mock("@/shared/config/site", () => ({
  siteConfig: { url: new URL("https://example.test") },
}));

import sitemap from "@/app/sitemap";

describe("app sitemap", () => {
  afterEach(() => vi.useRealTimers());

  it("uses the build date when it is newer than blog updates", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    getBlogSitemapEntriesMock.mockResolvedValue([
      {
        url: "https://example.test/blog/article",
        lastModified: "2025-01-01T00:00:00.000Z",
      },
    ]);

    const entries = await sitemap();

    expect(entries[0]?.lastModified).toEqual(
      new Date("2026-01-01T00:00:00.000Z"),
    );
  });

  it("uses the latest article update when it is newer than the build", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    getBlogSitemapEntriesMock.mockResolvedValue([
      {
        url: "https://example.test/blog/article",
        lastModified: "2026-02-01T00:00:00.000Z",
      },
    ]);

    const entries = await sitemap();

    expect(entries[0]?.lastModified).toEqual(
      new Date("2026-02-01T00:00:00.000Z"),
    );
  });
});
