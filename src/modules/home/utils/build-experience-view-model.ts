import type {
  ExperienceStage,
  ExperienceViewModel,
} from "../types/experience.types";

type Translate = (key: string) => string;

export function buildExperienceViewModels(
  stages: readonly ExperienceStage[],
  translate: Translate,
): readonly ExperienceViewModel[] {
  return stages.map((stage) => ({
    id: stage.id,
    company: stage.company,
    period: translate(stage.periodKey),
    title: translate(stage.titleKey),
    description: translate(stage.descriptionKey),
    ...(stage.progressionKey
      ? { progression: translate(stage.progressionKey) }
      : {}),
    isCurrent: stage.isCurrent,
    isVenture: stage.isVenture,
    ...(stage.tagKey ? { tag: translate(stage.tagKey) } : {}),
    ...(stage.tagKeys ? { tags: stage.tagKeys.map(translate) } : {}),
    ...(stage.roles
      ? {
          roles: stage.roles.map((role) => ({
            title: translate(role.titleKey),
            period: translate(role.periodKey),
          })),
        }
      : {}),
  }));
}
