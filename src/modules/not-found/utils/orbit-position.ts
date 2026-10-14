import type {
  NotFoundOrbitGeometry,
  NotFoundRing,
} from "../types/not-found.types";

export function getOrbitPosition({
  ring,
  angle,
  geometry,
}: {
  ring: NotFoundRing;
  angle: number;
  geometry: NotFoundOrbitGeometry;
}) {
  const angleRadians = (angle * Math.PI) / 180;
  const tiltRadians = (geometry.tiltDegrees * Math.PI) / 180;
  const x = ring.radiusX * Math.cos(angleRadians);
  const y = ring.radiusY * Math.sin(angleRadians);
  const rotatedX = x * Math.cos(tiltRadians) - y * Math.sin(tiltRadians);
  const rotatedY = x * Math.sin(tiltRadians) + y * Math.cos(tiltRadians);

  return {
    leftPercent: ((geometry.width / 2 + rotatedX) / geometry.width) * 100,
    topPercent: ((geometry.height / 2 + rotatedY) / geometry.height) * 100,
  };
}
