import type { Metadata } from "next";
import { siteConfig } from "@/shared/config/site";

export interface PageMetadataImage {
  path: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface BasePageMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: PageMetadataImage;
}

interface WebsitePageMetadataInput extends BasePageMetadataInput {
  type?: "website";
}

export interface ArticlePageMetadataInput extends BasePageMetadataInput {
  type: "article";
  publishedTime: string;
  modifiedTime: string;
}

export type PageMetadataInput =
  WebsitePageMetadataInput | ArticlePageMetadataInput;

export function createPageMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  path = "/",
  image = { path: "/opengraph-image", width: 1200, height: 630 },
  ...articleMetadata
}: PageMetadataInput = {}): Metadata {
  const canonical = new URL(path, siteConfig.url);
  const personShortName = siteConfig.person.name
    .split(" ")
    .slice(0, 2)
    .join(" ");
  const documentTitle =
    articleMetadata.type === "article"
      ? `${title} · ${personShortName}`
      : title;
  const imageUrl = new URL(image.path, siteConfig.url);
  const openGraphImage = {
    url: imageUrl,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
    ...(image.alt ? { alt: image.alt } : {}),
  };
  const openGraph =
    articleMetadata.type === "article"
      ? {
          title,
          description,
          url: canonical,
          siteName: siteConfig.name,
          locale: siteConfig.locale,
          type: articleMetadata.type,
          publishedTime: articleMetadata.publishedTime,
          modifiedTime: articleMetadata.modifiedTime,
          images: [openGraphImage],
        }
      : {
          title,
          description,
          url: canonical,
          siteName: siteConfig.name,
          locale: siteConfig.locale,
          type: "website" as const,
          images: [openGraphImage],
        };

  return {
    title: documentTitle,
    description,
    alternates: { canonical },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
