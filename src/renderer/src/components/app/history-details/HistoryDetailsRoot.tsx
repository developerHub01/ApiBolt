import ReplaceCurrentAlert from "@/components/app/history-details/ReplaceCurrentAlert";
import Loader from "@/components/app/history-details/Loader";
import HistoryTop from "@/components/app/history-details/HistoryTop";
import HistoryContent from "@/components/app/history-details/content/HistoryContent";
import HistoryBottom from "@/components/app/history-details/HistoryBottom";

const HistoryDetailsRoot = () => {
  return (
    <>
      <HistoryTop />
      <HistoryContent />
      <HistoryBottom />
      <Loader />
      <ReplaceCurrentAlert />
    </>
  );
};

export default HistoryDetailsRoot;
