import { z } from "zod";

import { sanitizeMultiline, sanitizeSingleLine } from "../utils/sanitize-input";

export const NAME_MAX_LENGTH = 80;
export const EMAIL_MAX_LENGTH = 254;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 2000;
export const TOKEN_MAX_LENGTH = 2048;

const NO_LINE_BREAKS = /^[^\r\n]*$/;
// Letras y marcas Unicode, espacio, apóstrofo (recto o tipográfico), guion y
// punto; empieza por letra. Sin dígitos ni símbolos (< > { } ; ` \ …).
const NAME_PATTERN = /^\p{L}[\p{L}\p{M} '\u2019.-]*$/u;
// Defensa adicional a `z.email`: sin espacios, comillas, ángulos ni `;`.
const EMAIL_FORBIDDEN_CHARS = /^[^\s"'`<>;,\\]*$/;

// La limpieza va antes de cualquier regla: lo que se valida (y lo que llega
// al correo) es siempre el valor limpio.
export const contactNameSchema = z.string().transform(sanitizeSingleLine).pipe(
  z
    .string()
    // Antes del recorte: un salto al final también invalida (criterio 7).
    .regex(NO_LINE_BREAKS)
    .trim()
    .min(2)
    .max(NAME_MAX_LENGTH)
    .regex(NAME_PATTERN),
);

export const contactEmailSchema = z
  .string()
  .transform(sanitizeSingleLine)
  .pipe(
    z
      .string()
      .regex(NO_LINE_BREAKS)
      .trim()
      .min(1)
      .max(EMAIL_MAX_LENGTH)
      .regex(EMAIL_FORBIDDEN_CHARS)
      .pipe(z.email()),
  );

export const contactMessageSchema = z
  .string()
  .transform(sanitizeMultiline)
  .pipe(z.string().trim().min(MESSAGE_MIN_LENGTH).max(MESSAGE_MAX_LENGTH));

export const contactSchema = z.object({
  name: contactNameSchema,
  email: contactEmailSchema,
  message: contactMessageSchema,
  website: z.string(),
  startedAt: z.number(),
  turnstileToken: z
    .string()
    .transform(sanitizeSingleLine)
    .pipe(z.string().regex(NO_LINE_BREAKS).trim().min(1).max(TOKEN_MAX_LENGTH)),
});
