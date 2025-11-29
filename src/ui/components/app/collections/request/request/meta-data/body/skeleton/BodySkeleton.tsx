import { Skeleton } from "@/components/ui/skeleton";

const BodySkeleton = () => {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex gap-3 items-center flex-wrap shrink-0">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="w-22 grow-0 min-h-7" />
        ))}
      </div>
      <Skeleton className="w-full flex-1" />
    </div>
  );
};

export default BodySkeleton;
