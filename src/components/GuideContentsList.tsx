import { Link, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { articles } from "@/utils/articles";
import { getReadSlugs } from "@/utils/readingProgress";
import { cn } from "@/lib/utils";

interface GuideContentsListProps {
  /** Called when a link is followed (e.g. to close the containing panel). */
  onNavigate?: () => void;
}

/** The ordered list of every article, with read state and the current one marked. */
export function GuideContentsList({ onNavigate }: GuideContentsListProps) {
  const { pathname } = useLocation();
  const read = getReadSlugs();

  return (
    <ol className="py-2">
      {articles.map((article, index) => {
        const to = `/articles/${article.slug}`;
        const active = pathname === to;
        return (
          <li key={article.slug}>
            <Link
              to={to}
              onClick={onNavigate}
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
  );
}
