import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const HistorySkeleton = () => {
  return (
    <ScrollArea className="flex-1 min-h-0 h-full overflow-hidden [&>div>div]:h-full">
      <div className="flex flex-col divide-y divide-border/20">
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-2 min-h-9 hover:bg-secondary/50 transition-colors px-2 cursor-pointer"
          >
            <Skeleton className="w-14 h-6.5 px-0.5" />
            <div className="ml-auto text-xs text-muted-foreground flex items-center gap-2">
              <Skeleton className="w-24 h-6.5 px-0.5" />
              <Skeleton className="w-14 h-6.5 px-0.5" />
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default HistorySkeleton;
