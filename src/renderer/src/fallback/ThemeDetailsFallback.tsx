import ThemeDetailsContentSkeleton from "@renderer/components/app/themes/marketplace/theme-details/theme-content/ThemeDetailsContentSkeleton";
import {
  AnimatedDialogBottom,
  AnimatedDialogContent,
  AnimatedDialogContentScroll,
  AnimatedDialogTop,
} from "@renderer/components/ui/animated-dialog";
import { Skeleton } from "@renderer/components/ui/skeleton";

const ThemeDetailsFallback = () => {
  return (
    <>
      <AnimatedDialogTop className="w-full flex gap-2 justify-start">
        <div className="p-2 text-lg font-medium overflow-hidden">
          <Skeleton className="h-7 w-4/5 max-w-52" />
        </div>
      </AnimatedDialogTop>
      <AnimatedDialogContent>
        <AnimatedDialogContentScroll>
          <section className="w-full flex flex-col gap-4 p-2">
            <ThemeDetailsContentSkeleton />
          </section>
        </AnimatedDialogContentScroll>
      </AnimatedDialogContent>
      <AnimatedDialogBottom className="w-full">
        <div className="w-full max-w-lg text-sm text-center">
          <Skeleton className="h-5 w-full" />
        </div>
      </AnimatedDialogBottom>
    </>
  );
};

export default ThemeDetailsFallback;
