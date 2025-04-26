import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ResponsePanel from "@/app/(app)/(request-panel)/request/[requestId]/_components/ResponsePanel";
import RequestTop from "@/app/(app)/(request-panel)/request/[requestId]/_components/RequestTop";
import APIUrl from "@/app/(app)/(request-panel)/request/[requestId]/_components/api-url/APIUrl";
import RequestMetaData from "@/app/(app)/(request-panel)/request/[requestId]/_components/metadata/RequestMetaData";
import MetaDataContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/metadata/MetaDataContent";
import RequestBodyProvider from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestBodyProvider";

const RequestPage = () => {
  return (
    <RequestBodyProvider>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="w-full p-2.5 flex flex-col gap-2">
          <RequestTop />
          <APIUrl />
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
