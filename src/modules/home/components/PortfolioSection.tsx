import { getTranslations } from "next-intl/server";
import type { PortfolioProject } from "../types/home-content.types";
import { builtItems, portfolioProjects } from "../content/home.content";
import { PortfolioBuiltIcon } from "./PortfolioBuiltIcon";
import { AppBrowserFrame } from "@/shared/components/app/AppBrowserFrame";
import { AppContainer } from "@/shared/components/app/AppContainer";
import { AppSectionHeading } from "@/shared/components/app/AppSectionHeading";
import { UiCarousel } from "@/shared/components/ui/UiCarousel";

type Translate = Awaited<ReturnType<typeof getTranslations<"home">>>;

function ProjectCard({
  project,
  translate,
}: {
  project: PortfolioProject;
  translate: Translate;
}) {
  return (
    <article
      className="border-line bg-surface flex h-full min-w-0 flex-col overflow-hidden rounded-md border"
      data-motion-item="portfolio-project"
    >
      <AppBrowserFrame
        src={project.image}
        placeholder={project.imagePlaceholder}
        alt={translate(project.altKey as Parameters<typeof translate>[0])}
      />
      <div className="grid content-center gap-2 px-[1.6rem] pt-[1.4rem] pb-[1.6rem]">
        <h3 className="text-h4 m-0 flex items-center gap-[.7rem]">
          {project.name}
          <span className="border-line bg-surface-raised font-primary text-caption text-fg-muted rounded-full border px-[.7rem] py-[.3rem] leading-none font-medium tracking-normal">
            {translate("portfolio.type")}
          </span>
        </h3>
        {project.isPending ? (
          <p className="m-0">
            <span className="font-primary text-caption text-fg-muted inline-flex items-center gap-2 rounded-full border border-dashed border-[color-mix(in_srgb,var(--fg)_34%,transparent)] px-[.8rem] py-[.35rem] leading-[1.3] font-medium">
              {translate("portfolio.pending")}
            </span>
          </p>
        ) : (
          <p className="text-body-sm text-fg-muted m-0">
            {translate(
              project.descriptionKey as Parameters<typeof translate>[0],
            )}
          </p>
        )}
      </div>
    </article>
  );
}

export async function PortfolioSection() {
  const translate = await getTranslations("home");
  const projectCards = portfolioProjects.map((project) => (
    <ProjectCard key={project.name} project={project} translate={translate} />
  ));
  const builtCards = builtItems.map((item) => (
    <article
      className="border-line bg-surface grid h-full grid-cols-[auto_1fr] items-center gap-x-[1.1rem] gap-y-[.3rem] rounded-md border p-6 max-md:p-[1.2rem]"
      data-motion-item="portfolio-built"
      key={item.id}
    >
      <PortfolioBuiltIcon item={item} />
      <b className="font-secondary self-end text-[1.25rem] leading-[1.2] font-extrabold tracking-[-.015em]">
        {translate(item.titleKey as Parameters<typeof translate>[0])}
      </b>
      <span className="text-body-sm text-fg-muted self-start">
        {item.detail}
      </span>
    </article>
  ));

  const carouselProps = {
    ariaLabel: translate("portfolio.carouselLabel"),
    previousLabel: translate("portfolio.previous"),
    nextLabel: translate("portfolio.next"),
  };

  return (
    <section
      className="bg-surface-raised relative scroll-mt-20 overflow-hidden py-30 max-md:py-18"
      id="portafolio"
      data-motion-section="portfolio"
    >
      <AppContainer>
        <AppSectionHeading
          className="mb-14 max-md:mb-[2.2rem]"
          eyebrow={translate("portfolio.eyebrow")}
          title={translate("portfolio.title")}
          accent={translate("portfolio.accent")}
          description={translate("portfolio.lead")}
        />
        <div className="grid grid-cols-3 gap-[1.4rem] max-md:hidden">
          {projectCards}
        </div>
        <UiCarousel
          {...carouselProps}
          className="hidden max-md:grid max-md:!gap-0"
          items={projectCards}
          itemClassName="h-full !flex-[0_0_80%]"
          itemGroupClassName="!-mx-5 !rounded-none"
          controlClassName="mt-[1.2rem]"
          indicatorGroupClassName="mt-[.8rem] justify-center"
          padding="1.25rem"
          autoSize
          slidesPerPage={1.2}
          triggerClassName="!size-[2.8rem] hover:!bg-[color-mix(in_srgb,var(--fg)_9%,transparent)] hover:!text-fg focus-visible:!text-fg"
        />
        <div className="mt-[2.6rem]" data-motion-item="portfolio-carousel">
          <UiCarousel
            {...carouselProps}
            className="!gap-0 max-md:hidden"
            items={builtCards}
            headerClassName="mb-[1.2rem]"
            indicatorGroupClassName="mt-[1.3rem]"
            itemClassName="h-auto !flex-[0_0_20.5rem]"
            itemGroupClassName="!-mr-32 !-ml-[1.2rem] !rounded-none"
            padding="1.2rem"
            spacing="1.2rem"
            autoSize
            slidesPerPage={4.2}
            triggerClassName="!size-[2.8rem] hover:!bg-[color-mix(in_srgb,var(--fg)_9%,transparent)] hover:!text-fg focus-visible:!text-fg"
            title={
              <h3 className="text-h5 m-0 leading-none">
                {translate("portfolio.also")}
              </h3>
            }
          />
          <UiCarousel
            {...carouselProps}
            className="hidden max-md:grid max-md:!gap-0"
            items={builtCards}
            headerClassName="mb-[1.2rem]"
            indicatorGroupClassName="mt-[1.3rem]"
            itemClassName="h-auto !flex-[0_0_17.5rem]"
            itemGroupClassName="!-mx-5 !rounded-none"
            padding="1.25rem"
            spacing="1.2rem"
            autoSize
            slidesPerPage={1.15}
            triggerClassName="!size-[2.8rem] hover:!bg-[color-mix(in_srgb,var(--fg)_9%,transparent)] hover:!text-fg focus-visible:!text-fg"
            title={
              <h3 className="text-h5 m-0 leading-none">
                {translate("portfolio.also")}
              </h3>
            }
          />
        </div>
      </AppContainer>
    </section>
  );
}
