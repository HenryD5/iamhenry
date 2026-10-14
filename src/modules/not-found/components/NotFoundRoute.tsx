"use client";

import { useCurrentPath } from "../hooks/use-current-path";

interface NotFoundRouteProps {
  variant: "line" | "label";
  searchedLabel: string;
  lostLabel: string;
}

export function NotFoundRoute({
  variant,
  searchedLabel,
  lostLabel,
}: NotFoundRouteProps) {
  const path = useCurrentPath();

  if (variant === "label") {
    return <>{path ?? lostLabel}</>;
  }

  if (path === null) {
    return null;
  }

  return (
    <p className="border-line text-fg-muted font-mono text-body-sm m-0 max-w-full border-l-2 pl-[1.2rem] break-all">
      {searchedLabel} <span className="text-fg">{path}</span>
    </p>
  );
}
