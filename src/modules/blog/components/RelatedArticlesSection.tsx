import blogMessages from "../locales/es.json";
import type { Article } from "../types/article.types";
import { BlogArticleCard } from "./BlogArticleCard";
import { AppContainer } from "@/shared/components/app/AppContainer";

interface RelatedArticlesSectionProps {
  articles: readonly Article[];
}

export function RelatedArticlesSection({
  articles,
}: RelatedArticlesSectionProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <AppContainer
      as="section"
      className="pt-20 pb-24 max-md:pt-14 max-md:pb-16"
      aria-labelledby="related-articles-title"
    >
      <h2 id="related-articles-title" className="text-h4 mb-6">
        {blogMessages.article.related}
      </h2>
      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
        {articles.map((article) => (
          <BlogArticleCard
            key={article.slug}
            article={article}
            showReadLink={false}
          />
        ))}
      </div>
    </AppContainer>
  );
}
