import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeroSection } from "@/modules/home/components/HeroSection";

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
}));
vi.mock("@/shared/components/app/AppHeader", () => ({
  ["AppHeader"]: () => <nav aria-label="header" />,
}));

describe("HeroSection", () => {
  it("renders one level-one heading and all technologies", async () => {
    render(await HeroSection());
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Agentes IA")).toBeInTheDocument();
  });
});
