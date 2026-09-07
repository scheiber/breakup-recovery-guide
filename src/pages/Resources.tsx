import { Seo } from "@/components/Seo";

const lines: {
  region: string;
  items: { label: string; detail: string; href?: string }[];
}[] = [
  {
    region: "United States & Canada",
    items: [
      { label: "988 Suicide & Crisis Lifeline", detail: "Call or text 988" },
      { label: "Crisis Text Line", detail: "Text HOME to 741741" },
    ],
  },
  {
    region: "United Kingdom & Ireland",
    items: [
      { label: "Samaritans", detail: "Call 116 123 (free, 24/7)" },
      { label: "Shout", detail: "Text SHOUT to 85258" },
    ],
  },
  {
    region: "Australia",
    items: [{ label: "Lifeline", detail: "Call 13 11 14 or text 0477 13 11 14" }],
  },
  {
    region: "Anywhere else",
    items: [
      {
        label: "Find a Helpline",
        detail: "a directory of free crisis lines in over 130 countries",
        href: "https://findahelpline.com",
      },
    ],
  },
];

const Resources = () => {
  return (
    <div className="page-container max-w-2xl">
      <Seo
        title="Get Help Now"
        description="Free, confidential crisis support lines you can reach right now, wherever you are."
      />

      <h1 className="heading-lg mb-4">Get help now</h1>

      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
        If you are in immediate danger, call your local emergency number now — 911
        in the US and Canada, 999 in the UK, 112 across the EU, 000 in Australia.
      </div>

      <p className="mt-6 text-muted-foreground">
        The pain after a breakup is real and it can get very dark. If you are
        thinking about hurting yourself, please reach out to one of these
        services. They are free, confidential, and staffed around the clock by
        people who want to help — you do not have to be suicidal to call.
      </p>

      <div className="mt-8 space-y-6">
        {lines.map((group) => (
          <div key={group.region}>
            <h2 className="heading-sm mb-2">{group.region}</h2>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="font-medium">{item.label}</span>
                  )}
                  <span className="text-muted-foreground"> — {item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        This guide is not a substitute for professional help. If you are
        struggling, talking to a doctor or therapist is one of the strongest
        things you can do for yourself.
      </p>
    </div>
  );
};

export default Resources;
