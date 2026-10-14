import Link from "next/link";

import blogMessages from "../locales/es.json";
import { getArticlePath } from "../routes";
import type { Article } from "../types/article.types";
import { formatArticleCardDate } from "../utils/article-date";
import { BlogArticleCover } from "./BlogArticleCover";

interface BlogArticleCardProps {
  article: Article;
  showReadLink?: boolean;
}

export function BlogArticleCard({
  article,
  showReadLink = true,
}: BlogArticleCardProps) {
  return (
    <Link
      href={getArticlePath(article.slug)}
      className="border-line bg-surface-raised focus-visible:outline-(--focus-ring) flex h-full flex-col rounded-md border p-[.6rem] no-underline transition-[transform,box-shadow] duration-[var(--duration)] ease-[var(--ease)] hover:-translate-y-[3px] hover:shadow-[var(--card-shadow)] focus-visible:outline-2 focus-visible:outline-offset-[3px]"
    >
      <BlogArticleCover
        cover={article.cover}
        sizes="(min-width: 1024px) 27vw, (min-width: 768px) 45vw, 100vw"
        className="aspect-video"
      />
      <div className="flex flex-1 flex-col gap-[.55rem] px-[.9rem] pt-[1.1rem] pb-4">
        <time
          className="font-mono text-caption text-fg-muted"
          dateTime={article.publishedAt}
        >
          {formatArticleCardDate(article.publishedAt)}
        </time>
        <h3 className="text-h5 line-clamp-2 tracking-[-.02em]">
          {article.title}
        </h3>
        <p className="text-body-sm text-fg-muted m-0 line-clamp-2">
          {article.description}
        </p>
        {showReadLink ? (
          <span className="text-body-sm text-(--accent-text) mt-auto pt-[.4rem] font-semibold">
            {blogMessages.common.read}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
