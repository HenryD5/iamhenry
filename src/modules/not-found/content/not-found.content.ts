import type {
  NotFoundAction,
  NotFoundLostSatellite,
  NotFoundLostSatelliteDrift,
  NotFoundOrbitGeometry,
  NotFoundRing,
  NotFoundSatellite,
  NotFoundSatelliteMotion,
} from "../types/not-found.types";

export const notFoundOrbitGeometry: NotFoundOrbitGeometry = {
  width: 640,
  height: 440,
  tiltDegrees: -14,
};

export const notFoundRings: readonly NotFoundRing[] = [
  { id: "outer", radiusX: 290, radiusY: 118, opacity: 0.28 },
  { id: "inner", radiusX: 200, radiusY: 80, opacity: 0.28, isDashed: true },
];

export const notFoundSatellites: readonly NotFoundSatellite[] = [
  {
    id: "home",
    href: "/",
    labelKey: "home",
    ring: "outer",
    startAngle: 200,
    dotColorToken: "var(--primary-300)",
  },
  {
    id: "blog",
    href: "/blog",
    labelKey: "blog",
    ring: "inner",
    startAngle: 35,
    dotColorToken: "var(--primary-500)",
    isHiddenOnMobile: true,
  },
];

export const notFoundSatelliteMotion: Record<
  NotFoundSatellite["id"],
  NotFoundSatelliteMotion
> = {
  home: { durationSeconds: 40, direction: 1 },
  blog: { durationSeconds: 28, direction: -1 },
};

export const notFoundLostSatellite: NotFoundLostSatellite = {
  leftPercent: 80,
  topPercent: 8,
  rotationDegrees: 9,
};

export const notFoundLostSatelliteDrift: NotFoundLostSatelliteDrift = {
  durationSeconds: 7,
  xAmplitude: 1.5,
  yAmplitude: -1.25,
  rotationAmplitude: 2.5,
};

export const notFoundActions: readonly NotFoundAction[] = [
  { id: "home", href: "/", labelKey: "backHome", isPrimary: true },
  { id: "blog", href: "/blog", labelKey: "readBlog", isPrimary: false },
];
