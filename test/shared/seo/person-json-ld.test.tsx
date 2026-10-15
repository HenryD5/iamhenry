import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PersonJsonLd } from "@/shared/seo/person-json-ld";

vi.mock("@/shared/config/site", () => ({
  siteConfig: {
    url: new URL("https://example.test"),
    person: {
      name: "Persona ficticia",
      jobTitle: "Software Engineer",
      email: "persona@example.test",
      linkedIn: "https://linkedin.example/persona",
      github: "https://github.example/persona",
    },
  },
}));

describe("PersonJsonLd", () => {
  it("includes LinkedIn and GitHub as sameAs profiles", () => {
    const { container } = render(<PersonJsonLd />);
    const data = JSON.parse(
      container.querySelector("script")?.textContent ?? "",
    );

    expect(data.sameAs).toEqual([
      "https://linkedin.example/persona",
      "https://github.example/persona",
    ]);
  });
});
