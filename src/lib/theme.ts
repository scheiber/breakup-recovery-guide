import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

function readStored(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" || value === "system"
      ? value
      : "system";
  } catch {
    return "system";
  }
}

let current: Theme = typeof window === "undefined" ? "system" : readStored();

function notify() {
  for (const listener of listeners) listener();
}

/** Applies a theme to <html> (class + color-scheme). Client-only. */
export function applyTheme(theme: Theme = current): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = theme === "dark" || (theme === "system" && prefersDark);
  root.classList.toggle("dark", dark);
  root.classList.toggle("light", !dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

export function setTheme(theme: Theme): void {
  current = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  applyTheme(theme);
  notify();
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

if (typeof window !== "undefined") {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (current === "system") {
        applyTheme("system");
        notify();
      }
    });
}

/** Reads the stored theme preference reactively. Returns "system" during SSR. */
export function useTheme(): { theme: Theme; setTheme: typeof setTheme } {
  const theme = useSyncExternalStore(
    subscribe,
    () => current,
    () => "system" as Theme
  );
  return { theme, setTheme };
}
