import { getTranslations } from "next-intl/server";
import { AppFloatingContact } from "@/shared/components/app/AppFloatingContact";
import { AppFooter } from "@/shared/components/app/AppFooter";

export async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
      <AppFooter />
      <AppFloatingContact />
    </>
  );
}
