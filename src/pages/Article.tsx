import { useEffect, useMemo } from "react";
import { useParams, useLocation, Navigate, Link } from "react-router-dom";
import {
  getArticleBySlug,
  getAdjacentArticles,
  getArticlePosition,
} from "@/utils/articles";
import { getArticleContent } from "@/utils/articleContent";
import { extractToc } from "@/utils/toc";
import { markRead } from "@/utils/readingProgress";
import { Markdown } from "@/components/Markdown";
import { ArticleToc } from "@/components/ArticleToc";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { hash } = useLocation();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const content = slug ? getArticleContent(slug) : undefined;

  const toc = useMemo(() => (content ? extractToc(content) : []), [content]);

  useEffect(() => {
    if (slug && article && content) markRead(slug);
  }, [slug, article, content]);

  useEffect(() => {
    if (!content) return;
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) requestAnimationFrame(() => el.scrollIntoView());
    }
  }, [hash, content, slug]);

  if (!article || !content) {
    return <Navigate to="/articles" replace />;
  }

  const { prev, next } = getAdjacentArticles(article.slug);
  const position = getArticlePosition(article.slug);

  return (
    <div className="page-container max-w-3xl">
      <ReadingProgressBar />
      <Seo
        title={article.title}
        description={article.subtitle}
        image={article.imageUrl}
        type="article"
      />

      <div className="mb-8 animate-fade-in">
        <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
          <Button asChild variant="outline" size="sm">
            <Link to="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>

          {(prev || next) && (
            <div className="flex shrink-0 items-center gap-1 text-sm">
              {prev && (
                <Link
                  to={`/articles/${prev.slug}`}
                  title={prev.title}
                  aria-label={`Previous: ${prev.title}`}
                  className="flex items-center gap-1 rounded p-2 text-muted-foreground smooth-transition hover:text-primary"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Prev</span>
                </Link>
              )}
              {next && (
                <Link
                  to={`/articles/${next.slug}`}
                  title={next.title}
                  aria-label={`Next: ${next.title}`}
                  className="flex items-center gap-1 rounded p-2 text-muted-foreground smooth-transition hover:text-primary"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          {position && (
            <p className="text-sm font-medium text-muted-foreground">
              Part {position.number} of {position.total}
            </p>
          )}
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
        className="mb-8 aspect-video overflow-hidden rounded-lg animate-fade-in"
        style={{ animationDelay: "0.15s" }}
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          width={1200}
          height={675}
          className="h-full w-full object-cover"
        />
      </div>

      <ArticleToc entries={toc} />

      <div
        className="prose prose-lg dark:prose-invert max-w-none animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <Markdown>{content}</Markdown>
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 animate-fade-in sm:flex-row print:hidden">
        {prev ? (
          <Button asChild variant="outline" className="w-full justify-start sm:w-auto">
            <Link to={`/articles/${prev.slug}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {prev.title}
            </Link>
          </Button>
        ) : (
          <div />
        )}

        {next && (
          <Button asChild variant="outline" className="w-full justify-end sm:w-auto">
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
