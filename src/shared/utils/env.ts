import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_DEBUG: z
    .enum(["true", "false"])
    .transform((value) => value === "true"),
  NEXT_PUBLIC_GTM_ID: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string()
      .regex(/^GTM-[A-Z0-9]+$/)
      .optional(),
  ),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().min(1).optional(),
  ),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
});

if (!parsedEnv.success) {
  throw new Error(`Invalid environment: ${z.prettifyError(parsedEnv.error)}`);
}

export const env = parsedEnv.data;
