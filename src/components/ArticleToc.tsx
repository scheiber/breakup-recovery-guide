import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TocEntry } from "@/utils/toc";
import { useIsMobile } from "@/hooks/use-mobile";

interface ArticleTocProps {
  entries: TocEntry[];
}

/** "In this article" — a jump list of the section headings. Hidden on short articles. */
export function ArticleToc({ entries }: ArticleTocProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (entries.length < 3) return null;

  const expanded = isMobile ? open : true;

  return (
    <nav
      aria-label="Sections in this article"
      className="not-prose my-6 rounded-lg border bg-secondary/40 text-sm"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 font-medium md:cursor-default"
      >
        In this article
        <ChevronDown
          className={`h-4 w-4 transition-transform md:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <ol className="space-y-1 px-4 pb-3">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                onClick={() => isMobile && setOpen(false)}
                className="block py-1 text-muted-foreground hover:text-primary"
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
