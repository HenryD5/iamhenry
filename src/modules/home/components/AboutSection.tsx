import { getTranslations } from "next-intl/server";
import { aboutContactItems, aboutFacets } from "../content/home.content";
import { AppContainer } from "@/shared/components/app/AppContainer";
import { AppFacetList } from "@/shared/components/app/AppFacetList";
import { AppIcon } from "@/shared/components/app/AppIcon";
import { siteConfig } from "@/shared/config/site";

export async function AboutSection() {
  const translate = await getTranslations("home");
  const facets = aboutFacets.map((item) => ({
    facet: item.facet,
    label: translate(item.labelKey as Parameters<typeof translate>[0]),
  }));
  const contactValues = {
    email: siteConfig.person.email,
    projects: translate("about.available"),
    linkedIn: translate("about.linkedInValue"),
  } as const;

  return (
    <section
      className="relative scroll-mt-20 overflow-hidden py-30 max-md:py-18"
      id="sobre-mi"
      data-motion-section="about"
    >
      <AppContainer>
        <p className="font-primary text-body-sm text-primary-500 before:bg-tertiary-500 mb-[1.3rem] inline-flex items-center gap-[.6rem] leading-[1.2] font-semibold before:size-[.55rem] before:rounded-full before:content-['']">
          {translate("about.eyebrow")}
        </p>
        <h2
          className="max-md:text-h1 mb-[2.4rem] max-w-[22ch] text-[5rem] leading-[1.04] tracking-[var(--tracking-display)] max-md:mb-[1.8rem] max-md:max-w-none"
          data-motion-item="about-quote"
        >
          {translate("about.quote")}{" "}
          <span className="text-primary-500">
            {translate("about.quoteAccent")}
          </span>
        </h2>
        <AppFacetList
          className="!text-body max-md:!text-body-sm mb-16 !gap-x-[1.8rem] !gap-y-0 !leading-[normal] font-semibold max-md:mb-[2.4rem] max-md:!gap-x-[1.4rem] max-md:!gap-y-[.8rem] [&>span]:!gap-[.55rem]"
          items={facets}
        />
        <div className="border-line grid grid-cols-[3.6fr_3.6fr_5.8fr] items-start gap-12 border-t pt-12 max-md:grid-cols-1 max-md:gap-[1.6rem] max-md:pt-8">
          <p className="text-body-lg m-0 max-w-none leading-[1.5]">
            {translate("about.primary")}
          </p>
          <p className="text-body text-fg-muted m-0 max-w-none leading-[1.6]">
            {translate("about.secondary")}
          </p>
          <dl
            className="border-line bg-surface m-0 grid grid-cols-1 gap-0 rounded-md border px-[1.6rem] py-[.4rem] max-md:px-[1.1rem] max-md:py-[.2rem]"
            data-motion-item="about-contact"
          >
            {aboutContactItems.map((item, index) => (
              <div
                className={`text-body max-md:text-body-sm grid grid-cols-[2.2rem_5.6rem_1fr] items-center py-[1.05rem] max-md:grid-cols-[2rem_minmax(0,1fr)] max-md:gap-y-[.15rem] ${index < aboutContactItems.length - 1 ? "border-line border-b" : ""}`}
                key={item.id}
              >
                <AppIcon
                  className="stroke-primary-500 size-[1.3rem] shrink-0 fill-none stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round] max-md:row-span-2"
                  name={item.icon}
                />
                <dt className="text-body-sm text-fg-muted p-0 font-semibold normal-case max-md:col-start-2">
                  {translate(item.labelKey as Parameters<typeof translate>[0])}
                </dt>
                <dd className="text-fg m-0 font-semibold [overflow-wrap:anywhere] max-md:col-start-2">
                  {contactValues[item.id]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </AppContainer>
    </section>
  );
}
