
import { useParams } from "react-router-dom";
import { articles } from "@/utils/articles";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="page-container text-center">
        <h1 className="heading-lg">Article not found</h1>
        <p className="text-muted-foreground mt-4">
          The article you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-8">
          <Link to="/articles">Back to Articles</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <ReadingProgressBar />
      <div className="page-container max-w-3xl space-y-8">
        <div className="space-y-2">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link to="/articles">
                <ArrowLeft className="h-4 w-4" />
                Back to Articles
              </Link>
            </Button>
          </div>
          <h1 className="heading-lg">{article.title}</h1>
          <p className="text-xl text-muted-foreground">{article.subtitle}</p>
        </div>

        <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow">
          <img
            src={`${article.imageUrl}?auto=format&fit=crop&w=1200&q=90`}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.content}
        </div>
      </div>
    </>
  );
};

export default Article;
