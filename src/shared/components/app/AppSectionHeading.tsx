interface AppSectionHeadingProps {
  eyebrow: string;
  title: string;
  accent: string;
  description?: string;
  className?: string;
  titleClassName?: string;
}

export function AppSectionHeading({
  eyebrow,
  title,
  accent,
  description,
  className,
  titleClassName,
}: AppSectionHeadingProps) {
  return (
    <div
      className={[
        "grid grid-cols-[1fr_auto] items-end gap-12 max-md:grid-cols-1 max-md:gap-[1.2rem]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div>
        <p className="font-primary text-body-sm text-(--accent-text) before:bg-tertiary-500 mb-[1.3rem] inline-flex items-center gap-[.6rem] leading-[1.2] font-semibold before:size-[.55rem] before:rounded-full before:content-['']">
          {eyebrow}
        </p>
        <h2
          className={[
            "mb-[1.4rem] max-w-[17ch] text-balance max-md:max-w-none",
            titleClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {title} <em>{accent}</em>
        </h2>
      </div>
      {description ? (
        <p className="text-body-lg text-fg-muted m-0 max-w-[42ch] leading-[1.45] max-md:max-w-none">
          {description}
        </p>
      ) : null}
    </div>
  );
}
