import Image from "next/image";

import type { ArticleImage } from "../types/article.types";
import { getBlogMediaPath } from "../utils/media-path";

interface BlogArticleCoverProps {
  cover?: ArticleImage;
  className?: string;
  imageClassName?: string;
  preload?: boolean;
  radiusClassName?: string;
  sizes: string;
}

export function BlogArticleCover({
  cover,
  className,
  imageClassName,
  preload = false,
  radiusClassName = "rounded-[calc(var(--radius-md)-.35rem)]",
  sizes,
}: BlogArticleCoverProps) {
  const coverClassName = [
    "relative overflow-hidden bg-[radial-gradient(28rem_16rem_at_80%_10%,color-mix(in_srgb,var(--tertiary-500)_22%,transparent),transparent_70%),radial-gradient(30rem_18rem_at_10%_90%,color-mix(in_srgb,var(--primary-500)_45%,transparent),transparent_70%),var(--secondary-500)]",
    radiusClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!cover) {
    return <div className={coverClassName} aria-hidden="true" />;
  }

  return (
    <div className={coverClassName}>
      <Image
        src={getBlogMediaPath(cover.assetId)}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        sizes={sizes}
        preload={preload}
        className={["absolute inset-0 size-full object-cover", imageClassName]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}
