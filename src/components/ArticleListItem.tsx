import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Article } from "@/utils/articles";
import { HighlightedText } from "@/components/HighlightedText";

interface ArticleListItemProps {
  article: Article;
  position: number;
  searchQuery?: string;
  excerpt?: string;
  read?: boolean;
}

/** Compact table-of-contents row: number, title, one-line subtitle. */
export function ArticleListItem({
  article,
  position,
  searchQuery = "",
  excerpt,
  read = false,
}: ArticleListItemProps) {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="flex gap-4 rounded-lg border border-border/40 p-4 smooth-transition hover:border-border hover:bg-secondary/50"
    >
      <span className="w-6 shrink-0 pt-0.5 text-sm tabular-nums text-muted-foreground">
        {position}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">
            <HighlightedText text={article.title} highlight={searchQuery} />
          </h3>
          {read && (
            <Check className="h-4 w-4 shrink-0 text-primary/70" aria-label="Read" />
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          <HighlightedText
            text={excerpt ?? article.subtitle}
            highlight={searchQuery}
          />
        </p>
      </div>
    </Link>
  );
}
