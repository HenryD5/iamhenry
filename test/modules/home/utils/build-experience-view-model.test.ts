import { describe, expect, it } from "vitest";
import { buildExperienceViewModels } from "@/modules/home/utils/build-experience-view-model";
import type { ExperienceStage } from "@/modules/home/types/experience.types";

describe("buildExperienceViewModels", () => {
  it("translates optional tags and roles", () => {
    const stages: readonly ExperienceStage[] = [
      {
        id: "stage",
        company: "Company",
        periodKey: "period",
        titleKey: "title",
        descriptionKey: "description",
        progressionKey: "progression",
        tagKey: "tag",
        roles: [{ titleKey: "role", periodKey: "rolePeriod" }],
      },
    ];
    const result = buildExperienceViewModels(
      stages,
      (key) => `translated:${key}`,
    );
    expect(result[0]).toMatchObject({
      period: "translated:period",
      progression: "translated:progression",
      tag: "translated:tag",
      roles: [{ title: "translated:role", period: "translated:rolePeriod" }],
    });
  });
});
