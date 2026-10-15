import { cacheLife } from "next/cache";
import { codeToHtml } from "shiki";

import { CODE_LANGUAGES, type CodeLanguage } from "../content/code-languages";
import blogMessages from "../locales/es.json";
import type { ArticleBodyCode as ArticleBodyCodeValue } from "../types/article.types";
import { countLines } from "../utils/count-lines";
import { resolveCodeLanguage } from "../utils/code-language";
import { ArticleCodeCopyButton } from "./ArticleCodeCopyButton";

interface ArticleBodyCodeProps {
  value: ArticleBodyCodeValue;
}

const CODE_THEME = "github-dark";
const PRE_CLASS_NAME =
  "m-0 overflow-x-auto rounded-none bg-transparent p-5 font-mono text-[0.85rem] leading-[1.65] text-neutral-50 [&_code]:font-mono";

async function highlightCode(
  code: string,
  lang: CodeLanguage,
  ariaLabel: string,
) {
  "use cache";
  cacheLife("max");

  return codeToHtml(code, {
    lang,
    theme: CODE_THEME,
    transformers: [
      {
        pre(node) {
          node.properties = {
            class: PRE_CLASS_NAME,
            tabindex: 0,
            "aria-label": ariaLabel,
          };
        },
      },
    ],
  });
}

export async function ArticleBodyCode({ value }: ArticleBodyCodeProps) {
  const { code, language, filename } = value;
  const lang = resolveCodeLanguage(language);
  const title = filename ?? CODE_LANGUAGES[lang];
  const ariaLabel = blogMessages.code.blockLabel.replace("{nombre}", title);
  const html = await highlightCode(code, lang, ariaLabel);

  const lineCount = countLines(code);
  const linesText =
    lineCount === 1
      ? blogMessages.code.line
      : blogMessages.code.lines.replace("{n}", String(lineCount));

  return (
    <figure className="bg-secondary-500 my-[2em] overflow-hidden rounded-md first:mt-0 lg:-mx-16 lg:my-[2.4em]">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 border-solid border-(--light-20) px-5 py-2 group-open:border-b focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--accent-text) [&::-webkit-details-marker]:hidden">
          <span className="text-body-sm flex min-w-0 items-center gap-2 font-mono text-neutral-50">
            {filename ? null : (
              <span className="shrink-0 rounded-full border border-solid border-(--light-20) px-2 py-0.5 text-xs">
                {blogMessages.code.example}
              </span>
            )}
            <span className="truncate">{filename ?? CODE_LANGUAGES[lang]}</span>
            {filename ? (
              <span className="shrink-0 text-neutral-50/60">
                {CODE_LANGUAGES[lang]}
              </span>
            ) : null}
            <span className="shrink-0 text-neutral-50/60">{linesText}</span>
          </span>
          <span className="text-body-sm flex shrink-0 items-center gap-2 text-neutral-50">
            <span className="group-open:hidden">{blogMessages.code.show}</span>
            <span className="hidden group-open:inline">
              {blogMessages.code.hide}
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-4 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </span>
        </summary>
        <div className="flex justify-end px-5 pt-2">
          <ArticleCodeCopyButton
            code={code}
            copiedText={blogMessages.code.copied}
            label={blogMessages.code.copyLabel}
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </details>
    </figure>
  );
}
