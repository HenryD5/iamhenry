import "server-only";

import { envContact } from "@/shared/utils/env-server";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const verifyTurnstile = async ({
  token,
  ip,
}: {
  token: string;
  ip?: string;
}): Promise<boolean> => {
  const secret = envContact.TURNSTILE_SECRET_KEY;

  if (!secret || !token) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });

  if (ip) {
    body.set("remoteip", ip);
  }

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      return false;
    }

    const data: unknown = await response.json();

    return (
      typeof data === "object" &&
      data !== null &&
      "success" in data &&
      data.success === true
    );
  } catch {
    return false;
  }
};
