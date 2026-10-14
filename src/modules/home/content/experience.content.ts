import type {
  ExperienceMetric,
  ExperienceStage,
} from "../types/experience.types";

export const EXPERIENCE_YEARS = "+5";

export const experienceMetrics = [
  { id: "years", labelKey: "experience.metrics.years" },
  { id: "companies", labelKey: "experience.metrics.companies" },
  { id: "venture", labelKey: "experience.metrics.venture" },
] as const satisfies readonly ExperienceMetric[];

export const experienceStages: readonly ExperienceStage[] = [
  {
    id: "freelance",
    company: "Freelance",
    periodKey: "experience.stages.freelance.period",
    titleKey: "experience.stages.freelance.title",
    descriptionKey: "experience.stages.freelance.description",
    tagKey: "experience.tags.fullStack",
  },
  {
    id: "paes",
    company: "Paes Perú",
    progressionKey: "experience.stages.paes.progression",
    periodKey: "experience.stages.paes.period",
    titleKey: "experience.stages.paes.title",
    descriptionKey: "experience.stages.paes.description",
    tagKey: "experience.tags.fullStack",
    roles: [
      {
        titleKey: "experience.stages.paes.roles.fullStack.title",
        periodKey: "experience.stages.paes.roles.fullStack.period",
      },
      {
        titleKey: "experience.stages.paes.roles.data.title",
        periodKey: "experience.stages.paes.roles.data.period",
      },
    ],
  },
  {
    id: "manzana-verde",
    company: "Manzana Verde",
    progressionKey: "experience.stages.manzana.progression",
    periodKey: "experience.stages.manzana.period",
    titleKey: "experience.stages.manzana.title",
    descriptionKey: "experience.stages.manzana.description",
    tagKey: "experience.tags.frontend",
    roles: [
      {
        titleKey: "experience.stages.manzana.roles.lead.title",
        periodKey: "experience.stages.manzana.roles.lead.period",
      },
      {
        titleKey: "experience.stages.manzana.roles.fullStack.title",
        periodKey: "experience.stages.manzana.roles.fullStack.period",
      },
      {
        titleKey: "experience.stages.manzana.roles.data.title",
        periodKey: "experience.stages.manzana.roles.data.period",
      },
    ],
  },
  {
    id: "purrfect-hire",
    company: "Purrfect Hire",
    periodKey: "experience.stages.purrfect.period",
    titleKey: "experience.stages.purrfect.title",
    descriptionKey: "experience.stages.purrfect.description",
    tagKeys: ["experience.tags.automation", "experience.tags.data"],
  },
  {
    id: "joyit",
    company: "Joyit · Culqi",
    periodKey: "experience.stages.joyit.period",
    titleKey: "experience.stages.joyit.title",
    descriptionKey: "experience.stages.joyit.description",
    tagKey: "experience.tags.frontend",
  },
  {
    id: "metrica",
    company: "Metrica · Culqi",
    periodKey: "experience.stages.metrica.period",
    titleKey: "experience.stages.metrica.title",
    descriptionKey: "experience.stages.metrica.description",
    tagKey: "experience.tags.frontend",
    isCurrent: true,
  },
  {
    id: "bluex",
    company: "BlueX",
    periodKey: "experience.stages.bluex.period",
    titleKey: "experience.stages.bluex.title",
    descriptionKey: "experience.stages.bluex.description",
    tagKeys: ["experience.tags.ai", "experience.tags.automation"],
    isVenture: true,
  },
] as const satisfies readonly ExperienceStage[];
