import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { AppBrandLogo } from "./AppBrandLogo";
import { AppContainer } from "./AppContainer";
import { AppMobileMenu } from "./AppMobileMenu";

export async function AppHeader() {
  const translate = await getTranslations("shared");
  const items = ["stack", "experience", "portfolio", "about", "blog"].map(
    (key) => ({
      href: translate(
        `navigation.${key}.href` as Parameters<typeof translate>[0],
      ),
      label: translate(
        `navigation.${key}.label` as Parameters<typeof translate>[0],
      ),
    }),
  );

  return (
    <nav
      className="border-line bg-surface/95 fixed inset-x-0 top-0 z-50 border-b py-4 backdrop-blur-[var(--surface-blur)] max-md:overflow-x-clip max-md:py-[.7rem]"
      aria-label={translate("navigation.label")}
      data-motion-section="header"
    >
      <AppContainer className="flex items-center gap-[2.4rem] max-md:gap-[var(--space-xs)]">
        <AppBrandLogo label={translate("brand")} />
        {items.map((item) => (
          <Link
            className="font-primary text-body-sm text-fg-muted hover:text-fg focus-visible:text-fg font-medium no-underline transition-colors duration-[var(--duration-fast)] max-md:hidden"
            key={item.href}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
        <Link
          className="btn btn--md focus-visible:text-white max-md:shrink-0"
          href="/#contacto"
        >
          {translate("contactCta")}
        </Link>
        <AppMobileMenu
          items={items}
          menuLabel={translate("menu.open")}
          title={translate("menu.title")}
          description={translate("menu.description")}
          closeLabel={translate("menu.close")}
          contactLabel={translate("contactCta")}
          contactHref="/#contacto"
          brandLabel={translate("brand")}
          availabilityLabel={translate("footer.availability")}
          linkedInLabel={translate("footer.linkedIn")}
          contactLinksLabel={translate("menu.contactLinksLabel")}
        />
      </AppContainer>
    </nav>
  );
}
