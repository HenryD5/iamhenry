import { getTranslations } from "next-intl/server";
import { stackBarHeights, stackFacets } from "../content/home.content";
import { StackIllustration } from "./StackIllustration";
import { AppContainer } from "@/shared/components/app/AppContainer";

export async function StackSection() {
  const translate = await getTranslations("home");
  const facetClass = {
    software: "bg-primary-500",
    ai: "bg-[radial-gradient(circle_at_30%_26%,var(--primary-300),var(--primary-500)_45%,var(--tertiary-500))]",
    data: "bg-tertiary-500",
  } as const;

  return (
    <section
      className="relative scroll-mt-20 overflow-hidden py-30 max-md:py-18"
      id="stack"
      data-surface="light"
      data-motion-section="stack"
    >
      <AppContainer>
        <div className="mb-16 grid grid-cols-[6fr_5fr] items-center gap-20 max-md:mb-[2.6rem] max-md:grid-cols-1 max-md:gap-[2.4rem]">
          <div>
            <p className="font-primary text-body-sm text-(--accent-text) before:bg-tertiary-500 mb-[1.3rem] inline-flex items-center gap-[.6rem] leading-[1.2] font-semibold before:size-[.55rem] before:rounded-full before:content-['']">
              {translate("stack.eyebrow")}
            </p>
            <h2 className="mb-[1.4rem] max-w-[16ch] max-md:max-w-none">
              {translate("stack.title")} <em>{translate("stack.accent")}</em>
            </h2>
            <p className="text-body-lg text-fg-muted m-0 max-w-[42ch] leading-[1.45] max-md:max-w-none">
              {translate("stack.lead")}
            </p>
          </div>
          <StackIllustration label={translate("stack.core")} />
        </div>
        <div className="grid grid-cols-[1.25fr_1.1fr_.85fr] gap-[1.4rem] max-md:grid-cols-1">
          {stackFacets.map((facet) => (
            <article
              className={`bg-surface-raised rounded-md border p-[2.2rem] max-md:p-[1.6rem] ${facet.id === "ai" ? "border-primary-400 shadow-[0_0_var(--glow-size)_color-mix(in_srgb,var(--primary-500)_var(--glow-strength),transparent)]" : "border-line"}`}
              key={facet.id}
              data-motion-item="stack-card"
            >
              <h3 className="text-h3 m-0 flex items-center gap-[.9rem]">
                <i
                  className={`size-[1.1rem] rounded-full ${facetClass[facet.id]}`}
                />
                {translate(facet.titleKey as Parameters<typeof translate>[0])}
              </h3>
              <p className="text-body text-fg-muted mt-[.7rem] mb-[1.8rem] max-w-none">
                {translate(
                  facet.descriptionKey as Parameters<typeof translate>[0],
                )}
              </p>
              {facet.feature ? (
                <div className="border-line bg-surface flex items-center gap-[1.1rem] rounded-sm border px-[1.3rem] py-[1.1rem]">
                  <b className="font-secondary text-[1.5rem] leading-none font-extrabold tracking-[-.02em]">
                    {facet.feature.name}
                  </b>
                  <span className="text-body-sm text-fg-muted">
                    {translate(
                      facet.feature.descriptionKey as Parameters<
                        typeof translate
                      >[0],
                    )}
                  </span>
                </div>
              ) : null}
              {facet.groups.map((group) => (
                <div key={group.titleKey}>
                  <h4 className="font-primary text-body-sm text-fg-muted mt-6 mb-[.8rem] leading-none font-semibold tracking-normal">
                    {translate(
                      group.titleKey as Parameters<typeof translate>[0],
                    )}
                  </h4>
                  <div className="flex flex-wrap gap-[.7rem]">
                    {group.items.map((item) => (
                      <span
                        className="border-line bg-surface font-primary text-fg rounded-full border px-[1.1rem] py-[.8rem] text-[1.2rem] leading-none font-semibold"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {facet.id === "data" ? (
                <div
                  className="border-line mt-[1.8rem] flex h-22 items-end gap-2 border-t pt-[1.2rem]"
                  data-motion-item="stack-bars"
                >
                  {stackBarHeights.map((height, index) => (
                    <i
                      className={`flex-1 rounded-t-[.3rem] ${index === stackBarHeights.length - 1 ? "bg-tertiary-500" : "bg-[color-mix(in_srgb,var(--tertiary-500)_35%,transparent)]"}`}
                      key={height}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </AppContainer>
    </section>
  );
}
