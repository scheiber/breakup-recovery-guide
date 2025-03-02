
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/utils/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-12 md:py-20 border-b">
        <div className="container max-w-4xl text-center space-y-4 animate-fade-in">
          <h1 className="heading-xl">Breakup Recovery Guide</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-down" style={{ animationDelay: "0.2s" }}>
            A comprehensive resource to help you navigate through the pain and rebuilding process after a relationship ends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-down" style={{ animationDelay: "0.4s" }}>
            <Link to="/articles/intro">
              <Button size="lg" className="w-full sm:w-auto">
                Start Reading
              </Button>
            </Link>
            <Link to="/articles">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Browse All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20 flex-1">
        <div className="container max-w-4xl space-y-8">
          <div className="flex flex-col space-y-4">
            <h2 className="heading-lg text-center">Featured Articles</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Explore our collection of articles designed to guide you through every stage of the breakup recovery process.
            </p>
            
            <div className="relative max-w-md mx-auto mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
                <div key={article.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <ArticleCard article={article} index={index} />
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No articles found matching your search.</p>
                <Button 
                  variant="link" 
                  onClick={() => setSearchQuery("")}
                  className="mt-2"
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
