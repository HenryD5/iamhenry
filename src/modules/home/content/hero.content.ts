import type {
  HeroCard,
  HeroMotionConfig,
  HeroOrbitGeometry,
  HeroTechnology,
  OrbitRing,
} from "../types/hero.types";

// Rotación solidaria: mismo sentido y misma velocidad angular en todos los anillos.
export const HERO_ORBIT_TURN_SECONDS = 90;

export const heroVisual: "video" | "orbit" = "video";

export const heroVideo = {
  basePath: "/media/hero-orbita",
  width: 1920,
  height: 1080,
} as const;

export const heroOrbitRings = [
  {
    radiusX: 400,
    radiusY: 140,
    opacity: 0.34,
    durationSeconds: HERO_ORBIT_TURN_SECONDS,
    direction: 1,
  },
  {
    radiusX: 285,
    radiusY: 100,
    opacity: 0.27,
    isDashed: true,
    durationSeconds: HERO_ORBIT_TURN_SECONDS,
    direction: 1,
  },
  {
    radiusX: 175,
    radiusY: 60,
    opacity: 0.2,
    durationSeconds: HERO_ORBIT_TURN_SECONDS,
    direction: 1,
  },
] as const satisfies readonly OrbitRing[];

export const heroOrbitGeometry = {
  centerX: 460,
  centerY: 190,
  unitsPerRem: 10,
} as const satisfies HeroOrbitGeometry;

export const heroMotionConfig = {
  cardFloatDistance: 6,
  cardDurationSeconds: 6,
  cardDelaySeconds: [0, 1.2],
  pulseDurationSeconds: 2.4,
} as const satisfies HeroMotionConfig;
export const heroTechnologies: readonly HeroTechnology[] = [
  {
    name: "Vue",
    abbreviation: "V",
    facet: "software",
    depth: "front",
    ring: "outer",
    angle: 152.984761,
    isFeatured: true,
    desktopPosition: { x: 10.36, y: 25.36 },
  },
  {
    name: "React",
    abbreviation: "R",
    facet: "software",
    depth: "front",
    ring: "outer",
    angle: 27.015239,
    isFeatured: true,
    desktopPosition: { x: 81.64, y: 25.36 },
  },
  {
    name: "TypeScript",
    abbreviation: "TS",
    facet: "software",
    depth: "front",
    ring: "middle",
    angle: 115.988364,
    isFeatured: true,
    desktopPosition: { x: 33.51, y: 27.99 },
  },
  {
    name: "Node.js",
    abbreviation: "No",
    facet: "software",
    depth: "front",
    ring: "middle",
    angle: 64.011636,
    isFeatured: true,
    desktopPosition: { x: 58.49, y: 27.99 },
  },
  {
    name: "Nuxt",
    abbreviation: "Nu",
    facet: "software",
    depth: "middle",
    ring: "outer",
    angle: 200.005482,
    desktopPosition: { x: 8.41, y: 14.21 },
  },
  {
    name: "JavaScript",
    abbreviation: "JS",
    facet: "software",
    depth: "middle",
    ring: "outer",
    angle: 339.994518,
    desktopPosition: { x: 83.59, y: 14.21 },
  },
  {
    name: "Angular",
    abbreviation: "A",
    facet: "software",
    depth: "back",
    ring: "outer",
    angle: 248.004783,
    desktopPosition: { x: 31.02, y: 6.02 },
  },
  {
    name: "Next.js",
    abbreviation: "Nx",
    facet: "software",
    depth: "back",
    ring: "outer",
    angle: 291.995217,
    desktopPosition: { x: 60.98, y: 6.02 },
  },
  {
    name: "NestJS",
    abbreviation: "Ne",
    facet: "software",
    depth: "middle",
    ring: "middle",
    angle: 215.015069,
    desktopPosition: { x: 22.65, y: 13.26 },
  },
  {
    name: "MongoDB",
    abbreviation: "Mo",
    facet: "software",
    depth: "middle",
    ring: "middle",
    angle: 324.984931,
    desktopPosition: { x: 69.35, y: 13.26 },
  },
  {
    name: "Python",
    abbreviation: "Py",
    facet: "automation",
    depth: "back",
    ring: "middle",
    angle: 270,
    desktopPosition: { x: 46, y: 9 },
  },
  {
    name: "n8n",
    abbreviation: "n8",
    facet: "automation",
    depth: "middle",
    ring: "inner",
    angle: 180,
    desktopPosition: { x: 28.5, y: 19 },
  },
  {
    name: "Agentes IA",
    abbreviation: "IA",
    facet: "automation",
    depth: "middle",
    ring: "inner",
    angle: 0,
    desktopPosition: { x: 63.5, y: 19 },
  },
] as const satisfies readonly HeroTechnology[];
export const heroCards: readonly HeroCard[] = [
  {
    eyebrowKey: "hero.cards.current.eyebrow",
    titleKey: "hero.cards.current.title",
    detailKey: "hero.cards.current.detail",
  },
  {
    eyebrowKey: "hero.cards.bluex.eyebrow",
    titleKey: "hero.cards.bluex.title",
    detailKey: "hero.cards.bluex.detail",
  },
] as const satisfies readonly HeroCard[];
