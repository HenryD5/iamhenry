import Link from "next/link";
import type { ReactNode } from "react";

interface ArticleBodyLinkProps {
  href?: string;
  children: ReactNode;
}

const LINK_CLASS_NAME =
  "text-primary-500 underline decoration-1 underline-offset-[0.2em]";

export function ArticleBodyLink({ href, children }: ArticleBodyLinkProps) {
  if (!href) {
    return <>{children}</>;
  }

  if (/^https?:/i.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS_NAME}
      >
        {children}
      </a>
    );
  }

  if (/^mailto:/i.test(href)) {
    return (
      <a href={href} className={LINK_CLASS_NAME}>
        {children}
      </a>
    );
  }

  const isInternalHref =
    (href.startsWith("/") && !href.startsWith("//")) || href.startsWith("#");

  if (!isInternalHref) {
    return <>{children}</>;
  }

  return (
    <Link href={href} className={LINK_CLASS_NAME}>
      {children}
    </Link>
  );
}
