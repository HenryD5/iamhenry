interface PortfolioGroupHeadingProps {
  index: string;
  title: string;
  className?: string;
}

export function PortfolioGroupHeading({
  index,
  title,
  className,
}: PortfolioGroupHeadingProps) {
  return (
    <div
      className={["mb-[1.4rem] flex items-center gap-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className="text-caption font-mono text-(--accent-text)"
        aria-hidden="true"
      >
        {index}
      </span>
      <h3 className="text-h5 m-0 leading-none">{title}</h3>
      <span className="border-line flex-1 border-t" aria-hidden="true" />
    </div>
  );
}
