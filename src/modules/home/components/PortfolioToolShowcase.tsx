import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { portfolioToolShowcase } from "../content/home.content";
import { PortfolioGroupHeading } from "./PortfolioGroupHeading";
import { AppBrowserFrame } from "@/shared/components/app/AppBrowserFrame";
import { AppIcon } from "@/shared/components/app/AppIcon";

export async function PortfolioToolShowcase() {
  const translate = await getTranslations("home");

  return (
    <div className="mb-16 max-md:mb-12" data-motion-item="portfolio-tool">
      <PortfolioGroupHeading
        index="02"
        title={translate("portfolio.groups.tools")}
      />
      <article className="border-line bg-surface hover:border-primary-500 relative grid grid-cols-[minmax(0,1.25fr)_minmax(18rem,1fr)] overflow-hidden rounded-md border transition-colors max-md:grid-cols-1">
        <div className="self-center pb-[1.2rem] max-md:pb-0">
          <AppBrowserFrame
            src={portfolioToolShowcase.image}
            placeholder={portfolioToolShowcase.imagePlaceholder}
            alt={translate(portfolioToolShowcase.altKey)}
          />
        </div>
        <div className="flex flex-col gap-4 px-[1.6rem] pt-[1.4rem] pb-[1.6rem]">
          <span className="border-line bg-surface-raised font-primary text-caption text-fg-muted inline-flex w-fit items-center gap-2 rounded-full border px-[.8rem] py-[.4rem] leading-none font-medium">
            <span
              className="bg-success-500 size-[.5rem] rounded-full"
              aria-hidden="true"
            />
            {translate(portfolioToolShowcase.badgeKey)}
          </span>
          <h4 className="text-h4 m-0 flex flex-wrap items-center gap-[.7rem]">
            {portfolioToolShowcase.name}
            <span className="border-line bg-surface-raised font-primary text-caption text-fg-muted rounded-full border px-[.7rem] py-[.3rem] leading-none font-medium tracking-normal">
              {translate(portfolioToolShowcase.typeKey)}
            </span>
          </h4>
          <p className="text-body-sm text-fg-muted m-0">
            {translate(portfolioToolShowcase.descriptionKey)}
          </p>
          <ul
            className="m-0 flex list-none flex-wrap gap-2 p-0"
            aria-label={translate(portfolioToolShowcase.stackLabelKey)}
          >
            {portfolioToolShowcase.stack.map((technology) => (
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
            href={portfolioToolShowcase.href}
          >
            {translate(portfolioToolShowcase.actionKey)}
            <AppIcon name="arrow-right" />
          </Link>
        </div>
      </article>
    </div>
  );
}
