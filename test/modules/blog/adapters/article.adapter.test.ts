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

describe("adaptArticle motionVideo", () => {
  function withBlocks(blocks: unknown[]): SanityArticleDto {
    return { ...createDto(null), body: blocks as SanityArticleDto["body"] };
  }

  it("keeps a valid motionVideo block", () => {
    const article = adaptArticle(
      withBlocks([
        {
          _type: "motionVideo",
          _key: "v1",
          video: "qa-agent-flow",
          caption: "Flujo",
          label: "Descripción",
        },
      ]),
    );
    expect(article.body).toEqual([
      {
        _type: "motionVideo",
        _key: "v1",
        video: "qa-agent-flow",
        caption: "Flujo",
        label: "Descripción",
      },
    ]);
  });

  it.each([
    { video: "no-existe", label: "Texto" },
    { video: "qa-agent-flow", label: "  " },
    { video: "qa-agent-flow" },
    { label: "Texto" },
  ])("drops invalid motionVideo block %j", (fields) => {
    const article = adaptArticle(
      withBlocks([{ _type: "motionVideo", _key: "v1", ...fields }]),
    );
    expect(article.body).toEqual([]);
  });
});

describe("adaptArticle code", () => {
  function withBlocks(blocks: unknown[]): SanityArticleDto {
    return { ...createDto(null), body: blocks as SanityArticleDto["body"] };
  }

  it("keeps a valid code block with its language and filename", () => {
    const article = adaptArticle(
      withBlocks([
        {
          _type: "code",
          _key: "code-1",
          code: "const greeting = 'Hola';",
          language: "typescript",
          filename: "greeting.ts",
        },
      ]),
    );

    expect(article.body).toEqual([
      {
        _type: "code",
        _key: "code-1",
        code: "const greeting = 'Hola';",
        language: "typescript",
        filename: "greeting.ts",
      },
    ]);
  });

  it("drops a code block with empty code", () => {
    const article = adaptArticle(
      withBlocks([{ _type: "code", _key: "code-1", code: "" }]),
    );

    expect(article.body).toEqual([]);
  });
});
