import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { GuideContentsList } from "@/components/GuideContentsList";

interface GuideContentsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Desktop slide-in panel listing every article in reading order. */
export function GuideContents({ open, onOpenChange }: GuideContentsProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[20rem] max-w-[85vw] overflow-y-auto p-0">
        <SheetHeader className="border-b px-5 py-4 text-left">
          <SheetTitle>Contents</SheetTitle>
        </SheetHeader>
        <GuideContentsList onNavigate={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
