import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  portfolioAssistantShowcase,
  portfolioCaseStudy,
} from "../content/home.content";
import { PortfolioGroupHeading } from "./PortfolioGroupHeading";
import { AppBrowserFrame } from "@/shared/components/app/AppBrowserFrame";
import { AppIcon } from "@/shared/components/app/AppIcon";
import { AppIconHalo } from "@/shared/components/app/AppIconHalo";
import { AppWhatsAppIcon } from "@/shared/components/app/AppWhatsAppIcon";
import { getContactHref, isExternalContact } from "@/shared/utils/contact";

const BADGE_CLASS_NAME =
  "border-line bg-surface-raised font-primary text-caption text-fg-muted inline-flex w-fit items-center gap-2 rounded-full whitespace-nowrap border px-[.8rem] py-[.4rem] leading-none font-medium";

export async function PortfolioAiShowcase() {
  const translate = await getTranslations("home");
  const isContactExternal = isExternalContact();
  const assistantsHref = getContactHref(
    translate("portfolio.assistants.contactMessage"),
  );

  return (
    <div className="mb-16 max-md:mb-12" data-motion-item="portfolio-ai">
      <PortfolioGroupHeading
        index="01"
        title={translate("portfolio.groups.ai")}
      />
      <div className="grid grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] gap-[1.4rem] max-lg:grid-cols-1">
        <article
          className="border-line bg-surface hover:border-primary-500 relative grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] overflow-hidden rounded-md border transition-colors max-xl:grid-cols-1"
          data-motion-item="portfolio-case-study"
        >
          <div className="self-center pb-[1.2rem] max-xl:pb-6">
            <div className="relative">
              <AppBrowserFrame
                src={portfolioCaseStudy.image}
                placeholder={portfolioCaseStudy.imagePlaceholder}
                alt={translate("portfolio.caseStudy.alt")}
              />
              <Image
                className="border-fg bg-fg absolute right-[.4rem] -bottom-6 h-auto w-[22%] rounded-[1rem] border-[.25rem] shadow-(--shadow-strong)"
                src={portfolioCaseStudy.appImage}
                alt=""
                width={portfolioCaseStudy.appImageWidth}
                height={portfolioCaseStudy.appImageHeight}
                sizes="10rem"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 px-[1.6rem] pt-[1.4rem] pb-[1.6rem]">
            <span className={BADGE_CLASS_NAME}>
              <span
                className="bg-success-500 size-[.5rem] rounded-full"
                aria-hidden="true"
              />
              {translate("portfolio.caseStudy.badge")}
            </span>
            <h4 className="text-h4 m-0 flex items-center gap-[.7rem]">
              {portfolioCaseStudy.name}
              <span className="border-line bg-surface-raised font-primary text-caption text-fg-muted rounded-full border px-[.7rem] py-[.3rem] leading-none font-medium tracking-normal">
                {translate("portfolio.caseStudy.type")}
              </span>
            </h4>
            <p className="text-body-sm text-fg-muted m-0">
              {translate("portfolio.caseStudy.description")}
            </p>
            <ul
              className="m-0 flex list-none flex-wrap gap-2 p-0"
              aria-label={translate("portfolio.caseStudy.stackLabel")}
            >
              {portfolioCaseStudy.stack.map((technology) => (
                <li
                  className="border-line text-caption rounded-full border px-[.7rem] py-[.35rem] font-mono leading-none"
                  key={technology}
                >
                  {technology}
                </li>
              ))}
            </ul>
            <Link
              className="btn btn--md mt-auto gap-[.6rem] self-start after:absolute after:inset-0 after:content-[''] focus-visible:text-white"
              href={portfolioCaseStudy.href}
            >
              {translate("portfolio.caseStudy.cta")}
              <AppIcon name="arrow-right" />
            </Link>
          </div>
        </article>
        <article
          className="border-line bg-surface relative flex flex-col gap-4 overflow-hidden rounded-md border p-[1.6rem] before:pointer-events-none before:absolute before:-top-24 before:-right-24 before:size-64 before:rounded-full before:bg-[radial-gradient(circle,color-mix(in_srgb,var(--primary-500)_18%,transparent),transparent_70%)] before:content-['']"
          data-motion-item="portfolio-assistants"
        >
          <div className="relative flex items-center gap-[1.4rem]">
            <AppIconHalo
              className="grid size-[3.6rem] shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_26%,var(--primary-300),var(--primary-500)_45%,var(--tertiary-500))] text-white shadow-[0_0_0_.45rem_color-mix(in_srgb,var(--primary-500)_16%,transparent),0_0_0_.95rem_color-mix(in_srgb,var(--primary-500)_7%,transparent)]"
              motionItem="portfolio-built-icon"
            >
              <AppIcon name="robot" />
            </AppIconHalo>
            <span className={BADGE_CLASS_NAME}>
              {translate("portfolio.assistants.badge")}
            </span>
          </div>
          <h4 className="text-h4 relative m-0">
            {translate("portfolio.assistants.title")}
          </h4>
          <p className="text-body-sm text-fg-muted relative m-0">
            {translate("portfolio.assistants.description")}
          </p>
          <ul
            className="relative m-0 grid list-none gap-[.6rem] p-0"
            aria-label={translate("portfolio.assistants.useCasesLabel")}
          >
            {portfolioAssistantShowcase.useCaseKeys.map((useCaseKey) => (
              <li
                className="text-body-sm flex items-center gap-[.6rem] font-medium"
                key={useCaseKey}
              >
                <AppIcon
                  name="check"
                  className="ih-ico text-primary-500 size-[1.1rem] shrink-0"
                />
                {translate(useCaseKey)}
              </li>
            ))}
          </ul>
          <a
            className="btn btn--outline btn--md relative mt-auto gap-[.6rem] self-start"
            href={assistantsHref}
            {...(isContactExternal
              ? { rel: "noopener noreferrer", target: "_blank" }
              : {})}
          >
            <AppWhatsAppIcon />
            {translate("portfolio.assistants.cta")}
          </a>
        </article>
      </div>
    </div>
  );
}
