import { describe, expect, it, vi } from "vitest";
import {
  getArticleJsonLdProps,
  getArticleMetadataInput,
  getBlogListMetadata,
} from "@/modules/blog/utils/article-seo";
import { createPageMetadata } from "@/shared/seo/metadata";
import { articleFixtures } from "../fixtures/articles";

vi.mock("@/shared/config/site", () => ({
  siteConfig: {
    name: "Sitio ficticio",
    title: "Sitio ficticio",
    description: "Descripción ficticia",
    url: new URL("https://example.test"),
    locale: "es_PE",
    person: { name: "Persona ficticia" },
  },
}));

describe("blog SEO", () => {
  it("creates listing canonical metadata", () => {
    const metadata = getBlogListMetadata();
    expect(metadata.alternates?.canonical?.toString()).toBe(
      "https://example.test/blog",
    );
    expect(metadata.openGraph).toMatchObject({ type: "website" });
  });

  it("creates article canonical, Open Graph fields and proxied image", () => {
    const article = articleFixtures[0];
    const input = getArticleMetadataInput(article);
    const metadata = createPageMetadata(input);

    expect(input.image?.path).toBe(`/blog/media/${article.cover.assetId}`);
    expect(metadata.alternates?.canonical?.toString()).toBe(
      `https://example.test/blog/${article.slug}`,
    );
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    });
    expect(JSON.stringify(metadata)).not.toContain("cdn.sanity.io");
  });

  it("maps JSON-LD fields and omits absent images", () => {
    expect(getArticleJsonLdProps(articleFixtures[0])).toMatchObject({
      path: `/blog/${articleFixtures[0].slug}`,
      imagePath: `/blog/media/${articleFixtures[0].cover.assetId}`,
    });
    expect(getArticleJsonLdProps(articleFixtures[1])).not.toHaveProperty(
      "imagePath",
    );
  });
});
