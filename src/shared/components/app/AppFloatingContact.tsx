import { getTranslations } from "next-intl/server";
import { getContactHref, isExternalContact } from "@/shared/utils/contact";
import { AppWhatsAppIcon } from "./AppWhatsAppIcon";

export async function AppFloatingContact() {
  const translate = await getTranslations("shared");
  const isContactExternal = isExternalContact();
  const href = getContactHref(translate("contactMessage"));
  return (
    <a
      className="bg-primary-500 font-primary text-button hover:bg-primary-600 fixed right-8 bottom-[1.2rem] z-[9] inline-flex items-center gap-[.6rem] rounded-full px-[1.3rem] py-4 leading-none font-semibold text-white no-underline shadow-[0_1rem_2.4rem_-1rem_var(--primary-500)] transition-colors duration-[var(--duration-fast)] hover:text-white max-md:right-5 max-md:bottom-5"
      href={href}
      aria-label={translate("floatingContact")}
      data-motion-section="floating-contact"
      {...(isContactExternal
        ? { rel: "noopener noreferrer", target: "_blank" }
        : {})}
    >
      <AppWhatsAppIcon />
      {translate("floatingContact")}
    </a>
  );
}
