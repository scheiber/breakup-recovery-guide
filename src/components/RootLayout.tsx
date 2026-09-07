import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { applyTheme } from "@/lib/theme";

export default function RootLayout() {
  // Reconcile the theme once on mount (the inline script in index.html has
  // already applied it before paint; this keeps the OS-change listener wired).
  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <>
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only rounded bg-background px-4 py-2 text-primary shadow focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="main-content" className="flex-1 pt-2">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
