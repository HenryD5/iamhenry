import { env } from "@/shared/utils/env";

export const siteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  title: "Henry Yamunaque — Software Engineer y AI enthusiast",
  description:
    "Portafolio de Henry Yamunaque, Software Engineer especializado en frontend, productos digitales, datos y automatización con IA.",
  url: new URL(env.NEXT_PUBLIC_SITE_URL),
  locale: "es_PE",
  person: {
    name: "Henry Yamunaque Villegas",
    jobTitle: "Software Engineer",
    email: "henrydavidyamunaque@gmail.com",
    linkedIn: "https://www.linkedin.com/in/henry-yamunaque-villegas",
    github: "https://github.com/HenryD5",
    whatsapp: "51930724632", // Formato esperado: solo dígitos con código de país, sin + ni espacios.
  },
} as const;
