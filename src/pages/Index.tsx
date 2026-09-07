import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";
import { articles, getArticleBySlug, formatReadingTime } from "@/utils/articles";
import { getLastRead } from "@/utils/readingProgress";
import { useMounted } from "@/hooks/use-mounted";

const firstTopics = articles.slice(0, 7);

const Index = () => {
  const mounted = useMounted();
  const lastReadSlug = mounted ? getLastRead() : null;
  const lastRead = lastReadSlug ? getArticleBySlug(lastReadSlug) : undefined;

  return (
    <div className="flex flex-col">
      <Seo />

      <section className="py-12 md:py-20">
        <div className="container max-w-3xl space-y-5 text-center animate-fade-in">
          <h1 className="heading-xl">Surviving the End of a Relationship</h1>
          <p
            className="mx-auto max-w-2xl text-xl text-muted-foreground md:text-2xl animate-slide-down"
            style={{ animationDelay: "0.15s" }}
          >
            An honest, detailed guide to getting through a breakup or divorce.
            No platitudes, no false cheerfulness, nothing for sale.
          </p>
          <div
            className="flex flex-col justify-center gap-3 pt-6 animate-slide-down sm:flex-row"
            style={{ animationDelay: "0.3s" }}
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/articles/immediate-aftermath">Just been dumped? Start here</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link to="/articles/intro">Read from the beginning</Link>
            </Button>
          </div>
          {lastRead && (
            <p className="pt-2 text-sm">
              <Link
                to={`/articles/${lastRead.slug}`}
                className="text-muted-foreground hover:text-primary"
              >
                Continue reading: {lastRead.title} →
              </Link>
            </p>
          )}
        </div>
      </section>

      <section className="flex-1 py-8">
        <div className="container max-w-2xl">
          <h2 className="heading-md mb-6">The guide, in order</h2>
          <ol className="space-y-3">
            {firstTopics.map((article, index) => (
              <li key={article.slug}>
                <Link
                  to={`/articles/${article.slug}`}
                  className="flex items-start gap-4 rounded-lg border border-border/40 p-4 smooth-transition hover:border-border hover:bg-secondary/50"
                >
                  <span className="w-6 shrink-0 pt-0.5 text-sm tabular-nums text-muted-foreground">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {article.subtitle}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {formatReadingTime(article.readingMinutes)}
                    </p>
                  </div>
                  <img
                    src={article.imageUrl}
                    alt=""
                    width={160}
                    height={90}
                    loading="lazy"
                    className="hidden h-16 w-28 shrink-0 rounded object-cover sm:block"
                  />
                </Link>
              </li>
            ))}
          </ol>
          <Link
            to="/articles"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:text-primary"
          >
            See all {articles.length} topics
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-secondary/50 py-10 md:py-14">
        <div className="container max-w-2xl text-center">
          <h2 className="heading-md mb-3">Free, and it stays that way</h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            No ads, no accounts, no tracking, no email capture, nothing to buy.
            The whole guide is here, and it always will be.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
