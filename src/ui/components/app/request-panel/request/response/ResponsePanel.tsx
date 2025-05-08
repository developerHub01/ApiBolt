import ResponseProvider from "@/context/request/ResponseProvider";
import ResponsePanelWrapper from "@/components/app/request-panel/request/response/ResponsePanelWrapper";
import ResponseLoader from "@/components/app/request-panel/request/ResponseLoader";
import ResponseMetaData from "@/components/app/request-panel/request/response/meta-data/ResponseMetaData";
import ResposneContent from "@/components/app/request-panel/request/response/content/ResposneContent";

const ResponsePanel = () => {
  return (
    <ResponsePanelWrapper>
      <ResponseProvider>
        <ResponseLoader />
        <div className="flex flex-col h-full">
          <ResponseMetaData />
          <ResposneContent />
        </div>
      </ResponseProvider>
    </ResponsePanelWrapper>
  );
};

export default ResponsePanel;
