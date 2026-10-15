import { siteConfig } from "@/shared/config/site";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.person.name,
    jobTitle: siteConfig.person.jobTitle,
    email: `mailto:${siteConfig.person.email}`,
    url: siteConfig.url.toString(),
    sameAs: [siteConfig.person.linkedIn, siteConfig.person.github],
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
