import "server-only";

import { cacheLife } from "next/cache";
import { defineQuery } from "next-sanity";
import { adaptArticle } from "../adapters/article.adapter";
import type {
  SanityArticleDto,
  SanityArticleSlugDto,
} from "../types/article.dto";
import type { Article } from "../types/article.types";
import { sanityClient } from "./sanity-client";

const ARTICLE_PROJECTION = `{
  "slug": slug.current,
  title,
  description,
  publishedAt,
  "updatedAt": _updatedAt,
  cover {
    alt,
    asset->{
      _id,
      metadata{dimensions}
    }
  },
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        metadata{dimensions}
      }
    }
  }
}`;

export const ARTICLES_QUERY = defineQuery(
  `*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) ${ARTICLE_PROJECTION}`,
);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(
  `*[_type == "article" && slug.current == $slug && !(_id in path("drafts.**"))][0] ${ARTICLE_PROJECTION}`,
);

export const ARTICLE_SLUGS_QUERY = defineQuery(
  `*[_type == "article" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    "slug": slug.current
  }`,
);

export async function getArticles(): Promise<readonly Article[]> {
  "use cache";
  cacheLife("max");

  const articles = await sanityClient.fetch<readonly SanityArticleDto[]>(
    ARTICLES_QUERY,
    {},
    { cache: "no-store" },
  );

  return articles.map(adaptArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  "use cache";
  cacheLife("max");

  const article = await sanityClient.fetch<SanityArticleDto | null>(
    ARTICLE_BY_SLUG_QUERY,
    { slug },
    { cache: "no-store" },
  );

  return article ? adaptArticle(article) : null;
}

export async function getArticleSlugs(): Promise<readonly string[]> {
  "use cache";
  cacheLife("max");

  const articles = await sanityClient.fetch<readonly SanityArticleSlugDto[]>(
    ARTICLE_SLUGS_QUERY,
    {},
    { cache: "no-store" },
  );

  return articles.map(({ slug }) => slug);
}
