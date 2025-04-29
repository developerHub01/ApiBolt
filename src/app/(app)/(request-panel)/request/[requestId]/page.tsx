import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ResponsePanel from "@/app/(app)/(request-panel)/request/[requestId]/_components/response/ResponsePanel";
import RequestTop from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/RequestTop";
import RequestBodyProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";
import ApiUrl from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/api-url/ApiUrl";
import RequestMetaData from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/RequestMetaData";
import MetaDataContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/MetaDataContent";

const RequestPage = () => {
  return (
    <RequestBodyProvider>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="w-full p-2.5 flex flex-col gap-2">
          <RequestTop />
          <ApiUrl />
          <RequestMetaData />
        </div>
        <ResizablePanelGroup className="h-full" direction="vertical">
          <ResizablePanel defaultSize={60}>
            <MetaDataContent />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40}>
            <ResponsePanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </RequestBodyProvider>
  );
};

export default RequestPage;
