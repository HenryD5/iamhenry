import type { PortableTextBlock } from "@portabletext/react";

import type { MotionVideoKey } from "../content/motion-videos";

export interface ArticleImage {
  assetId: string;
  width: number;
  height: number;
  alt: string;
}

export interface ArticleBodyImage extends ArticleImage {
  _type: "image";
  _key: string;
}

export interface ArticleBodyMotionVideo {
  _type: "motionVideo";
  _key: string;
  video: MotionVideoKey;
  caption?: string;
  label: string;
}

export interface ArticleBodyCode {
  _type: "code";
  _key: string;
  code: string;
  language?: string;
  filename?: string;
}

export type ArticleBodyBlock =
  | PortableTextBlock
  | ArticleBodyImage
  | ArticleBodyMotionVideo
  | ArticleBodyCode;

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  cover?: ArticleImage;
  body: readonly ArticleBodyBlock[];
}
