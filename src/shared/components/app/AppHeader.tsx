import { getTranslations } from "next-intl/server";
import { getContactHref, isExternalContact } from "@/shared/utils/contact";
import { AppBrandLogo } from "./AppBrandLogo";
import { AppContainer } from "./AppContainer";
import { AppMobileMenu } from "./AppMobileMenu";
import { AppNavLinks } from "./AppNavLinks";
import { AppThemeSwitch } from "./AppThemeSwitch";

interface AppHeaderProps {
  surface?: "light";
}

export async function AppHeader({ surface }: AppHeaderProps = {}) {
  const translate = await getTranslations("shared");
  const contactHref = getContactHref(translate("contactMessage"));
  const isContactExternal = isExternalContact();
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
      data-surface={surface}
      data-motion-section="header"
    >
      <AppContainer className="grid grid-cols-[1fr_auto_1fr] items-center gap-[2.4rem] max-md:flex max-md:gap-1.5">
        <AppBrandLogo label={translate("brand")} />
        <AppNavLinks items={items} />
        <div className="flex items-center gap-3 justify-self-end max-md:ms-auto max-md:gap-1.5">
          <AppThemeSwitch
            className="max-md:order-2"
            isCompact
            label={translate("theme.night")}
          />
          <a
            className="btn btn--md focus-visible:text-white max-md:order-1 max-md:shrink min-[768px]:order-2"
            href={contactHref}
            {...(isContactExternal
              ? { rel: "noopener noreferrer", target: "_blank" }
              : {})}
          >
            <span className="md:hidden">{translate("contactCtaShort")}</span>
            <span className="max-md:hidden">{translate("contactCta")}</span>
          </a>
          <div className="max-md:order-3 md:hidden">
            <AppMobileMenu
              items={items}
              menuLabel={translate("menu.open")}
              title={translate("menu.title")}
              description={translate("menu.description")}
              closeLabel={translate("menu.close")}
              contactLabel={translate("contactCta")}
              contactHref={contactHref}
              brandLabel={translate("brand")}
              availabilityLabel={translate("footer.availability")}
              linkedInLabel={translate("footer.linkedIn")}
              contactLinksLabel={translate("menu.contactLinksLabel")}
            />
          </div>
        </div>
      </AppContainer>
    </nav>
  );
}
