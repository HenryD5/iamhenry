import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";

import type { ArticleBodyBlock } from "../types/article.types";
import { ArticleBodyCode } from "./ArticleBodyCode";
import { ArticleBodyImage } from "./ArticleBodyImage";
import { ArticleBodyLink } from "./ArticleBodyLink";
import { ArticleBodyVideo } from "./ArticleBodyVideo";

interface ArticleBodyProps {
  body: readonly ArticleBodyBlock[];
}

const PORTABLE_TEXT_COMPONENTS: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-[1.35em] first:mt-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-h4 mt-[2.4em] tracking-[-0.03em] first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-h5 mt-[2em] tracking-[-0.02em] first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-secondary mt-[1.8em] text-[1.15rem] first:mt-0">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="font-secondary my-[2em] border-l-[3px] border-solid py-[0.2em] pl-[1.4rem] text-[1.45rem] leading-[1.35] font-bold tracking-[-0.02em] [border-image:var(--gradient-accent)_1] first:mt-0">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-[1.35em] list-disc pl-[1.3em] marker:text-(--accent-text) first:mt-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-[1.35em] list-decimal pl-[1.3em] marker:text-(--accent-text) first:mt-0">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="[&+li]:mt-[0.4em]">{children}</li>,
    number: ({ children }) => <li className="[&+li]:mt-[0.4em]">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="border-line bg-surface-sunken text-fg rounded-[0.35rem] border px-[0.35em] py-[0.1em] font-mono text-[0.85em]">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <ArticleBodyLink href={value?.href as string | undefined}>
        {children}
      </ArticleBodyLink>
    ),
  },
  types: {
    image: ({ value }) => <ArticleBodyImage value={value} />,
    motionVideo: ({ value }) => <ArticleBodyVideo value={value} />,
    code: ({ value }) => <ArticleBodyCode value={value} />,
  },
};

export function ArticleBody({ body }: ArticleBodyProps) {
  return (
    <div className="mx-auto max-w-[42rem] pt-9 pb-4 text-[1.1rem] leading-[1.7] md:pt-14 md:text-[1.2rem]">
      <PortableText value={[...body]} components={PORTABLE_TEXT_COMPONENTS} />
    </div>
  );
}
