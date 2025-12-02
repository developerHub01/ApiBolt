import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const TabSidebarFallback = () => {
  return (
    <div
      className={cn(
        "h-full flex flex-col gap-0.5 shadow-2xl border-l border-muted-foreground/20",
        "bg-secondary/30",
        "backdrop-blur-lg"
      )}
    >
      <ScrollArea className="w-full h-full min-h-0 flex-1 pb-0 [&>div>div]:w-full [&>div>div]:h-full">
        <div className="w-full flex flex-col py-1">
          {Array.from({ length: 20 }, (_, index) => (
            <div key={index} className="h-9 flex justify-center items-center">
              <Skeleton className="w-8 h-6" />
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="w-full flex flex-col p-2 gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="w-full h-8" />
        ))}
      </div>
    </div>
  );
};

export default TabSidebarFallback;
