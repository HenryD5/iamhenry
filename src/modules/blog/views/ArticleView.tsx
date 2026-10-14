import { notFound } from "next/navigation";

import { ArticleBody } from "../components/ArticleBody";
import { ArticleHeader } from "../components/ArticleHeader";
import { BlogArticleCover } from "../components/BlogArticleCover";
import { RelatedArticlesSection } from "../components/RelatedArticlesSection";
import { getArticleBySlug, getArticles } from "../services/article.service";
import { getArticleJsonLdProps } from "../utils/article-seo";
import { AppContainer } from "@/shared/components/app/AppContainer";
import { AppHeader } from "@/shared/components/app/AppHeader";
import { BlogPostingJsonLd } from "@/shared/seo/blog-posting-json-ld";

interface ArticleViewProps {
  params: Promise<{ slug: string }>;
}

export async function ArticleView({ params }: ArticleViewProps) {
  const { slug } = await params;
  const [article, articles] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
  ]);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter(({ slug: articleSlug }) => articleSlug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <BlogPostingJsonLd {...getArticleJsonLdProps(article)} />
      <AppHeader />
      <main id="main-content" className="overflow-x-clip pt-16 max-md:pt-14">
        <article>
          <AppContainer>
            <ArticleHeader article={article} />
            <BlogArticleCover
              cover={article.cover}
              preload
              radiusClassName="rounded-lg max-md:rounded-md"
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="mx-auto aspect-[2/1] max-w-[64rem] max-md:aspect-[16/10]"
            />
            <ArticleBody body={article.body} />
          </AppContainer>
        </article>
        <RelatedArticlesSection articles={relatedArticles} />
      </main>
    </>
  );
}
