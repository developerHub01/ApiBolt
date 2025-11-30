import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const FolderAuthorizationFallback = () => {
  return (
    <section className="flex flex-col gap-4 w-full h-full mx-auto p-3">
      <div className="flex flex-col gap-1.5">
        <div className="w-full flex justify-between h-9">
          <Skeleton className="w-19" />
          <Skeleton className="w-48" />
        </div>
        <Skeleton className="w-4/5 max-w-xl h-6.5" />
      </div>
      <Separator className="w-full" />
      <Skeleton className="flex-1 w-full" />
    </section>
  );
};

export default FolderAuthorizationFallback;
