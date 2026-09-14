import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

// After a deploy, a browser tab left open on the old build can still ask for
// that build's static-loader JSON (named by a content hash baked into the
// page). The old file is gone, the host's catch-all redirect serves HTML
// instead, and vite-react-ssg's `.json()` call throws — React Router shows
// this as its generic error screen. A single silent reload almost always
// fixes it by picking up the new build; only show the fallback if that
// reload didn't help (a real error).
const RELOAD_GUARD_KEY = "brg:route-error-reloaded";

export default function RouteErrorBoundary() {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    let alreadyReloaded = false;
    try {
      alreadyReloaded = sessionStorage.getItem(RELOAD_GUARD_KEY) === "1";
    } catch {
      // sessionStorage unavailable; fall through to showing the fallback UI
    }
    if (!alreadyReloaded) {
      try {
        sessionStorage.setItem(RELOAD_GUARD_KEY, "1");
      } catch {
        // ignore
      }
      setReloading(true);
      window.location.reload();
    }
  }, []);

  if (reloading) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="text-center space-y-6 animate-fade-in max-w-md px-4">
        <h1 className="heading-xl">Something went wrong</h1>
        <p className="text-xl text-muted-foreground">
          This page hit an unexpected error. Reloading should fix it.
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            try {
              sessionStorage.removeItem(RELOAD_GUARD_KEY);
            } catch {
              // ignore
            }
            window.location.href = "/";
          }}
        >
          <RefreshCw className="h-4 w-4" />
          Reload
        </Button>
      </div>
    </div>
  );
}
