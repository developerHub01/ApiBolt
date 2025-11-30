import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const ResposneHeadersFallback = () => {
  return (
    <ScrollArea className="flex-1 min-h-0 h-full [&>div>div]:h-full overflow-hidden">
      <div className="w-full h-full flex flex-col gap-1">
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className="w-full flex gap-1 h-10">
            {Array.from({ length: 2 }, (_, index) => (
              <Skeleton key={index} className="flex-1" />
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ResposneHeadersFallback;
