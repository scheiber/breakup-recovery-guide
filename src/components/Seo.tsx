import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import { siteName, siteUrl, siteDescription } from "@/config";

interface SeoProps {
  /** Page title, shown as `<title> — Breakup Recovery Guide`. Omit on the home page. */
  title?: string;
  description?: string;
  /** Absolute or root-relative URL of a preview image. */
  image?: string;
  type?: "website" | "article";
}

export function Seo({
  title,
  description = siteDescription,
  image = "/og-image.png",
  type = "website",
}: SeoProps) {
  const { pathname } = useLocation();
  const canonical = `${siteUrl}${pathname}`;
  const fullTitle = title ? `${title} — ${siteName}` : siteName;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const jsonLd =
    type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title ?? siteName,
          description,
          image: imageUrl,
          url: canonical,
          inLanguage: "en",
          isAccessibleForFree: true,
          author: { "@type": "Organization", name: siteName },
          publisher: { "@type": "Organization", name: siteName },
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          description,
          url: siteUrl,
        };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Head>
  );
}
