"use server";

import { headers } from "next/headers";
import type { z } from "zod";

import { envContact } from "@/shared/utils/env-server";

import { contactSchema } from "../schemas/contact.schema";
import { sendContactEmail } from "../services/resend.service";
import { verifyTurnstile } from "../services/turnstile.service";
import type {
  ContactFieldErrorKey,
  ContactFieldErrors,
  ContactFieldName,
  ContactResult,
} from "../types/contact.types";
import { isHoneypotFilled, isSubmitTimingValid } from "../utils/anti-spam";
import { readContactFormData } from "../utils/form-data";
import { sanitizeMultiline, sanitizeSingleLine } from "../utils/sanitize-input";

const USER_FIELDS: readonly ContactFieldName[] = ["name", "email", "message"];
const ANTI_SPAM_FIELDS: readonly string[] = ["website", "startedAt"];

const isUserField = (key: unknown): key is ContactFieldName =>
  USER_FIELDS.some((field) => field === key);

const toNonTextErrors = (keys: readonly string[]): ContactResult => {
  const fieldErrors: ContactFieldErrors = {};
  for (const key of keys) {
    if (isUserField(key)) {
      fieldErrors[key] = "invalid";
    }
  }
  return Object.keys(fieldErrors).length > 0
    ? { status: "invalid", fieldErrors }
    : { status: "invalid" };
};

const isEmptyAfterCleaning = (
  field: ContactFieldName,
  rawValue: string,
): boolean =>
  (field === "message"
    ? sanitizeMultiline(rawValue)
    : sanitizeSingleLine(rawValue)
  ).trim().length === 0;

const toErrorKey = (
  field: ContactFieldName,
  issue: z.core.$ZodIssue,
  rawValue: string,
): ContactFieldErrorKey => {
  if (rawValue.trim().length === 0) {
    return "required";
  }
  // Tenía contenido, pero tras la limpieza (controles, formato invisible)
  // no queda nada: el valor no es válido, no falta.
  if (isEmptyAfterCleaning(field, rawValue)) {
    return "invalid";
  }
  if (issue.code === "too_small") {
    return "tooShort";
  }
  if (issue.code === "too_big") {
    return "tooLong";
  }
  return "invalid";
};

const hasContactConfig = (): boolean =>
  Boolean(
    envContact.RESEND_API_KEY &&
    envContact.CONTACT_TO_EMAIL &&
    envContact.CONTACT_FROM_EMAIL &&
    envContact.TURNSTILE_SECRET_KEY,
  );

const getClientIp = async (): Promise<string | undefined> => {
  const forwardedFor = (await headers()).get("x-forwarded-for");
  const firstIp = forwardedFor?.split(",")[0]?.trim();
  return firstIp || undefined;
};

/**
 * Acepta tanto `action={sendContactMessage}` (recibe FormData) como
 * `useActionState(sendContactMessage, …)` (recibe estado previo y FormData),
 * para que el formulario funcione con y sin JavaScript.
 */
export async function sendContactMessage(
  stateOrFormData: ContactResult | FormData | null,
  maybeFormData?: FormData,
): Promise<ContactResult> {
  const formData =
    stateOrFormData instanceof FormData ? stateOrFormData : maybeFormData;

  if (!(formData instanceof FormData)) {
    return { status: "invalid" };
  }

  if (!hasContactConfig()) {
    return { status: "unavailable" };
  }

  const read = readContactFormData(formData);

  if (!read.isValid) {
    return toNonTextErrors(read.nonTextKeys);
  }

  const { fields } = read;
  const startedAt = Number(fields.startedAt);

  if (fields.startedAt.trim().length === 0 || !Number.isFinite(startedAt)) {
    return { status: "unavailable" };
  }

  const ip = await getClientIp();
  const raw = {
    name: fields.name,
    email: fields.email,
    message: fields.message,
    website: fields.website,
    startedAt,
    turnstileToken: fields["cf-turnstile-response"] || fields.turnstileToken,
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {};
    let hasAntiSpamIssue = false;

    for (const issue of parsed.error.issues) {
      const [field] = issue.path;

      if (isUserField(field)) {
        fieldErrors[field] ??= toErrorKey(field, issue, raw[field]);
      } else if (
        typeof field === "string" &&
        ANTI_SPAM_FIELDS.includes(field)
      ) {
        hasAntiSpamIssue = true;
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      return { status: "invalid", fieldErrors };
    }

    // Campos de control manipulados: éxito simulado, sin enviar.
    if (hasAntiSpamIssue) {
      return { status: "sent" };
    }

    // Solo falla el token (sin widget o sin JavaScript).
    return { status: "challenge_failed" };
  }

  const { website, turnstileToken, name, email, message } = parsed.data;

  if (
    isHoneypotFilled(website) ||
    !isSubmitTimingValid(parsed.data.startedAt, Date.now())
  ) {
    return { status: "sent" };
  }

  const isHuman = await verifyTurnstile({ token: turnstileToken, ip });

  if (!isHuman) {
    return { status: "challenge_failed" };
  }

  const status = await sendContactEmail({ name, email, message });

  return { status };
}
