import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const ThemeDetailsContentSkeleton = () => (
  <>
    <AspectRatio
      ratio={16 / 9}
      className="rounded-lg overflow-hidden shrink-0 border-3"
    >
      <Skeleton className="w-full h-full" />
    </AspectRatio>
    <div className="flex justify-between gap-4">
      <Skeleton className="w-20 h-7" />
      <Skeleton className="w-20 h-6" />
    </div>
    <div className="flex gap-4 items-center">
      <Skeleton className="w-20 h-7" />
      <Skeleton className="w-20 h-6" />
    </div>
    <Skeleton className="w-full h-30" />
    <Skeleton className="w-full h-60" />
  </>
);

export default ThemeDetailsContentSkeleton;
