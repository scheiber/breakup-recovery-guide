import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Book, ThumbsUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl text-center space-y-4 animate-fade-in">
          <h1 className="heading-xl">Surviving the End of a Relationship</h1>
          <p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-down"
            style={{ animationDelay: "0.2s" }}
          >
            This is a comprehensive resource to help you navigate through the
            pain and rebuilding process after a relationship ends.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-down"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/articles/intro">
              <Button size="lg" className="w-full sm:w-auto animate-pulse">
                Start Your Recovery
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

      <section className="py-8 md:py-16 flex-1">
        <div className="container max-w-5xl">
          <h2 className="heading-md text-center mb-8">How We Help You Heal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Emotional Support</h3>
                <p className="text-muted-foreground text-sm">
                  Learn healthy ways to process your feelings and emotions
                  during this difficult time.
                </p>
              </CardContent>
            </Card>

            <Card
              className="animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Personal Growth</h3>
                <p className="text-muted-foreground text-sm">
                  Discover opportunities for self-improvement and personal
                  development after a breakup.
                </p>
              </CardContent>
            </Card>

            <Card
              className="animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Practical Advice</h3>
                <p className="text-muted-foreground text-sm">
                  Get actionable tips and strategies to help you navigate daily
                  challenges.
                </p>
              </CardContent>
            </Card>

            <Card
              className="animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <ThumbsUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Moving Forward</h3>
                <p className="text-muted-foreground text-sm">
                  Learn how to build a fulfilling life and healthier
                  relationships in the future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-secondary/50">
        <div className="container max-w-4xl text-center">
          <h2 className="heading-md mb-6">Begin Your Healing Journey Today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our carefully curated content provides a step-by-step approach to
            recovery, helping you transform pain into personal growth.
          </p>
          <Link to="/articles/intro">
            <Button size="lg" className="animate-pulse">
              Start Your Recovery
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
