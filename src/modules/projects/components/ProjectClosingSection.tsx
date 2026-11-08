import type { ReactNode } from "react";
import { AppContactIcon } from "@/shared/components/app/AppContactIcon";
import { AppContainer } from "@/shared/components/app/AppContainer";
import type { ContactTriggerRenderer } from "@/shared/types/contact-trigger.types";

interface ProjectClosingSectionProps {
  availability: string;
  title: ReactNode;
  lead: string;
  action: string;
  renderContactTrigger: ContactTriggerRenderer;
}

export function ProjectClosingSection({
  availability,
  title,
  lead,
  action,
  renderContactTrigger,
}: ProjectClosingSectionProps) {
  const actionClassName =
    "btn btn--light btn--lg relative shrink-0 gap-[.8rem] max-md:w-full max-md:justify-center";

  return (
    <section className="py-20 max-md:py-14">
      <AppContainer>
        <div
          className="relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-10 overflow-hidden rounded-xl px-16 py-16 shadow-[0_3rem_6rem_-2.6rem_color-mix(in_srgb,var(--primary-800)_80%,transparent)] before:pointer-events-none before:absolute before:-top-40 before:-right-32 before:size-[30rem] before:rounded-full before:bg-[radial-gradient(circle,color-mix(in_srgb,var(--primary-500)_32%,transparent),transparent_68%)] before:content-[''] after:pointer-events-none after:absolute after:-bottom-48 after:-left-24 after:size-[26rem] after:rounded-full after:bg-[radial-gradient(circle,color-mix(in_srgb,var(--tertiary-500)_18%,transparent),transparent_68%)] after:content-[''] max-md:grid-cols-1 max-md:items-start max-md:gap-8 max-md:rounded-lg max-md:px-[1.6rem] max-md:py-12"
          data-surface="light"
        >
          <div className="relative grid justify-items-start gap-6">
            <span className="border-line bg-surface-raised font-primary text-body-sm before:bg-success-500 inline-flex items-center gap-[.6rem] rounded-full border px-[1.1rem] py-[.6rem] leading-none font-medium before:size-[.6rem] before:rounded-full before:content-['']">
              {availability}
            </span>
            <h2 className="text-h2 m-0 max-w-[18ch] leading-[1.08] text-balance">
              {title}
            </h2>
            <p className="text-body-lg text-fg-muted m-0 max-w-[44ch] leading-[1.45]">
              {lead}
            </p>
          </div>
          {renderContactTrigger({
            className: actionClassName,
            children: (
              <>
                <AppContactIcon />
                {action}
              </>
            ),
          })}
        </div>
      </AppContainer>
    </section>
  );
}
