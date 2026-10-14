import { NotFoundSection } from "../components/NotFoundSection";
import { AppHeader } from "@/shared/components/app/AppHeader";

export function NotFoundView() {
  return (
    <>
      <AppHeader surface="light" />
      <main id="main-content" data-surface="light">
        <NotFoundSection />
      </main>
    </>
  );
}
