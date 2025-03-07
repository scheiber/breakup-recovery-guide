
import { Link, useLocation } from "react-router-dom";
import { HeartCrack, Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center justify-center h-9 w-9 rounded-md hover:bg-secondary">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col py-10">
                <div className="flex flex-col gap-6 text-center">
                  <Link 
                    to="/" 
                    className={`text-lg font-medium smooth-transition hover:text-primary ${
                      location.pathname === "/" ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/articles" 
                    className={`text-lg font-medium smooth-transition hover:text-primary ${
                      location.pathname.includes("/articles") ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Articles
                  </Link>
                  <Link 
                    to="/about" 
                    className={`text-lg font-medium smooth-transition hover:text-primary ${
                      location.pathname === "/about" ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    About
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
