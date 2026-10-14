export function getDepthScale(angle: number) {
  return 0.82 + ((Math.sin(angle) + 1) / 2) * 0.3;
}

export function getDepthOpacity(angle: number) {
  return 0.7 + ((Math.sin(angle) + 1) / 2) * 0.3;
}
