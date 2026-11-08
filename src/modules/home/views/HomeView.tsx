import { AboutSection } from "../components/AboutSection";
import { ClosingSection } from "../components/ClosingSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { HeroSection } from "../components/HeroSection";
import { PortfolioSection } from "../components/PortfolioSection";
import { PreguntaSection } from "../components/PreguntaSection";
import { StackSection } from "../components/StackSection";
import type { ReactNode } from "react";
import type { ContactTriggerRenderer } from "@/shared/types/contact-trigger.types";

interface HomeViewProps {
  header: ReactNode;
  renderContactTrigger: ContactTriggerRenderer;
}

export function HomeView({ header, renderContactTrigger }: HomeViewProps) {
  return (
    <>
      {header}
      <main className="overflow-x-clip" id="main-content">
        <HeroSection />
        <PreguntaSection />
        <StackSection />
        <ExperienceSection />
        <PortfolioSection renderContactTrigger={renderContactTrigger} />
        <AboutSection />
        <ClosingSection renderContactTrigger={renderContactTrigger} />
      </main>
    </>
  );
}
