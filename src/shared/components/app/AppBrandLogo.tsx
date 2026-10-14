import Link from "next/link";
export function AppBrandLogo({
  label,
  asLink = true,
}: {
  label: string;
  asLink?: boolean;
}) {
  const logo = (
    <>
      <svg
        className="size-[2.4rem] max-md:size-[2.1rem]"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <g transform="rotate(40 32 32)">
          <path
            d="M32 3c9 7 13 17 13 28v11H19V31C19 20 23 10 32 3z"
            fill="var(--primary-500)"
          />
          <circle cx="32" cy="24" r="5.5" fill="var(--bg)" />
          <path
            d="M19 32 9 44v7l10-5zM45 32l10 12v7l-10-5z"
            fill="currentColor"
          />
          <path d="M25 45h14l-7 16z" fill="var(--tertiary-500)" />
        </g>
      </svg>
      <span className="max-[480px]:sr-only">{label}</span>
    </>
  );
  const className =
    "mr-auto flex shrink-0 items-center gap-[.7rem] font-secondary text-h4 leading-none font-extrabold tracking-[-.03em] text-fg no-underline transition-colors duration-[var(--duration-fast)] hover:text-(--accent-text) focus-visible:text-(--accent-text) max-md:text-[1.4rem]";
  return asLink ? (
    <Link className={className} href="/#inicio">
      {logo}
    </Link>
  ) : (
    <span className={className}>{logo}</span>
  );
}
