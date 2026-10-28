import type { z } from "zod";

import type { contactSchema } from "../schemas/contact.schema";

export type ContactMessage = z.output<typeof contactSchema>;

export type ContactStatus =
  "sent" | "invalid" | "challenge_failed" | "unavailable";

export type ContactFieldName = "name" | "email" | "message";

// Claves de locale (`errors.{campo}.{clave}`), nunca texto redactado.
export type ContactFieldErrorKey =
  "required" | "tooShort" | "tooLong" | "invalid";

export type ContactFieldErrors = Partial<
  Record<ContactFieldName, ContactFieldErrorKey>
>;

export type ContactResult = {
  status: ContactStatus;
  fieldErrors?: ContactFieldErrors;
};
