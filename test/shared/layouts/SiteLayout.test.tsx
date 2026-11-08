import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
  getTranslations: vi
    .fn()
    .mockResolvedValue((key: string, values?: { email?: string }) =>
      key === "noScript"
        ? `Activa JavaScript o escribe a ${values?.email}.`
        : key,
    ),
}));

vi.mock("@/shared/config/site", () => ({
  siteConfig: { person: { email: "henry@example.com" } },
}));

vi.mock("@/shared/components/app/AppFooter", () => ({
  ["AppFooter"]: () => <footer>henry@example.com</footer>,
}));

vi.mock("@/shared/components/app/AppFloatingContact", () => ({
  ["AppFloatingContact"]: () => null,
}));

vi.mock("@/shared/components/ui/UiToast", () => ({
  ["UiToaster"]: () => null,
}));

import { SiteLayout } from "@/shared/layouts/SiteLayout";

describe("SiteLayout", () => {
  it("renders a noscript notice with the footer email", async () => {
    const markup = renderToStaticMarkup(
      await SiteLayout({
        children: <main>Contenido</main>,
        floatingContactTrigger: <button type="button">Contacto</button>,
      }),
    );

    expect(markup).toContain("<noscript>");
    expect(markup).toContain(
      "Activa JavaScript o escribe a henry@example.com.",
    );
  });
});
