"use client";

import React, { useEffect, useRef } from "react";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { ImperativePanelGroupHandle } from "react-resizable-panels";
import { useRequestResponse } from "@/app/(app)/(request-panel)/request/[requestId]/_context/RequestResponseProvider";

interface ResizableWrapperProps {
  children: React.ReactNode;
}

const ResizableWrapper = ({ children }: ResizableWrapperProps) => {
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);
  const { isResponseCollapsed } = useRequestResponse();

  useEffect(() => {
    const layout = panelGroupRef.current;

    if (!layout) return;

    if (isResponseCollapsed) layout.setLayout([100, 0]);
    else layout.setLayout([70, 30]);
  }, [isResponseCollapsed]);

  return (
    <ResizablePanelGroup
      className="h-full"
      direction="vertical"
      ref={panelGroupRef}
    >
      {children}
    </ResizablePanelGroup>
  );
};

export default ResizableWrapper;
