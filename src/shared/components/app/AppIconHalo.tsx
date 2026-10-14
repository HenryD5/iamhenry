import type { ReactNode } from "react";
export function AppIconHalo({
  children,
  className,
  motionItem,
}: {
  children: ReactNode;
  className?: string;
  motionItem?: string;
}) {
  return (
    <i className={className} data-motion-item={motionItem}>
      {children}
    </i>
  );
}
