"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";
import { heroMotionConfig } from "../content/hero.content";

export function HeroAvailabilityBadge({ label }: { label: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <span className="bg-surface-raised font-primary text-body-sm inline-flex items-center gap-[.6rem] rounded-full border border-[color-mix(in_srgb,var(--fg)_18%,transparent)] px-[1.1rem] py-[.6rem] leading-none font-medium">
          <m.i
            className="bg-success-500 size-[.6rem] shrink-0 rounded-full"
            aria-hidden="true"
            initial={false}
            animate={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: [0.65, 1, 0.65], scale: [1, 1.35, 1] }
            }
            transition={{
              duration: heroMotionConfig.pulseDurationSeconds,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
          {label}
        </span>
      </MotionConfig>
    </LazyMotion>
  );
}
