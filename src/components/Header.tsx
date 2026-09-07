import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HeartCrack, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/articles", label: "Articles" },
  { to: "/about", label: "About" },
];

const linkClass = (isActive: boolean) =>
  `font-medium smooth-transition hover:text-primary ${
    isActive ? "text-primary" : "text-muted-foreground"
  }`;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 smooth-transition hover:opacity-80">
          <HeartCrack className="h-6 w-6 text-primary" />
          <span className="text-sm sm:text-base md:text-xl font-semibold tracking-tight">
            Breakup Recovery Guide
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="flex items-center gap-6">
          <div className="hidden md:flex gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => `text-sm ${linkClass(isActive)}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
        </nav>

        {/* Mobile menu */}
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
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) => `text-base ${linkClass(isActive)}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeSwitcher />
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
