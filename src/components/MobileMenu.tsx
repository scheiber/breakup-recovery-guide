
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";

export function MobileMenu() {
  const location = useLocation();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-left">Navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6">
          <Link 
            to="/" 
            className={`px-2 py-1 rounded-md text-sm font-medium ${
              location.pathname === "/" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/articles" 
            className={`px-2 py-1 rounded-md text-sm font-medium ${
              location.pathname.includes("/articles") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Articles
          </Link>
          <Link 
            to="/about" 
            className={`px-2 py-1 rounded-md text-sm font-medium ${
              location.pathname === "/about" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            About
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
