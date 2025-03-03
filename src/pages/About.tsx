
import { Card, CardContent } from "@/components/ui/card";
import { Info, Users, Heart, Coffee } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-4xl">
          <h1 className="heading-xl text-center mb-6">About Us</h1>
          <p className="text-xl text-center text-muted-foreground">
            We're here to support you through the challenging journey of healing after a breakup.
          </p>
        </div>
      </section>

      <section className="py-12 container max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3 mt-1">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="heading-sm mb-3">Our Mission</h2>
                  <p className="text-muted-foreground">
                    The Breakup Recovery Guide was created to provide compassionate, 
                    evidence-based support for those navigating the difficult aftermath 
                    of a relationship ending. We believe that with the right guidance, 
                    this painful experience can become an opportunity for profound 
                    personal growth.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3 mt-1">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="heading-sm mb-3">Who We Help</h2>
                  <p className="text-muted-foreground">
                    Our resources are designed for anyone experiencing the end of a 
                    significant relationship, regardless of its duration or nature. 
                    Whether you initiated the breakup or were on the receiving end, 
                    our guidance can help you process your emotions and move forward 
                    in a healthy way.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3 mt-1">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="heading-sm mb-3">Our Approach</h2>
                  <p className="text-muted-foreground">
                    We combine insights from psychology, relationship experts, and real 
                    experiences to create practical, compassionate advice. Our content 
                    focuses on emotional healing, self-discovery, and building resilience 
                    that will serve you in all your future relationships—including the 
                    one with yourself.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3 mt-1">
                  <Coffee className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="heading-sm mb-3">Connect With Us</h2>
                  <p className="text-muted-foreground">
                    We're constantly updating our resources based on the latest research 
                    and feedback from readers like you. If you have questions, suggestions, 
                    or just want to share your story, we'd love to hear from you. Your 
                    experiences help us create better content for others walking this path.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container max-w-3xl text-center">
          <h2 className="heading-md mb-6">Remember, You're Not Alone</h2>
          <p className="text-muted-foreground mb-6">
            Millions of people go through breakups every day. While each experience is unique, 
            the path to healing shares common elements. We're honored to be part of your 
            journey and confident that with time and the right support, you'll emerge stronger 
            and wiser.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
