import { describe, expect, it } from "vitest";
import {
  EXPERIENCE_YEARS,
  experienceStages,
} from "@/modules/home/content/experience.content";
import { buildExperienceSummary } from "@/modules/home/utils/build-experience-summary";

describe("experience content", () => {
  it("derives the figures and identifies the current role and venture", () => {
    expect(experienceStages).toHaveLength(7);
    expect(experienceStages.find((stage) => stage.isCurrent)?.id).toBe(
      "metrica",
    );
    expect(experienceStages.find((stage) => stage.isVenture)?.id).toBe("bluex");
    expect(buildExperienceSummary(experienceStages, EXPERIENCE_YEARS)).toEqual({
      years: "+5",
      companies: 6,
      venture: 1,
    });
  });
});
