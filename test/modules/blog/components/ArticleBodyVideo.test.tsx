import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ArticleBodyVideo } from "@/modules/blog/components/ArticleBodyVideo";

beforeEach(() => {
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe("ArticleBodyVideo", () => {
  it("renders the figure with label, caption and poster from /media", () => {
    const { container } = render(
      <ArticleBodyVideo
        value={{
          _type: "motionVideo",
          _key: "v1",
          video: "qa-agent-flow",
          caption: "Pie de video",
          label: "Explicación del flujo",
        }}
      />,
    );
    expect(
      screen.getByRole("img", { name: "Explicación del flujo" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Pie de video").tagName).toBe("FIGCAPTION");
    const video = container.querySelector("video");
    expect(video).toHaveAttribute("poster", "/media/qa-agent-flow.webp");
    expect(video).toHaveAttribute("width", "1200");
    expect(video).toHaveAttribute("height", "900");
  });

  it("omits the figcaption without caption", () => {
    const { container } = render(
      <ArticleBodyVideo
        value={{
          _type: "motionVideo",
          _key: "v1",
          video: "qa-agent-flow",
          label: "Explicación",
        }}
      />,
    );
    expect(container.querySelector("figcaption")).toBeNull();
  });
});
