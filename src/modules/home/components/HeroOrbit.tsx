"use client";

import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  heroOrbitGeometry,
  heroOrbitRings,
  heroTechnologies,
} from "../content/hero.content";
import type { HeroTechnology, OrbitRing } from "../types/hero.types";
import { AppOrbit } from "@/shared/components/app/AppOrbit";
import { AppTechPill } from "@/shared/components/app/AppTechPill";

const FULL_TURN = Math.PI * 2;
const HERO_RING_INDEX = { outer: 0, middle: 1, inner: 2 } as const;

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function getDepthScale(angle: number) {
  return 0.82 + ((Math.sin(angle) + 1) / 2) * 0.3;
}

function getDepthOpacity(angle: number) {
  return 0.76 + ((Math.sin(angle) + 1) / 2) * 0.24;
}

function useDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => setIsDesktop(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  return isDesktop;
}

function usePageVisibility() {
  const [isPageVisible, setIsPageVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () =>
      setIsPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return isPageVisible;
}

interface HeroOrbitPillProps {
  elapsed: MotionValue<number>;
  onPauseChange: (source: string, isPaused: boolean) => void;
  ring: OrbitRing & { durationSeconds: number; direction: 1 | -1 };
  technology: HeroTechnology;
}

function HeroOrbitPill({
  elapsed,
  onPauseChange,
  ring,
  technology,
}: HeroOrbitPillProps) {
  const initialAngle = toRadians(technology.angle);
  const initialScale = getDepthScale(initialAngle);
  const initialOpacity = getDepthOpacity(initialAngle);
  const getAngle = (elapsedMs: number) =>
    initialAngle +
    ring.direction * (elapsedMs / (ring.durationSeconds * 1000)) * FULL_TURN;
  const x = useTransform(elapsed, (elapsedMs) => {
    const angle = getAngle(elapsedMs);
    const initialX =
      heroOrbitGeometry.centerX + ring.radiusX * Math.cos(initialAngle);
    const currentX = heroOrbitGeometry.centerX + ring.radiusX * Math.cos(angle);
    const offset = (currentX - initialX) / heroOrbitGeometry.unitsPerRem;
    return `calc(-50% + ${offset}rem)`;
  });
  const y = useTransform(elapsed, (elapsedMs) => {
    const angle = getAngle(elapsedMs);
    const initialY =
      heroOrbitGeometry.centerY + ring.radiusY * Math.sin(initialAngle);
    const currentY = heroOrbitGeometry.centerY + ring.radiusY * Math.sin(angle);
    const offset = (currentY - initialY) / heroOrbitGeometry.unitsPerRem;
    return `calc(-50% + ${offset}rem)`;
  });
  const scale = useTransform(
    elapsed,
    (elapsedMs) => getDepthScale(getAngle(elapsedMs)) / initialScale,
  );
  const opacity = useTransform(elapsed, (elapsedMs) =>
    Math.min(1, getDepthOpacity(getAngle(elapsedMs)) / initialOpacity),
  );
  const zIndex = useTransform(elapsed, (elapsedMs) =>
    Math.sin(getAngle(elapsedMs)) > 0 ? 3 : 1,
  );
  const pointerSource = `${technology.name}:pointer`;
  const focusSource = `${technology.name}:focus`;

  return (
    <m.span
      className="absolute inline-flex rounded-full max-md:static max-md:!transform-none max-md:!opacity-100"
      style={{
        left: `${technology.desktopPosition.x}rem`,
        top: `${technology.desktopPosition.y}rem`,
        x,
        y,
        scale,
        opacity,
        zIndex,
      }}
      tabIndex={0}
      onPointerEnter={() => onPauseChange(pointerSource, true)}
      onPointerLeave={() => onPauseChange(pointerSource, false)}
      onFocus={() => onPauseChange(focusSource, true)}
      onBlur={() => onPauseChange(focusSource, false)}
    >
      <AppTechPill
        {...technology}
        className="!relative !translate-0"
        style={{}}
      />
    </m.span>
  );
}

export function HeroOrbit({ label }: { label: string }) {
  const orbitRef = useRef<HTMLDivElement>(null);
  const pauseSources = useRef(new Set<string>());
  const elapsed = useMotionValue(0);
  const speed = useMotionValue(0);
  const isInView = useInView(orbitRef, { amount: 0.05 });
  const isDesktop = useDesktopViewport();
  const isPageVisible = usePageVisibility();
  const shouldReduceMotion = useReducedMotion();
  const handlePauseChange = useCallback((source: string, isPaused: boolean) => {
    if (isPaused) pauseSources.current.add(source);
    else pauseSources.current.delete(source);
  }, []);

  useAnimationFrame((time, delta) => {
    void time;
    const canRun =
      isDesktop &&
      isInView &&
      isPageVisible &&
      !shouldReduceMotion &&
      pauseSources.current.size === 0;
    const safeDelta = Math.min(delta, 64);
    const blend = 1 - Math.exp(-safeDelta / 180);
    const nextSpeed = speed.get() + ((canRun ? 1 : 0) - speed.get()) * blend;
    speed.set(nextSpeed);
    if (nextSpeed > 0.001) {
      elapsed.set(elapsed.get() + safeDelta * nextSpeed);
    }
  });

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <AppOrbit
          variant="hero"
          label={label}
          rings={heroOrbitRings}
          motionItem="hero-orbit"
          rootRef={orbitRef}
        >
          {heroTechnologies.map((technology) => {
            const ring = heroOrbitRings[HERO_RING_INDEX[technology.ring]];
            return (
              <HeroOrbitPill
                elapsed={elapsed}
                key={technology.name}
                onPauseChange={handlePauseChange}
                ring={ring}
                technology={technology}
              />
            );
          })}
        </AppOrbit>
      </MotionConfig>
    </LazyMotion>
  );
}
