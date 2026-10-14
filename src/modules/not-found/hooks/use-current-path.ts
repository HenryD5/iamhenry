import { useSyncExternalStore } from "react";

function subscribe() {
  return () => undefined;
}

function getSnapshot() {
  return window.location.pathname;
}

function getServerSnapshot() {
  return null;
}

export function useCurrentPath(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
