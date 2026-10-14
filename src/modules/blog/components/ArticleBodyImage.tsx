import Image from "next/image";

import type { ArticleBodyImage as ArticleBodyImageValue } from "../types/article.types";
import { getBlogMediaPath } from "../utils/media-path";

interface ArticleBodyImageProps {
  value: ArticleBodyImageValue;
}

export function ArticleBodyImage({ value }: ArticleBodyImageProps) {
  const { assetId, width, height, alt } = value;

  return (
    <figure className="my-[2em] first:mt-0 lg:-mx-16 lg:my-[2.4em]">
      <Image
        src={getBlogMediaPath(assetId)}
        width={width}
        height={height}
        alt={alt}
        sizes="(min-width: 1024px) 50rem, 100vw"
        className="h-auto w-full rounded-md"
      />
    </figure>
  );
}
