import { memo } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const ThemeCardSkeleton = memo(() => {
  return (
    <div className="w-full rounded-lg p-4 flex flex-col gap-3 bg-accent/20">
      <AspectRatio
        ratio={16 / 9}
        className="rounded-lg overflow-hidden shrink-0 border-3"
      >
        <Skeleton className="w-full h-full" />
      </AspectRatio>
      <div className="w-full flex-1 flex flex-col gap-2">
        <Skeleton className="w-4/5 h-9" />
        <Skeleton className="w-full h-14" />
        <div className="flex justify-between gap-3  h-7">
          <Skeleton className="w-16" />
          <Skeleton className="w-10" />
        </div>
      </div>
    </div>
  );
});

export default ThemeCardSkeleton;
