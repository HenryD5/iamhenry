"use client";

import { useLayoutEffect, useState } from "react";
import {
  isTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/shared/utils/theme";

function applyTheme(theme: Theme) {
  if (theme === "night") {
    document.documentElement.setAttribute("data-theme", "night");
    return;
  }

  document.documentElement.removeAttribute("data-theme");
}

function readStoredTheme() {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("day");
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    const syncTheme = () => {
      const nextTheme = resolveTheme(readStoredTheme());
      applyTheme(nextTheme);
      setThemeState(nextTheme);
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) {
        syncTheme();
      }
    };
    const observer = new MutationObserver(() => {
      setThemeState(
        document.documentElement.dataset.theme === "night" ? "night" : "day",
      );
    });

    syncTheme();
    queueMicrotask(() => setIsMounted(true));
    window.addEventListener("storage", handleStorage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("storage", handleStorage);
      observer.disconnect();
    };
  }, []);

  const setTheme = (nextTheme: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The DOM remains the source of truth when storage is unavailable.
    }
    applyTheme(nextTheme);
    setThemeState(nextTheme);
  };

  return {
    isMounted,
    isNight: theme === "night",
    setTheme,
    theme,
  };
}
