import type { Theme } from "@paperaid/ui-tokens";
import { useTheme } from "./use-theme";

const labels: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

const next: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(next[theme])}
      aria-label={`Theme: ${labels[theme]}. Click to switch.`}
      className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:border-gray-400 dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-600"
    >
      {mounted ? labels[theme] : "Theme"}
    </button>
  );
}
