import { getTranslations } from "next-intl/server";
import { AppFloatingContact } from "@/shared/components/app/AppFloatingContact";
import { AppFooter } from "@/shared/components/app/AppFooter";
import { UiToaster } from "@/shared/components/ui/UiToast";
import { siteConfig } from "@/shared/config/site";

export async function SiteLayout({
  children,
  floatingContactTrigger,
}: Readonly<{
  children: React.ReactNode;
  floatingContactTrigger: React.ReactNode;
}>) {
  const translate = await getTranslations("shared");
  return (
    <>
      <a
        className="btn btn--sm fixed top-4 left-4 z-[100] -translate-y-[5rem] focus:translate-y-0"
        href="#main-content"
      >
        {translate("skipToContent")}
      </a>
      {children}
      <noscript>
        <p className="text-fg-muted text-body mx-auto max-w-3xl px-5 py-6 text-center">
          {translate("noScript", { email: siteConfig.person.email })}
        </p>
      </noscript>
      <AppFooter />
      <AppFloatingContact contactTrigger={floatingContactTrigger} />
      <UiToaster
        label={translate("toast.label")}
        closeLabel={translate("toast.close")}
      />
    </>
  );
}
