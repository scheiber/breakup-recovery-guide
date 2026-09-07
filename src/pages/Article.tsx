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
        <Link to="/articles">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>

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
        className="mb-8 rounded-lg overflow-hidden animate-fade-in"
        style={{ animationDelay: "0.15s" }}
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-auto object-cover"
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
          <Link to={`/articles/${prev.slug}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full justify-start">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {prev.title}
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {next && (
          <Link to={`/articles/${next.slug}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full justify-end">
              {next.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Article;
