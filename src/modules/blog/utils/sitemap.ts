import type { MetadataRoute } from "next";
import { getArticles } from "../services/article.service";
import { siteConfig } from "@/shared/config/site";

export async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const lastModified = articles.reduce<string | undefined>(
    (latest, { updatedAt }) =>
      !latest || updatedAt > latest ? updatedAt : latest,
    undefined,
  );

  return [
    {
      url: new URL("/blog", siteConfig.url).toString(),
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map(({ slug, updatedAt }) => ({
      url: new URL(`/blog/${encodeURIComponent(slug)}`, siteConfig.url).toString(),
      lastModified: updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
