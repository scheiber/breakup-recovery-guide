
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
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img 
            src={`${article.imageUrl}?auto=format&fit=crop&w=500&q=80`}
            alt={article.title}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
        </div>
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
