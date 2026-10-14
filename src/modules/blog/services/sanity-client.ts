import "server-only";

import { createClient } from "next-sanity";
import { envServer } from "@/shared/utils/env-server";

export const sanityClient = createClient({
  projectId: envServer.SANITY_PROJECT_ID,
  dataset: envServer.SANITY_DATASET,
  apiVersion: envServer.SANITY_API_VERSION,
  useCdn: false,
  perspective: "published",
});
