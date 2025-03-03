
import { Link } from "react-router-dom";
import { HeartCrack } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
        <div className="flex items-center gap-2">
          <HeartCrack className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            © {year} Breakup Recovery Guide
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
        </nav>
      </div>
    </footer>
  );
}
