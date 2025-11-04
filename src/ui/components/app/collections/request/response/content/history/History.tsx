import HistoryProvider from "@/context/history/HistoryProvider";
import HistoryContent from "@/components/app/collections/request/response/content/history/HistoryContent";

const History = () => {
  return (
    <HistoryProvider>
      <HistoryContent />
    </HistoryProvider>
  );
};

export default History;
