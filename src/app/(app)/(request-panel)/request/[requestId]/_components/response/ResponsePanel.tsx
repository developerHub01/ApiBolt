import React from "react";
import ResponseMetaData from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/meta-data/ResponseMetaData";
import ResponseProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/ResponseProvider";
import ResposneContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/content/ResposneContent";
import { ResizablePanel } from "@/components/ui/resizable";
import ResponseLoader from "@/app/(app)/(request-panel)/request/[requestId]/_components/ResponseLoader";

const ResponsePanel = () => {
  return (
    <ResizablePanel id="response-panel" className="min-h-12" defaultSize={0}>
      <ResponseProvider>
        <ResponseLoader />
        <div className="flex flex-col h-full">
          <ResponseMetaData />
          <ResposneContent />
        </div>
      </ResponseProvider>
    </ResizablePanel>
  );
};

export default ResponsePanel;
