import { describe, expect, it } from "vitest";
import { heroTechnologies } from "@/modules/home/content/hero.content";

describe("hero content", () => {
  it("contains the thirteen technologies from the approved mockup", () => {
    expect(heroTechnologies).toHaveLength(13);
    expect(new Set(heroTechnologies.map(({ name }) => name)).size).toBe(13);
  });
});
