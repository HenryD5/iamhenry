import { siteConfig } from "@/shared/config/site";

export interface BlogPostingJsonLdProps {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  imagePath?: string;
}

export function BlogPostingJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  imagePath,
}: BlogPostingJsonLdProps) {
  const canonical = new URL(path, siteConfig.url).toString();
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: siteConfig.person.name,
      url: siteConfig.url.toString(),
    },
    ...(imagePath
      ? { image: new URL(imagePath, siteConfig.url).toString() }
      : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
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
