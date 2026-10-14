import "server-only";

import { z } from "zod";

const envServerSchema = z.object({
  SANITY_PROJECT_ID: z.string().min(1),
  SANITY_DATASET: z.string().min(1),
  SANITY_API_VERSION: z.iso.date(),
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
