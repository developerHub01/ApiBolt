import React from "react";
import ResponseMetaData from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/ResponseMetaData";
import ResponseProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import ResposneContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/ResposneContent";
import ResponseLoader from "@/app/(app)/(request-panel)/request/[requestId]/_components/ResponseLoader";
import ResponsePanelWrapper from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/ResponsePanelWrapper";

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
