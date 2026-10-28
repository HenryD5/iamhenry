import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  sendContactEmail: vi.fn(),
  verifyTurnstile: vi.fn(),
  getHeader: vi.fn(),
  env: {
    RESEND_API_KEY: "re_ficticia" as string | undefined,
    CONTACT_TO_EMAIL: "to@example.test" as string | undefined,
    CONTACT_FROM_EMAIL: "from@example.test" as string | undefined,
    TURNSTILE_SECRET_KEY: "secreto-ficticio" as string | undefined,
  },
}));

vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({
  headers: async () => ({ get: mocks.getHeader }),
}));
vi.mock("@/shared/utils/env-server", () => ({ envContact: mocks.env }));
vi.mock("@/modules/contact/services/resend.service", () => ({
  sendContactEmail: mocks.sendContactEmail,
}));
vi.mock("@/modules/contact/services/turnstile.service", () => ({
  verifyTurnstile: mocks.verifyTurnstile,
}));

import { sendContactMessage } from "@/modules/contact/actions/send-contact";

const NOW = 1_800_000_000_000;

const buildForm = (overrides: Record<string, string> = {}) => {
  const fields: Record<string, string> = {
    name: "Ana Prueba",
    email: "ana@example.test",
    message: "Mensaje de prueba suficientemente largo.",
    website: "",
    startedAt: String(NOW - 10_000),
    "cf-turnstile-response": "token-ficticio",
    ...overrides,
  };
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }
  return formData;
};

beforeEach(() => {
  vi.resetAllMocks();
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
  mocks.env.RESEND_API_KEY = "re_ficticia";
  mocks.env.CONTACT_TO_EMAIL = "to@example.test";
  mocks.env.CONTACT_FROM_EMAIL = "from@example.test";
  mocks.env.TURNSTILE_SECRET_KEY = "secreto-ficticio";
  mocks.getHeader.mockReturnValue("203.0.113.5, 10.0.0.1");
  mocks.verifyTurnstile.mockResolvedValue(true);
  mocks.sendContactEmail.mockResolvedValue("sent");
});

describe("sendContactMessage", () => {
  it("envía un mensaje válido y pasa la primera IP a Turnstile", async () => {
    const result = await sendContactMessage(buildForm());

    expect(result).toEqual({ status: "sent" });
    expect(mocks.verifyTurnstile).toHaveBeenCalledWith({
      token: "token-ficticio",
      ip: "203.0.113.5",
    });
    expect(mocks.sendContactEmail).toHaveBeenCalledWith({
      name: "Ana Prueba",
      email: "ana@example.test",
      message: "Mensaje de prueba suficientemente largo.",
    });
  });

  it("funciona con la firma de useActionState (estado previo + FormData)", async () => {
    const result = await sendContactMessage(null, buildForm());
    expect(result).toEqual({ status: "sent" });
  });

  it("responde invalid sin FormData", async () => {
    expect(await sendContactMessage(null)).toEqual({ status: "invalid" });
  });

  it("honeypot lleno: sent simulado sin Turnstile ni Resend", async () => {
    const result = await sendContactMessage(
      buildForm({ website: "https://spam.example.test" }),
    );

    expect(result).toEqual({ status: "sent" });
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it.each([
    ["menos de 3 s", String(NOW - 1_000)],
    ["más de 2 h", String(NOW - 2 * 60 * 60 * 1_000 - 1)],
  ])("envío en %s: sent simulado sin enviar", async (label, startedAt) => {
    const result = await sendContactMessage(buildForm({ startedAt }));

    expect(result).toEqual({ status: "sent" });
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("token inválido: challenge_failed sin enviar", async () => {
    mocks.verifyTurnstile.mockResolvedValue(false);

    const result = await sendContactMessage(buildForm());

    expect(result).toEqual({ status: "challenge_failed" });
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("token ausente: challenge_failed sin enviar", async () => {
    const result = await sendContactMessage(
      buildForm({ "cf-turnstile-response": "" }),
    );

    expect(result).toEqual({ status: "challenge_failed" });
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it.each([
    ["startedAt ausente", { startedAt: undefined }],
    ["startedAt vacío", { startedAt: "" }],
    ["startedAt no numérico", { startedAt: "no-es-numero" }],
  ])("%s: unavailable sin simular éxito", async (label, values) => {
    const form = buildForm();
    if (values.startedAt === undefined) {
      form.delete("startedAt");
    } else {
      form.set("startedAt", values.startedAt);
    }

    expect(await sendContactMessage(form)).toEqual({ status: "unavailable" });
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("sin startedAt ni token: unavailable sin simular éxito", async () => {
    const form = buildForm({ startedAt: "", "cf-turnstile-response": "" });

    expect(await sendContactMessage(form)).toEqual({ status: "unavailable" });
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it.each([
    ["name con \\n", { name: "Ana\nBcc: x@example.test" }, "name"],
    ["name con \\r", { name: "Ana\rBcc" }, "name"],
    ["email con \\r\\n", { email: "ana@example.test\r\nBcc: x" }, "email"],
    ["mensaje de más de 2000", { message: "a".repeat(2001) }, "message"],
    ["name vacío", { name: "" }, "name"],
    ["email vacío", { email: "" }, "email"],
    ["mensaje vacío", { message: "" }, "message"],
  ])("%s: invalid sin enviar", async (label, overrides, field) => {
    const result = await sendContactMessage(buildForm(overrides));

    expect(result.status).toBe("invalid");
    expect(result.fieldErrors).toHaveProperty(field);
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("campo vacío informa la clave required", async () => {
    const result = await sendContactMessage(buildForm({ name: "" }));
    expect(result.fieldErrors?.name).toBe("required");
  });

  it.each([
    "RESEND_API_KEY",
    "CONTACT_TO_EMAIL",
    "CONTACT_FROM_EMAIL",
    "TURNSTILE_SECRET_KEY",
  ] as const)("sin %s: unavailable sin enviar", async (key) => {
    mocks.env[key] = undefined;

    const result = await sendContactMessage(buildForm());

    expect(result).toEqual({ status: "unavailable" });
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("error de Resend: unavailable sin detalle del proveedor", async () => {
    mocks.sendContactEmail.mockResolvedValue("unavailable");

    const result = await sendContactMessage(buildForm());

    expect(result).toEqual({ status: "unavailable" });
  });

  it("ignora claves extra, incluido un topic antiguo", async () => {
    const form = buildForm({ topic: "assistants", isAdmin: "true" });

    expect(await sendContactMessage(form)).toEqual({ status: "sent" });
    expect(mocks.sendContactEmail).toHaveBeenCalledWith({
      name: "Ana Prueba",
      email: "ana@example.test",
      message: "Mensaje de prueba suficientemente largo.",
    });
  });

  it.each(["name", "email", "message"] as const)(
    "File en %s: invalid sin Turnstile ni Resend",
    async (field) => {
      const form = buildForm();
      form.set(field, new File(["contenido"], "ficticio.txt"));

      const result = await sendContactMessage(form);

      expect(result).toEqual({
        status: "invalid",
        fieldErrors: { [field]: "invalid" },
      });
      expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
      expect(mocks.sendContactEmail).not.toHaveBeenCalled();
    },
  );

  it.each(["startedAt", "website", "cf-turnstile-response"])(
    "Blob en %s: invalid sin enviar",
    async (field) => {
      const form = buildForm();
      form.set(field, new Blob(["x"]));

      expect(await sendContactMessage(form)).toEqual({ status: "invalid" });
      expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
      expect(mocks.sendContactEmail).not.toHaveBeenCalled();
    },
  );

  it("limpia caracteres bidi y de control antes de enviar", async () => {
    const rlo = String.fromCodePoint(0x202e);
    const zwsp = String.fromCodePoint(0x200b);
    const nul = String.fromCodePoint(0x0000);

    await sendContactMessage(
      buildForm({
        name: `${rlo}Ana${zwsp} Prueba${nul}`,
        email: `ana@example.test${zwsp}`,
        message: `Mensaje${rlo} de prueba${nul} suficientemente largo.`,
      }),
    );

    expect(mocks.sendContactEmail).toHaveBeenCalledWith({
      name: "Ana Prueba",
      email: "ana@example.test",
      message: "Mensaje de prueba suficientemente largo.",
    });
  });

  it("campo que queda vacío tras limpiar: invalid", async () => {
    const zwsp = String.fromCodePoint(0x200b);

    const result = await sendContactMessage(
      buildForm({ name: zwsp.repeat(5) }),
    );

    expect(result).toEqual({
      status: "invalid",
      fieldErrors: { name: "invalid" },
    });
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("nombre con <script>: invalid sin enviar", async () => {
    const result = await sendContactMessage(
      buildForm({ name: "<script>alert(1)</script>" }),
    );

    expect(result).toEqual({
      status: "invalid",
      fieldErrors: { name: "invalid" },
    });
    expect(mocks.sendContactEmail).not.toHaveBeenCalled();
  });

  it("colapsa 20 saltos de línea seguidos a 2", async () => {
    await sendContactMessage(
      buildForm({ message: `Primera línea${"\n".repeat(20)}Segunda línea` }),
    );

    expect(mocks.sendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Primera línea\n\nSegunda línea" }),
    );
  });

  it("entrega el HTML del mensaje sin transformarlo", async () => {
    const html = "<script>alert(1)</script> <b>hola</b> mundo";

    await sendContactMessage(buildForm({ message: html }));

    expect(mocks.sendContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({ message: html }),
    );
  });

  it("sin cabecera x-forwarded-for pasa ip indefinida", async () => {
    mocks.getHeader.mockReturnValue(null);

    await sendContactMessage(buildForm());

    expect(mocks.verifyTurnstile).toHaveBeenCalledWith({
      token: "token-ficticio",
      ip: undefined,
    });
  });
});
