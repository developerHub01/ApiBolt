import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RequestPanel from "@/app/(app)/(request-panel)/request/[requestId]/_components/RequestPanel";
import ResponsePanel from "@/app/(app)/(request-panel)/request/[requestId]/_components/ResponsePanel";
import RequestTop from "@/app/(app)/(request-panel)/request/[requestId]/_components/RequestTop";
import APIUrl from "@/app/(app)/(request-panel)/request/[requestId]/_components/APIUrl";
import RequestMetaData from "@/app/(app)/(request-panel)/request/[requestId]/_components/metadata/RequestMetaData";
import MetaDataContent from "./_components/metadata/MetaDataContent";

const RequestPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="w-full p-3 flex flex-col gap-2">
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
  );
};

export default RequestPage;
