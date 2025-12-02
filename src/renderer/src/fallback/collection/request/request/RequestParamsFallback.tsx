import { Skeleton } from "@/components/ui/skeleton";
import AddNewSkeleton from "@/fallback/collection/request/request/AddNewSkeleton";

const RequestParamsFallback = () => {
  return (
    <>
      <div className="w-full flex gap-3 h-7">
        <Skeleton className="w-22" />
        <Skeleton className="w-17 ml-auto" />
      </div>
      <Skeleton className="w-full flex-1" />
      <AddNewSkeleton />
    </>
  );
};

export default RequestParamsFallback;
