
import { useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/utils/articles";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container max-w-7xl space-y-8">
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="heading-lg">All Articles</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Browse our complete collection of recovery articles designed to guide you through every stage of healing.
        </p>
      </div>
      
      <div className="relative max-w-md mx-auto mt-8 animate-fade-in">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search articles..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={article.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <ArticleCard 
                article={article} 
                index={index} 
                searchQuery={searchQuery}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
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
  );
};

export default Articles;
