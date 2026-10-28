import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  env: {
    TURNSTILE_SECRET_KEY: "secreto_ficticio" as string | undefined,
  },
}));

vi.mock("server-only", () => ({}));
vi.mock("@/shared/utils/env-server", () => ({ envContact: mocks.env }));

import { verifyTurnstile } from "@/modules/contact/services/turnstile.service";

const fetchMock = vi.fn();

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubGlobal("fetch", fetchMock);
  mocks.env.TURNSTILE_SECRET_KEY = "secreto_ficticio";
  fetchMock.mockResolvedValue(jsonResponse({ success: true }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("verifyTurnstile", () => {
  it("devuelve true cuando Cloudflare responde success true", async () => {
    expect(await verifyTurnstile({ token: "token_ficticio" })).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("devuelve false cuando Cloudflare responde success false", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({
        success: false,
        "error-codes": ["invalid-input-response"],
      }),
    );
    expect(await verifyTurnstile({ token: "token_ficticio" })).toBe(false);
  });

  it("sin secreto configurado devuelve false sin llamar a fetch", async () => {
    mocks.env.TURNSTILE_SECRET_KEY = undefined;
    expect(await verifyTurnstile({ token: "token_ficticio" })).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sin token devuelve false sin llamar a fetch", async () => {
    expect(await verifyTurnstile({ token: "" })).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("si la red falla devuelve false sin lanzar", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    await expect(verifyTurnstile({ token: "token_ficticio" })).resolves.toBe(
      false,
    );
  });

  it("respuesta no ok devuelve false", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ success: true }, 500));
    expect(await verifyTurnstile({ token: "token_ficticio" })).toBe(false);
  });

  it("JSON inválido devuelve false sin lanzar", async () => {
    fetchMock.mockResolvedValue(new Response("no es json", { status: 200 }));
    await expect(verifyTurnstile({ token: "token_ficticio" })).resolves.toBe(
      false,
    );
  });

  it("envía secret, response y remoteip en el cuerpo", async () => {
    await verifyTurnstile({ token: "token_ficticio", ip: "203.0.113.7" });

    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(String(url)).toContain("challenges.cloudflare.com");
    expect(init.method).toBe("POST");
    const body = init.body as URLSearchParams;
    expect(body.get("secret")).toBe("secreto_ficticio");
    expect(body.get("response")).toBe("token_ficticio");
    expect(body.get("remoteip")).toBe("203.0.113.7");
  });

  it("no envía remoteip si no hay ip", async () => {
    await verifyTurnstile({ token: "token_ficticio" });

    const body = fetchMock.mock.calls[0]?.[1].body as URLSearchParams;
    expect(body.get("response")).toBe("token_ficticio");
    expect(body.has("remoteip")).toBe(false);
  });
});
