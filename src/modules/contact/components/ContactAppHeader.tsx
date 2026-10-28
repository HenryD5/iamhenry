import { getTranslations } from "next-intl/server";

import { AppHeader } from "@/shared/components/app/AppHeader";

import { ContactDialogTrigger } from "./ContactDialogTrigger";

interface ContactAppHeaderProps {
  surface?: "light";
}

export async function ContactAppHeader({ surface }: ContactAppHeaderProps) {
  const translate = await getTranslations("shared");

  return (
    <AppHeader
      surface={surface}
      contactTrigger={
        <ContactDialogTrigger className="btn btn--md focus-visible:text-white max-md:order-1 max-md:shrink min-[768px]:order-2">
          <span className="md:hidden">{translate("contactCtaShort")}</span>
          <span className="max-md:hidden">{translate("contactCta")}</span>
        </ContactDialogTrigger>
      }
      mobileContactTrigger={
        <ContactDialogTrigger className="btn btn--md btn--block focus-visible:text-white">
          {translate("contactCta")}
        </ContactDialogTrigger>
      }
    />
  );
}
