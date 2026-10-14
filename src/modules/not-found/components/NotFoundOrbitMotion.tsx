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
import { useCallback, useRef, useState } from "react";
import { NotFoundRoute } from "./NotFoundRoute";
import {
  notFoundLostSatellite,
  notFoundLostSatelliteDrift,
  notFoundOrbitGeometry,
  notFoundRings,
  notFoundSatelliteMotion,
  notFoundSatellites,
} from "../content/not-found.content";
import { usePageVisibility } from "../hooks/use-page-visibility";
import type { NotFoundRing, NotFoundSatellite } from "../types/not-found.types";
import { getDepthOpacity, getDepthScale } from "../utils/orbit-depth";
import { getOrbitPosition } from "../utils/orbit-position";

const FULL_TURN = Math.PI * 2;

function OrbitSatellite({
  elapsed,
  label,
  ring,
  satellite,
}: {
  elapsed: MotionValue<number>;
  label: string;
  ring: NotFoundRing;
  satellite: NotFoundSatellite;
}) {
  const motion = notFoundSatelliteMotion[satellite.id];
  const initialAngle = (satellite.startAngle * Math.PI) / 180;
  const initialPosition = getOrbitPosition({
    ring,
    angle: satellite.startAngle,
    geometry: notFoundOrbitGeometry,
  });
  const getAngle = (elapsedMs: number) =>
    initialAngle +
    motion.direction *
      (elapsedMs / (motion.durationSeconds * 1000)) *
      FULL_TURN;
  const x = useTransform(elapsed, (elapsedMs) => {
    const position = getOrbitPosition({
      ring,
      angle: (getAngle(elapsedMs) * 180) / Math.PI,
      geometry: notFoundOrbitGeometry,
    });
    return `${position.leftPercent - initialPosition.leftPercent}cqw`;
  });
  const y = useTransform(elapsed, (elapsedMs) => {
    const position = getOrbitPosition({
      ring,
      angle: (getAngle(elapsedMs) * 180) / Math.PI,
      geometry: notFoundOrbitGeometry,
    });
    return `${
      (position.topPercent - initialPosition.topPercent) *
      (notFoundOrbitGeometry.height / notFoundOrbitGeometry.width)
    }cqw`;
  });
  const initialScale = getDepthScale(initialAngle);
  const initialOpacity = getDepthOpacity(initialAngle);
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

  return (
    <m.a
      href={satellite.href}
      tabIndex={-1}
      aria-hidden="true"
      className={`border-line bg-surface-raised font-primary text-fg text-body-sm absolute inline-flex -translate-1/2 items-center gap-[.7rem] rounded-full border px-[1.2rem] py-[.7rem] leading-none font-medium whitespace-nowrap no-underline ${satellite.isHiddenOnMobile ? "max-md:hidden" : ""}`}
      style={{
        left: `${initialPosition.leftPercent}%`,
        top: `${initialPosition.topPercent}%`,
        x,
        y,
        scale,
        opacity,
        zIndex,
      }}
      data-motion-item="not-found-satellite"
      data-satellite-id={satellite.id}
    >
      <span
        className="size-[.8rem] rounded-full"
        style={{ backgroundColor: satellite.dotColorToken }}
      />
      {label}
    </m.a>
  );
}

interface NotFoundOrbitMotionProps {
  blogLabel: string;
  homeLabel: string;
  lostLabel: string;
  planetLabel: string;
  searchedLabel: string;
}

export function NotFoundOrbitMotion({
  blogLabel,
  homeLabel,
  lostLabel,
  planetLabel,
  searchedLabel,
}: NotFoundOrbitMotionProps) {
  const orbitRef = useRef<HTMLDivElement>(null);
  const elapsed = useMotionValue(0);
  const speed = useMotionValue(0);
  const isInView = useInView(orbitRef, { amount: 0.05 });
  const isPageVisible = usePageVisibility();
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const { width, height, tiltDegrees } = notFoundOrbitGeometry;
  const centerX = width / 2;
  const centerY = height / 2;
  const planetScale = useTransform(elapsed, (elapsedMs) =>
    1 + 0.015 * (1 - Math.cos((elapsedMs / 4000) * FULL_TURN)),
  );
  const lostX = useTransform(elapsed, (elapsedMs) =>
    `${notFoundLostSatelliteDrift.xAmplitude * Math.sin((elapsedMs / (notFoundLostSatelliteDrift.durationSeconds * 1000)) * FULL_TURN)}cqw`,
  );
  const lostY = useTransform(elapsed, (elapsedMs) =>
    `${notFoundLostSatelliteDrift.yAmplitude * Math.sin((elapsedMs / (notFoundLostSatelliteDrift.durationSeconds * 1000)) * FULL_TURN)}cqw`,
  );
  const lostRotate = useTransform(elapsed, (elapsedMs) =>
    notFoundLostSatelliteDrift.rotationAmplitude *
      Math.sin(
        (elapsedMs /
          (notFoundLostSatelliteDrift.durationSeconds * 1000)) *
          FULL_TURN,
      ),
  );
  const handlePause = useCallback(() => setIsPaused(true), []);
  const handleResume = useCallback(() => setIsPaused(false), []);

  useAnimationFrame((time, delta) => {
    void time;
    const canRun =
      isInView && isPageVisible && !shouldReduceMotion && !isPaused;
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
        <div
          ref={orbitRef}
          className="[container-type:inline-size] relative mx-auto w-full max-w-[64rem] max-md:-mb-8 max-md:max-w-[40rem] md:-mr-[8%] md:w-[calc(100%+8%)] md:max-w-none"
          style={{ aspectRatio: `${width} / ${height}` }}
          aria-hidden="true"
          data-motion-item="not-found-orbit"
          onPointerEnter={handlePause}
          onPointerLeave={handleResume}
          onFocusCapture={handlePause}
          onBlurCapture={handleResume}
        >
          <svg
            className="text-primary-300 absolute inset-0 size-full overflow-visible"
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <g transform={`rotate(${tiltDegrees} ${centerX} ${centerY})`}>
              {notFoundRings.map((ring) => (
                <ellipse
                  key={ring.id}
                  cx={centerX}
                  cy={centerY}
                  rx={ring.radiusX}
                  ry={ring.radiusY}
                  strokeOpacity={ring.opacity}
                  strokeDasharray={ring.isDashed ? "3 7" : undefined}
                />
              ))}
            </g>
          </svg>
          <div className="font-secondary text-fg absolute inset-0 z-[2] flex items-center justify-center gap-[1.5cqw] text-[16cqw] leading-none font-extrabold tracking-[-0.045em] select-none">
            <span>4</span>
            <m.span
              className="grid size-[0.82em] shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_24%,var(--color-white)_0,var(--primary-300)_16%,var(--primary-500)_46%,var(--tertiary-500)_100%)] tracking-normal text-white shadow-[0_2.2rem_5rem_-.8rem_color-mix(in_srgb,var(--primary-500)_55%,transparent),inset_-1rem_-1.3rem_2.8rem_color-mix(in_srgb,var(--tertiary-700)_50%,transparent)] max-md:shadow-[0_0_0_1.4rem_color-mix(in_srgb,var(--primary-500)_8%,transparent),0_0_0_2.9rem_color-mix(in_srgb,var(--primary-500)_5%,transparent),0_2rem_4rem_-1rem_color-mix(in_srgb,var(--primary-500)_55%,transparent)]"
              style={{ scale: planetScale }}
              data-motion-item="not-found-planet"
            >
              <span className="text-[.2em]">{planetLabel}</span>
            </m.span>
            <span>4</span>
          </div>
          {notFoundSatellites.map((satellite) => {
            const ring = notFoundRings.find(
              (item) => item.id === satellite.ring,
            );
            if (!ring) return null;
            return (
              <OrbitSatellite
                elapsed={elapsed}
                key={satellite.id}
                label={satellite.id === "home" ? homeLabel : blogLabel}
                ring={ring}
                satellite={satellite}
              />
            );
          })}
          <m.div
            className="absolute -translate-x-1/2 -translate-y-1/2 max-md:-ml-[3.5rem]"
            style={{
              left: `${notFoundLostSatellite.leftPercent}%`,
              top: `${notFoundLostSatellite.topPercent}%`,
              x: lostX,
              y: lostY,
              rotate: lostRotate,
            }}
          >
            <span
              className="border-tertiary-400 bg-surface-raised font-mono text-tertiary-300 text-body-sm inline-flex max-w-[22rem] max-md:max-w-[13rem] max-md:text-caption items-center gap-[.7rem] rounded-full border px-[1.2rem] py-[.7rem] leading-none whitespace-nowrap"
              style={{ rotate: `${notFoundLostSatellite.rotationDegrees}deg` }}
              data-motion-item="not-found-lost"
            >
              <span className="bg-tertiary-400 size-[.8rem] shrink-0 rounded-full" />
              <span className="truncate">
                <NotFoundRoute
                  variant="label"
                  searchedLabel={searchedLabel}
                  lostLabel={lostLabel}
                />
              </span>
            </span>
          </m.div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
