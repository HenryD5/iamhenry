import type { ReactNode } from "react";
export function AppTag({ children }: { children: ReactNode }) {
  return (
    <span className="border-line font-primary text-caption text-fg inline-flex items-center gap-2 rounded-full border px-[.85rem] py-2 leading-none font-semibold">
      {children}
    </span>
  );
}
