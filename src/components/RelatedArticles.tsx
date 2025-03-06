
import { Link } from "react-router-dom";
import { Article } from "@/utils/articles";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface RelatedArticlesProps {
  currentArticleId: string;
  articles: Article[];
  limit?: number;
}

export function RelatedArticles({ currentArticleId, articles, limit = 3 }: RelatedArticlesProps) {
  // Filter out the current article and get a limited number of related articles
  const relatedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, limit);
  
  if (relatedArticles.length === 0) {
    return null;
  }
  
  return (
    <div className="my-12 space-y-4">
      <h2 className="heading-md">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedArticles.map((article) => (
          <Link to={`/articles/${article.slug}`} key={article.id} className="block group">
            <Card className="h-full smooth-transition hover:shadow-md hover:-translate-y-1 border-border/40">
              <CardContent className="p-4">
                <CardTitle className="text-base mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                  <span>Read more</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
