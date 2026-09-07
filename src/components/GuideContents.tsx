import { Link, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { articles } from "@/utils/articles";
import { getReadSlugs } from "@/utils/readingProgress";
import { cn } from "@/lib/utils";

interface GuideContentsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Slide-in panel listing every article in reading order, from anywhere in the site. */
export function GuideContents({ open, onOpenChange }: GuideContentsProps) {
  const { pathname } = useLocation();
  const read = open ? getReadSlugs() : new Set<string>();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[20rem] max-w-[85vw] overflow-y-auto p-0">
        <SheetHeader className="border-b px-5 py-4 text-left">
          <SheetTitle>Contents</SheetTitle>
        </SheetHeader>
        <ol className="py-2">
          {articles.map((article, index) => {
            const to = `/articles/${article.slug}`;
            const active = pathname === to;
            return (
              <li key={article.slug}>
                <Link
                  to={to}
                  onClick={() => onOpenChange(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-start gap-3 px-5 py-2.5 text-sm smooth-transition hover:bg-secondary",
                    active && "bg-secondary font-medium text-primary"
                  )}
                >
                  <span className="w-5 shrink-0 tabular-nums text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="flex-1">
                    {article.title}
                    <span className="block text-xs font-normal text-muted-foreground">
                      {article.readingMinutes} min
                    </span>
                  </span>
                  {read.has(article.slug) && (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" aria-label="Read" />
                  )}
                </Link>
              </li>
            );
          })}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
