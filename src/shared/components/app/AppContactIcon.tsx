// Icono provisional hasta que el diseño apruebe el definitivo.
export function AppContactIcon({ className }: { className?: string }) {
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  );
}
