import { memo } from "react";
import { AnimatedDialogContent } from "@/components/ui/animated-dialog";
import ApiUrl from "@/components/app/history-details/content/ApiUrl";
import HistorySkeleton from "@/components/app/history-details/HistorySkeleton";
import { useAppSelector } from "@/context/redux/hooks";
import { selectHistoryDetailsLoading } from "@/context/redux/status/selectors/history";
import { motion, AnimatePresence } from "motion/react";
import ResponseMetaInfo from "@/components/app/history-details/content/ResponseMetaInfo";
import MetaDataTab from "@/components/app/history-details/content/meta/MetaDataTab";
import MetaDataContent from "@/components/app/history-details/content/meta/MetaDataContent";

const HistoryContent = memo(() => {
  const isLoading = useAppSelector(selectHistoryDetailsLoading);

  return (
    <AnimatedDialogContent>
      <AnimatePresence>
        {isLoading ? (
          <HistorySkeleton />
        ) : (
          <motion.div className="w-full h-full p-2 flex flex-col gap-2">
            <ApiUrl />
            <MetaDataTab />
            <MetaDataContent />
            <div className="flex-1"></div>
            <ResponseMetaInfo />
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedDialogContent>
  );
});

export default HistoryContent;
