import { NotFoundView } from "@/modules/not-found/views/NotFoundView";
import { SiteLayout } from "@/shared/layouts/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <NotFoundView />
    </SiteLayout>
  );
}
