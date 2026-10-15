import { expect, it } from "vitest";
import { resolveCodeLanguage } from "@/modules/blog/utils/code-language";

it("resolves an unknown language to text", () => {
  expect(resolveCodeLanguage("python")).toBe("text");
});
