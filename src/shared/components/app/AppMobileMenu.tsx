"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/shared/config/site";
import { UiDrawer } from "@/shared/components/ui/UiDrawer";
import { useActiveNavigation } from "@/shared/hooks/use-active-navigation";
import { getNavigationAriaCurrent } from "@/shared/utils/navigation";
import { AppBadge } from "./AppBadge";
import { AppBrandLogo } from "./AppBrandLogo";

interface NavigationItem {
  href: string;
  label: string;
}
interface AppMobileMenuProps {
  items: readonly NavigationItem[];
  menuLabel: string;
  title: string;
  description: string;
  closeLabel: string;
  contactLabel: string;
  contactHref: string;
  brandLabel: string;
  availabilityLabel: string;
  linkedInLabel: string;
  contactLinksLabel: string;
}
export function AppMobileMenu({
  items,
  menuLabel,
  title,
  description,
  closeLabel,
  contactLabel,
  contactHref,
  brandLabel,
  availabilityLabel,
  linkedInLabel,
  contactLinksLabel,
}: AppMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeHref = useActiveNavigation(items.map(({ href }) => href));
  const handleClose = () => setIsOpen(false);
  return (
    <UiDrawer
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="end"
      surface="light"
      title={title}
      description={description}
      closeLabel={closeLabel}
      headerStart={<AppBrandLogo label={brandLabel} asLink={false} />}
      trigger={
        <button
          className="btn-icon btn-icon--md hidden max-md:!inline-grid max-md:!size-[var(--control-h-md)] max-md:shrink-0 max-md:!p-0"
          type="button"
          aria-label={menuLabel}
        >
          <svg
            className="size-[1.3rem] fill-none stroke-current stroke-[1.6] [stroke-linecap:round] max-md:!size-[1.3rem]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      }
    >
      <div className="flex flex-1 flex-col gap-6">
        <nav aria-label={title}>
          <ul className="m-0 grid list-none gap-1 p-0">
            {items.map((item, index) => {
              const isActive = item.href === activeHref;
              return (
                <li className="m-0" key={item.href}>
                  <Link
                    aria-current={
                      isActive ? getNavigationAriaCurrent(item.href) : undefined
                    }
                    className="group hover:bg-surface-raised focus-visible:bg-surface-raised active:bg-surface-raised flex min-h-[3.1rem] items-center gap-3 rounded-sm px-3 py-3 no-underline transition-colors duration-[var(--duration-fast)]"
                    href={item.href}
                    onClick={handleClose}
                  >
                    <span
                      className="text-fg-muted w-6 shrink-0 font-mono text-[.75rem] tabular-nums"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-primary text-body flex-1 leading-[1.2] font-semibold transition-colors duration-[var(--duration-fast)] group-hover:text-(--accent-text) group-focus-visible:text-(--accent-text) group-active:text-(--accent-text) ${isActive ? "text-(--accent-text)" : "text-fg"}`}
                    >
                      {item.label}
                    </span>
                    <ArrowUpRight
                      className="text-fg-muted size-4 shrink-0 transition-[transform,color] duration-[var(--duration-fast)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent-text) group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:text-(--accent-text) group-active:text-(--accent-text) motion-reduce:transition-none motion-reduce:group-hover:transform-none motion-reduce:group-focus-visible:transform-none"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto grid gap-4">
          <AppBadge>
            <span
              className="bg-success-500 size-[.6rem] shrink-0 rounded-full"
              aria-hidden="true"
            />
            {availabilityLabel}
          </AppBadge>
          <Link
            className="btn btn--md btn--block focus-visible:text-white"
            href={contactHref}
            onClick={handleClose}
          >
            {contactLabel}
          </Link>
          <p
            className="text-fg-muted text-caption m-0 flex flex-wrap items-center gap-x-3 gap-y-1"
            aria-label={contactLinksLabel}
          >
            <a
              className="hover:text-fg focus-visible:text-fg no-underline transition-colors duration-[var(--duration-fast)]"
              href={`mailto:${siteConfig.person.email}`}
            >
              {siteConfig.person.email}
            </a>
            <span
              className="bg-tertiary-500 size-[.35rem] rounded-full"
              aria-hidden="true"
            />
            <a
              className="hover:text-fg focus-visible:text-fg no-underline transition-colors duration-[var(--duration-fast)]"
              href={siteConfig.person.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkedInLabel}
            </a>
          </p>
        </div>
      </div>
    </UiDrawer>
  );
}
