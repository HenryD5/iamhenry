import { ContactFloatingTriggerView } from "@/modules/contact/views/ContactTriggerView";
import { SiteLayout } from "@/shared/layouts/SiteLayout";

export default function SiteRouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SiteLayout floatingContactTrigger={<ContactFloatingTriggerView />}>
      {children}
    </SiteLayout>
  );
}
