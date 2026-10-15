import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WebsiteJsonLd } from "@/shared/seo/website-json-ld";

vi.mock("@/shared/config/site", () => ({
  siteConfig: {
    name: "Sitio ficticio",
    description: "Descripción ficticia",
    url: new URL("https://example.test"),
    person: { name: "Persona ficticia" },
  },
}));

describe("WebsiteJsonLd", () => {
  it("renders the website and its Person publisher", () => {
    const { container } = render(<WebsiteJsonLd />);
    const data = JSON.parse(
      container.querySelector("script")?.textContent ?? "",
    );

    expect(data).toMatchObject({
      "@type": "WebSite",
      name: "Sitio ficticio",
      url: "https://example.test/",
      inLanguage: "es",
      description: "Descripción ficticia",
      publisher: {
        "@type": "Person",
        name: "Persona ficticia",
        url: "https://example.test/",
      },
    });
  });
});
