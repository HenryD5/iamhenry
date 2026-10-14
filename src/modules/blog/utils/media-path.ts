const SANITY_IMAGE_ASSET_ID_PATTERN =
  /^image-([a-f0-9]{40})-([1-9]\d{0,5})x([1-9]\d{0,5})-(jpg|png|webp|gif)$/;

export const BLOG_MEDIA_BASE_PATH = "/blog/media";

export interface ParsedImageAssetId {
  hash: string;
  width: string;
  height: string;
  extension: string;
}

export function parseImageAssetId(assetId: string): ParsedImageAssetId | null {
  const match = SANITY_IMAGE_ASSET_ID_PATTERN.exec(assetId);

  if (!match) {
    return null;
  }

  const [, hash, width, height, extension] = match;

  if (!hash || !width || !height || !extension) {
    return null;
  }

  return { hash, width, height, extension };
}

export function getBlogMediaPath(assetId: string): string {
  return `${BLOG_MEDIA_BASE_PATH}/${assetId}`;
}
