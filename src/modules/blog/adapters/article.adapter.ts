import { z } from "zod";

import { MOTION_VIDEO_KEYS } from "../content/motion-videos";
import type {
  SanityArticleBodyBlockDto,
  SanityArticleBodyCodeDto,
  SanityArticleBodyImageDto,
  SanityArticleBodyMotionVideoDto,
  SanityArticleDto,
  SanityImageDto,
} from "../types/article.dto";
import type {
  Article,
  ArticleBodyBlock,
  ArticleBodyCode,
  ArticleBodyImage,
  ArticleBodyMotionVideo,
  ArticleImage,
} from "../types/article.types";

function isSanityArticleBodyImage(
  block: SanityArticleBodyBlockDto,
): block is SanityArticleBodyImageDto {
  return block._type === "image";
}

const MOTION_VIDEO_SCHEMA = z.object({
  video: z.enum(MOTION_VIDEO_KEYS),
  caption: z.string().trim().optional().nullable(),
  label: z.string().trim().min(1),
});

function isSanityArticleBodyMotionVideo(
  block: SanityArticleBodyBlockDto,
): block is SanityArticleBodyMotionVideoDto {
  return block._type === "motionVideo";
}

function mapMotionVideo(
  block: SanityArticleBodyMotionVideoDto,
): ArticleBodyMotionVideo | null {
  const result = MOTION_VIDEO_SCHEMA.safeParse(block);
  if (!result.success) return null;

  const { video, caption, label } = result.data;
  return {
    _type: block._type,
    _key: block._key,
    video,
    ...(caption ? { caption } : {}),
    label,
  };
}

const CODE_SCHEMA = z.object({
  code: z
    .string()
    .min(1)
    .refine((value) => value.trim().length > 0),
  language: z.string().trim().optional().nullable(),
  filename: z.string().trim().optional().nullable(),
});

function isSanityArticleBodyCode(
  block: SanityArticleBodyBlockDto,
): block is SanityArticleBodyCodeDto {
  return block._type === "code";
}

function mapCode(block: SanityArticleBodyCodeDto): ArticleBodyCode | null {
  const result = CODE_SCHEMA.safeParse(block);
  if (!result.success) return null;

  const { code, language, filename } = result.data;
  return {
    _type: block._type,
    _key: block._key,
    code,
    ...(language ? { language } : {}),
    ...(filename ? { filename } : {}),
  };
}

function mapImage(image: SanityImageDto): ArticleImage {
  return {
    assetId: image.asset._id,
    width: image.asset.metadata.dimensions.width,
    height: image.asset.metadata.dimensions.height,
    alt: image.alt,
  };
}

function mapBodyBlock(
  block: SanityArticleBodyBlockDto,
): ArticleBodyBlock | null {
  if (isSanityArticleBodyMotionVideo(block)) {
    return mapMotionVideo(block);
  }

  if (isSanityArticleBodyCode(block)) {
    return mapCode(block);
  }

  if (!isSanityArticleBodyImage(block)) {
    return block;
  }

  return {
    _type: block._type,
    _key: block._key,
    ...mapImage(block),
  } satisfies ArticleBodyImage;
}

export function adaptArticle(article: SanityArticleDto): Article {
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    ...(article.cover ? { cover: mapImage(article.cover) } : {}),
    body: article.body
      .map(mapBodyBlock)
      .filter((block): block is ArticleBodyBlock => block !== null),
  };
}
