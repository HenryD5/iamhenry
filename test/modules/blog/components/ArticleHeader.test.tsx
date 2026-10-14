import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { articleFixtures } from "../fixtures/articles";

vi.mock("@/shared/config/site", () => ({
  siteConfig: {
    person: { name: "Persona ficticia" },
  },
}));

import { ArticleHeader } from "@/modules/blog/components/ArticleHeader";

describe("ArticleHeader", () => {
  it("renders one detail h1 and the update label only when applicable", () => {
    const { rerender } = render(<ArticleHeader article={articleFixtures[0]} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText(/Actualizado el/)).toBeInTheDocument();

    rerender(<ArticleHeader article={articleFixtures[1]} />);
    expect(screen.queryByText(/Actualizado el/)).not.toBeInTheDocument();
  });
});
