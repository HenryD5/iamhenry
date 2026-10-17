"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";
import { heroMotionConfig } from "../content/hero.content";

interface HeroFloatingCardProps {
  detail: string;
  eyebrow: string;
  index: number;
  title: string;
}

export function HeroFloatingCard({
  detail,
  eyebrow,
  index,
  title,
}: HeroFloatingCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFirst = index === 0;

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <m.div
          className={`absolute top-[24.5rem] z-[3] w-[19rem] max-md:relative max-md:top-auto max-md:right-auto max-md:left-auto max-md:mx-5 max-md:mt-4 max-md:w-auto ${isFirst ? "left-16 max-md:mt-[2.2rem]" : "right-16"}`}
          data-motion-item="hero-card"
          initial={false}
          animate={
            shouldReduceMotion
              ? { y: 0 }
              : { y: [0, -heroMotionConfig.cardFloatDistance, 0] }
          }
          transition={{
            delay: heroMotionConfig.cardDelaySeconds[index] ?? 0,
            duration: heroMotionConfig.cardDurationSeconds,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <div
            className={`rounded-md px-6 py-[1.4rem] shadow-[var(--card-shadow)] max-md:rotate-0 ${isFirst ? "-rotate-4" : "rotate-[3.5deg]"}`}
            data-surface="light"
          >
            <small className="font-primary text-caption block leading-[1.2] font-semibold text-(--accent-text)">
              {eyebrow}
            </small>
            <strong className="font-secondary mt-2 mb-[.3rem] block text-[1.35rem] leading-[1.2] font-extrabold tracking-[-.02em]">
              {title}
            </strong>
            <span className="text-body-sm text-fg-muted">{detail}</span>
          </div>
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
