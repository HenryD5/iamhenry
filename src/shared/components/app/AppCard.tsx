import type { ReactNode } from "react";
export function AppCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={["border-line bg-surface-raised rounded-md border", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </article>
  );
}
