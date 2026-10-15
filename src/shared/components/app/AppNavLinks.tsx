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
    <div className="hidden items-center gap-[1rem] md:flex">
      {items.map((item) => {
        const isActive = item.href === activeHref;
        return (
          <Link
            aria-current={
              isActive ? getNavigationAriaCurrent(item.href) : undefined
            }
            className={`font-primary text-body-sm relative px-[.7rem] py-[.45rem] font-medium no-underline transition-colors duration-[var(--duration-fast)] motion-reduce:transition-none ${isActive ? "text-(--accent-text)" : "text-fg-muted hover:text-fg focus-visible:text-fg"}`}
            key={item.href}
            href={item.href}
          >
            {item.label}
            <span
              className={`absolute inset-x-[.7rem] bottom-0 h-[2px] rounded-full bg-(--accent-text) transition-opacity duration-[var(--duration-fast)] motion-reduce:transition-none ${isActive ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </div>
  );
}
