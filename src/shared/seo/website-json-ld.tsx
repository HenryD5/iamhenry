import { siteConfig } from "@/shared/config/site";

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url.toString(),
    inLanguage: "es",
    description: siteConfig.description,
    publisher: {
      "@type": "Person",
      name: siteConfig.person.name,
      url: siteConfig.url.toString(),
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
