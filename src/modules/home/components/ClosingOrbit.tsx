import { closingOrbitDots, closingOrbitRings } from "../content/home.content";
import { AppOrbit } from "@/shared/components/app/AppOrbit";

export function ClosingOrbit() {
  return (
    <AppOrbit
      variant="closing"
      label=""
      rings={closingOrbitRings}
      dots={closingOrbitDots}
      motionItem="closing-orbit"
    />
  );
}
