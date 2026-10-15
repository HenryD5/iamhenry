"use client";

import { useEffect, useRef, useState } from "react";

interface ArticleCodeCopyButtonProps {
  code: string;
  copyText: string;
  copiedText: string;
  label: string;
}

const COPIED_RESET_MS = 2000;

export function ArticleCodeCopyButton({
  code,
  copyText,
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
        aria-label={label}
        className="text-body-sm cursor-pointer rounded-[0.35rem] border border-solid border-(--light-20) bg-transparent px-3 py-1 font-semibold text-neutral-50 transition-colors duration-[var(--duration-fast)] hover:bg-(--light-10) focus-visible:bg-(--light-10)"
      >
        {isCopied ? copiedText : copyText}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {isCopied ? copiedText : ""}
      </span>
    </>
  );
}
