import { Card, CardContent } from "@/components/ui/card";
import { Info, Users, Heart, Coffee, type LucideIcon } from "lucide-react";
import { Seo } from "@/components/Seo";

const sections: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Info,
    title: "Non-Commercial",
    body:
      "The Breakup Recovery Guide is 100% free and open. No ads, no commercials, no marketing, no linking, no self-promotion, no social-media likes or sharing or posting. The only goal is to help anyone who can benefit from these words.",
  },
  {
    icon: Users,
    title: "The Content",
    body:
      "Throughout theses pages is just honest, real advice for people recovering from a breakup, without the usual platitudes and cliches, all information based on both legitimate research from different fields of scientific research and the experiences of thousands of people.",
  },
  {
    icon: Heart,
    title: "The Creators",
    body:
      'This guide is dedicated to "Recovered" on the LoveShack.org forums, who was the creator of the original guide, as well as J., who was a curator of the original guide. Due to J. suffering a violent accident, the guide was no longer updated and went offline many years ago. This project is intended to restore the guide and continue their legacy.',
  },
  {
    icon: Coffee,
    title: "Contact",
    body:
      "The content in these pages is regularly updated and maintained. If you have questions, suggestions, or just want to share your story, we'd love to hear from you. Your experiences help us create better content for others walking this path.",
  },
];

const About = () => {
  return (
    <div>
      <Seo
        title="About The Guide"
        description="Why this free, non-commercial breakup recovery guide exists and who it is for."
      />

      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-4xl">
          <h1 className="heading-xl text-center mb-6">About The Guide</h1>
          <p className="text-xl text-center text-muted-foreground">
            It's here to support you through the challenging journey of healing after a breakup.
          </p>
        </div>
      </section>

      <section className="py-12 container max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map(({ icon: Icon, title, body }, index) => (
            <Card
              key={title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 mt-1">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="heading-sm mb-3">{title}</h2>
                    <p className="text-muted-foreground">{body}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container max-w-3xl text-center">
          <h2 className="heading-md mb-6">Remember, You're Not Alone</h2>
          <p className="text-muted-foreground mb-6">
            While each breakup experience is unique, the path to healing shares common elements. It
            is an honor to be part of your journey and ensure that with time and the right support,
            you'll emerge stronger and wiser.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
