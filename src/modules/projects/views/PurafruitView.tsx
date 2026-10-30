import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { ProjectDiagramFrame } from "../components/ProjectDiagramFrame";
import { ProjectPanelShowcase } from "../components/ProjectPanelShowcase";
import { ProjectClosingSection } from "../components/ProjectClosingSection";
import { purafruitCaseStudy } from "../content/purafruit.content";
import { PORTFOLIO_ANCHOR_PATH } from "../routes";
import { AppContainer } from "@/shared/components/app/AppContainer";
import { AppIcon } from "@/shared/components/app/AppIcon";
import { AppLoopVideo } from "@/shared/components/app/AppLoopVideo";
import { getContactHref } from "@/shared/utils/contact";
import type { ContactTriggerRenderer } from "@/shared/types/contact-trigger.types";

interface PurafruitViewProps {
  header: ReactNode;
  renderContactTrigger?: ContactTriggerRenderer;
}

export async function PurafruitView({
  header,
  renderContactTrigger,
}: PurafruitViewProps) {
  const translate = await getTranslations("projects");
  const translateShared = await getTranslations("shared");
  const contactHref = getContactHref();

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
              {translate("purafruit.eyebrow")}
            </p>
            <h1 className="m-0 mb-[1.6rem] max-w-[20ch] text-balance">
              {translate("purafruit.title")}{" "}
              <em>{translate("purafruit.accent")}</em>
            </h1>
            <p className="text-body-lg text-fg-muted m-0 max-w-[62ch] leading-[1.45]">
              {translate("purafruit.lead")}
            </p>
            <dl
              className="mt-12 mb-0 grid grid-cols-3 gap-[1.4rem] max-md:mt-8 max-md:grid-cols-1"
              aria-label={translate("purafruit.factsLabel")}
            >
              {purafruitCaseStudy.facts.map((fact) => (
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
            aria-labelledby="purafruit-field-app"
          >
            <AppContainer className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-16 max-md:grid-cols-1 max-md:gap-10">
              <div>
                <p className="font-primary text-body-sm m-0 mb-3 font-semibold text-(--accent-text)">
                  {translate("purafruit.fieldApp.eyebrow")}
                </p>
                <h2 className="text-h3 m-0 mb-4" id="purafruit-field-app">
                  {translate("purafruit.fieldApp.title")}
                </h2>
                <p className="text-body text-fg-muted m-0 mb-8 max-w-[52ch]">
                  {translate("purafruit.fieldApp.lead")}
                </p>
                <ul className="m-0 grid list-none gap-4 p-0">
                  {purafruitCaseStudy.fieldAppHighlights.map((highlight) => (
                    <li
                      className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1"
                      key={highlight.id}
                    >
                      <AppIcon
                        name="check"
                        className="ih-ico text-primary-500 row-span-2 mt-[.2rem] size-[1.1rem]"
                      />
                      <b className="text-body-sm font-semibold">
                        {translate(highlight.titleKey)}
                      </b>
                      <span className="text-body-sm text-fg-muted">
                        {translate(highlight.textKey)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <figure className="m-0 justify-self-center">
                <div className="border-fg bg-fg w-[17rem] overflow-hidden rounded-[2.4rem] border-[.45rem] shadow-(--shadow-strong) max-md:w-[15rem]">
                  <AppLoopVideo
                    basePath={purafruitCaseStudy.demoVideo.basePath}
                    width={purafruitCaseStudy.demoVideo.width}
                    height={purafruitCaseStudy.demoVideo.height}
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="text-caption text-fg-muted mt-4 max-w-[17rem] text-center">
                  {translate("purafruit.fieldApp.videoCaption")}
                </figcaption>
              </figure>
            </AppContainer>
          </section>

          <section
            className="py-20 max-md:py-14"
            aria-labelledby="purafruit-panel"
          >
            <AppContainer>
              <p className="font-primary text-body-sm m-0 mb-3 font-semibold text-(--accent-text)">
                {translate("purafruit.panel.eyebrow")}
              </p>
              <h2 className="text-h3 m-0 mb-4" id="purafruit-panel">
                {translate("purafruit.panel.title")}
              </h2>
              <p className="text-body text-fg-muted m-0 mb-10 max-w-[56ch]">
                {translate("purafruit.panel.lead")}
              </p>
              <ProjectPanelShowcase
                listLabel={translate("purafruit.panel.listLabel")}
                screens={purafruitCaseStudy.panelScreens.map((screen) => ({
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
            aria-labelledby="purafruit-capabilities"
          >
            <AppContainer>
              <h2 className="text-h3 m-0 mb-10" id="purafruit-capabilities">
                {translate("purafruit.capabilitiesTitle")}
              </h2>
              <ol className="m-0 grid list-none grid-cols-2 gap-[1.4rem] p-0 max-md:grid-cols-1">
                {purafruitCaseStudy.capabilities.map((capability, index) => (
                  <li
                    className="border-line bg-surface grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-md border p-6"
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
            </AppContainer>
          </section>

          <section
            className="py-20 max-md:py-14"
            aria-labelledby="purafruit-diagram"
          >
            <AppContainer>
              <div className="mb-8 flex items-end justify-between gap-8 max-md:flex-col max-md:items-start max-md:gap-4">
                <div>
                  <h2 className="text-h3 m-0 mb-3" id="purafruit-diagram">
                    {translate("purafruit.diagram.title")}
                  </h2>
                  <p className="text-body text-fg-muted m-0 max-w-[56ch]">
                    {translate("purafruit.diagram.lead")}
                  </p>
                </div>
              </div>
              <div className="border-line overflow-hidden rounded-md border">
                <ProjectDiagramFrame
                  src={purafruitCaseStudy.diagramSrc}
                  title={translate("purafruit.diagram.frameTitle")}
                />
              </div>
              <h2 className="text-h5 mt-12 mb-4">
                {translate("purafruit.stackTitle")}
              </h2>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {purafruitCaseStudy.stack.map((technology) => (
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
              {translate("purafruit.closing.title")}{" "}
              <span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">
                {translate("purafruit.closing.accent")}
              </span>
            </>
          }
          lead={translate("purafruit.closing.lead")}
          action={translate("purafruit.closing.action")}
          contactHref={contactHref}
          renderContactTrigger={renderContactTrigger}
        />
      </main>
    </>
  );
}
