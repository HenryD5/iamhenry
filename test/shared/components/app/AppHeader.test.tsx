import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppHeader } from "@/shared/components/app/AppHeader";

vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => {
    const messages: Record<string, string> = {
      "navigation.label": "Navegación principal",
      "theme.night": "Modo noche",
      brand: "I am Henry",
      contactCta: "Construyamos algo juntos",
    };
    return messages[key] ?? key;
  }),
}));

vi.mock("@/shared/components/app/AppBrandLogo", () => ({
  ["AppBrandLogo"]: ({ label }: { label: string }) => <span>{label}</span>,
}));

vi.mock("@/shared/components/app/AppThemeSwitch", () => ({
  ["AppThemeSwitch"]: ({ label }: { label: string }) => (
    <button role="switch" aria-checked="false">{label}</button>
  ),
}));

vi.mock("@/shared/components/app/AppMobileMenu", () => ({
  ["AppMobileMenu"]: () => <div data-testid="mobile-menu" />,
}));

describe("AppHeader", () => {
  it("renders the night switch", async () => {
    render(await AppHeader());

    expect(screen.getByRole("switch", { name: "Modo noche" })).toBeInTheDocument();
  });

  it("marks a light surface on the navigation", async () => {
    render(await AppHeader({ surface: "light" }));

    expect(screen.getByRole("navigation", { name: "Navegación principal" })).toHaveAttribute(
      "data-surface",
      "light",
    );
  });
});
