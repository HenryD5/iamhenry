import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BlogJsonLd } from "@/shared/seo/blog-json-ld";

vi.mock("@/shared/config/site", () => ({
  siteConfig: {
    url: new URL("https://example.test"),
    person: { name: "Persona ficticia" },
  },
}));

describe("BlogJsonLd", () => {
  it("renders Blog identity, Person ownership and article summaries", () => {
    const { container } = render(
      <BlogJsonLd
        name="Blog ficticio"
        description="Descripción ficticia"
        articles={[
          {
            slug: "artículo ficticio",
            title: "Artículo ficticio",
            publishedAt: "2025-01-01T00:00:00.000Z",
            updatedAt: "2025-01-02T00:00:00.000Z",
          },
        ]}
      />,
    );
    const data = JSON.parse(
      container.querySelector("script")?.textContent ?? "",
    );

    expect(data).toMatchObject({
      "@type": "Blog",
      name: "Blog ficticio",
      url: "https://example.test/blog",
      inLanguage: "es",
      author: { "@type": "Person", name: "Persona ficticia" },
      publisher: { "@type": "Person", name: "Persona ficticia" },
      blogPost: [
        {
          "@type": "BlogPosting",
          headline: "Artículo ficticio",
          url: "https://example.test/blog/art%C3%ADculo%20ficticio",
          datePublished: "2025-01-01T00:00:00.000Z",
          dateModified: "2025-01-02T00:00:00.000Z",
        },
      ],
    });
  });
});
