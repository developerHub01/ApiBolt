import ResponseProvider from "@/context/collections/request/ResponseProvider";
import ResponsePanelWrapper from "@/components/app/collections/request/response/ResponsePanelWrapper";
import ResponseLoader from "@/components/app/collections/request/ResponseLoader";
import ResponseMetaData from "@/components/app/collections/request/response/meta-data/ResponseMetaData";
import ResponseContent from "@/components/app/collections/request/response/content/ResponseContent";
import ResponseLoaderBlurOverlay from "@/components/app/collections/request/response/ResponseLoaderBlurOverlay";

const ResponsePanel = () => {
  return (
    <ResponseProvider>
      <ResponsePanelWrapper>
        <ResponseLoader />
        <div className="flex flex-col h-full relative">
          <ResponseMetaData />
          <ResponseContent />
          <ResponseLoaderBlurOverlay />
        </div>
      </ResponsePanelWrapper>
    </ResponseProvider>
  );
};

export default ResponsePanel;
