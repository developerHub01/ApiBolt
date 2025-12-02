import HistoryDetailsProvider from "@/context/history/HistoryDetailsProvider";
import HistoryDetails from "@/components/app/history-details/HistoryDetails";

const History = () => {
  return (
    <HistoryDetailsProvider>
      <HistoryDetails />
    </HistoryDetailsProvider>
  );
};

export default History;
