import type { MetadataRoute } from "next";
import { getBlogSitemapEntries } from "@/modules/blog/utils/sitemap";
import { siteConfig } from "@/shared/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogEntries = await getBlogSitemapEntries();

  return [
    { url: siteConfig.url.toString(), changeFrequency: "monthly", priority: 1 },
    ...blogEntries,
  ];
}
