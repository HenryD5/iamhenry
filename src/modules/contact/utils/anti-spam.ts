const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 2 * 60 * 60 * 1_000;

export function isHoneypotFilled(value: string): boolean {
  return value.trim().length > 0;
}

export function isSubmitTimingValid(startedAt: number, now: number): boolean {
  if (!Number.isFinite(startedAt) || !Number.isFinite(now)) {
    return false;
  }

  const elapsed = now - startedAt;

  return elapsed >= MIN_FILL_MS && elapsed <= MAX_FILL_MS;
}
