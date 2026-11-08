import { ContactAppHeaderView } from "@/modules/contact/views/ContactAppHeaderView";
import { ContactFloatingTriggerView } from "@/modules/contact/views/ContactTriggerView";
import { NotFoundView } from "@/modules/not-found/views/NotFoundView";
import { SiteLayout } from "@/shared/layouts/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout floatingContactTrigger={<ContactFloatingTriggerView />}>
      <NotFoundView header={<ContactAppHeaderView surface="light" />} />
    </SiteLayout>
  );
}
