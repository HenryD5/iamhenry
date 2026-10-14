interface AppFacetItem {
  label: string;
  facet: "software" | "ai" | "automation" | "data";
}
export function AppFacetList({
  items,
  className,
}: {
  items: readonly AppFacetItem[];
  className?: string;
}) {
  const facetClass = {
    software: "bg-primary-500",
    ai: "bg-[radial-gradient(circle_at_30%_26%,var(--primary-300),var(--primary-500)_45%,var(--tertiary-500))]",
    automation: "bg-primary-800 shadow-[inset_0_0_0_1px_var(--primary-400)]",
    data: "bg-tertiary-500",
  } as const;
  return (
    <div
      className={[
        "font-primary text-body-sm text-fg-muted flex flex-wrap gap-[2.2rem] leading-none font-medium",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item) => (
        <span className="inline-flex items-center gap-[.6rem]" key={item.label}>
          <i
            className={`size-[.7rem] shrink-0 rounded-full ${facetClass[item.facet]}`}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}
