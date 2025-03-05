import { Card, CardContent } from "@/components/ui/card";
import { Info, Users, Heart, Coffee } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-4xl">
          <h1 className="heading-xl text-center mb-6">About The Guide</h1>
          <p className="text-xl text-center text-muted-foreground">
            It's here to support you through the challenging journey of healing
            after a breakup.
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
                  <h2 className="heading-sm mb-3">Non-Commercial</h2>
                  <p className="text-muted-foreground">
                    The Breakup Recovery Guide is 100% free and open. No ads, no
                    commercials, no marketing, no linking, no self-promotion, no
                    social-media likes or sharing or posting. The only goal is
                    to help anyone who can benefit from these words.
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
                  <h2 className="heading-sm mb-3">The Content</h2>
                  <p className="text-muted-foreground">
                    Throughout theses pages is just honest, real advice for
                    people recovering from a breakup, without the usual
                    platitudes and cliches, all information based on both
                    legitimate research from different fields of scientific
                    research and the experiences of thousands of people.
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
                  <h2 className="heading-sm mb-3">The Creators</h2>
                  <p className="text-muted-foreground">
                    This guide is dedicated to "Recovered" on the LoveShack.org
                    forums, who was the creator of the original guide, as well
                    as J., who was a curator of the original guide. Due to J.
                    suffering a violent accident, the guide was no longer
                    updated and went offline many years ago. This project is
                    intended to restore the guide and continue their legacy.
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
                  <h2 className="heading-sm mb-3">Contact</h2>
                  <p className="text-muted-foreground">
                    The content in these pages is regularly updated and
                    maintained. If you have questions, suggestions, or just want
                    to share your story, we'd love to hear from you. Your
                    experiences help us create better content for others walking
                    this path.
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
            While each breakup experience is unique, the path to healing shares
            common elements. It is an honor to be part of your journey and
            ensure that with time and the right support, you'll emerge stronger
            and wiser.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
