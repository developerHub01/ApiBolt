import CookiesSkeleton from "@/components/app/cookies/CookiesSkeleton";
import {
  AnimatedDialogBottom,
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const CookiesFallback = () => {
  return (
    <>
      <AnimatedDialogTop className="w-full flex gap-2 justify-start">
        <Skeleton className="w-28 h-9" />
      </AnimatedDialogTop>
      <AnimatedDialogContent>
        <AnimatedDialogContentScroll>
          <CookiesSkeleton />
        </AnimatedDialogContentScroll>
      </AnimatedDialogContent>
      <AnimatedDialogBottom className="w-full">
        <Skeleton className="w-full max-w-64 h-5 mx-auto" />
      </AnimatedDialogBottom>
    </>
  );
};

export default CookiesFallback;
