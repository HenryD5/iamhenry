import { describe, expect, it } from "vitest";

import { contactSchema } from "@/modules/contact/schemas/contact.schema";

const char = (codePoint: number) => String.fromCodePoint(codePoint);
const RLO = char(0x202e);
const ZWSP = char(0x200b);
const BOM = char(0xfeff);
const NUL = char(0x0000);
const DEL = char(0x007f);

const valid = {
  name: "Ana Prueba",
  email: "ana@example.test",
  message: "Mensaje de prueba suficientemente largo.",
  website: "",
  startedAt: 1,
  turnstileToken: "token-ficticio",
};

const parse = (overrides: Record<string, unknown>) =>
  contactSchema.safeParse({ ...valid, ...overrides });

describe("contactSchema", () => {
  it("acepta una entrada válida", () => {
    expect(parse({}).success).toBe(true);
  });

  it("recorta nombre y mensaje", () => {
    const result = parse({ name: "  Ana  ", message: "  0123456789  " });
    expect(result.success && result.data.name).toBe("Ana");
    expect(result.success && result.data.message).toBe("0123456789");
  });

  it("rechaza un nombre formado solo por invisibles añadidos", () => {
    const only = [0xad, 0x34f, 0x115f, 0x1160, 0x3164, 0xffa0, 0x180e]
      .map(char)
      .join("");
    expect(parse({ name: only }).success).toBe(false);
  });

  it("no conoce el campo topic", () => {
    const result = parse({ topic: "assistants" });
    expect(result.success && "topic" in result.data).toBe(false);
  });

  it.each([
    ["name con \\n", { name: "Ana\nBcc" }],
    ["name con \\r", { name: "Ana\rBcc" }],
    ["email con \\n", { email: "ana@example.test\nBcc: x@example.test" }],
    ["email con \\r", { email: "ana@example.test\r" }],
    ["name vacío", { name: "" }],
    ["name de 1 carácter", { name: "A" }],
    ["name de más de 80", { name: "a".repeat(81) }],
    ["email vacío", { email: "" }],
    ["email inválido", { email: "no-es-correo" }],
    ["mensaje vacío", { message: "" }],
    ["mensaje corto", { message: "corto" }],
    ["mensaje de más de 2000", { message: "a".repeat(2001) }],
    ["token vacío", { turnstileToken: "" }],
    ["token de más de 2048", { turnstileToken: "t".repeat(2049) }],
  ])("rechaza %s", (label, overrides) => {
    expect(parse(overrides).success).toBe(false);
  });

  it("acepta un mensaje de exactamente 2000", () => {
    expect(parse({ message: "a".repeat(2000) }).success).toBe(true);
  });

  describe("nombre", () => {
    it.each([
      "José Núñez",
      "Zoë O'Brien",
      `Zoë O${char(0x2019)}Brien`,
      "Jean-Luc Picard",
      "Ma. Elena",
      "Ŝtefan Łukasz",
      "李小龍",
    ])("acepta %s", (name) => {
      expect(parse({ name }).success).toBe(true);
    });

    it.each([
      ["etiqueta <script>", "<script>alert(1)</script>"],
      ["dígitos", "Ana 2"],
      ["llaves", "Ana {x}"],
      ["punto y coma", "Ana; DROP"],
      ["acento grave", "Ana `x`"],
      ["barra invertida", "Ana \\ x"],
      ["arroba", "ana@example"],
      ["empieza con símbolo", "-Ana"],
    ])("rechaza %s", (label, name) => {
      expect(parse({ name }).success).toBe(false);
    });

    it("quita controles y formato bidi o de ancho cero antes de validar", () => {
      const result = parse({
        name: `${RLO}Ana${ZWSP} ${NUL}Prue${DEL}ba${BOM}`,
      });
      expect(result.success && result.data.name).toBe("Ana Prueba");
    });

    it("rechaza un nombre que queda vacío tras limpiar", () => {
      expect(parse({ name: `${ZWSP}${RLO}${ZWSP}` }).success).toBe(false);
    });

    it("normaliza a NFC", () => {
      const decomposed = "José".normalize("NFD");
      const result = parse({ name: decomposed });
      expect(result.success && result.data.name).toBe("José".normalize("NFC"));
    });
  });

  describe("correo", () => {
    it.each([
      ["espacios", "ana prueba@example.test"],
      ["comillas dobles", '"ana"@example.test'],
      ["apóstrofo", "o'brien@example.test"],
      ["ángulos", "<ana@example.test>"],
      ["punto y coma", "ana@example.test;x@example.test"],
      ["coma", "ana@example.test,x@example.test"],
    ])("rechaza %s", (label, email) => {
      expect(parse({ email }).success).toBe(false);
    });

    it("quita caracteres invisibles y recorta", () => {
      const result = parse({ email: ` ana${ZWSP}@example.test${BOM} ` });
      expect(result.success && result.data.email).toBe("ana@example.test");
    });
  });

  describe("mensaje", () => {
    it("conserva el HTML como texto", () => {
      const message = "<script>alert(1)</script> <b>hola</b> mundo";
      const result = parse({ message });
      expect(result.success && result.data.message).toBe(message);
    });

    it("colapsa 20 saltos de línea seguidos a 2", () => {
      const result = parse({
        message: `Primera línea${"\n".repeat(20)}Segunda línea`,
      });
      expect(result.success && result.data.message).toBe(
        "Primera línea\n\nSegunda línea",
      );
    });

    it("conserva \\n y \\t y quita controles y bidi", () => {
      const result = parse({
        message: `Hola${NUL}${RLO} mundo\r\n\tcon tabulador${DEL}`,
      });
      expect(result.success && result.data.message).toBe(
        "Hola mundo\n\tcon tabulador",
      );
    });

    it("mide el máximo después de limpiar", () => {
      const message = `${"a".repeat(2000)}${ZWSP.repeat(50)}`;
      expect(parse({ message }).success).toBe(true);
    });

    it("rechaza un mensaje que queda vacío tras limpiar", () => {
      expect(parse({ message: ZWSP.repeat(20) }).success).toBe(false);
    });
  });
});
