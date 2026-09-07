import { useSyncExternalStore } from "react";

/** Discrete article-body text sizes. Index 1 is the default. */
export const FONT_SCALES = [0.9, 1, 1.15, 1.3] as const;
const DEFAULT_INDEX = 1;
const STORAGE_KEY = "brg:font-scale";

const listeners = new Set<() => void>();

function clampIndex(index: number): number {
  return Math.min(FONT_SCALES.length - 1, Math.max(0, Math.round(index)));
}

function readStored(): number {
  try {
    const value = parseFloat(localStorage.getItem(STORAGE_KEY) ?? "");
    const found = FONT_SCALES.findIndex((s) => Math.abs(s - value) < 0.001);
    return found === -1 ? DEFAULT_INDEX : found;
  } catch {
    return DEFAULT_INDEX;
  }
}

let currentIndex = typeof window === "undefined" ? DEFAULT_INDEX : readStored();

/** Applies the current scale to `<html>` as `--article-scale`. Client-only. */
export function applyFontScale(index = currentIndex): void {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty(
    "--article-scale",
    String(FONT_SCALES[clampIndex(index)])
  );
}

export function setFontScaleIndex(index: number): void {
  currentIndex = clampIndex(index);
  try {
    localStorage.setItem(STORAGE_KEY, String(FONT_SCALES[currentIndex]));
  } catch {
    /* ignore */
  }
  applyFontScale(currentIndex);
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function useFontScale() {
  const index = useSyncExternalStore(
    subscribe,
    () => currentIndex,
    () => DEFAULT_INDEX
  );
  return {
    index,
    canDecrease: index > 0,
    canIncrease: index < FONT_SCALES.length - 1,
    decrease: () => setFontScaleIndex(index - 1),
    increase: () => setFontScaleIndex(index + 1),
  };
}
