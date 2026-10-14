import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { siteConfig } from "@/shared/config/site";
import { AppBrandLogo } from "./AppBrandLogo";
import { AppContainer } from "./AppContainer";
import { AppIcon } from "./AppIcon";
import { UiTooltip } from "@/shared/components/ui/UiTooltip";

export async function AppFooter() {
  const translate = await getTranslations("shared");
  const sections = [
    "question",
    "stack",
    "experience",
    "portfolio",
    "about",
    "blog",
  ].map((key) => ({
    href: translate(
      `footer.sections.${key}.href` as Parameters<typeof translate>[0],
    ),
    label: translate(
      `footer.sections.${key}.label` as Parameters<typeof translate>[0],
    ),
  }));

  return (
    <footer
      className="overflow-hidden pt-22 max-md:pt-14"
      data-surface="light"
      data-motion-section="footer"
    >
      <AppContainer>
        <div className="grid grid-cols-[5fr_2.5fr_4fr] gap-16 max-md:grid-cols-1 max-md:gap-[2.4rem]">
          <div>
            <div className="mb-[1.2rem]">
              <AppBrandLogo label={translate("brand")} asLink={false} />
            </div>
            <p className="text-body text-fg-muted m-0">
              <b className="text-fg font-semibold">{siteConfig.person.name}</b>{" "}
              <span>{translate("footer.roleWithSeparator")}</span>
            </p>
            <p className="text-body text-fg-muted mt-2 mb-0">
              {translate("footer.phrase")}
            </p>
            <div className="mt-[1.8rem] flex gap-[.7rem]">
              <UiTooltip content={translate("footer.linkedIn")} surface="light">
                <a
                  className="border-line text-fg grid size-12 place-items-center rounded-full border no-underline"
                  href={siteConfig.person.linkedIn}
                  aria-label={translate("footer.linkedIn")}
                >
                  <AppIcon name="linkedin" />
                </a>
              </UiTooltip>
            </div>
          </div>
          <div>
            <h3 className="font-primary text-body-sm text-fg-muted mb-[1.3rem] leading-none font-semibold tracking-normal">
              {translate("footer.sectionsLabel")}
            </h3>
            <ul className="text-body m-0 grid list-none gap-[.85rem] p-0">
              {sections.map((item) => (
                <li className="m-0" key={item.href}>
                  <Link
                    className="text-fg hover:text-primary-300 focus-visible:text-primary-300 no-underline transition-colors duration-[var(--duration-fast)]"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-primary text-body-sm text-fg-muted mb-[1.3rem] leading-none font-semibold tracking-normal">
              {translate("footer.contactLabel")}
            </h3>
            <ul className="text-body m-0 grid list-none gap-[.85rem] p-0">
              <li className="m-0 flex items-center gap-[.7rem]">
                <AppIcon name="email" />
                <a
                  className="text-fg hover:text-primary-300 focus-visible:text-primary-300 break-all no-underline transition-colors duration-[var(--duration-fast)]"
                  href={`mailto:${siteConfig.person.email}`}
                >
                  {siteConfig.person.email}
                </a>
              </li>
              <li className="m-0 flex items-center gap-[.7rem]">
                <AppIcon name="linkedin" />
                <a
                  className="text-fg hover:text-primary-300 focus-visible:text-primary-300 no-underline transition-colors duration-[var(--duration-fast)]"
                  href={siteConfig.person.linkedIn}
                >
                  {translate("footer.linkedIn")}
                </a>
              </li>
              <li className="m-0 flex items-center gap-[.7rem]">
                <AppIcon name="briefcase" />
                {translate("footer.availability")}
              </li>
            </ul>
          </div>
        </div>
        <div
          className="font-secondary mt-18 mb-[-1.6rem] text-center text-[17.5rem] leading-[.8] font-extrabold tracking-[-.055em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--fg)_30%,transparent)] max-md:mt-12 max-md:mb-[-.5rem] max-md:text-[5.3rem]"
          aria-hidden="true"
        >
          {translate("footer.giantOutline")}{" "}
          <b className="text-secondary-400 font-extrabold [-webkit-text-stroke:0]">
            {translate("footer.giantSolid")}
          </b>
        </div>
        <div className="border-line bg-surface text-caption text-fg-muted relative flex border-t pt-[1.6rem] pb-8 max-md:pb-22">
          <span>{translate("footer.copyright")}</span>
        </div>
      </AppContainer>
    </footer>
  );
}
