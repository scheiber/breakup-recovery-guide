import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HeartCrack, Menu, List, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { GuideContents } from "@/components/GuideContents";
import { GuideContentsList } from "@/components/GuideContentsList";

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
  const [isContentsOpen, setIsContentsOpen] = useState(false);
  const [menuView, setMenuView] = useState<"menu" | "contents">("menu");

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
          <div className="hidden md:flex items-center gap-4">
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
            <button
              type="button"
              onClick={() => setIsContentsOpen(true)}
              className={`flex items-center gap-1.5 text-sm ${linkClass(false)}`}
            >
              <List className="h-4 w-4" />
              Contents
            </button>
          </div>
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
        </nav>

        {/* Mobile menu — a single sheet that swaps between the menu and the
            full contents, so opening "Contents" never means two overlapping
            sheet transitions. */}
        <div className="md:hidden">
          <Sheet
            open={isMenuOpen}
            onOpenChange={(open) => {
              setIsMenuOpen(open);
              if (open) setMenuView("menu");
            }}
          >
            <SheetTrigger asChild>
              <button
                className="flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary smooth-transition"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[20rem] max-w-[85vw] overflow-y-auto p-0"
            >
              <SheetTitle className="sr-only">
                {menuView === "menu" ? "Menu" : "Contents"}
              </SheetTitle>
              {menuView === "menu" ? (
                <div
                  key="menu"
                  className="px-6 py-12 animate-in fade-in-0 duration-150"
                >
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
                    <button
                      type="button"
                      onClick={() => setMenuView("contents")}
                      className={`flex items-center gap-1.5 text-base ${linkClass(false)}`}
                    >
                      <List className="h-4 w-4" />
                      Contents
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </button>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Theme</span>
                        <ThemeSwitcher />
                      </div>
                    </div>
                  </nav>
                </div>
              ) : (
                <div key="contents" className="animate-in fade-in-0 duration-150">
                  <div className="sticky top-0 z-10 border-b bg-background px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setMenuView("menu")}
                      className="flex items-center gap-1 text-sm text-muted-foreground smooth-transition hover:text-primary"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Menu
                    </button>
                  </div>
                  <GuideContentsList onNavigate={() => setIsMenuOpen(false)} />
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <GuideContents open={isContentsOpen} onOpenChange={setIsContentsOpen} />
    </header>
  );
}
