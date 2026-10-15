"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ArticleCodeCopyButtonProps {
  code: string;
  copiedText: string;
  label: string;
}

const COPIED_RESET_MS = 2000;

export function ArticleCodeCopyButton({
  code,
  copiedText,
  label,
}: ArticleCodeCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    setIsCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCopied(false), COPIED_RESET_MS);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={isCopied ? copiedText : label}
        title={isCopied ? copiedText : label}
        className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[0.35rem] border border-solid border-(--light-20) bg-transparent p-0 text-neutral-50 transition-colors duration-[var(--duration-fast)] hover:bg-(--light-10) focus-visible:bg-(--light-10)"
      >
        {isCopied ? (
          <Check
            aria-hidden="true"
            className="max-w-none shrink-0"
            size={16}
            strokeWidth={2}
          />
        ) : (
          <Copy
            aria-hidden="true"
            className="max-w-none shrink-0"
            size={16}
            strokeWidth={1.75}
          />
        )}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {isCopied ? copiedText : ""}
      </span>
    </>
  );
}
