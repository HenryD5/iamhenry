import { describe, expect, it } from "vitest";
import { adaptArticle } from "@/modules/blog/adapters/article.adapter";
import type { SanityArticleDto } from "@/modules/blog/types/article.dto";

const HASH = "a".repeat(40);

function createDto(cover: SanityArticleDto["cover"]): SanityArticleDto {
  return {
    slug: "entrada-ficticia",
    title: "Entrada ficticia",
    description: "Descripción inventada.",
    publishedAt: "2025-02-01T10:00:00.000Z",
    updatedAt: "2025-02-02T11:00:00.000Z",
    cover,
    body: [
      {
        _type: "image",
        _key: "body-image",
        alt: "Imagen del cuerpo",
        asset: {
          _id: `image-${HASH}-640x480-png`,
          metadata: { dimensions: { width: 640, height: 480 } },
        },
      },
    ],
  };
}

describe("adaptArticle", () => {
  it("maps dates, the cover dimensions and body images without origin URLs", () => {
    const article = adaptArticle(
      createDto({
        alt: "Portada ficticia",
        asset: {
          _id: `image-${HASH}-1200x800-webp`,
          metadata: { dimensions: { width: 1200, height: 800 } },
        },
      }),
    );

    expect(article).toMatchObject({
      publishedAt: "2025-02-01T10:00:00.000Z",
      updatedAt: "2025-02-02T11:00:00.000Z",
      cover: {
        assetId: `image-${HASH}-1200x800-webp`,
        width: 1200,
        height: 800,
        alt: "Portada ficticia",
      },
      body: [
        {
          _type: "image",
          _key: "body-image",
          assetId: `image-${HASH}-640x480-png`,
          width: 640,
          height: 480,
          alt: "Imagen del cuerpo",
        },
      ],
    });
    expect(JSON.stringify(article)).not.toContain("cdn.sanity.io");
  });

  it.each([null, undefined])("omits the cover when it is %s", (cover) => {
    expect(adaptArticle(createDto(cover))).not.toHaveProperty("cover");
  });
});
