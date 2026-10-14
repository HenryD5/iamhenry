import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BlogPostingJsonLd } from "@/shared/seo/blog-posting-json-ld";

vi.mock("@/shared/config/site", () => ({
  siteConfig: {
    url: new URL("https://example.test"),
    person: { name: "Persona ficticia" },
  },
}));

describe("BlogPostingJsonLd", () => {
  it("renders BlogPosting fields, canonical URL and image", () => {
    const { container } = render(
      <BlogPostingJsonLd
        headline="Título ficticio"
        description="Descripción ficticia"
        path="/blog/ficticio"
        datePublished="2025-01-01T00:00:00.000Z"
        dateModified="2025-01-02T00:00:00.000Z"
        imagePath="/blog/media/image-ficticia"
      />,
    );
    const data = JSON.parse(
      container.querySelector("script")?.textContent ?? "",
    );

    expect(data).toMatchObject({
      "@type": "BlogPosting",
      headline: "Título ficticio",
      datePublished: "2025-01-01T00:00:00.000Z",
      dateModified: "2025-01-02T00:00:00.000Z",
      image: "https://example.test/blog/media/image-ficticia",
      author: { "@type": "Person", name: "Persona ficticia" },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://example.test/blog/ficticio",
      },
    });
  });

  it("escapes less-than signs in the serialized script", () => {
    const { container } = render(
      <BlogPostingJsonLd
        headline={'</script><script>alert("x")</script>'}
        description="Ficticia"
        path="/blog/ficticio"
        datePublished="2025-01-01T00:00:00.000Z"
        dateModified="2025-01-01T00:00:00.000Z"
      />,
    );
    const script = container.querySelector("script");
    expect(script?.innerHTML).not.toContain("</script>");
    expect(script?.innerHTML).toContain("\\u003c/script>");
  });
});
