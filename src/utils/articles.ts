export interface Article {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  imageUrl: string;
}

export const articles: Article[] = [
  {
    id: "intro",
    title: "Intro",
    subtitle: "All about this site, who it's for, and how you can use it.",
    slug: "intro",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    id: "pain-is-real",
    title: "The Pain Is Real",
    subtitle: "It's not \"just in your mind\". The pain you feel from being rejected is a traumatic event as strong as any physical pain and activates some of the same areas of the brain.",
    slug: "pain-is-real",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: "time-to-recover",
    title: "Time To Recover",
    subtitle: "How much time will it take until you recover from the breakup?",
    slug: "time-to-recover",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  },
  {
    id: "no-contact",
    title: "No Contact",
    subtitle: "Contact with your ex- is like cutting an open wound over and over again. Any contact at all, any reminders, makes healing harder.",
    slug: "no-contact",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec871214838"
  },
  {
    id: "initiating-no-contact",
    title: "Initiating No Contact",
    subtitle: "How do you actually begin a no contact policy with your ex-? When should you start it?",
    slug: "initiating-no-contact",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    id: "youre-not-alone",
    title: "You're Not Alone",
    subtitle: "After a breakup, it's easy to feel that no one is suffering as you are. But right now at this moment, there are many others who've come to this site for help.",
    slug: "youre-not-alone",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Donec euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}
