import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppMobileMenu } from "@/shared/components/app/AppMobileMenu";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/blog/article"),
}));

vi.mock("@/shared/components/ui/UiDrawer", () => ({
  ["UiDrawer"]: ({
    children,
    trigger,
  }: {
    children: React.ReactNode;
    trigger: React.ReactNode;
  }) => (
    <div>
      {trigger}
      {children}
    </div>
  ),
}));

vi.mock("@/shared/components/app/AppBrandLogo", () => ({
  ["AppBrandLogo"]: () => <span>Brand</span>,
}));

vi.mock("@/shared/config/site", () => ({
  siteConfig: {
    person: {
      email: "henry@example.com",
      linkedIn: "https://www.linkedin.com/in/henry",
      whatsapp: "51987654321",
    },
  },
}));

describe("AppMobileMenu", () => {
  it("does not contain the theme switch and marks the active item", () => {
    render(
      <AppMobileMenu
        items={[
          { href: "/#stack", label: "Stack" },
          { href: "/blog", label: "Blog" },
        ]}
        menuLabel="Abrir menú"
        title="Menú"
        description="Navegación móvil"
        closeLabel="Cerrar"
        contactLabel="Contacto"
        contactHref="https://wa.me/51987654321?text=Hola"
        brandLabel="I am Henry"
        availabilityLabel="Disponible"
        linkedInLabel="LinkedIn"
        contactLinksLabel="Contacto y redes"
      />,
    );

    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Blog/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Contacto" })).toHaveAttribute(
      "target",
      "_blank",
    );
  });
});
