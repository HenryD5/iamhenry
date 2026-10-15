import { getTranslations } from "next-intl/server";
import { ClosingOrbit } from "./ClosingOrbit";
import { AppContainer } from "@/shared/components/app/AppContainer";
import { AppWhatsAppIcon } from "@/shared/components/app/AppWhatsAppIcon";
import { getContactHref, isExternalContact } from "@/shared/utils/contact";

export async function ClosingSection() {
  const translate = await getTranslations("home");
  const translateShared = await getTranslations("shared");
  const isContactExternal = isExternalContact();
  const contactHref = getContactHref(translateShared("contactMessage"));

  return (
    <section
      className="relative scroll-mt-20 overflow-hidden pt-8 pb-30 max-md:pt-4 max-md:pb-18"
      id="contacto"
      data-motion-section="closing"
    >
      <AppContainer>
        <div
          className="relative grid justify-items-start gap-[2.2rem] overflow-hidden rounded-xl px-22 py-24 shadow-[0_3rem_6rem_-2.6rem_color-mix(in_srgb,var(--primary-800)_80%,transparent)] max-md:gap-[1.6rem] max-md:rounded-lg max-md:px-[1.6rem] max-md:pt-12 max-md:pb-[3.2rem]"
          data-surface="light"
        >
          <ClosingOrbit />
          <span className="border-line bg-surface-raised font-primary text-body-sm before:bg-success-500 relative inline-flex items-center gap-[.6rem] rounded-full border px-[1.1rem] py-[.6rem] leading-none font-medium before:size-[.6rem] before:rounded-full before:content-['']">
            {translate("closing.availability")}
          </span>
          <h2 className="relative m-0 max-w-[15ch] text-[4.8rem] leading-[1.04] max-md:max-w-none max-md:text-[2.8rem]">
            {translate("closing.title")}{" "}
            <span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">
              {translate("closing.accent")}
            </span>
          </h2>
          <a
            className="btn btn--lg relative gap-[.8rem] focus-visible:text-white max-md:w-full max-md:justify-center"
            href={contactHref}
            {...(isContactExternal
              ? { rel: "noopener noreferrer", target: "_blank" }
              : {})}
          >
            <AppWhatsAppIcon />
            {translate("closing.action")}
          </a>
        </div>
      </AppContainer>
    </section>
  );
}
