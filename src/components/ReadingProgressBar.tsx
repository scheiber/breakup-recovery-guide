import { useEffect, useState } from "react";

/** A thin bar under the header showing how far through the page the reader is. */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-16 z-40 h-0.5 bg-primary transition-[width] duration-150 ease-out print:hidden"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
