import { render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src, className }: ImgHTMLAttributes<HTMLImageElement>) => (
    <span role="img" aria-label={alt} data-src={src} className={className} />
  ),
}));

import { RelatedArticlesSection } from "@/modules/blog/components/RelatedArticlesSection";

describe("RelatedArticlesSection", () => {
  it("hides related articles when there are none", () => {
    const { container } = render(<RelatedArticlesSection articles={[]} />);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText("Sigue leyendo")).not.toBeInTheDocument();
  });
});
