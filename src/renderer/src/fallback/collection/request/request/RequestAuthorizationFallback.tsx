import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const RequestAuthorizationFallback = () => {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="w-72 h-6" />
        <Separator className="w-full" />
        <div className="flex flex-col gap-1.5">
          <div className="w-full flex justify-between">
            <Skeleton className="w-19 h-7" />
            <Skeleton className="w-28 h-7" />
          </div>
          <Skeleton className="w-4/5 max-w-xl h-6.5" />
        </div>
      </div>
      <Separator className="w-full" />
      <Skeleton className="flex-1 w-full" />
    </>
  );
};

export default RequestAuthorizationFallback;
