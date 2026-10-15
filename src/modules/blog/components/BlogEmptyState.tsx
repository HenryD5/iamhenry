import Link from "next/link";

import blogMessages from "../locales/es.json";

export function BlogEmptyState() {
  return (
    <section className="my-4 mb-20 grid justify-items-center gap-[.8rem] rounded-lg border border-dashed border-neutral-400 px-8 py-16 text-center">
      <div
        className="size-16 rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--primary-400),var(--primary-500)_60%,var(--primary-800))] shadow-[0_0_var(--glow-size)_color-mix(in_srgb,var(--primary-500)_var(--glow-strength),transparent)]"
        aria-hidden="true"
      />
      <h2 className="text-h4">{blogMessages.list.emptyTitle}</h2>
      <p className="text-fg-muted m-0 max-w-[40ch]">
        {blogMessages.list.emptyDescription}
      </p>
      <Link className="btn btn--md" href="/#portafolio">
        {blogMessages.list.emptyAction}
      </Link>
    </section>
  );
}
