export type HeroFacet = "software" | "automation" | "data";

export interface HeroTechnology {
  name: string;
  abbreviation: string;
  facet: HeroFacet;
  isFeatured?: boolean;
  depth: "back" | "middle" | "front";
  ring: "outer" | "middle" | "inner";
  angle: number;
  desktopPosition: { x: number; y: number };
}

export interface HeroCard {
  eyebrowKey: string;
  titleKey: string;
  detailKey: string;
}

export interface OrbitRing {
  radiusX: number;
  radiusY: number;
  isDashed?: boolean;
  opacity: number;
  durationSeconds?: number;
  direction?: 1 | -1;
}

export interface HeroOrbitGeometry {
  centerX: number;
  centerY: number;
  unitsPerRem: number;
}

export interface HeroMotionConfig {
  cardFloatDistance: number;
  cardDurationSeconds: number;
  cardDelaySeconds: readonly [number, number];
  pulseDurationSeconds: number;
}

export interface OrbitDot {
  x: number;
  y: number;
  radius: number;
  colorToken: string;
}
