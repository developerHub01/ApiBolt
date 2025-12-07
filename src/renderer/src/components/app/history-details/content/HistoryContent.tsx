import { memo } from "react";
import ApiUrl from "@/components/app/history-details/content/ApiUrl";
import HistorySkeleton from "@/components/app/history-details/HistorySkeleton";
import { useAppSelector } from "@/context/redux/hooks";
import { selectHistoryDetailsLoading } from "@/context/redux/status/selectors/history";
import { AnimatePresence } from "motion/react";
import ResponseMetaInfo from "@/components/app/history-details/content/ResponseMetaInfo";
import MetaDataContent from "@/components/app/history-details/content/meta/MetaDataContent";
import { AnimatedDialogContent } from "@/components/ui/animated-dialog";
import MetaDataTop from "@/components/app/history-details/content/meta/meta-top/MetaDataTop";
import useShowSkeleton from "@/hooks/ui/use-show-skeleton";

const HistoryContent = memo(() => {
  const isLoading = useAppSelector(selectHistoryDetailsLoading);
  const showSkeleton = useShowSkeleton(isLoading);

  return (
    <AnimatePresence>
      {showSkeleton ? (
        <HistorySkeleton />
      ) : (
        <section className="min-h-0 flex-1 py-4 flex flex-col gap-3">
          <section className="px-5 flex flex-col gap-3">
            <ApiUrl />
            <MetaDataTop />
          </section>
          <AnimatedDialogContent className="flex-1 px-5 py-0">
            <MetaDataContent />
          </AnimatedDialogContent>
          <section className="px-5">
            <ResponseMetaInfo />
          </section>
        </section>
      )}
    </AnimatePresence>
  );
});

export default HistoryContent;
