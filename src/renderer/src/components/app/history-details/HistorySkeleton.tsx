import { memo } from "react";
import {
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
} from "@/components/ui/animated-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const HistorySkeleton = memo(() => {
  return (
    <AnimatedDialogContent>
      <AnimatedDialogContentScroll>
        <div className="h-full flex flex-col gap-3">
          {/* skeleton top */}
          <div className="h-9 flex items-center gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="w-20 h-full" />
            ))}
          </div>
          {/* skeleton content */}
          <Skeleton className="w-full flex-1" />
          {/* skeleton bottom */}
          <div className="h-9 w-full flex gap-2">
            <Skeleton className="w-20 mr-auto" />
            <Skeleton className="w-20" />
            <Skeleton className="w-20" />
          </div>
        </div>
      </AnimatedDialogContentScroll>
    </AnimatedDialogContent>
  );
});

export default HistorySkeleton;
