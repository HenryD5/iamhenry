type StudioEnvName =
  | "SANITY_STUDIO_PROJECT_ID"
  | "SANITY_STUDIO_DATASET"
  | "SANITY_STUDIO_HOSTNAME";

export function readStudioEnv(name: StudioEnvName): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${name}. Defínela en studio/.env (ver studio/.env.example).`,
    );
  }

  return value;
}
