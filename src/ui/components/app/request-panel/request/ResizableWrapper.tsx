import React, { useEffect, useRef } from "react";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { type ImperativePanelGroupHandle } from "react-resizable-panels";
import { useAppSelector } from "@/context/redux/hooks";

interface ResizableWrapperProps {
  children: React.ReactNode;
}

const ResizableWrapper = ({ children }: ResizableWrapperProps) => {
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);
  const isResponseCollapsed = useAppSelector(
    (state) =>
      state.requestResponse.isResponseCollapsed[state.tabSidebar.selectedTab!]
  );

  useEffect(() => {
    const layout = panelGroupRef.current;

    if (!layout || !layout.getLayout) return;

    const currentLayout = layout.getLayout();
    if (!currentLayout || currentLayout.length !== 2) return;

    const safeLayout = isResponseCollapsed ? [99, 1] : [30, 70];
    layout.setLayout(safeLayout);
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
