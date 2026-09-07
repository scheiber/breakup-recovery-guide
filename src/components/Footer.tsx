import { Link } from "react-router-dom";
import { HeartCrack, LifeBuoy } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container border-b py-3">
        <Link
          to="/resources"
          className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <LifeBuoy className="h-4 w-4" />
          In crisis? Free, confidential help is available right now →
        </Link>
      </div>

      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <HeartCrack className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Honest. Real. Detailed. And 100% free.
          </p>
        </div>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary smooth-transition">
            Home
          </Link>
          <Link to="/articles" className="hover:text-primary smooth-transition">
            Articles
          </Link>
          <Link to="/about" className="hover:text-primary smooth-transition">
            About
          </Link>
          <Link to="/resources" className="hover:text-primary smooth-transition">
            Get help
          </Link>
        </nav>
      </div>
    </footer>
  );
}
