import { useParams, Navigate, Link } from "react-router-dom";
import { getArticleBySlug, getAdjacentArticles } from "@/utils/articles";
import { getArticleContent } from "@/utils/articleContent";
import { Markdown } from "@/components/Markdown";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const content = slug ? getArticleContent(slug) : undefined;

  if (!article || !content) {
    return <Navigate to="/articles" replace />;
  }

  const { prev, next } = getAdjacentArticles(article.slug);

  return (
    <div className="page-container">
      <Seo
        title={article.title}
        description={article.subtitle}
        image={article.imageUrl}
        type="article"
      />

      <div className="mb-8 animate-fade-in">
        <Button asChild variant="outline" size="sm" className="mb-4">
          <Link to="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>

        <div className="space-y-2">
          <h1 className="heading-lg animate-slide-down">{article.title}</h1>
          <p
            className="text-xl text-muted-foreground animate-slide-down"
            style={{ animationDelay: "0.1s" }}
          >
            {article.subtitle}
          </p>
        </div>
      </div>

      <div
        className="mb-8 rounded-lg overflow-hidden animate-fade-in aspect-video"
        style={{ animationDelay: "0.15s" }}
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          width={1200}
          height={675}
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <Markdown>{content}</Markdown>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t animate-fade-in">
        {prev ? (
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto justify-start"
          >
            <Link to={`/articles/${prev.slug}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {prev.title}
            </Link>
          </Button>
        ) : (
          <div />
        )}

        {next && (
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto justify-end"
          >
            <Link to={`/articles/${next.slug}`}>
              {next.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Article;
