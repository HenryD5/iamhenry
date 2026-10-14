import Link from "next/link";

import blogMessages from "../locales/es.json";
import { BLOG_PATH } from "../routes";
import type { Article } from "../types/article.types";
import {
  formatArticleDetailDate,
  wasArticleUpdated,
} from "../utils/article-date";
import { siteConfig } from "@/shared/config/site";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const isUpdated = wasArticleUpdated(
    article.publishedAt,
    article.updatedAt,
  );

  return (
    <header className="mx-auto max-w-[52rem] pt-16 pb-10 max-md:pt-10 max-md:pb-7">
      <Link
        href={BLOG_PATH}
        className="text-body-sm text-fg-muted hover:text-primary-500 focus-visible:text-primary-500 mb-9 flex w-fit font-semibold no-underline transition-colors duration-[var(--duration-fast)]"
      >
        {blogMessages.article.back}
      </Link>
      <p className="font-primary text-body-sm text-primary-500 before:bg-tertiary-500 mb-[1.3rem] inline-flex items-center gap-[.6rem] leading-[1.2] font-semibold before:size-[.55rem] before:rounded-full before:content-['']">
        {blogMessages.common.eyebrow}
      </p>
      <h1 className="text-h1 text-balance">{article.title}</h1>
      <p className="text-body-lg text-fg-muted mt-[1.4rem] mb-0 max-w-[44ch] leading-[1.45]">
        {article.description}
      </p>
      <div className="border-line text-body-sm text-fg-muted mt-8 flex flex-wrap items-center gap-x-[1.2rem] gap-y-[.6rem] border-t pt-[1.4rem]">
        <b className="text-fg font-semibold">{siteConfig.person.name}</b>
        <span
          className="bg-neutral-400 size-[.3rem] rounded-full"
          aria-hidden="true"
        />
        <time dateTime={article.publishedAt}>
          {formatArticleDetailDate(article.publishedAt)}
        </time>
        {isUpdated ? (
          <>
            <span
              className="bg-neutral-400 size-[.3rem] rounded-full"
              aria-hidden="true"
            />
            <span>
              {blogMessages.article.updated.replace(
                "{fecha}",
                formatArticleDetailDate(article.updatedAt),
              )}
            </span>
          </>
        ) : null}
      </div>
    </header>
  );
}
