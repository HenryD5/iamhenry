import type { CSSProperties } from "react";

interface AppTechPillProps {
  name: string;
  abbreviation: string;
  facet: "software" | "automation" | "data";
  depth?: "back" | "middle" | "front";
  isFeatured?: boolean;
  className?: string;
  ring: "outer" | "middle" | "inner";
  angle: number;
  style: CSSProperties;
}
export function AppTechPill({
  name,
  abbreviation,
  facet,
  depth = "middle",
  isFeatured = false,
  className,
  ring,
  angle,
  style,
}: AppTechPillProps) {
  const facetClass =
    facet === "automation"
      ? name === "Agentes IA"
        ? "bg-[radial-gradient(circle_at_30%_26%,var(--primary-300),var(--primary-500)_45%,var(--tertiary-500))]"
        : "bg-primary-800 shadow-[inset_0_0_0_1px_var(--primary-400)]"
      : facet === "data"
        ? "bg-tertiary-500"
        : "bg-primary-500";
  const depthClass = {
    back: "",
    middle: "",
    front:
      "z-[3] bg-surface-raised py-[.6rem] pr-[1.9rem] pl-[.6rem] text-[1.85rem] !font-bold shadow-[var(--card-shadow)] max-md:!font-semibold [&>i]:size-[3.9rem] [&>i]:text-body-lg",
  } as const;
  return (
    <span
      className={[
        "font-primary max-md:bg-surface-raised absolute z-[1] inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-[.7rem] rounded-full border border-[color-mix(in_srgb,var(--fg)_13%,transparent)] bg-[color-mix(in_srgb,var(--bg-raised)_var(--surface-alpha),transparent)] py-[.45rem] pr-[1.2rem] pl-[.45rem] text-[1.35rem] leading-none font-semibold whitespace-nowrap backdrop-blur-[var(--surface-blur)] [&>i]:size-[2.7rem] [&>i]:text-[1.05rem] max-md:static max-md:translate-0 max-md:gap-[.6rem] max-md:py-[.4rem] max-md:pr-4 max-md:pl-[.4rem] max-md:text-[1.1rem] max-md:font-semibold max-md:shadow-none max-md:[&>i]:size-[2.3rem] max-md:[&>i]:text-[.9rem]",
        depthClass[depth],
        isFeatured
          ? "border-[color-mix(in_srgb,var(--fg)_20%,transparent)]"
          : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-facet={facet}
      data-ring={ring}
      data-angle={angle}
      data-depth={depth}
      data-motion-item="hero-pill"
      style={style}
    >
      <i
        className={`font-secondary grid place-items-center rounded-full font-extrabold tracking-normal text-white ${facetClass}`}
        aria-hidden="true"
      >
        {abbreviation}
      </i>
      {name}
    </span>
  );
}
