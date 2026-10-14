import { NotFoundSection } from "../components/NotFoundSection";
import { AppHeader } from "@/shared/components/app/AppHeader";

export function NotFoundView() {
  return (
    <>
      <AppHeader />
      <main id="main-content" className="pt-16 max-md:pt-14">
        <NotFoundSection />
      </main>
    </>
  );
}
