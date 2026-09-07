import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top on route changes. Leaves in-page #anchor jumps alone, and
 * leaves individual article pages alone — Article.tsx restores the reader's
 * last position there.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    if (/^\/articles\/[^/]+/.test(pathname)) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
