import type { ReactNode, Ref } from "react";

interface AppOrbitProps {
  variant: "hero" | "stack" | "closing";
  label: string;
  motionItem?: string;
  rootRef?: Ref<HTMLDivElement>;
  children?: ReactNode;
  rings: readonly {
    radiusX: number;
    radiusY: number;
    opacity: number;
    isDashed?: boolean;
  }[];
  dots?: readonly {
    x: number;
    y: number;
    radius: number;
    colorToken: string;
  }[];
}

export function AppOrbit({
  variant,
  label,
  motionItem,
  rootRef,
  children,
  rings,
  dots = [],
}: AppOrbitProps) {
  const resolvedMotionItem =
    motionItem ??
    (variant === "hero"
      ? "hero-orbit"
      : variant === "stack"
        ? "stack-illustration"
        : "closing-orbit");

  if (variant === "hero") {
    return (
      <div
        ref={rootRef}
        className="absolute top-[29rem] left-1/2 h-[38rem] w-[92rem] -translate-x-1/2 max-md:relative max-md:!top-auto max-md:!left-auto max-md:mx-5 max-md:mt-[2.6rem] max-md:flex max-md:h-auto max-md:w-auto max-md:!translate-x-0 max-md:flex-wrap max-md:justify-center max-md:gap-[.6rem]"
        data-motion-item={resolvedMotionItem}
      >
        <svg
          className="absolute inset-0 size-full overflow-visible max-md:hidden"
          viewBox="0 0 920 380"
          aria-hidden="true"
        >
          {rings.map((ring) => (
            <ellipse
              key={`${ring.radiusX}-${ring.radiusY}`}
              cx="460"
              cy="190"
              rx={ring.radiusX}
              ry={ring.radiusY}
              fill="none"
              stroke="currentColor"
              strokeOpacity={ring.opacity}
              strokeWidth="1.3"
              strokeDasharray={ring.isDashed ? "3 7" : undefined}
            />
          ))}
        </svg>
        <div className="font-secondary absolute top-1/2 left-1/2 z-[2] grid size-[12.4rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_24%,var(--color-white)_0,var(--primary-300)_16%,var(--primary-500)_46%,var(--tertiary-500)_100%)] text-[3.2rem] leading-none font-extrabold tracking-normal text-white shadow-[0_2.2rem_5rem_-.8rem_color-mix(in_srgb,var(--primary-500)_55%,transparent),inset_-1rem_-1.3rem_2.8rem_color-mix(in_srgb,var(--tertiary-700)_50%,transparent)] max-md:relative max-md:!top-auto max-md:!left-auto max-md:mx-[calc(50%_-_4.75rem)] max-md:mb-[1.4rem] max-md:size-[9.5rem] max-md:basis-auto max-md:!translate-x-0 max-md:!translate-y-0 max-md:text-[2.6rem] max-md:shadow-[0_0_0_1.4rem_color-mix(in_srgb,var(--primary-500)_8%,transparent),0_0_0_2.9rem_color-mix(in_srgb,var(--primary-500)_5%,transparent),0_2rem_4rem_-1rem_color-mix(in_srgb,var(--primary-500)_55%,transparent)]">
          {label}
        </div>
        {children}
      </div>
    );
  }

  if (variant === "stack") {
    return (
      <figure
        className="[container-type:inline-size] relative m-0"
        data-motion-item={resolvedMotionItem}
      >
        <svg
          className="h-auto w-full overflow-visible"
          viewBox="0 0 460 330"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="ihc" cx=".3" cy=".26" r=".9">
              <stop offset="0" style={{ stopColor: "var(--primary-300)" }} />
              <stop offset=".5" style={{ stopColor: "var(--primary-500)" }} />
              <stop offset="1" style={{ stopColor: "var(--tertiary-500)" }} />
            </radialGradient>
          </defs>
          {rings.map((ring) => (
            <ellipse
              key={`${ring.radiusX}-${ring.radiusY}`}
              cx="230"
              cy="170"
              rx={ring.radiusX}
              ry={ring.radiusY}
              strokeOpacity={ring.opacity}
              strokeDasharray={ring.isDashed ? "3 7" : undefined}
            />
          ))}
          <path
            d="M40 40C90 60 110 110 96 136"
            style={{ stroke: "var(--primary-400)" }}
            strokeDasharray="2 6"
          />
          <path
            d="M430 300c-40-10-60-50-58-84"
            style={{ stroke: "var(--tertiary-400)" }}
            strokeDasharray="2 6"
          />
          <path
            d="M400 30c-30 30-40 70-34 96"
            style={{ stroke: "var(--primary-300)" }}
            strokeDasharray="2 6"
          />
          <circle
            cx="230"
            cy="170"
            r="44"
            style={{ fill: "url(#ihc)", stroke: "none" }}
          />
          <g style={{ stroke: "none" }}>
            <rect
              x="70"
              y="124"
              width="52"
              height="38"
              rx="7"
              style={{ fill: "var(--primary-500)" }}
            />
            <path
              d="M70 136h52"
              style={{ stroke: "var(--secondary-500)", strokeWidth: 1.6 }}
            />
            <g transform="translate(346 108)">
              <ellipse
                cx="22"
                cy="8"
                rx="22"
                ry="8"
                style={{
                  fill: "var(--primary-800)",
                  stroke: "var(--primary-300)",
                  strokeWidth: 1.6,
                }}
              />
              <path
                d="M0 8v26c0 4.4 9.8 8 22 8s22-3.6 22-8V8"
                style={{
                  fill: "var(--primary-800)",
                  stroke: "var(--primary-300)",
                  strokeWidth: 1.6,
                }}
              />
              <path
                d="M0 21c0 4.4 9.8 8 22 8s22-3.6 22-8"
                style={{
                  fill: "none",
                  stroke: "var(--primary-300)",
                  strokeWidth: 1.6,
                }}
              />
            </g>
            <g transform="translate(346 196)">
              <rect
                x="0"
                y="18"
                width="11"
                height="24"
                rx="3"
                style={{ fill: "var(--tertiary-500)" }}
              />
              <rect
                x="16"
                y="6"
                width="11"
                height="36"
                rx="3"
                style={{ fill: "var(--tertiary-500)" }}
              />
              <rect
                x="32"
                y="26"
                width="11"
                height="16"
                rx="3"
                style={{ fill: "var(--tertiary-500)" }}
              />
            </g>
          </g>
        </svg>
        <div className="font-secondary absolute top-[51.515%] left-1/2 grid size-[19.13cqw] -translate-1/2 place-items-center text-[26px] leading-none font-extrabold tracking-normal text-white">
          {label}
        </div>
      </figure>
    );
  }

  return (
    <svg
      className="absolute top-1/2 right-[-8rem] h-auto w-[52rem] -translate-y-1/2 overflow-visible max-md:top-[16%] max-md:right-[-15rem] max-md:w-[30rem] max-md:opacity-[.55]"
      viewBox="0 0 520 300"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      data-motion-item={resolvedMotionItem}
    >
      <defs>
        <radialGradient id="ihc-closing" cx=".3" cy=".26" r=".9">
          <stop offset="0" style={{ stopColor: "var(--primary-300)" }} />
          <stop offset=".5" style={{ stopColor: "var(--primary-500)" }} />
          <stop offset="1" style={{ stopColor: "var(--tertiary-500)" }} />
        </radialGradient>
      </defs>
      {rings.map((ring) => (
        <ellipse
          key={`${ring.radiusX}-${ring.radiusY}`}
          cx="260"
          cy="150"
          rx={ring.radiusX}
          ry={ring.radiusY}
          strokeOpacity={ring.opacity}
          strokeDasharray={ring.isDashed ? "3 7" : undefined}
        />
      ))}
      <circle cx="260" cy="150" r="46" fill="url(#ihc-closing)" stroke="none" />
      {dots.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={dot.radius}
          style={{ fill: dot.colorToken }}
          stroke="none"
        />
      ))}
    </svg>
  );
}
