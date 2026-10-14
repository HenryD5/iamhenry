import { beforeEach, describe, expect, it, vi } from "vitest";
import { articleFixtures } from "../fixtures/articles";

const { getArticlesMock } = vi.hoisted(() => ({ getArticlesMock: vi.fn() }));
vi.mock("server-only", () => ({}));
vi.mock("@/modules/blog/services/article.service", () => ({
  getArticles: getArticlesMock,
}));
vi.mock("@/shared/config/site", () => ({
  siteConfig: { url: new URL("https://example.test") },
}));

import { getBlogSitemapEntries } from "@/modules/blog/utils/sitemap";

describe("blog sitemap", () => {
  beforeEach(() => vi.clearAllMocks());

  it("includes the listing and encoded articles with last modified dates", async () => {
    getArticlesMock.mockResolvedValue(articleFixtures);
    const entries = await getBlogSitemapEntries();

    expect(entries[0]).toMatchObject({
      url: "https://example.test/blog",
      lastModified: articleFixtures[0].updatedAt,
      changeFrequency: "weekly",
    });
    expect(entries.slice(1)).toEqual(
      articleFixtures.map((article) =>
        expect.objectContaining({
          url: `https://example.test/blog/${article.slug}`,
          lastModified: article.updatedAt,
        }),
      ),
    );
  });

  it("omits listing lastModified when there are no articles", async () => {
    getArticlesMock.mockResolvedValue([]);
    expect((await getBlogSitemapEntries())[0]).not.toHaveProperty(
      "lastModified",
    );
  });
});
