import HistoryMetaListProvider from "@/context/history/HistoryMetaListProvider";
import HistoryContent from "@/components/app/collections/request/response/content/history/HistoryContent";

const History = () => {
  return (
    <HistoryMetaListProvider>
      <HistoryContent />
    </HistoryMetaListProvider>
  );
};

export default History;
