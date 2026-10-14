import type { PortableTextBlock } from "@portabletext/react";

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

export type ArticleBodyBlock = PortableTextBlock | ArticleBodyImage;

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  cover?: ArticleImage;
  body: readonly ArticleBodyBlock[];
}
