import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Article, formatReadingTime } from "@/utils/articles";
import { HighlightedText } from "@/components/HighlightedText";

interface ArticleCardProps {
  article: Article;
  index: number;
  searchQuery?: string;
  excerpt?: string;
  read?: boolean;
}

export function ArticleCard({
  article,
  index,
  searchQuery = "",
  excerpt,
  read = false,
}: ArticleCardProps) {
  return (
    <Link to={`/articles/${article.slug}`} className="block">
      <Card
        className="h-full overflow-hidden border-border/40 smooth-transition hover:-translate-y-1 hover:shadow-md"
        style={{ animationDelay: `${Math.min(index, 7) * 0.05}s` }}
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {read && (
            <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-xs font-medium text-primary">
              <Check className="h-3 w-3" />
              Read
            </span>
          )}
        </div>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">
            <HighlightedText text={article.title} highlight={searchQuery} />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
          <p className="text-sm text-muted-foreground">
            <HighlightedText
              text={excerpt ?? article.subtitle}
              highlight={searchQuery}
            />
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {formatReadingTime(article.readingMinutes)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
