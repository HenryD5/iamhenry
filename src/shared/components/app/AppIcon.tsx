type AppIconName =
  | "arrow-left"
  | "arrow-right"
  | "arrow-up"
  | "briefcase"
  | "check"
  | "commerce"
  | "education"
  | "email"
  | "gift"
  | "linkedin"
  | "payments"
  | "robot"
  | "store";

export function AppIcon({
  name,
  className = "ih-ico",
}: {
  name: AppIconName;
  className?: string;
}) {
  const content = {
    "arrow-left": <path d="M15 6l-6 6 6 6" />,
    "arrow-right": <path d="M9 6l6 6-6 6" />,
    "arrow-up": (
      <>
        <path d="M12 19V5" />
        <path d="M6 11l6-6 6 6" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      </>
    ),
    check: <path d="m5 12 5 5 9-10" />,
    commerce: (
      <>
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M3 4h2l2.4 11h11.2L21 7H6.2" />
      </>
    ),
    education: (
      <>
        <path d="m2 9 10-5 10 5-10 5z" />
        <path d="M6 11.5V16c2 2 10 2 12 0v-4.5" />
      </>
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    gift: (
      <>
        <rect x="3" y="9" width="18" height="4" rx="1" />
        <path d="M5 13v7h14v-7M12 9v11M12 9c-2-4-6-4-5-1s5 1 5 1zm0 0c2-4 6-4 5-1s-5 1-5 1z" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7M8 7v.01M12 17v-4a2.5 2.5 0 0 1 5 0v4M12 10v7" />
      </>
    ),
    payments: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
    robot: (
      <>
        <rect x="4" y="8" width="16" height="12" rx="2" />
        <path d="M12 8V4M9 13v2M15 13v2" />
      </>
    ),
    store: <path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6" />,
  } satisfies Record<AppIconName, React.ReactNode>;
  return (
    <svg
      className={
        className === "ih-ico"
          ? "size-[1.3rem] shrink-0 fill-none stroke-current stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
          : className
      }
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {content[name]}
    </svg>
  );
}
