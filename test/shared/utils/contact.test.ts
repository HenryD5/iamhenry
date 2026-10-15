import { beforeEach, describe, expect, it, vi } from "vitest";
import { getContactHref } from "@/shared/utils/contact";

const { person } = vi.hoisted(() => ({
  person: {
    email: "henry@example.com",
    whatsapp: "51987654321" as string | null,
  },
}));

vi.mock("@/shared/config/site", () => ({
  siteConfig: { person },
}));

describe("getContactHref", () => {
  beforeEach(() => {
    person.whatsapp = "51987654321";
  });

  it("builds a WhatsApp URL with the encoded message", () => {
    expect(getContactHref("¡Hola, Henry! 👋")).toBe(
      "https://wa.me/51987654321?text=%C2%A1Hola%2C%20Henry!%20%F0%9F%91%8B",
    );
  });

  it("falls back to email with the encoded message", () => {
    person.whatsapp = null;

    expect(getContactHref("¿Podemos conversar?")).toBe(
      "mailto:henry@example.com?body=%C2%BFPodemos%20conversar%3F",
    );
  });
});
