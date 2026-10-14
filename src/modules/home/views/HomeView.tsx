import { AboutSection } from "../components/AboutSection";
import { ClosingSection } from "../components/ClosingSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { HeroSection } from "../components/HeroSection";
import { PortfolioSection } from "../components/PortfolioSection";
import { PreguntaSection } from "../components/PreguntaSection";
import { StackSection } from "../components/StackSection";
import { AppHeader } from "@/shared/components/app/AppHeader";

export function HomeView() {
  return (
    <>
      <AppHeader />
      <main className="overflow-x-clip" id="main-content">
        <HeroSection />
        <PreguntaSection />
        <StackSection />
        <ExperienceSection />
        <PortfolioSection />
        <AboutSection />
        <ClosingSection />
      </main>
    </>
  );
}
