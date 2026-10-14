import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArticleBodyLink } from "@/modules/blog/components/ArticleBodyLink";

describe("ArticleBodyLink", () => {
  it.each(["http://example.test", "https://example.test"])(
    "opens external URL %s safely",
    (href) => {
      const { container } = render(
        <ArticleBodyLink href={href}>Externo</ArticleBodyLink>,
      );
      expect(
        within(container).getByRole("link", { name: "Externo" }),
      ).toHaveAttribute("target", "_blank");
      expect(
        within(container).getByRole("link", { name: "Externo" }),
      ).toHaveAttribute("rel", "noopener noreferrer");
    },
  );

  it("renders mailto without a target", () => {
    render(
      <ArticleBodyLink href="mailto:test@example.test">Correo</ArticleBodyLink>,
    );
    const link = screen.getByRole("link", { name: "Correo" });
    expect(link).toHaveAttribute("href", "mailto:test@example.test");
    expect(link).not.toHaveAttribute("target");
  });

  it.each(["/blog/entrada", "#seccion"])(
    "renders internal route %s as a link",
    (href) => {
      const { container } = render(
        <ArticleBodyLink href={href}>Interno</ArticleBodyLink>,
      );
      expect(
        within(container).getByRole("link", { name: "Interno" }),
      ).toHaveAttribute("href", href);
    },
  );

  it.each(["javascript:alert(1)", "data:text/html,bad"])(
    "renders unsafe URL %s as text only",
    (href) => {
      const { container } = render(
        <ArticleBodyLink href={href}>Bloqueado</ArticleBodyLink>,
      );
      expect(within(container).getByText("Bloqueado")).toBeInTheDocument();
      expect(within(container).queryByRole("link")).not.toBeInTheDocument();
    },
  );
});
