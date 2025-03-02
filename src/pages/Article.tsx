
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getArticleBySlug, articles } from "@/utils/articles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const article = slug ? getArticleBySlug(slug) : undefined;
  
  useEffect(() => {
    if (!article) {
      navigate("/articles");
    }
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [article, navigate]);
  
  if (!article) {
    return null;
  }
  
  // Find previous and next articles for navigation
  const currentIndex = articles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  
  return (
    <div className="page-container">
      <div className="mb-8 animate-fade-in">
        <Link to="/articles">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
        
        <div className="space-y-2">
          <h1 className="heading-lg animate-slide-down">{article.title}</h1>
          <p className="text-xl text-muted-foreground animate-slide-down" style={{ animationDelay: "0.1s" }}>
            {article.subtitle}
          </p>
        </div>
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <p>{article.content}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
        <h2>Understanding the Process</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
        <h2>Steps to Take</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl.</li>
          <li>Eget aliquam nisl nisl eget nisl.</li>
          <li>Donec euismod, nisl eget ultricies ultrices.</li>
        </ul>
        <h2>Moving Forward</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t animate-fade-in">
        {prevArticle ? (
          <Link to={`/articles/${prevArticle.slug}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full justify-start">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {prevArticle.title}
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
        
        {nextArticle && (
          <Link to={`/articles/${nextArticle.slug}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full justify-end">
              {nextArticle.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Article;
