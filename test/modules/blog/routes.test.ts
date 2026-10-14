import { describe, expect, it } from "vitest";
import { getArticlePath } from "@/modules/blog/routes";

describe("blog routes", () => {
  it("encodes article slugs", () => {
    expect(getArticlePath("ruta con/segmento")).toBe(
      "/blog/ruta%20con%2Fsegmento",
    );
  });
});
