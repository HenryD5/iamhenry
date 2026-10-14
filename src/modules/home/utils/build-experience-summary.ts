import type { ExperienceStage } from "../types/experience.types";

export function buildExperienceSummary(
  stages: readonly ExperienceStage[],
  years: string,
) {
  return {
    years,
    companies: stages.filter((stage) => !stage.isVenture).length,
    venture: stages.filter((stage) => stage.isVenture).length,
  } as const;
}
