import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const EnvironmentFallback = () => {
  return (
    <section className="w-full h-full flex flex-col items-center p-4">
      <div className="flex flex-col w-full h-full max-w-5xl flex-1 p-5 gap-3">
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between mb-3.5">
            <Skeleton className="w-72 h-10" />
            <Skeleton className="w-12 h-10" />
          </div>
          <Skeleton className="w-64 h-10" />
        </div>
        <section className="w-full min-h-0 flex-1">
          <ScrollArea className="w-full min-h-0 h-full [&>div>div]:h-full">
            <div className="w-full h-full flex flex-col items-center gap-1">
              {Array.from({ length: 15 }, (_, index) => (
                <div key={index} className="w-full flex gap-1 h-10">
                  <Skeleton className="w-11 h-full" />
                  <Skeleton className="flex-1 h-full" />
                  <Skeleton className="w-36 h-full" />
                  <Skeleton className="flex-1 h-full" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </section>
        <Skeleton className="w-60 h-8.5 mx-auto" />
      </div>
    </section>
  );
};

export default EnvironmentFallback;
