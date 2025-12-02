import {
  AnimatedDialogBottom,
  AnimatedDialogContentScroll,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const KeyboardShortcutsFallback = () => {
  return (
    <>
      <AnimatedDialogTop className="w-full flex gap-2">
        {Array.from({ length: 2 }, (_, index) => (
          <Skeleton key={index} className="w-full h-9" />
        ))}
      </AnimatedDialogTop>
      <div className="w-full px-3 py-2">
        <Skeleton className="w-full h-11" />
      </div>
      <AnimatedDialogContentScroll className="flex-1">
        <div className="w-full h-full flex flex-col gap-1">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="w-full flex gap-1 h-11">
              {Array.from({ length: 2 }, (_, index) => (
                <Skeleton key={index} className="flex-1 h-full" />
              ))}
            </div>
          ))}
        </div>
      </AnimatedDialogContentScroll>
      <AnimatedDialogBottom>
        <Skeleton className="w-full max-w-64 h-5 mx-auto" />
      </AnimatedDialogBottom>
    </>
  );
};

export default KeyboardShortcutsFallback;
