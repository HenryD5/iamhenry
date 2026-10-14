import type { Article } from "@/modules/blog/types/article.types";

export const articleFixtures = [
  {
    slug: "articulo-ficticio-con-portada",
    title: "Artículo ficticio con portada",
    description: "Contenido inventado para pruebas locales del módulo de blog.",
    publishedAt: "2025-01-15T12:00:00.000Z",
    updatedAt: "2025-01-16T12:00:00.000Z",
    cover: {
      assetId: "image-falso123-1200x800-webp",
      width: 1200,
      height: 800,
      alt: "Ilustración ficticia usada exclusivamente como fixture",
    },
    body: [
      {
        _type: "block",
        _key: "bloque-ficticio",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "texto-ficticio",
            text: "Este párrafo es completamente ficticio.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    slug: "articulo-ficticio-sin-portada",
    title: "Artículo ficticio sin portada",
    description: "Segundo contenido inventado para cubrir la portada opcional.",
    publishedAt: "2025-01-10T12:00:00.000Z",
    updatedAt: "2025-01-10T12:00:00.000Z",
    body: [],
  },
] as const satisfies readonly Article[];
