/**
 * Tracks which articles the reader has opened, stored per-browser in
 * localStorage. Every accessor is guarded — private windows, disabled storage,
 * and thumbnail/preview contexts can all make localStorage throw or return null.
 */

const READ_KEY = "brg:read-articles";
const LAST_KEY = "brg:last-read";

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

export function getReadSlugs(): Set<string> {
  const raw = safeGet(READ_KEY);
  if (!raw) return new Set();
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.filter((s) => typeof s === "string")) : new Set();
  } catch {
    return new Set();
  }
}

export function isRead(slug: string): boolean {
  return getReadSlugs().has(slug);
}

export function getReadCount(): number {
  return getReadSlugs().size;
}

export function markRead(slug: string): void {
  const slugs = getReadSlugs();
  if (!slugs.has(slug)) {
    slugs.add(slug);
    safeSet(READ_KEY, JSON.stringify([...slugs]));
  }
  safeSet(LAST_KEY, slug);
}

export function getLastRead(): string | null {
  return safeGet(LAST_KEY);
}
