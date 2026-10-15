import { BlogArticleCard } from "../components/BlogArticleCard";
import { BlogEmptyState } from "../components/BlogEmptyState";
import { BlogFeaturedArticle } from "../components/BlogFeaturedArticle";
import { BlogListHeader } from "../components/BlogListHeader";
import blogMessages from "../locales/es.json";
import { getArticles } from "../services/article.service";
import { AppContainer } from "@/shared/components/app/AppContainer";
import { AppHeader } from "@/shared/components/app/AppHeader";
import { BlogJsonLd } from "@/shared/seo/blog-json-ld";

export async function BlogListView() {
  const articles = await getArticles();
  const [featuredArticle, ...remainingArticles] = articles;

  return (
    <>
      <BlogJsonLd
        name={blogMessages.metadata.title}
        description={blogMessages.metadata.description}
        articles={articles}
      />
      <AppHeader />
      <main id="main-content" className="overflow-x-clip pt-16 max-md:pt-14">
        <AppContainer>
          <BlogListHeader />
          {featuredArticle ? (
            <div className="pb-24 max-md:pb-16">
              <BlogFeaturedArticle article={featuredArticle} />
              {remainingArticles.length > 0 ? (
                <div className="mt-5 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
                  {remainingArticles.map((article) => (
                    <BlogArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <BlogEmptyState />
          )}
        </AppContainer>
      </main>
    </>
  );
}
