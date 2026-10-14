import { getTranslations } from "next-intl/server";
import { heroCards, heroVideo, heroVisual } from "../content/hero.content";
import { HeroAvailabilityBadge } from "./HeroAvailabilityBadge";
import { HeroFloatingCard } from "./HeroFloatingCard";
import { HeroOrbit } from "./HeroOrbit";
import { AppFacetList } from "@/shared/components/app/AppFacetList";
import { AppLoopVideo } from "@/shared/components/app/AppLoopVideo";

export async function HeroSection() {
  const translate = await getTranslations("home");
  const facets = [
    { facet: "software" as const, label: translate("hero.facets.software") },
    { facet: "ai" as const, label: translate("hero.facets.ai") },
    {
      facet: "automation" as const,
      label: translate("hero.facets.automation"),
    },
  ];
  const isVideoVisual = heroVisual === "video";

  return (
    <header
      className="relative h-[73.5rem] scroll-mt-20 overflow-hidden max-md:h-auto max-md:pb-12"
      id="inicio"
      data-motion-section="hero"
    >
      <div
        className={`absolute top-[49.5rem] left-1/2 h-[46rem] w-[84rem] -translate-1/2 bg-[radial-gradient(circle_at_28%_50%,var(--primary-400)_0,transparent_45%),radial-gradient(circle_at_54%_44%,var(--primary-300)_0,transparent_42%),radial-gradient(circle_at_78%_60%,var(--tertiary-300)_0,transparent_36%)] opacity-50 blur-[4.5rem] max-md:top-[36rem] max-md:h-[40rem] max-md:w-[44rem] ${isVideoVisual ? "md:hidden" : ""}`}
      />
      {isVideoVisual ? (
        <>
          <AppLoopVideo
            basePath={heroVideo.basePath}
            width={heroVideo.width}
            height={heroVideo.height}
            className="absolute top-[48rem] left-1/2 h-[55.38rem] w-[98.46rem] max-w-none -translate-1/2 mask-y-from-95% mask-x-from-95% max-md:hidden [[data-theme=night]_&]:hidden"
            motionItem="hero-orbit"
          />
          <AppLoopVideo
            basePath={heroVideo.nightBasePath}
            width={heroVideo.width}
            height={heroVideo.height}
            className="absolute top-[48rem] left-1/2 hidden h-[55.38rem] w-[98.46rem] max-w-none -translate-1/2 mask-y-from-95% mask-x-from-95% max-md:hidden [[data-theme=night]_&]:block"
            motionItem="hero-orbit"
          />
        </>
      ) : null}
      <div
        className="absolute inset-x-0 top-[6.3rem] z-[2] text-center max-md:static max-md:px-5 max-md:pt-[6.3rem]"
        data-motion-item="hero-copy"
      >
        <HeroAvailabilityBadge label={translate("hero.availability")} />
        <h1 className="text-display mt-[1.1rem] mb-0 leading-none tracking-[var(--tracking-display)]">
          {translate("hero.titleLead")}{" "}
          <span className="bg-[image:var(--gradient-accent)] bg-clip-text [font-family:inherit] text-transparent">
            {translate("hero.titleAccent")}
          </span>
        </h1>
        <p className="text-h4 text-fg-muted max-md:text-h5 mx-auto mt-4 mb-0 max-w-none">
          <b className="text-fg font-semibold">
            {translate("hero.rolePrimary")}
          </b>
          {` ${translate("hero.roleSecondary")}`}
        </p>
        <p className="text-body-lg text-fg-muted max-md:text-body mx-auto mt-[.7rem] mb-0 max-w-[58ch] leading-[1.4]">
          {translate("hero.summary")}
        </p>
      </div>
      {heroCards.map((card, index) => (
        <HeroFloatingCard
          key={card.titleKey}
          index={index}
          eyebrow={translate(
            card.eyebrowKey as Parameters<typeof translate>[0],
          )}
          title={translate(card.titleKey as Parameters<typeof translate>[0])}
          detail={translate(card.detailKey as Parameters<typeof translate>[0])}
        />
      ))}
      {isVideoVisual ? (
        <div className="contents md:hidden">
          <HeroOrbit label={translate("hero.core")} />
        </div>
      ) : (
        <HeroOrbit label={translate("hero.core")} />
      )}
      <AppFacetList
        className="absolute inset-x-0 bottom-[2.6rem] justify-center max-md:static max-md:mx-5 max-md:mt-[1.4rem] max-md:justify-start max-md:!gap-x-[1.4rem] max-md:!gap-y-[.8rem]"
        items={facets}
      />
    </header>
  );
}
