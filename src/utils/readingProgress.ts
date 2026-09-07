/**
 * Per-browser reading state in localStorage: which articles have been read,
 * which was opened last, and roughly where the reader left off in each.
 * Every accessor is guarded — private windows, disabled storage, and
 * thumbnail/preview contexts can all make localStorage throw or return null.
 */

const READ_KEY = "brg:read-articles";
const LAST_KEY = "brg:last-read";
const SCROLL_KEY = "brg:scroll-pos";
const SCROLL_MAX_ENTRIES = 50;

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

/* ------------------------------------------------------------------ read set */

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

/** Marks an article opened (updates "last read") without marking it finished. */
export function markOpened(slug: string): void {
  safeSet(LAST_KEY, slug);
}

/** Marks an article actually read (the reader reached the end or stayed a while). */
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

/* ------------------------------------------------------------ scroll position */

function readScrollEntries(): [string, number][] {
  const raw = safeGet(SCROLL_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(
          (e): e is [string, number] =>
            Array.isArray(e) && typeof e[0] === "string" && typeof e[1] === "number"
        )
      : [];
  } catch {
    return [];
  }
}

export function getScrollPos(slug: string): number | null {
  const entry = readScrollEntries().find(([s]) => s === slug);
  return entry ? entry[1] : null;
}

export function setScrollPos(slug: string, y: number): void {
  const entries = readScrollEntries().filter(([s]) => s !== slug);
  if (y > 0) entries.push([slug, Math.round(y)]);
  safeSet(SCROLL_KEY, JSON.stringify(entries.slice(-SCROLL_MAX_ENTRIES)));
}

export function clearScrollPos(slug: string): void {
  safeSet(SCROLL_KEY, JSON.stringify(readScrollEntries().filter(([s]) => s !== slug)));
}
