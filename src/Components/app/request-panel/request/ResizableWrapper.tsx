import React, { useEffect, useRef } from "react";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import type { ImperativePanelGroupHandle } from "react-resizable-panels";
import { useRequestResponse } from "@/context/request/RequestResponseProvider";

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
    else layout.setLayout([30, 70]);
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
