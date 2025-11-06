import { memo } from "react";
import { AnimatedDialogContent } from "@/components/ui/animated-dialog";
import ApiUrl from "@/components/app/history-details/content/ApiUrl";
import HistorySkeleton from "@/components/app/history-details/HistorySkeleton";
import { useAppSelector } from "@/context/redux/hooks";
import { selectHistoryDetailsLoading } from "@/context/redux/status/selectors/history";
import { AnimatePresence } from "motion/react";
import ResponseMetaInfo from "@/components/app/history-details/content/ResponseMetaInfo";
import MetaDataTab from "@/components/app/history-details/content/meta/MetaDataTab";
import MetaDataContent from "@/components/app/history-details/content/meta/MetaDataContent";

const HistoryContent = memo(() => {
  const isLoading = useAppSelector(selectHistoryDetailsLoading);

  return (
    <>
      {isLoading ? (
        <HistorySkeleton />
      ) : (
        <AnimatePresence>
          <section className="min-h-0 flex-1 py-4 flex flex-col gap-2">
            <section className="px-5 flex flex-col gap-2">
              <ApiUrl />
              <MetaDataTab />
            </section>
            <AnimatedDialogContent
              className="flex-1 px-5 py-0"
              scrollAreaClassName="px-0"
            >
              <MetaDataContent />
            </AnimatedDialogContent>
            <section className="px-5">
              <ResponseMetaInfo />
            </section>
          </section>
        </AnimatePresence>
      )}
    </>
  );
});

export default HistoryContent;
