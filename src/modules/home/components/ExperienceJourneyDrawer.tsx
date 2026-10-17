import type { ExperienceViewModel } from "../types/experience.types";
import { AppIcon } from "@/shared/components/app/AppIcon";
import { AppTag } from "@/shared/components/app/AppTag";
import { UiDrawer } from "@/shared/components/ui/UiDrawer";

interface ExperienceJourneyDrawerProps {
  stages: readonly ExperienceViewModel[];
  venture: ExperienceViewModel;
  actionLabel: string;
  title: string;
  description: string;
  closeLabel: string;
  todayLabel: string;
  rolesLabel: string;
  ventureLabel: string;
}

function ExperienceTags({ stage }: { stage: ExperienceViewModel }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stage.tag ? <AppTag>{stage.tag}</AppTag> : null}
      {stage.tags?.map((tag) => (
        <AppTag key={tag}>{tag}</AppTag>
      ))}
    </div>
  );
}

function ExperienceRoles({
  stage,
  rolesLabel,
}: {
  stage: ExperienceViewModel;
  rolesLabel: string;
}) {
  if (!stage.roles?.length) return null;

  return (
    <div className="border-line mt-5 border-t pt-5">
      <h4 className="font-primary text-caption text-fg-muted mb-3 leading-none font-semibold tracking-normal">
        {rolesLabel}
      </h4>
      <ul className="m-0 grid list-none gap-3 p-0">
        {stage.roles.map((role) => (
          <li className="m-0 grid gap-1" key={`${role.title}-${role.period}`}>
            <strong className="text-body-sm font-semibold">{role.title}</strong>
            <small className="text-caption text-fg-muted font-mono">
              {role.period}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceJourneyStage({
  stage,
  todayLabel,
  rolesLabel,
}: {
  stage: ExperienceViewModel;
  todayLabel: string;
  rolesLabel: string;
}) {
  return (
    <li className="relative m-0 pb-8 last:pb-0">
      <i
        className={
          stage.isCurrent
            ? "border-primary-300 bg-primary-500 absolute top-2 -left-[1.95rem] size-4 rounded-full border-[.2rem] shadow-[0_0_0_.4rem_color-mix(in_srgb,var(--primary-500)_20%,transparent)]"
            : "bg-surface border-primary-400 absolute top-[.6rem] -left-[1.9rem] size-3 rounded-full border-2"
        }
        aria-hidden="true"
      />
      <article
        className={
          stage.isCurrent
            ? "border-primary-400 bg-surface-raised rounded-md border p-6 shadow-[var(--shadow-medium)]"
            : "border-line bg-surface-raised rounded-md border p-6"
        }
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <time className="text-caption font-mono leading-none font-medium text-(--accent-text)">
            {stage.period}
          </time>
          {stage.isCurrent ? (
            <span className="bg-primary-500 font-primary text-caption rounded-full px-3 py-2 leading-none font-semibold text-white">
              {todayLabel}
            </span>
          ) : null}
        </div>
        <h3 className="text-h5 mb-2">{stage.title}</h3>
        <p className="text-body-sm text-fg m-0 font-semibold">
          {stage.company}
        </p>
        {stage.progression ? (
          <p className="text-body-sm mt-2 mb-0 font-medium text-(--accent-text)">
            {stage.progression}
          </p>
        ) : null}
        <p className="text-body-sm text-fg-muted mt-4 mb-5 max-w-none">
          {stage.description}
        </p>
        <ExperienceTags stage={stage} />
        <ExperienceRoles stage={stage} rolesLabel={rolesLabel} />
      </article>
    </li>
  );
}

export function ExperienceJourneyDrawer({
  stages,
  venture,
  actionLabel,
  title,
  description,
  closeLabel,
  todayLabel,
  rolesLabel,
  ventureLabel,
}: ExperienceJourneyDrawerProps) {
  return (
    <UiDrawer
      placement="end"
      surface="light"
      title={title}
      description={description}
      closeLabel={closeLabel}
      contentClassName="!w-[min(36rem,calc(100vw-1.5rem))] max-md:!p-[1.4rem]"
      trigger={
        <button className="btn btn--md btn--outline gap-3" type="button">
          {actionLabel}
          <AppIcon name="arrow-right" />
        </button>
      }
    >
      <div data-motion-item="experience-journey">
        <ol className="border-line mt-8 ml-2 grid list-none border-l pl-6">
          {stages.map((stage) => (
            <ExperienceJourneyStage
              key={stage.id}
              stage={stage}
              todayLabel={todayLabel}
              rolesLabel={rolesLabel}
            />
          ))}
        </ol>
        <article className="border-line bg-surface-raised mt-8 rounded-md border border-dashed p-6">
          <span className="text-caption font-primary font-semibold text-(--accent-text)">
            {ventureLabel}
          </span>
          <time className="text-caption text-fg-muted mt-3 block font-mono">
            {venture.period}
          </time>
          <h3 className="text-h5 mt-2 mb-2">{venture.title}</h3>
          <p className="text-body-sm text-fg-muted mt-0 mb-5 max-w-none">
            {venture.description}
          </p>
          <ExperienceTags stage={venture} />
        </article>
      </div>
    </UiDrawer>
  );
}
