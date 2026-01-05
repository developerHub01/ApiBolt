import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const LocalPasswordSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 p-2">
      <div className="w-4/5 flex flex-col gap-4">
        <div className="flex flex-col justify-center items-center pb-4">
          <Skeleton className="h-9 w-full max-w-3xs mb-4" />
          {Array.from({ length: 2 }, (_, index) => (
            <Skeleton
              key={index}
              className={cn("w-full rounded-md h-8 mb-2", {
                "h-14": !index
              })}
            />
          ))}
        </div>
        {Array.from({ length: 2 }, (_, index) => (
          <Skeleton key={index} className="w-full rounded-md h-8 mb-2" />
        ))}
        <Skeleton className="w-full rounded-md h-8 mt-3" />
      </div>
    </div>
  );
};

export default LocalPasswordSkeleton;
