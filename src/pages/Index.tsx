import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Book, ThumbsUp, type LucideIcon } from "lucide-react";
import { Seo } from "@/components/Seo";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Heart,
    title: "Emotional Support",
    description:
      "Learn healthy ways to process your feelings and emotions during this difficult time.",
  },
  {
    icon: Award,
    title: "Personal Growth",
    description:
      "Discover opportunities for self-improvement and personal development after a breakup.",
  },
  {
    icon: Book,
    title: "Practical Advice",
    description: "Get actionable tips and strategies to help you navigate daily challenges.",
  },
  {
    icon: ThumbsUp,
    title: "Moving Forward",
    description:
      "Learn how to build a fulfilling life and healthier relationships in the future.",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col">
      <Seo />

      <section className="py-12 md:py-20">
        <div className="container max-w-4xl text-center space-y-4 animate-fade-in">
          <h1 className="heading-xl">Surviving the End of a Relationship</h1>
          <p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-down"
            style={{ animationDelay: "0.2s" }}
          >
            This is a comprehensive resource to help you navigate through the pain and rebuilding
            process after a relationship ends.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-down"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/articles/immediate-aftermath">
              <Button size="lg" className="w-full sm:w-auto animate-pulse">
                Immediate Aftermath
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

      <section className="py-8 md:py-6 flex-1">
        <div className="container max-w-5xl">
          <h2 className="heading-md text-center mb-8">Honest. Real. Detailed. And 100% free.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description }, index) => (
              <Card
                key={title}
                className="animate-scale-in"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-secondary/50">
        <div className="container max-w-4xl text-center">
          <h2 className="heading-md mb-6">Begin Your Healing Journey Today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our carefully curated content provides a step-by-step approach to recovery, helping you
            transform pain into personal growth.
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
