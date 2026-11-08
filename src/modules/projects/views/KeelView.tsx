import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { ProjectClosingSection } from "../components/ProjectClosingSection";
import { ProjectPanelShowcase } from "../components/ProjectPanelShowcase";
import { keelCaseStudy } from "../content/keel.content";
import { PORTFOLIO_ANCHOR_PATH } from "../routes";
import { AppContainer } from "@/shared/components/app/AppContainer";
import { AppIcon } from "@/shared/components/app/AppIcon";
import type { ContactTriggerRenderer } from "@/shared/types/contact-trigger.types";

interface KeelViewProps {
  header: ReactNode;
  renderContactTrigger: ContactTriggerRenderer;
}

export async function KeelView({
  header,
  renderContactTrigger,
}: KeelViewProps) {
  const translate = await getTranslations("projects");
  const translateShared = await getTranslations("shared");

  return (
    <>
      {header}
      <main id="main-content" className="overflow-x-clip pt-16 max-md:pt-14">
        <article>
          <AppContainer className="pt-16 pb-14 max-md:pt-10 max-md:pb-10">
            <Link
              className="font-primary text-body-sm text-fg-muted hover:text-fg mb-10 inline-flex items-center gap-[.4rem] font-medium transition-colors max-md:mb-8"
              href={PORTFOLIO_ANCHOR_PATH}
            >
              <AppIcon name="arrow-left" />
              {translate("back")}
            </Link>
            <p className="font-primary text-body-sm before:bg-tertiary-500 mb-[1.3rem] flex items-center gap-[.6rem] leading-[1.2] font-semibold text-(--accent-text) before:size-[.55rem] before:shrink-0 before:rounded-full before:content-['']">
              {translate("keel.eyebrow")}
            </p>
            <h1 className="m-0 mb-[1.6rem] max-w-[20ch] text-balance">
              {translate("keel.title")} <em>{translate("keel.accent")}</em>
            </h1>
            <p className="text-body-lg text-fg-muted m-0 max-w-[62ch] leading-[1.45]">
              {translate("keel.lead")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {keelCaseStudy.links.map((link, index) => (
                <a
                  className={
                    index === 0
                      ? "btn btn--md gap-[.6rem]"
                      : "btn btn--outline btn--md gap-[.6rem]"
                  }
                  href={link.href}
                  key={link.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  {translate(link.labelKey)}
                  <AppIcon name="arrow-right" />
                </a>
              ))}
            </div>
            <dl
              className="mt-12 mb-0 grid grid-cols-3 gap-[1.4rem] max-md:mt-8 max-md:grid-cols-1"
              aria-label={translate("keel.factsLabel")}
            >
              {keelCaseStudy.facts.map((fact) => (
                <div
                  className="border-line bg-surface-raised grid content-start gap-2 rounded-md border p-6"
                  key={fact.id}
                >
                  <dt className="font-primary text-caption font-semibold tracking-[.06em] text-(--accent-text) uppercase">
                    {translate(fact.labelKey)}
                  </dt>
                  <dd className="text-body-sm m-0">
                    {translate(fact.textKey)}
                  </dd>
                </div>
              ))}
            </dl>
          </AppContainer>

          <section
            className="bg-surface-raised py-20 max-md:py-14"
            aria-labelledby="keel-steps"
          >
            <AppContainer>
              <p className="font-primary text-body-sm m-0 mb-3 font-semibold text-(--accent-text)">
                {translate("keel.steps.eyebrow")}
              </p>
              <h2 className="text-h3 m-0 mb-4" id="keel-steps">
                {translate("keel.steps.title")}
              </h2>
              <p className="text-body text-fg-muted m-0 mb-10 max-w-[56ch]">
                {translate("keel.steps.lead")}
              </p>
              <ol className="m-0 grid list-none grid-cols-3 gap-4 p-0 max-lg:grid-cols-2 max-md:grid-cols-1">
                {keelCaseStudy.steps.map((step, index) => (
                  <li
                    className="border-line bg-surface grid content-start gap-3 rounded-md border p-5"
                    key={step.id}
                  >
                    <span
                      className="text-caption font-mono text-(--accent-text)"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-body-sm m-0">
                      {translate(step.textKey)}
                    </p>
                  </li>
                ))}
              </ol>
            </AppContainer>
          </section>

          <section
            className="py-20 max-md:py-14"
            aria-labelledby="keel-screens"
          >
            <AppContainer>
              <p className="font-primary text-body-sm m-0 mb-3 font-semibold text-(--accent-text)">
                {translate("keel.screens.eyebrow")}
              </p>
              <h2 className="text-h3 m-0 mb-4" id="keel-screens">
                {translate("keel.screens.title")}
              </h2>
              <p className="text-body text-fg-muted m-0 mb-10 max-w-[56ch]">
                {translate("keel.screens.lead")}
              </p>
              <ProjectPanelShowcase
                listLabel={translate("keel.screens.listLabel")}
                screens={keelCaseStudy.screens.map((screen) => ({
                  id: screen.id,
                  image: screen.image,
                  imagePlaceholder: screen.imagePlaceholder,
                  width: screen.width,
                  height: screen.height,
                  title: translate(screen.titleKey),
                  text: translate(screen.textKey),
                  alt: translate(screen.altKey),
                }))}
              />
            </AppContainer>
          </section>

          <section
            className="bg-surface-raised py-20 max-md:py-14"
            aria-labelledby="keel-checks"
          >
            <AppContainer>
              <h2 className="text-h3 m-0 mb-4" id="keel-checks">
                {translate("keel.checks.title")}
              </h2>
              <p className="text-body text-fg-muted m-0 mb-10 max-w-[56ch]">
                {translate("keel.checks.lead")}
              </p>
              <ol className="m-0 grid list-none grid-cols-2 gap-[1.4rem] p-0 max-md:grid-cols-1">
                {keelCaseStudy.checks.map((check, index) => (
                  <li
                    className="border-line bg-surface grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-md border p-6"
                    key={check.id}
                  >
                    <span
                      className="text-caption text-fg-muted row-span-2 pt-[.3rem] font-mono"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-h5 m-0">{translate(check.titleKey)}</h3>
                    <p className="text-body-sm text-fg-muted m-0">
                      {translate(check.textKey)}
                    </p>
                  </li>
                ))}
              </ol>
            </AppContainer>
          </section>

          <section
            className="py-20 max-md:py-14"
            aria-labelledby="keel-after-apply"
          >
            <AppContainer>
              <h2 className="text-h3 m-0 mb-4" id="keel-after-apply">
                {translate("keel.afterApply.title")}
              </h2>
              <p className="text-body text-fg-muted m-0 mb-10 max-w-[62ch]">
                {translate("keel.afterApply.lead")}
              </p>
              <ol className="m-0 grid list-none grid-cols-2 gap-[1.4rem] p-0 max-md:grid-cols-1">
                {keelCaseStudy.afterApply.map((capability, index) => (
                  <li
                    className="border-line bg-surface-raised grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-md border p-6"
                    key={capability.id}
                  >
                    <span
                      className="text-caption text-fg-muted row-span-2 pt-[.3rem] font-mono"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-h5 m-0">
                      {translate(capability.titleKey)}
                    </h3>
                    <p className="text-body-sm text-fg-muted m-0">
                      {translate(capability.textKey)}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="border-line bg-surface-raised mt-12 rounded-md border p-8 max-md:p-6">
                <h3 className="text-h4 m-0 mb-3">
                  {translate("keel.cli.title")}
                </h3>
                <p className="text-body text-fg-muted m-0 max-w-[62ch]">
                  {translate("keel.cli.lead")}
                </p>
                <p className="text-body-sm text-fg-muted mt-4 mb-0 max-w-[72ch]">
                  {translate("keel.cli.availability")}
                </p>
                <ul className="m-0 mt-8 grid list-none grid-cols-3 gap-4 p-0 max-lg:grid-cols-1">
                  {keelCaseStudy.cli.map((capability) => (
                    <li
                      className="border-line bg-surface rounded-md border p-5"
                      key={capability.id}
                    >
                      <h4 className="text-h5 m-0 mb-2">
                        {translate(capability.titleKey)}
                      </h4>
                      <p className="text-body-sm text-fg-muted m-0">
                        {translate(capability.textKey)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </AppContainer>
          </section>

          <section
            className="py-20 max-md:py-14"
            aria-labelledby="keel-privacy"
          >
            <AppContainer>
              <div className="grid grid-cols-2 gap-14 max-md:grid-cols-1 max-md:gap-10">
                <div>
                  <h2 className="text-h3 m-0 mb-4" id="keel-privacy">
                    {translate("keel.privacy.title")}
                  </h2>
                  <p className="text-body text-fg-muted m-0 mb-5">
                    {translate("keel.privacy.lead")}
                  </p>
                  <p className="text-body-sm text-fg-muted m-0 mb-5">
                    {translate("keel.privacy.hosts")}
                  </p>
                  <p className="text-body-sm text-fg-muted m-0">
                    {translate("keel.privacy.ai")}
                  </p>
                </div>
                <div>
                  <h3 className="text-h4 m-0 mb-5">
                    {translate("keel.privacy.limits.title")}
                  </h3>
                  <ul className="m-0 grid list-none gap-3 p-0">
                    {keelCaseStudy.limits.map((limit) => (
                      <li
                        className="text-body-sm text-fg-muted flex gap-3"
                        key={limit.id}
                      >
                        <AppIcon
                          className="ih-ico text-primary-500 mt-[.2rem] size-[1.1rem] shrink-0"
                          name="check"
                        />
                        {translate(limit.textKey)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <h2 className="text-h5 mt-12 mb-4">
                {translate("keel.stackTitle")}
              </h2>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {keelCaseStudy.stack.map((technology) => (
                  <li
                    className="border-line text-caption rounded-full border px-[.8rem] py-[.45rem] font-mono leading-none"
                    key={technology}
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </AppContainer>
          </section>
        </article>

        <ProjectClosingSection
          availability={translateShared("footer.availability")}
          title={
            <>
              {translate("keel.closing.title")}{" "}
              <span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">
                {translate("keel.closing.accent")}
              </span>
            </>
          }
          lead={translate("keel.closing.lead")}
          action={translate("keel.closing.action")}
          renderContactTrigger={renderContactTrigger}
        />
      </main>
    </>
  );
}
