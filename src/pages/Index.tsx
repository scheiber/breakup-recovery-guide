
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-12 md:py-20 flex-1">
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
    </div>
  );
};

export default Index;
