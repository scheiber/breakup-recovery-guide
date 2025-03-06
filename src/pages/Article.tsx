
import { useParams } from "react-router-dom";
import { articles } from "@/utils/articles";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { ReadingProgress } from "@/components/ReadingProgress";
import { RelatedArticles } from "@/components/RelatedArticles";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((article) => article.slug === slug);

  useEffect(() => {
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="page-container text-center py-20">
        <h1 className="heading-lg mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, the article you're looking for doesn't exist.
        </p>
        <Button asChild>
          <a href="/articles">Browse All Articles</a>
        </Button>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />
      <article className="page-container max-w-3xl">
        <header className="mb-8 space-y-4">
          <h1 className="heading-lg">{article.title}</h1>
          <p className="text-xl text-muted-foreground">{article.subtitle}</p>
        </header>

        <div className="mb-8 aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
          <img
            src={`${article.imageUrl}?auto=format&fit=crop&w=1200&q=80`}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="prose dark:prose-invert prose-lg max-w-none">
          {article.content}
        </div>

        <RelatedArticles currentArticleId={article.id} articles={articles} />
      </article>
    </>
  );
};

export default Article;
