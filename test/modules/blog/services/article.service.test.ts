import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SanityArticleDto } from "@/modules/blog/types/article.dto";

const { fetchMock, cacheLifeMock } = vi.hoisted(() => ({
  fetchMock: vi.fn(),
  cacheLifeMock: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({ cacheLife: cacheLifeMock }));
vi.mock("next-sanity", () => ({ defineQuery: (query: string) => query }));
vi.mock("@/modules/blog/services/sanity-client", () => ({
  sanityClient: { fetch: fetchMock },
}));

import {
  ARTICLE_BY_SLUG_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLES_QUERY,
  getArticleBySlug,
  getArticles,
  getArticleSlugs,
} from "@/modules/blog/services/article.service";

const dto: SanityArticleDto = {
  slug: "entrada-ficticia",
  title: "Entrada ficticia",
  description: "Descripción ficticia",
  publishedAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-02T00:00:00.000Z",
  body: [],
};

describe("article service", () => {
  beforeEach(() => vi.clearAllMocks());

  it.each([ARTICLES_QUERY, ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY])(
    "excludes drafts in every query",
    (query) => expect(query).toContain('!(_id in path("drafts.**"))'),
  );

  it("fetches and adapts the article list", async () => {
    fetchMock.mockResolvedValue([dto]);
    await expect(getArticles()).resolves.toEqual([
      expect.objectContaining({ slug: dto.slug }),
    ]);
    expect(fetchMock).toHaveBeenCalledWith(ARTICLES_QUERY);
    expect(cacheLifeMock).toHaveBeenCalledWith("max");
  });

  it("passes the slug as the detail query parameter", async () => {
    fetchMock.mockResolvedValue(dto);
    await expect(getArticleBySlug(dto.slug)).resolves.toMatchObject({
      slug: dto.slug,
    });
    expect(fetchMock).toHaveBeenCalledWith(ARTICLE_BY_SLUG_QUERY, {
      slug: dto.slug,
    });
  });

  it("returns null for a missing detail", async () => {
    fetchMock.mockResolvedValue(null);
    await expect(getArticleBySlug("inexistente")).resolves.toBeNull();
  });

  it("maps the slug query to strings", async () => {
    fetchMock.mockResolvedValue([{ slug: "uno" }, { slug: "dos" }]);
    await expect(getArticleSlugs()).resolves.toEqual(["uno", "dos"]);
    expect(fetchMock).toHaveBeenCalledWith(ARTICLE_SLUGS_QUERY);
  });
});
