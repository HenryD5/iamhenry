export function AppWhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "size-[1.3rem] shrink-0"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.6Z" />
      <path d="M8.2 7.7c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.5l.8 1.9c.1.3.1.5-.1.7l-.7.8c-.2.2-.1.4 0 .6.7 1.2 1.7 2.2 3 2.8.2.1.4.1.6-.1l.9-1.1c.2-.2.4-.3.7-.2l1.9.9c.3.1.5.3.5.5 0 .3-.1 1.4-.7 2-.6.6-1.5.9-2.4.7-1.1-.2-2.7-.8-4.6-2.5-1.5-1.3-2.5-2.9-2.8-4-.3-1 .1-2.2 1.1-3.1Z" />
    </svg>
  );
}
