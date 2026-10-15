import { AppLoopVideo } from "@/shared/components/app/AppLoopVideo";

import { MOTION_VIDEOS } from "../content/motion-videos";
import type { ArticleBodyMotionVideo } from "../types/article.types";

interface ArticleBodyVideoProps {
  value: ArticleBodyMotionVideo;
}

export function ArticleBodyVideo({ value }: ArticleBodyVideoProps) {
  const { video, caption, label } = value;
  const entry = MOTION_VIDEOS[video];

  if (!entry) return null;

  return (
    <figure className="my-[2em] first:mt-0 lg:-mx-16 lg:my-[2.4em]">
      <div
        role="img"
        aria-label={label}
        className="overflow-hidden rounded-md bg-neutral-50"
      >
        <AppLoopVideo
          basePath={entry.basePath}
          width={entry.width}
          height={entry.height}
          className="block h-auto w-full"
        />
      </div>
      {caption ? (
        <figcaption className="text-fg-muted mt-3 text-center text-[0.9rem] leading-[1.5]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
