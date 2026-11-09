import { THEME_STORAGE_KEY } from "@paperaid/ui-tokens";

/**
 * Runs synchronously before hydration so the correct theme is applied
 * before first paint. Duplicates resolveTheme's one-line logic inline
 * on purpose: this must execute as raw, unbundled script text, not an
 * imported module.
 */
export function getNoFlashScript(): string {
  return `
    (function () {
      try {
        var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
        var theme = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.dataset.theme = theme === "system" ? (prefersDark ? "dark" : "light") : theme;
      } catch (e) {}
    })();
  `;
}
