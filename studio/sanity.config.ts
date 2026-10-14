import { codeInput } from "@sanity/code-input";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemaTypes";
import { readStudioEnv } from "./studio-env";

export default defineConfig({
  name: "default",
  title: "iamhenry",
  projectId: readStudioEnv("SANITY_STUDIO_PROJECT_ID"),
  dataset: readStudioEnv("SANITY_STUDIO_DATASET"),
  plugins: [structureTool(), codeInput()],
  schema: { types: schemaTypes },
});
