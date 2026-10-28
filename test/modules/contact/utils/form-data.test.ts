import { describe, expect, it } from "vitest";

import { readContactFormData } from "@/modules/contact/utils/form-data";

const buildForm = (entries: [string, string | Blob][]) => {
  const formData = new FormData();
  for (const [key, value] of entries) {
    formData.append(key, value);
  }
  return formData;
};

describe("readContactFormData", () => {
  it("lee solo las claves permitidas e ignora las desconocidas", () => {
    const result = readContactFormData(
      buildForm([
        ["name", "Ana Prueba"],
        ["email", "ana@example.test"],
        ["message", "Mensaje de prueba"],
        ["topic", "assistants"],
        ["$ACTION_ID_ficticio", ""],
        ["isAdmin", "true"],
      ]),
    );

    expect(result.isValid).toBe(true);
    if (result.isValid) {
      expect(result.fields.name).toBe("Ana Prueba");
      expect(result.fields).not.toHaveProperty("topic");
      expect(result.fields).not.toHaveProperty("isAdmin");
      expect(result.fields).not.toHaveProperty("$ACTION_ID_ficticio");
      expect(result.fields.website).toBe("");
    }
  });

  it("rechaza un File en una clave permitida", () => {
    const result = readContactFormData(
      buildForm([
        ["name", "Ana Prueba"],
        ["message", new File(["contenido"], "ficticio.txt")],
      ]),
    );

    expect(result).toEqual({ isValid: false, nonTextKeys: ["message"] });
  });

  it("rechaza un Blob aunque llegue repetido tras un texto", () => {
    const result = readContactFormData(
      buildForm([
        ["email", "ana@example.test"],
        ["email", new Blob(["x"])],
      ]),
    );

    expect(result).toEqual({ isValid: false, nonTextKeys: ["email"] });
  });

  it("ignora un File en una clave desconocida", () => {
    const result = readContactFormData(
      buildForm([
        ["name", "Ana Prueba"],
        ["adjunto", new File(["contenido"], "ficticio.txt")],
      ]),
    );

    expect(result.isValid).toBe(true);
  });

  it("con clave repetida usa el primer valor", () => {
    const result = readContactFormData(
      buildForm([
        ["name", "Ana Prueba"],
        ["name", "Otro Nombre"],
      ]),
    );

    expect(result.isValid && result.fields.name).toBe("Ana Prueba");
  });
});
