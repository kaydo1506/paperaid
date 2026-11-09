import {
  isTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@paperaid/ui-tokens";
import { useCallback, useEffect, useState } from "react";

function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = resolveTheme(theme, prefersDark);
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // Read the stored preference after mount, not in the initial state,
  // so the server-rendered and first-client-rendered output match
  // (the no-flash script already applied the right theme to the DOM
  // before this runs; only the toggle's own label catches up here).
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    setThemeState(isTheme(stored) ? stored : "system");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    applyTheme(theme);

    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme, mounted]);

  const setTheme = useCallback((next: Theme) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  return { theme, setTheme, mounted };
}
