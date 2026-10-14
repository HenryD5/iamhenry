import type {
  SanityArticleBodyBlockDto,
  SanityArticleBodyImageDto,
  SanityArticleDto,
  SanityImageDto,
} from "../types/article.dto";
import type {
  Article,
  ArticleBodyBlock,
  ArticleBodyImage,
  ArticleImage,
} from "../types/article.types";

function isSanityArticleBodyImage(
  block: SanityArticleBodyBlockDto,
): block is SanityArticleBodyImageDto {
  return block._type === "image";
}

function mapImage(image: SanityImageDto): ArticleImage {
  return {
    assetId: image.asset._id,
    width: image.asset.metadata.dimensions.width,
    height: image.asset.metadata.dimensions.height,
    alt: image.alt,
  };
}

function mapBodyBlock(block: SanityArticleBodyBlockDto): ArticleBodyBlock {
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
    body: article.body.map(mapBodyBlock),
  };
}
