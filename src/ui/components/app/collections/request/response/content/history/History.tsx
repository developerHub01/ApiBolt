import { lazy, Suspense } from "react";
import HistoryMetaListProvider from "@/context/history/HistoryMetaListProvider";
const HistoryContent = lazy(
  () =>
    import("@/components/app/collections/request/response/content/history/HistoryContent")
);
import HistorySkeleton from "@/components/app/collections/request/response/content/history/skeleton/HistorySkeleton";

const History = () => {
  return (
    <HistoryMetaListProvider>
      <Suspense fallback={<HistorySkeleton />}>
        <HistoryContent />
      </Suspense>
    </HistoryMetaListProvider>
  );
};

export default History;
