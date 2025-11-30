import HistorySkeleton from "@/components/app/history-details/HistorySkeleton";
import {
  AnimatedDialogBottom,
  AnimatedDialogTop,
} from "@/components/ui/animated-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const HistoryDetailsFallback = () => {
  return (
    <>
      <AnimatedDialogTop className="w-full flex gap-2 justify-start">
        <Skeleton className="w-28 h-9" />
      </AnimatedDialogTop>
      <HistorySkeleton />
      <AnimatedDialogBottom className="w-full">
        <Skeleton className="w-full max-w-64 h-5 mx-auto" />
      </AnimatedDialogBottom>
    </>
  );
};

export default HistoryDetailsFallback;
