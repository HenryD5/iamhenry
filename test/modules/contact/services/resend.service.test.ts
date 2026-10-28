import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  send: vi.fn(),
  env: {
    RESEND_API_KEY: "re_ficticia" as string | undefined,
    CONTACT_TO_EMAIL: "to@example.test" as string | undefined,
    CONTACT_FROM_EMAIL: "from@example.test" as string | undefined,
  },
}));

vi.mock("server-only", () => ({}));
vi.mock("@/shared/utils/env-server", () => ({ envContact: mocks.env }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mocks.send };
  },
}));

import { sendContactEmail } from "@/modules/contact/services/resend.service";

const input = {
  name: "Ana Prueba",
  email: "ana@example.test",
  message: "<script>alert(1)</script> <b>hola</b>",
};

beforeEach(() => {
  vi.resetAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  mocks.env.RESEND_API_KEY = "re_ficticia";
  mocks.env.CONTACT_TO_EMAIL = "to@example.test";
  mocks.env.CONTACT_FROM_EMAIL = "from@example.test";
  mocks.send.mockResolvedValue({ error: null });
});

describe("sendContactEmail", () => {
  it("envía solo texto plano con el HTML sin interpretar y replyTo del visitante", async () => {
    const result = await sendContactEmail(input);

    expect(result).toBe("sent");
    const payload = mocks.send.mock.calls[0]?.[0];
    expect(payload.text).toContain(input.message);
    expect(payload).not.toHaveProperty("html");
    expect(payload.replyTo).toBe("ana@example.test");
    expect(payload.to).toBe("to@example.test");
    expect(payload.subject).toBe("Nuevo mensaje de contacto");
    expect(payload.text).toBe(
      `Nombre: Ana Prueba\nCorreo: ana@example.test\n\n${input.message}`,
    );
  });

  it("omite replyTo si el correo no vuelve a validar", async () => {
    await sendContactEmail({ ...input, email: "no-es-correo" });

    const payload = mocks.send.mock.calls[0]?.[0];
    expect(payload).not.toHaveProperty("replyTo");
    expect(payload.subject).toBe("Nuevo mensaje de contacto");
  });

  it("el asunto no incluye texto libre", async () => {
    await sendContactEmail({
      ...input,
      name: "Nombre libre",
      message: "Mensaje libre de prueba",
    });
    const { subject } = mocks.send.mock.calls[0]?.[0];
    expect(subject).not.toContain("Nombre libre");
    expect(subject).not.toContain("Mensaje libre");
    expect(subject).not.toContain("ana@example.test");
  });

  it("rechaza saltos de línea en nombre o correo sin llamar a Resend", async () => {
    expect(await sendContactEmail({ ...input, name: "A\nB" })).toBe(
      "unavailable",
    );
    expect(
      await sendContactEmail({ ...input, email: "a@example.test\r" }),
    ).toBe("unavailable");
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it("sin variables: unavailable sin llamar a Resend", async () => {
    mocks.env.RESEND_API_KEY = undefined;
    expect(await sendContactEmail(input)).toBe("unavailable");
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it("error devuelto por Resend: unavailable", async () => {
    mocks.send.mockResolvedValue({ error: { message: "detalle interno" } });
    expect(await sendContactEmail(input)).toBe("unavailable");
  });

  it("excepción de Resend: unavailable", async () => {
    mocks.send.mockRejectedValue(new Error("red"));
    expect(await sendContactEmail(input)).toBe("unavailable");
  });
});
