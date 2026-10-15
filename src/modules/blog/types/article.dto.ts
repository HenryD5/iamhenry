import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImageAssetDto {
  _id: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
    };
  };
}

export interface SanityImageDto {
  alt: string;
  asset: SanityImageAssetDto;
}

export interface SanityArticleBodyImageDto extends SanityImageDto {
  _type: "image";
  _key: string;
}

export interface SanityArticleBodyMotionVideoDto {
  _type: "motionVideo";
  _key: string;
  video?: string | null;
  caption?: string | null;
  label?: string | null;
}

export interface SanityArticleBodyCodeDto {
  _type: "code";
  _key: string;
  language?: string | null;
  filename?: string | null;
  code?: string | null;
}

export type SanityArticleBodyBlockDto =
  | PortableTextBlock
  | SanityArticleBodyImageDto
  | SanityArticleBodyMotionVideoDto
  | SanityArticleBodyCodeDto;

export interface SanityArticleDto {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  cover?: SanityImageDto | null;
  body: readonly SanityArticleBodyBlockDto[];
}

export interface SanityArticleSlugDto {
  slug: string;
}
