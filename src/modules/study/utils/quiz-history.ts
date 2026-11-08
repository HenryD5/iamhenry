const STORAGE_KEY = "study-quiz-seen";

export function readSeenIds(): string[] {
  try {
    const stored: unknown = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? "[]",
    );
    return Array.isArray(stored)
      ? stored.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function writeSeenIds(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Sin almacenamiento, el historial dura solo mientras la página siga abierta.
  }
}
