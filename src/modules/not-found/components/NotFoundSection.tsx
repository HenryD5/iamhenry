import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NotFoundOrbit } from "./NotFoundOrbit";
import { NotFoundRoute } from "./NotFoundRoute";
import { notFoundActions } from "../content/not-found.content";
import { AppContainer } from "@/shared/components/app/AppContainer";

export async function NotFoundSection() {
  const translate = await getTranslations("notFound");

  return (
    <section
      className="relative flex min-h-svh items-center overflow-hidden pt-32 pb-16 max-md:pt-24 max-md:pb-10"
      data-surface="light"
      data-motion-section="not-found"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_40rem_at_100%_100%,color-mix(in_srgb,var(--primary-500)_35%,transparent),transparent_70%),radial-gradient(50rem_40rem_at_100%_0%,color-mix(in_srgb,var(--tertiary-500)_22%,transparent),transparent_70%)]"
        aria-hidden="true"
      />
      <AppContainer>
        <div className="relative grid grid-cols-[44fr_56fr] items-center gap-12 max-md:grid-cols-1 max-md:gap-8">
          <div className="grid justify-items-start gap-[2.2rem] max-md:order-2 max-md:gap-[1.6rem]">
            <span className="border-line bg-surface-raised font-primary text-body-sm before:bg-tertiary-400 before:shadow-[0_0_0_.4rem_color-mix(in_srgb,var(--tertiary-400)_25%,transparent)] inline-flex items-center gap-[.9rem] rounded-full border px-[1.1rem] py-[.6rem] leading-none font-medium before:size-[.6rem] before:rounded-full before:content-['']">
              {translate("pill")}
            </span>
            <h1 className="m-0 max-w-[13ch] font-extrabold max-md:max-w-none">
              {translate("titleLead")}{" "}
              <span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">
                {translate("titleAccent")}
              </span>
            </h1>
            <p className="text-fg-muted text-body-lg m-0 max-w-[44rem]">
              {translate("description")}
            </p>
            <div className="flex flex-wrap gap-4 max-md:w-full max-md:flex-col">
              {notFoundActions.map((action) => (
                <Link
                  key={action.id}
                  href={action.href}
                  className={
                    action.isPrimary
                      ? "btn btn--lg border-primary-500 bg-primary-500 gap-[.8rem] text-white shadow-[0_1.4rem_3rem_-1rem_color-mix(in_srgb,var(--primary-500)_70%,transparent)] hover:border-primary-400 hover:bg-primary-400 max-md:w-full"
                      : "btn btn--lg btn--outline max-md:w-full"
                  }
                >
                  {action.isPrimary ? <span aria-hidden="true">←</span> : null}
                  {translate(action.labelKey)}
                </Link>
              ))}
            </div>
            <NotFoundRoute
              variant="line"
              searchedLabel={translate("searched")}
              lostLabel={translate("lostRoute")}
            />
          </div>
          <div className="max-md:order-1">
            <NotFoundOrbit />
          </div>
        </div>
      </AppContainer>
    </section>
  );
}
