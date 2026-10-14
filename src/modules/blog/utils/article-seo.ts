import type { Metadata } from "next";
import blogMessages from "../locales/es.json";
import { BLOG_PATH, getArticlePath } from "../routes";
import type { Article } from "../types/article.types";
import { getBlogMediaPath } from "./media-path";
import type { BlogPostingJsonLdProps } from "@/shared/seo/blog-posting-json-ld";
import {
  createPageMetadata,
  type ArticlePageMetadataInput,
} from "@/shared/seo/metadata";

export function getBlogListMetadata(): Metadata {
  return createPageMetadata({
    title: blogMessages.metadata.title,
    description: blogMessages.metadata.description,
    path: BLOG_PATH,
  });
}

export function getArticleMetadataInput(
  article: Article,
): ArticlePageMetadataInput {
  return {
    type: "article",
    title: article.title,
    description: article.description,
    path: getArticlePath(article.slug),
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    ...(article.cover
      ? {
          image: {
            path: getBlogMediaPath(article.cover.assetId),
            width: article.cover.width,
            height: article.cover.height,
            alt: article.cover.alt,
          },
        }
      : {}),
  };
}

export function getArticleJsonLdProps(
  article: Article,
): BlogPostingJsonLdProps {
  return {
    headline: article.title,
    description: article.description,
    path: getArticlePath(article.slug),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    ...(article.cover
      ? { imagePath: getBlogMediaPath(article.cover.assetId) }
      : {}),
  };
}
