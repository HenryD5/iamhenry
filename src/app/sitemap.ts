import type { MetadataRoute } from "next";
import { getBlogSitemapEntries } from "@/modules/blog/utils/sitemap";
import { siteConfig } from "@/shared/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogEntries = await getBlogSitemapEntries();
  const buildDate = new Date();
  const latestDate = blogEntries.reduce((latest, entry) => {
    if (!entry.lastModified) return latest;
    const entryDate = new Date(entry.lastModified);
    return entryDate > latest ? entryDate : latest;
  }, buildDate);

  return [
    {
      url: siteConfig.url.toString(),
      // La home refleja tanto el contenido publicado como la versión generada del sitio.
      lastModified: latestDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...blogEntries,
  ];
}
