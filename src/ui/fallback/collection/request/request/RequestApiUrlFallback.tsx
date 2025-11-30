import { Skeleton } from "@/components/ui/skeleton";

const RequestApiUrlFallback = () => {
  return (
    <>
      <Skeleton className="h-7 w-20" />
      <Skeleton className="w-full flex-1" />
    </>
  );
};

export default RequestApiUrlFallback;
