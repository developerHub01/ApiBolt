import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RequestPanel from "@/app/(app)/(request-panel)/request/[requestId]/_components/RequestPanel";
import ResponsePanel from "@/app/(app)/(request-panel)/request/[requestId]/_components/ResponsePanel";

const RequestPage = () => {
  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={60}>
        <RequestPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={40}>
        <ResponsePanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default RequestPage;
