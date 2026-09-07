import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@/utils/articles";
import { HighlightedText } from "@/components/HighlightedText";

interface ArticleCardProps {
  article: Article;
  index: number;
  searchQuery?: string;
}

export function ArticleCard({ article, index, searchQuery = "" }: ArticleCardProps) {
  return (
    <Link to={`/articles/${article.slug}`} className="block">
      <Card
        className="overflow-hidden h-full smooth-transition hover:shadow-md hover:-translate-y-1 border-border/40"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
        </div>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">
            <HighlightedText text={article.title} highlight={searchQuery} />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <p className="text-sm text-muted-foreground">
            <HighlightedText text={article.subtitle} highlight={searchQuery} />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
