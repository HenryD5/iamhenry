import { defineCliConfig } from "sanity/cli";

import { readStudioEnv } from "./studio-env";

export default defineCliConfig({
  api: {
    projectId: readStudioEnv("SANITY_STUDIO_PROJECT_ID"),
    dataset: readStudioEnv("SANITY_STUDIO_DATASET"),
  },
  studioHost: readStudioEnv("SANITY_STUDIO_HOSTNAME"),
});
