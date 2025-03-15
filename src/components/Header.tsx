
import { Link, useLocation } from "react-router-dom";
import { HeartCrack, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/articles", label: "Articles" },
    { to: "/about", label: "About" }
  ];
  
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          <Link 
            to="/" 
            className="flex items-center gap-1 sm:gap-2 smooth-transition hover:opacity-80 whitespace-nowrap"
          >
            <HeartCrack className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-lg lg:text-xl font-semibold tracking-tight leading-none">
              Breakup Recovery Guide
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`text-sm font-medium smooth-transition hover:text-primary ${
                  (link.to === "/" && location.pathname === "/") || 
                  (link.to !== "/" && location.pathname.includes(link.to)) 
                    ? "text-primary" 
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Theme Switcher */}
          <ThemeSwitcher />
        </nav>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button 
                className="flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary smooth-transition"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-12">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-base font-medium smooth-transition hover:text-primary ${
                      (link.to === "/" && location.pathname === "/") || 
                      (link.to !== "/" && location.pathname.includes(link.to)) 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    }`}
                    onClick={handleNavClick}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
