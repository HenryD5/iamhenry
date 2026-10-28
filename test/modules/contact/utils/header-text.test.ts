import { describe, expect, it } from "vitest";

import {
  hasLineBreak,
  sanitizeHeaderText,
} from "@/modules/contact/utils/header-text";

describe("hasLineBreak", () => {
  it("detecta \\r y \\n", () => {
    expect(hasLineBreak("a\nb")).toBe(true);
    expect(hasLineBreak("a\rb")).toBe(true);
    expect(hasLineBreak("a b")).toBe(false);
  });
});

describe("sanitizeHeaderText", () => {
  it("sustituye saltos por un espacio y recorta", () => {
    expect(sanitizeHeaderText("  Hola\r\nBcc: x@example.test\n")).toBe(
      "Hola Bcc: x@example.test",
    );
  });

  it("deja intacto el texto sin saltos", () => {
    expect(sanitizeHeaderText("Texto limpio")).toBe("Texto limpio");
  });
});
