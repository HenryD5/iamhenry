import { NotFoundSection } from "../components/NotFoundSection";
import type { ReactNode } from "react";

interface NotFoundViewProps {
  header: ReactNode;
}

export function NotFoundView({ header }: NotFoundViewProps) {
  return (
    <>
      {header}
      <main id="main-content" data-surface="light">
        <NotFoundSection />
      </main>
    </>
  );
}
