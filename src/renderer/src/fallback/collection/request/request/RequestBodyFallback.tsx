import { Skeleton } from "@/components/ui/skeleton";
import AddNewSkeleton from "@/fallback/collection/request/request/AddNewSkeleton";

const RequestBodyFallback = () => {
  return (
    <>
      <div className="flex gap-3 h-8.5 flex-wrap py-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="w-20" />
        ))}
      </div>
      <div className="w-full flex justify-between h-7">
        <Skeleton className="w-16 h-full" />
        <Skeleton className="w-16 h-full" />
      </div>
      <Skeleton className="w-full flex-1" />
      <AddNewSkeleton />
    </>
  );
};

export default RequestBodyFallback;
