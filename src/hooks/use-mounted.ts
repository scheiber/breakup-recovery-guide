import { useEffect, useState } from "react";

/**
 * False during server rendering and the first client render, true afterwards.
 * Use it to gate UI that depends on `localStorage` (read progress, saved view)
 * so the prerendered HTML and the first client render always match.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
