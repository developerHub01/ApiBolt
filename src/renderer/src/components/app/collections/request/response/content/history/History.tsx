import { lazy, Suspense } from "react";
import HistoryMetaListProvider from "@/context/history/HistoryMetaListProvider";
const HistoryContent = lazy(
  () =>
    import("@/components/app/collections/request/response/content/history/HistoryContent"),
);
import HistorySkeletonFallback from "@/fallback/collection/request/response/HistorySkeletonFallback";

const History = () => {
  return (
    <HistoryMetaListProvider>
      <Suspense fallback={<HistorySkeletonFallback />}>
        <HistoryContent />
      </Suspense>
    </HistoryMetaListProvider>
  );
};

export default History;
