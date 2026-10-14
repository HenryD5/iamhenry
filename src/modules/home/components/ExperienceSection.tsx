import { getTranslations } from "next-intl/server";
import {
  EXPERIENCE_YEARS,
  experienceMetrics,
  experienceStages,
} from "../content/experience.content";
import type { ExperienceViewModel } from "../types/experience.types";
import { buildExperienceSummary } from "../utils/build-experience-summary";
import { buildExperienceViewModels } from "../utils/build-experience-view-model";
import { ExperienceJourneyDrawer } from "./ExperienceJourneyDrawer";
import { AppContainer } from "@/shared/components/app/AppContainer";
import { AppIcon } from "@/shared/components/app/AppIcon";
import { AppSectionHeading } from "@/shared/components/app/AppSectionHeading";
import { AppTag } from "@/shared/components/app/AppTag";

function ExperienceCurrentCard({
  stage,
  todayLabel,
}: {
  stage: ExperienceViewModel;
  todayLabel: string;
}) {
  return (
    <article
      className="mt-6 grid grid-cols-[minmax(0,4fr)_minmax(0,5fr)_auto] items-center gap-10 rounded-lg p-8 shadow-[var(--card-shadow)] max-md:grid-cols-1 max-md:gap-5 max-md:p-6"
      data-surface="light"
      data-motion-item="experience-current"
    >
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="bg-primary-500 font-primary text-caption rounded-full px-3 py-2 leading-none font-semibold text-white">
            {todayLabel}
          </span>
          <time className="text-caption text-primary-300 font-mono leading-none font-medium">
            {stage.period}
          </time>
        </div>
        <h3 className="text-h3 mb-2">{stage.title}</h3>
        <p className="text-body text-fg-muted m-0 font-semibold">
          {stage.company}
        </p>
      </div>
      <p className="text-body text-fg-muted m-0 max-w-none">
        {stage.description}
      </p>
      <div className="flex flex-wrap justify-end gap-2 max-md:justify-start">
        {stage.tag ? <AppTag>{stage.tag}</AppTag> : null}
        {stage.tags?.map((tag) => (
          <AppTag key={tag}>{tag}</AppTag>
        ))}
      </div>
    </article>
  );
}

export async function ExperienceSection() {
  const translate = await getTranslations("home");
  const stages = buildExperienceViewModels(experienceStages, (key) =>
    translate(key as Parameters<typeof translate>[0]),
  );
  const currentStage = stages.find((stage) => stage.isCurrent);
  const ventureStage = stages.find((stage) => stage.isVenture);
  const careerStages = [
    ...stages.filter((stage) => !stage.isVenture),
  ].reverse();
  const summary = buildExperienceSummary(experienceStages, EXPERIENCE_YEARS);
  const metricValues = {
    years: summary.years,
    companies: summary.companies,
    venture: summary.venture,
  } as const;

  if (!currentStage || !ventureStage) return null;

  return (
    <section
      id="experiencia"
      className="relative scroll-mt-20 overflow-hidden py-30 max-md:py-18"
      data-motion-section="experience"
    >
      <AppContainer>
        <AppSectionHeading
          className="mb-[2.6rem]"
          titleClassName="max-w-[21ch]"
          eyebrow={translate("experience.eyebrow")}
          title={translate("experience.title")}
          accent={translate("experience.accent")}
          description={translate("experience.description")}
        />
        <div
          className="grid grid-cols-3 gap-4 max-md:gap-2"
          data-motion-item="experience-stats"
        >
          {experienceMetrics.map((metric) => (
            <article
              className="border-line bg-surface-raised grid min-w-0 content-center rounded-md border p-8 text-center shadow-[var(--shadow-soft)] max-md:px-2 max-md:py-5"
              data-motion-item="experience-stat"
              key={metric.id}
            >
              <strong className="font-secondary text-h1 text-primary-500 max-md:text-h3 leading-none font-extrabold tracking-[var(--heading-tracking)]">
                {metricValues[metric.id]}
              </strong>
              <span className="text-body-sm text-fg-muted max-md:text-caption mt-3 leading-[1.25] font-medium break-words max-md:mt-2">
                {translate(metric.labelKey as Parameters<typeof translate>[0])}
              </span>
            </article>
          ))}
        </div>
        <ExperienceCurrentCard
          stage={currentStage}
          todayLabel={translate("experience.today")}
        />
        <div className="mt-6">
          <ExperienceJourneyDrawer
            stages={careerStages}
            venture={ventureStage}
            actionLabel={translate("experience.journeyAction")}
            title={translate("experience.journeyTitle")}
            description={translate("experience.journeyDescription")}
            closeLabel={translate("experience.journeyClose")}
            todayLabel={translate("experience.today")}
            rolesLabel={translate("experience.rolesLabel")}
            ventureLabel={translate("experience.ventureLabel")}
          />
        </div>
        <aside className="mt-[1.4rem] grid grid-cols-[auto_1fr_1fr] items-center gap-12 rounded-md border border-dashed border-[color-mix(in_srgb,var(--fg)_30%,transparent)] px-8 py-[1.4rem] max-md:grid-cols-1 max-md:gap-[1.2rem] max-md:p-[1.4rem]">
          <div className="flex items-center gap-[.7rem]">
            <AppIcon name="education" />
            <strong className="font-secondary text-h5 leading-[var(--leading-heading)] font-extrabold tracking-[var(--heading-tracking)]">
              {translate("experience.education")}
            </strong>
          </div>
          <div>
            <small className="text-caption text-primary-500 font-mono leading-[1.3] font-medium">
              {translate("experience.degreePeriod")}
            </small>
            <strong className="font-secondary mt-[.3rem] mb-[.1rem] block text-[1.2rem] leading-[1.25] font-extrabold tracking-[-.01em]">
              {translate("experience.degree")}
            </strong>
            <span className="text-body-sm text-fg-muted">
              {translate("experience.university")}
            </span>
          </div>
          <div>
            <strong className="font-secondary mt-[.3rem] mb-[.1rem] block text-[1.2rem] leading-[1.25] font-extrabold tracking-[-.01em]">
              {translate("experience.courses")}
            </strong>
            <span className="text-body-sm text-fg-muted">
              {translate("experience.continuous")}
            </span>
          </div>
        </aside>
      </AppContainer>
    </section>
  );
}
