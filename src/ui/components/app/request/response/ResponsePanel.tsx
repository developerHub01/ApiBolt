import ResponseProvider from "@/context/request/ResponseProvider";
import ResponsePanelWrapper from "@/components/app/request/response/ResponsePanelWrapper";
import ResponseLoader from "@/components/app/request/ResponseLoader";
import ResponseMetaData from "@/components/app/request/response/meta-data/ResponseMetaData";
import ResposneContent from "@/components/app/request/response/content/ResposneContent";

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
