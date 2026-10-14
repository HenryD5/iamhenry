export const THEME_STORAGE_KEY = "theme";

export const THEME_VALUES = ["day", "night"] as const;

export type Theme = (typeof THEME_VALUES)[number];

export function isTheme(value: string | null): value is Theme {
  return value === "day" || value === "night";
}

export function resolveTheme(
  storedTheme: string | null,
  prefersNight: boolean,
): Theme {
  if (isTheme(storedTheme)) {
    return storedTheme;
  }

  return prefersNight ? "night" : "day";
}

export const THEME_INLINE_SCRIPT = `(function(){try{var t=null;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}var n=t==="night"||(t!=="day"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(n){document.documentElement.setAttribute("data-theme","night")}else{document.documentElement.removeAttribute("data-theme")}}catch(e){}})()`;
