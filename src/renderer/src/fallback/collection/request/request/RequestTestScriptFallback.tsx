import { Skeleton } from "@/components/ui/skeleton";

const RequestTestScriptFallback = () => {
  return (
    <>
      <div className="flex justify-between gap-3 h-8">
        <Skeleton className="w-20" />
      </div>
      <Skeleton className="w-full flex-1" />
    </>
  );
};

export default RequestTestScriptFallback;
