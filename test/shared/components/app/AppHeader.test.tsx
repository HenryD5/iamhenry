import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppHeader } from "@/shared/components/app/AppHeader";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/blog"),
}));

vi.mock("@/shared/config/site", () => ({
  siteConfig: {
    person: {
      email: "henry@example.com",
      whatsapp: "51930724632",
    },
  },
}));

vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => {
    const messages: Record<string, string> = {
      "navigation.label": "Navegación principal",
      "navigation.stack.href": "/#stack",
      "navigation.stack.label": "Stack",
      "navigation.experience.href": "/#experiencia",
      "navigation.experience.label": "Experiencia",
      "navigation.portfolio.href": "/#portafolio",
      "navigation.portfolio.label": "Portafolio",
      "navigation.about.href": "/#sobre-mi",
      "navigation.about.label": "Sobre mí",
      "navigation.blog.href": "/blog",
      "navigation.blog.label": "Blog",
      "theme.night": "Modo noche",
      brand: "I am Henry",
      contactCta: "Construyamos algo juntos",
      contactCtaShort: "Escríbeme",
      contactMessage: "¡Hola, Henry!",
    };
    return messages[key] ?? key;
  }),
}));

vi.mock("@/shared/components/app/AppBrandLogo", () => ({
  ["AppBrandLogo"]: ({ label }: { label: string }) => <span>{label}</span>,
}));

vi.mock("@/shared/components/app/AppThemeSwitch", () => ({
  ["AppThemeSwitch"]: ({
    label,
    isCompact,
  }: {
    label: string;
    isCompact?: boolean;
  }) => (
    <button role="switch" aria-checked="false" data-compact={isCompact}>
      {label}
    </button>
  ),
}));

vi.mock("@/shared/components/app/AppMobileMenu", () => ({
  ["AppMobileMenu"]: ({
    items,
  }: {
    items: readonly { href: string; label: string }[];
  }) => <div data-testid="mobile-menu">{items.length}</div>,
}));

describe("AppHeader", () => {
  it("renders the night switch", async () => {
    render(await AppHeader());

    const switches = screen.getAllByRole("switch", { name: "Modo noche" });
    expect(switches).toHaveLength(1);
    expect(switches[0]).toHaveAttribute("data-compact", "true");
  });

  it("renders centered links and marks the blog page active", async () => {
    const { container } = render(await AppHeader());

    expect(
      container.querySelector(".grid-cols-\\[1fr_auto_1fr\\]"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Blog" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("renders responsive contact labels at the normal button size", async () => {
    render(await AppHeader());

    const contactLink = screen.getByText("Escríbeme").closest("a");
    expect(contactLink).toHaveClass("btn--md");
    expect(contactLink).toHaveAttribute(
      "href",
      "https://wa.me/51930724632?text=%C2%A1Hola%2C%20Henry!",
    );
    expect(contactLink).toHaveAttribute("target", "_blank");
    expect(contactLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(contactLink).not.toHaveClass("max-md:px-2", "max-md:text-[.7rem]");
    expect(screen.getByText("Escríbeme")).toHaveClass("md:hidden");
    expect(screen.getByText("Construyamos algo juntos")).toHaveClass(
      "max-md:hidden",
    );
  });

  it("marks a light surface on the navigation", async () => {
    render(await AppHeader({ surface: "light" }));

    expect(
      screen.getByRole("navigation", { name: "Navegación principal" }),
    ).toHaveAttribute("data-surface", "light");
  });
});
