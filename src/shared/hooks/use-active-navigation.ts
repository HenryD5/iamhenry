"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getActiveNavigationHref,
  getNavigationSectionId,
} from "@/shared/utils/navigation";

const HEADER_OFFSET = 80;

export function useActiveNavigation(hrefs: readonly string[]) {
  const pathname = usePathname();
  const [visibleSection, setVisibleSection] = useState<{
    pathname: string;
    id: string | null;
  }>(() => ({ pathname, id: null }));
  const sectionIdsKey = hrefs
    .map(getNavigationSectionId)
    .filter((sectionId): sectionId is string => sectionId !== null)
    .join("|");
  const visibleSectionId =
    visibleSection.pathname === pathname ? visibleSection.id : null;

  useEffect(() => {
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") {
      return;
    }

    const sectionIds = sectionIdsKey.split("|").filter(Boolean);
    const intersections = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersections.set(entry.target.id, entry);
          } else {
            intersections.delete(entry.target.id);
          }
        }

        const closestEntry = [...intersections.values()].sort(
          (first, second) =>
            Math.abs(first.boundingClientRect.top - HEADER_OFFSET) -
            Math.abs(second.boundingClientRect.top - HEADER_OFFSET),
        )[0];
        setVisibleSection({
          pathname,
          id: closestEntry?.target.id ?? null,
        });
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`, threshold: 0 },
    );

    for (const sectionId of sectionIds) {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    }

    return () => observer.disconnect();
  }, [pathname, sectionIdsKey]);

  return getActiveNavigationHref(pathname, visibleSectionId, hrefs);
}
