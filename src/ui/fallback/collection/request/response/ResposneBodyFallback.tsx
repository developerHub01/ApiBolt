import { Skeleton } from "@/components/ui/skeleton";

const ResposneBodyFallback = () => {
  return (
    <div className="h-full w-full flex flex-col gap-3">
      <div className="flex gap-2 h-8">
        <Skeleton className="w-15" />
        <Skeleton className="w-23" />
        <Skeleton className="w-14 ml-auto" />
      </div>
      <Skeleton className="w-full flex-1" />
    </div>
  );
};

export default ResposneBodyFallback;
