import { Skeleton } from "@/components/ui/skeleton";

const RequestCodeSnippitFallback = () => {
  return (
    <>
      <div className="flex justify-between gap-3 h-8">
        <Skeleton className="w-20" />
        <Skeleton className="w-38 ml-auto" />
        <Skeleton className="w-22" />
        <Skeleton className="w-9" />
      </div>
      <Skeleton className="w-full flex-1" />
    </>
  );
};

export default RequestCodeSnippitFallback;
