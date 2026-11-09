export const THEME_STORAGE_KEY = "paperaid-theme";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export function resolveTheme(
  preference: Theme,
  prefersDark: boolean,
): ResolvedTheme {
  if (preference === "system") {
    return prefersDark ? "dark" : "light";
  }
  return preference;
}
