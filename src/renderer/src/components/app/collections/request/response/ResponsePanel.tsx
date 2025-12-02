import ResponseProvider from "@/context/collections/request/ResponseProvider";
import ResponsePanelWrapper from "@/components/app/collections/request/response/ResponsePanelWrapper";
import ResponseLoader from "@/components/app/collections/request/ResponseLoader";
import ResponseMetaData from "@/components/app/collections/request/response/meta-data/ResponseMetaData";
import ResposneContent from "@/components/app/collections/request/response/content/ResposneContent";

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
