
import { Link, useLocation } from "react-router-dom";
import { HeartCrack } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="flex items-center gap-2 smooth-transition hover:opacity-80"
          >
            <HeartCrack className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">
              Breakup Recovery Guide
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            <Link 
              to="/" 
              className={`text-sm font-medium smooth-transition hover:text-primary ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/articles" 
              className={`text-sm font-medium smooth-transition hover:text-primary ${
                location.pathname.includes("/articles") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Articles
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium smooth-transition hover:text-primary ${
                location.pathname === "/about" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About
            </Link>
          </div>
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}
