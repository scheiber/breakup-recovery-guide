
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@/utils/articles";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const animationDelay = `${index * 0.05}s`;
  
  return (
    <Link to={`/articles/${article.slug}`} className="block">
      <Card 
        className="overflow-hidden h-full smooth-transition hover:shadow-md hover:-translate-y-1 border-border/40"
        style={{ animationDelay }}
      >
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">{article.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.subtitle}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
