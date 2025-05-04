import React from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import MetaDataContent from "@/app/(app)/(request-panel)/request/[requestId]/_components/request/meta-data/MetaDataContent";

const RequestPanel = () => {
  return (
    <ResizablePanel id="request-panel" defaultSize={100}>
      <MetaDataContent />
    </ResizablePanel>
  );
};

export default RequestPanel;
