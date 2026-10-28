import { describe, expect, it } from "vitest";
import { getContactHref } from "@/shared/utils/contact";

describe("getContactHref", () => {
  it("always points to the contact page without a topic", () => {
    expect(getContactHref()).toBe("/contacto");
  });
});
