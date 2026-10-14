import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppMobileMenu } from "@/shared/components/app/AppMobileMenu";

vi.mock("@/shared/components/ui/UiDrawer", () => ({
  ["UiDrawer"]: ({ children, trigger }: { children: React.ReactNode; trigger: React.ReactNode }) => (
    <div>{trigger}{children}</div>
  ),
}));

vi.mock("@/shared/components/app/AppBrandLogo", () => ({
  ["AppBrandLogo"]: () => <span>Brand</span>,
}));

vi.mock("@/shared/components/app/AppThemeSwitch", () => ({
  ["AppThemeSwitch"]: ({ label }: { label: string }) => (
    <button role="switch" aria-checked="false">{label}</button>
  ),
}));

vi.mock("@/shared/config/site", () => ({
  siteConfig: {
    person: {
      email: "henry@example.com",
      linkedIn: "https://www.linkedin.com/in/henry",
    },
  },
}));

describe("AppMobileMenu", () => {
  it("contains the night mode switch", () => {
    render(
      <AppMobileMenu
        items={[{ href: "/#stack", label: "Stack" }]}
        menuLabel="Abrir menú"
        title="Menú"
        description="Navegación móvil"
        closeLabel="Cerrar"
        contactLabel="Contacto"
        contactHref="/#contacto"
        brandLabel="I am Henry"
        availabilityLabel="Disponible"
        linkedInLabel="LinkedIn"
        contactLinksLabel="Contacto y redes"
        themeLabel="Modo noche"
      />,
    );

    expect(screen.getByRole("switch", { name: "Modo noche" })).toBeInTheDocument();
  });
});
