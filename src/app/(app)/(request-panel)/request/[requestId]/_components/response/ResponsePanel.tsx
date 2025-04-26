import React from "react";
import ResponseMetaData from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/ResponseMetaData";
import ResponseProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import ResposneContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/ResposneContent";

const ResponsePanel = () => {
  return (
    <ResponseProvider>
      <div className="flex flex-col h-full">
        <ResponseMetaData />
        <ResposneContent />
      </div>
    </ResponseProvider>
  );
};

export default ResponsePanel;
