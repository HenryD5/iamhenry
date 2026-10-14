import type { ReactNode } from "react";
export function AppBadge({ children }: { children: ReactNode }) {
  return (
    <span className="border-line bg-surface-raised font-primary text-body-sm inline-flex items-center gap-[.6rem] rounded-full border px-[1.1rem] py-[.6rem] leading-none font-medium">
      {children}
    </span>
  );
}
