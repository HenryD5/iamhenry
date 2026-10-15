import { siteConfig } from "@/shared/config/site";

export interface BlogJsonLdArticle {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
}

interface BlogJsonLdProps {
  name: string;
  description: string;
  articles: readonly BlogJsonLdArticle[];
}

export function BlogJsonLd({ name, description, articles }: BlogJsonLdProps) {
  const person = {
    "@type": "Person",
    name: siteConfig.person.name,
    url: siteConfig.url.toString(),
  };
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name,
    description,
    url: new URL("/blog", siteConfig.url).toString(),
    inLanguage: "es",
    author: person,
    publisher: person,
    blogPost: articles.map(({ slug, title, publishedAt, updatedAt }) => ({
      "@type": "BlogPosting",
      headline: title,
      url: new URL(
        `/blog/${encodeURIComponent(slug)}`,
        siteConfig.url,
      ).toString(),
      datePublished: publishedAt,
      dateModified: updatedAt,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll("<", "\\u003c"),
      }}
    />
  );
}
