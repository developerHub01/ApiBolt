import { Skeleton } from "@/components/ui/skeleton";

const RequestListSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 px-1">
      {Array.from({ length: 20 }, (_, index) => (
        <Skeleton key={index} className="w-full h-9" />
      ))}
    </div>
  );
};

export default RequestListSkeleton;
