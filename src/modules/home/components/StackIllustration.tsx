import {
  stackOrbitRings,
  stackVideo,
  stackVisual,
} from "../content/home.content";
import { AppLoopVideo } from "@/shared/components/app/AppLoopVideo";
import { AppOrbit } from "@/shared/components/app/AppOrbit";

export function StackIllustration({ label }: { label: string }) {
  if (stackVisual === "video") {
    return (
      <AppLoopVideo
        basePath={stackVideo.basePath}
        width={stackVideo.width}
        height={stackVideo.height}
        className="h-auto w-full"
        motionItem="stack-illustration"
      />
    );
  }

  return (
    <AppOrbit
      variant="stack"
      label={label}
      rings={stackOrbitRings}
      motionItem="stack-illustration"
    />
  );
}
