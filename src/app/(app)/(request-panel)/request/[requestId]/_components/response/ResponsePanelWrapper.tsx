"use client";

import React, { memo, useCallback } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

interface ResponsePanelWrapperProps {
  children: React.ReactNode;
}

const ResponsePanelWrapper = memo(({ children }: ResponsePanelWrapperProps) => {
  const { handleToggleCollapse } = useRequestResponse();
  const handleResize = useCallback(
    (size: number) => {
      // console.log({ size });
      handleToggleCollapse(size);
    },
    [handleToggleCollapse]
  );

  return (
    <ResizablePanel
      onResize={handleResize}
      id="response-panel"
      className="min-h-12"
      defaultSize={0}
    >
      {children}
    </ResizablePanel>
  );
});

ResponsePanelWrapper.displayName = "Response panel wrapper";

export default ResponsePanelWrapper;
