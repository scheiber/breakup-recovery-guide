import { useFontScale } from "@/lib/font-scale";
import { useMounted } from "@/hooks/use-mounted";

/** A− / A+ stepper for the article body text size. */
export function FontSizeControl() {
  const mounted = useMounted();
  const { canDecrease, canIncrease, decrease, increase } = useFontScale();

  if (!mounted) return null;

  return (
    <div
      className="flex items-center rounded border text-muted-foreground"
      role="group"
      aria-label="Text size"
    >
      <button
        type="button"
        onClick={decrease}
        disabled={!canDecrease}
        aria-label="Decrease text size"
        className="flex h-8 w-7 items-center justify-center text-[0.7rem] leading-none smooth-transition hover:text-primary disabled:opacity-40 disabled:hover:text-muted-foreground"
      >
        A
      </button>
      <span className="h-4 w-px bg-border" aria-hidden />
      <button
        type="button"
        onClick={increase}
        disabled={!canIncrease}
        aria-label="Increase text size"
        className="flex h-8 w-7 items-center justify-center text-base leading-none smooth-transition hover:text-primary disabled:opacity-40 disabled:hover:text-muted-foreground"
      >
        A
      </button>
    </div>
  );
}
