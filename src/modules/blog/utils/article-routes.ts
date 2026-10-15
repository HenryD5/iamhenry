import { notFound } from "next/navigation";

import { getArticleBySlug, getArticleSlugs } from "../services/article.service";
import { getArticleMetadataInput } from "./article-seo";
import { createPageMetadata } from "@/shared/seo/metadata";

const EMPTY_BLOG_SLUG = "__empty__";

export async function getArticleStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getArticleSlugs();

  return slugs.length > 0
    ? slugs.map((slug) => ({ slug }))
    : [{ slug: EMPTY_BLOG_SLUG }];
}

export async function getArticlePageMetadata({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return createPageMetadata(getArticleMetadataInput(article));
}
