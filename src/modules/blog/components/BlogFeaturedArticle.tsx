import Link from "next/link";

import blogMessages from "../locales/es.json";
import { getArticlePath } from "../routes";
import type { Article } from "../types/article.types";
import { formatArticleCardDate } from "../utils/article-date";
import { BlogArticleCover } from "./BlogArticleCover";

interface BlogFeaturedArticleProps {
  article: Article;
}

export function BlogFeaturedArticle({ article }: BlogFeaturedArticleProps) {
  return (
    <Link
      href={getArticlePath(article.slug)}
      className="border-line bg-surface-raised focus-visible:outline-(--focus-ring) grid grid-cols-[1.35fr_1fr] gap-6 rounded-md border p-[.6rem] no-underline transition-[transform,box-shadow] duration-[var(--duration)] ease-[var(--ease)] hover:-translate-y-[3px] hover:shadow-[var(--card-shadow)] focus-visible:outline-2 focus-visible:outline-offset-[3px] max-md:grid-cols-1 max-md:gap-0"
    >
      <BlogArticleCover
        cover={article.cover}
        preload
        sizes="(min-width: 768px) 55vw, 100vw"
        className="min-h-80 max-md:aspect-video max-md:min-h-0"
      />
      <div className="flex flex-col justify-center gap-[.55rem] py-[1.4rem] pr-[1.4rem] pl-[.4rem] max-md:px-[.9rem] max-md:pt-[1.1rem] max-md:pb-4">
        <div className="font-mono text-caption text-fg-muted flex flex-wrap gap-2">
          <time dateTime={article.publishedAt}>
            {formatArticleCardDate(article.publishedAt)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{blogMessages.list.latest}</span>
        </div>
        <h2 className="text-h3 line-clamp-2">{article.title}</h2>
        <p className="text-body text-fg-muted m-0 line-clamp-3">
          {article.description}
        </p>
        <span className="text-body-sm text-(--accent-text) mt-auto pt-[.4rem] font-semibold">
          {blogMessages.list.readFeatured}
        </span>
      </div>
    </Link>
  );
}
