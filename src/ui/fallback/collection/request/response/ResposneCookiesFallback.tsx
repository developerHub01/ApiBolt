import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const ResposneCookiesFallback = () => {
  return (
    <ScrollArea className="flex-1 min-h-0 h-full [&>div>div]:h-full overflow-hidden">
      <div className="w-full h-full flex flex-col gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="w-full flex gap-1 h-10">
            {Array.from({ length: 8 }, (_, index) => (
              <Skeleton key={index} className="flex-1" />
            ))}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ResposneCookiesFallback;
