import ResponseProvider from "@/context/collections/request/ResponseProvider";
import ResponsePanelWrapper from "@/components/app/collections/request/response/ResponsePanelWrapper";
import ResponseLoader from "@/components/app/collections/request/ResponseLoader";
import ResponseMetaData from "@/components/app/collections/request/response/meta-data/ResponseMetaData";
import ResposneContent from "@/components/app/collections/request/response/content/ResposneContent";
import HistoryProvider from "@/context/history/HistoryProvider";

const ResponsePanel = () => {
  return (
    <ResponsePanelWrapper>
      <ResponseProvider>
        <HistoryProvider>
          <ResponseLoader />
          <div className="flex flex-col h-full">
            <ResponseMetaData />
            <ResposneContent />
          </div>
        </HistoryProvider>
      </ResponseProvider>
    </ResponsePanelWrapper>
  );
};

export default ResponsePanel;
