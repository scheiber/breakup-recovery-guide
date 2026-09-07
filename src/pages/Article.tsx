import { useEffect, useMemo } from "react";
import { useParams, useLocation, Navigate, Link } from "react-router-dom";
import {
  getArticleBySlug,
  getAdjacentArticles,
  getArticlePosition,
  formatReadingTime,
} from "@/utils/articles";
import { getArticleContent } from "@/utils/articleContent";
import { extractToc } from "@/utils/toc";
import {
  markOpened,
  markRead,
  getScrollPos,
  setScrollPos,
  clearScrollPos,
} from "@/utils/readingProgress";
import { useArrowNav } from "@/hooks/use-arrow-nav";
import { Markdown } from "@/components/Markdown";
import { ArticleToc } from "@/components/ArticleToc";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { FontSizeControl } from "@/components/FontSizeControl";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const DWELL_MS = 45_000;
const NEAR_BOTTOM_PX = 800;
const RESUME_THRESHOLD_PX = 200;

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { hash } = useLocation();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const content = slug ? getArticleContent(slug) : undefined;

  const toc = useMemo(() => (content ? extractToc(content) : []), [content]);
  const { prev, next } = getAdjacentArticles(slug ?? "");

  useArrowNav(
    prev ? `/articles/${prev.slug}` : null,
    next ? `/articles/${next.slug}` : null
  );

  // Track reading: mark opened now, mark read once the reader reaches the end
  // or lingers a while, and remember roughly where they stopped.
  useEffect(() => {
    if (!slug || !article || !content) return;
    markOpened(slug);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      markRead(slug);
      clearScrollPos(slug);
    };
    const dwellTimer = window.setTimeout(() => markRead(slug), DWELL_MS);

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = document.documentElement;
        const bottom = el.scrollHeight - el.clientHeight;
        if (bottom > 0 && window.scrollY >= bottom - NEAR_BOTTOM_PX) finish();
      });
    };
    const save = () => setScrollPos(slug, window.scrollY);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", save);
    window.addEventListener("pagehide", save);
    return () => {
      window.clearTimeout(dwellTimer);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", save);
      window.removeEventListener("pagehide", save);
      if (!finished) save();
    };
  }, [slug, article, content]);

  // Restore position: an #anchor wins, then a saved scroll offset, then the top.
  useEffect(() => {
    if (!content) return;
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) requestAnimationFrame(() => el.scrollIntoView());
      return;
    }
    const saved = slug ? getScrollPos(slug) : null;
    requestAnimationFrame(() => {
      window.scrollTo(0, saved && saved > RESUME_THRESHOLD_PX ? saved : 0);
    });
  }, [slug, content, hash]);

  if (!article || !content) {
    return <Navigate to="/articles" replace />;
  }

  const position = getArticlePosition(article.slug);
  const nextPosition = next ? getArticlePosition(next.slug) : null;

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

          <div className="flex items-center gap-2">
            <FontSizeControl />
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
        </div>

        <div className="space-y-2">
          {position && (
            <p className="text-sm font-medium text-muted-foreground">
              Part {position.number} of {position.total}
              <span className="mx-1.5 opacity-50">·</span>
              {formatReadingTime(article.readingMinutes)}
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
        className="prose prose-lg dark:prose-invert article-body max-w-none animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <Markdown>{content}</Markdown>
      </div>

      <div className="mt-12 border-t pt-8 animate-fade-in print:hidden">
        {prev && (
          <Link
            to={`/articles/${prev.slug}`}
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground smooth-transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous: {prev.title}
          </Link>
        )}

        {next ? (
          <Link
            to={`/articles/${next.slug}`}
            className="group block rounded-lg border p-5 smooth-transition hover:border-border hover:bg-secondary/50"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Next
              {nextPosition && ` · Part ${nextPosition.number} of ${nextPosition.total}`}
            </span>
            <div className="mt-1 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="heading-sm">{next.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {next.subtitle}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Keep reading
                  <ArrowRight className="h-4 w-4 smooth-transition group-hover:translate-x-0.5" />
                </span>
              </div>
              <img
                src={next.imageUrl}
                alt=""
                width={160}
                height={90}
                className="hidden h-16 w-28 shrink-0 rounded object-cover sm:block"
              />
            </div>
          </Link>
        ) : (
          <div className="rounded-lg border p-5 text-center">
            <p className="font-medium">That's the end of the guide.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              You've reached the last article.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-3">
              <Link to="/articles">Back to all articles</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
