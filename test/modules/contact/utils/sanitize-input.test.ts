import { describe, expect, it } from "vitest";

import {
  sanitizeMultiline,
  sanitizeSingleLine,
} from "@/modules/contact/utils/sanitize-input";

const char = (codePoint: number) => String.fromCodePoint(codePoint);

const C0_WITHOUT_TAB_LF_CR = [...Array(0x20).keys()]
  .filter((codePoint) => ![0x09, 0x0a, 0x0d].includes(codePoint))
  .map(char)
  .join("");

const FORMAT_CHARS = [
  0x200b, 0x200c, 0x200d, 0x200e, 0x200f, 0x202a, 0x202b, 0x202c, 0x202d,
  0x202e, 0x2066, 0x2067, 0x2068, 0x2069, 0xfeff,
]
  .map(char)
  .join("");

const EXTRA_INVISIBLES = [
  0x00ad, 0x034f, 0x115f, 0x1160, 0x3164, 0xffa0, 0x180e,
]
  .map(char)
  .join("");

describe("sanitizeSingleLine", () => {
  it("quita guion blando, CGJ, rellenos Hangul y U+180E", () => {
    expect(sanitizeSingleLine(`A${EXTRA_INVISIBLES}na`)).toBe("Ana");
    expect(sanitizeSingleLine(EXTRA_INVISIBLES)).toBe("");
  });

  it("quita controles C0, DEL y formato bidi o de ancho cero", () => {
    expect(
      sanitizeSingleLine(
        `A${C0_WITHOUT_TAB_LF_CR}n${char(0x7f)}a${FORMAT_CHARS}`,
      ),
    ).toBe("Ana");
  });

  it("quita tabuladores", () => {
    expect(sanitizeSingleLine("Ana\tPrueba")).toBe("AnaPrueba");
  });

  it("conserva \\r y \\n para que el schema los rechace", () => {
    expect(sanitizeSingleLine("Ana\r\nBcc")).toBe("Ana\r\nBcc");
  });

  it("convierte espacios Unicode en espacio simple", () => {
    expect(sanitizeSingleLine(`Ana${char(0xa0)}Prueba`)).toBe("Ana Prueba");
  });

  it("normaliza a NFC", () => {
    const decomposed = "José".normalize("NFD");
    expect(sanitizeSingleLine(decomposed)).toBe("José".normalize("NFC"));
  });

  it("puede dejar el valor vacío", () => {
    expect(sanitizeSingleLine(FORMAT_CHARS)).toBe("");
  });
});

describe("sanitizeMultiline", () => {
  it("conserva \\n y \\t y unifica \\r\\n y \\r", () => {
    expect(sanitizeMultiline("a\r\nb\rc\n\td")).toBe("a\nb\nc\n\td");
  });

  it("quita controles y formato invisible", () => {
    expect(
      sanitizeMultiline(
        `Hola${C0_WITHOUT_TAB_LF_CR}${char(0x7f)}${FORMAT_CHARS}`,
      ),
    ).toBe("Hola");
  });

  it("colapsa 20 saltos seguidos a 2", () => {
    expect(sanitizeMultiline(`a${"\n".repeat(20)}b`)).toBe("a\n\nb");
  });

  it("colapsa líneas en blanco con espacios o tabuladores", () => {
    expect(sanitizeMultiline("a\n \n\t\n  \nb")).toBe("a\n\nb");
  });

  it("colapsa líneas en blanco con NBSP u otros espacios Unicode", () => {
    expect(sanitizeMultiline(`a\n${char(0xa0)}\n${char(0x2003)}\t\n\nb`)).toBe(
      "a\n\nb",
    );
  });

  it("quita los invisibles añadidos", () => {
    expect(sanitizeMultiline(`Ho${EXTRA_INVISIBLES}la`)).toBe("Hola");
  });

  it("deja intactos uno o dos saltos", () => {
    expect(sanitizeMultiline("a\nb\n\nc")).toBe("a\nb\n\nc");
  });

  it("no toca el HTML", () => {
    const html = "<script>alert(1)</script> <b>hola</b>";
    expect(sanitizeMultiline(html)).toBe(html);
  });
});
