import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.isContentEditable
  );
}

/**
 * Left / Right arrow keys navigate to the previous / next article.
 * Ignored while typing, when a modifier is held, or when a Radix
 * dialog / menu (Contents panel, theme picker) is open.
 */
export function useArrowNav(prevPath: string | null, nextPath: string | null) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!prevPath && !nextPath) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (isTypingTarget(event.target)) return;
      if (document.querySelector('[role="dialog"], [role="menu"]')) return;

      const path = event.key === "ArrowLeft" ? prevPath : nextPath;
      if (path) {
        event.preventDefault();
        navigate(path);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prevPath, nextPath, navigate]);
}
