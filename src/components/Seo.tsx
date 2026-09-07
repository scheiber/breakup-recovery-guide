import { Helmet } from "react-helmet-async";
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

  return (
    <Helmet>
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
    </Helmet>
  );
}
