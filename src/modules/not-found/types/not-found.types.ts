export type NotFoundRingId = "outer" | "inner";

export interface NotFoundRing {
  id: NotFoundRingId;
  radiusX: number;
  radiusY: number;
  opacity: number;
  isDashed?: boolean;
}

export interface NotFoundOrbitGeometry {
  width: number;
  height: number;
  tiltDegrees: number;
}

export interface NotFoundSatellite {
  id: string;
  href: string;
  labelKey: "home" | "blog";
  ring: NotFoundRingId;
  startAngle: number;
  dotColorToken: string;
  isHiddenOnMobile?: boolean;
}

export interface NotFoundLostSatellite {
  leftPercent: number;
  topPercent: number;
  rotationDegrees: number;
}

export interface NotFoundAction {
  id: string;
  href: string;
  labelKey: "backHome" | "readBlog";
  isPrimary: boolean;
}
