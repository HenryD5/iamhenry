import { describe, expect, it } from "vitest";

import {
  isHoneypotFilled,
  isSubmitTimingValid,
} from "@/modules/contact/utils/anti-spam";

describe("isHoneypotFilled", () => {
  it("detecta contenido y ignora vacío o solo espacios", () => {
    expect(isHoneypotFilled("https://example.test")).toBe(true);
    expect(isHoneypotFilled("")).toBe(false);
    expect(isHoneypotFilled("   ")).toBe(false);
  });
});

describe("isSubmitTimingValid", () => {
  const now = 1_000_000_000;

  it("rechaza envíos en menos de 3 s", () => {
    expect(isSubmitTimingValid(now - 2_999, now)).toBe(false);
  });

  it("acepta entre 3 s y 2 h inclusive", () => {
    expect(isSubmitTimingValid(now - 3_000, now)).toBe(true);
    expect(isSubmitTimingValid(now - 2 * 60 * 60 * 1_000, now)).toBe(true);
  });

  it("rechaza envíos de más de 2 h", () => {
    expect(isSubmitTimingValid(now - 2 * 60 * 60 * 1_000 - 1, now)).toBe(false);
  });

  it("rechaza valores no finitos", () => {
    expect(isSubmitTimingValid(Number.NaN, now)).toBe(false);
    expect(isSubmitTimingValid(now - 5_000, Number.POSITIVE_INFINITY)).toBe(
      false,
    );
  });
});
