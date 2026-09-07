import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, List, Search } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleListItem } from "@/components/ArticleListItem";
import { Seo } from "@/components/Seo";
import {
  articles,
  getArticleBySlug,
  getArticlePosition,
  searchArticles,
} from "@/utils/articles";
import { getReadSlugs, getLastRead } from "@/utils/readingProgress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type View = "grid" | "list";
const VIEW_KEY = "brg:articles-view";

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<View>("grid");
  const [readSlugs, setReadSlugs] = useState<Set<string>>(() => new Set());
  const [lastReadSlug, setLastReadSlug] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Load per-browser state after mount so SSR and the first client render match.
  useEffect(() => {
    try {
      if (localStorage.getItem(VIEW_KEY) === "list") setView("list");
    } catch {
      /* ignore */
    }
    setReadSlugs(getReadSlugs());
    setLastReadSlug(getLastRead());
  }, []);

  // "/" focuses the search box.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const el = event.target;
      if (
        el instanceof HTMLElement &&
        (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const changeView = (next: View) => {
    setView(next);
    try {
      localStorage.setItem(VIEW_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const lastRead = lastReadSlug ? getArticleBySlug(lastReadSlug) : undefined;
  const results = useMemo(() => searchArticles(searchQuery), [searchQuery]);

  return (
    <div className="page-container max-w-6xl space-y-8">
      <Seo
        title="All Articles"
        description="Browse the complete collection of breakup recovery articles, covering every stage of healing."
      />

      <div className="animate-fade-in space-y-4 text-center">
        <h1 className="heading-lg">All Articles</h1>
        <p className="mx-auto max-w-xl text-muted-foreground">
          The full guide, in reading order. Start at the top, or jump to whatever
          you need right now.
        </p>
        {readSlugs.size > 0 && (
          <p className="text-sm text-muted-foreground">
            You've read {readSlugs.size} of {articles.length}.
          </p>
        )}
        {lastRead && (
          <Button asChild variant="outline" size="sm">
            <Link to={`/articles/${lastRead.slug}`}>
              Continue reading: {lastRead.title}
            </Link>
          </Button>
        )}
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={searchRef}
            type="text"
            placeholder='Search titles and article text  ( / )'
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex shrink-0 rounded-md border p-0.5">
          {(
            [
              ["grid", LayoutGrid, "Grid view"],
              ["list", List, "List view"],
            ] as const
          ).map(([value, Icon, label]) => (
            <button
              key={value}
              type="button"
              aria-label={label}
              aria-pressed={view === value}
              onClick={() => changeView(value)}
              className={cn(
                "rounded p-1.5 smooth-transition",
                view === value
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No articles found matching your search.
          </p>
          <Button
            variant="link"
            onClick={() => setSearchQuery("")}
            className="mt-2"
          >
            Clear search
          </Button>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ article, excerpt }, index) => (
            <div
              key={article.slug}
              className="animate-scale-in"
              style={{ animationDelay: `${Math.min(index, 7) * 0.05}s` }}
            >
              <ArticleCard
                article={article}
                index={index}
                searchQuery={searchQuery}
                excerpt={excerpt}
                read={readSlugs.has(article.slug)}
              />
            </div>
          ))}
        </div>
      ) : (
        <ol className="space-y-2">
          {results.map(({ article, excerpt }) => (
            <li key={article.slug}>
              <ArticleListItem
                article={article}
                position={getArticlePosition(article.slug)?.number ?? 0}
                searchQuery={searchQuery}
                excerpt={excerpt}
                read={readSlugs.has(article.slug)}
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Articles;
