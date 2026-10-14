import { render, screen, within } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Article } from "@/modules/blog/types/article.types";
import { articleFixtures } from "../fixtures/articles";

const { getArticlesMock, getArticleBySlugMock, notFoundMock } = vi.hoisted(
  () => ({
    getArticlesMock: vi.fn(),
    getArticleBySlugMock: vi.fn(),
    notFoundMock: vi.fn(),
  }),
);

vi.mock("server-only", () => ({}));
vi.mock("@/modules/blog/services/article.service", () => ({
  getArticles: getArticlesMock,
  getArticleBySlug: getArticleBySlugMock,
}));
vi.mock("next/navigation", () => ({ notFound: notFoundMock }));
vi.mock("@/shared/config/site", () => ({
  siteConfig: {
    url: new URL("https://example.test"),
    person: { name: "Persona ficticia" },
  },
}));
vi.mock("@/shared/components/app/AppHeader", () => ({
  ["AppHeader"]: () => <nav aria-label="Navegación principal" />,
}));
vi.mock("next/image", () => ({
  default: ({ alt, src, className }: ImgHTMLAttributes<HTMLImageElement>) => (
    <span role="img" aria-label={alt} data-src={src} className={className} />
  ),
}));

import { ArticleView } from "@/modules/blog/views/ArticleView";
import { BlogListView } from "@/modules/blog/views/BlogListView";

function relatedArticle(index: number): Article {
  return {
    ...articleFixtures[1],
    slug: `relacionado-${index}`,
    title: `Relacionado ${index}`,
  };
}

describe("blog views", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders the first listing article as featured and the rest as cards", async () => {
    getArticlesMock.mockResolvedValue(articleFixtures);
    render(await BlogListView());

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { name: articleFixtures[0].title, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: articleFixtures[1].title, level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Más reciente")).toBeInTheDocument();
  });

  it("renders the approved empty state", async () => {
    getArticlesMock.mockResolvedValue([]);
    render(await BlogListView());
    expect(
      screen.getByRole("heading", { name: "Pronto habrá artículos aquí" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ver portafolio" }),
    ).toHaveAttribute("href", "/#portafolio");
  });

  it("shows at most three related articles and excludes the current article", async () => {
    const current = articleFixtures[0];
    const related = [1, 2, 3, 4].map(relatedArticle);
    getArticleBySlugMock.mockResolvedValue(current);
    getArticlesMock.mockResolvedValue([current, ...related]);
    render(
      await ArticleView({ params: Promise.resolve({ slug: current.slug }) }),
    );

    const section = screen.getByRole("region", { name: "Sigue leyendo" });
    expect(within(section).getAllByRole("link")).toHaveLength(3);
    expect(within(section).queryByText(current.title)).not.toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
