import "server-only";

import { z } from "zod";

const envServerSchema = z.object({
  SANITY_PROJECT_ID: z.string().min(1),
  SANITY_DATASET: z.string().min(1),
  SANITY_API_VERSION: z.iso.date(),
});

const optionalString = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().min(1).optional(),
);

const envContactSchema = z.object({
  RESEND_API_KEY: optionalString,
  CONTACT_TO_EMAIL: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.email().optional(),
  ),
  CONTACT_FROM_EMAIL: optionalString,
  TURNSTILE_SECRET_KEY: optionalString,
});

const parsedEnvServer = envServerSchema.safeParse({
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  SANITY_DATASET: process.env.SANITY_DATASET,
  SANITY_API_VERSION: process.env.SANITY_API_VERSION,
});

if (!parsedEnvServer.success) {
  throw new Error(
    `Invalid server environment: ${z.prettifyError(parsedEnvServer.error)}`,
  );
}

export const envServer = parsedEnvServer.data;

const parsedEnvContact = envContactSchema.safeParse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
});

// Opcional en build: si falta o es invalida, el contacto queda no disponible.
export const envContact = parsedEnvContact.success ? parsedEnvContact.data : {};
