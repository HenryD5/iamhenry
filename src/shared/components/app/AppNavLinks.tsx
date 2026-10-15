"use client";

import Link from "next/link";
import { useActiveNavigation } from "@/shared/hooks/use-active-navigation";
import { getNavigationAriaCurrent } from "@/shared/utils/navigation";

interface NavigationItem {
  href: string;
  label: string;
}

interface AppNavLinksProps {
  items: readonly NavigationItem[];
}

export function AppNavLinks({ items }: AppNavLinksProps) {
  const hrefs = items.map(({ href }) => href);
  const activeHref = useActiveNavigation(hrefs);

  return (
    <div className="hidden items-center gap-[2.4rem] md:flex">
      {items.map((item) => {
        const isActive = item.href === activeHref;
        return (
          <Link
            aria-current={
              isActive ? getNavigationAriaCurrent(item.href) : undefined
            }
            className={`font-primary text-body-sm hover:text-fg focus-visible:text-fg relative font-medium no-underline transition-colors duration-[var(--duration-fast)] ${isActive ? "text-fg" : "text-fg-muted"}`}
            key={item.href}
            href={item.href}
          >
            {item.label}
            <span
              className={`absolute start-1/2 top-[calc(100%+.35rem)] size-1 -translate-x-1/2 rounded-full bg-(--accent-text) transition-opacity duration-[var(--duration-fast)] motion-reduce:transition-none ${isActive ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </div>
  );
}
