import React, { useEffect, useRef } from "react";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { type ImperativePanelGroupHandle } from "react-resizable-panels";
import { useAppSelector } from "@/context/redux/hooks";
import { useRequestResponse } from "@/context/collections/request/RequestResponseProvider";
import { selectIsResponseCollapsed } from "@/context/redux/request-response/selectors/response";

interface RequestResizableWrapperProps {
  children: React.ReactNode;
}

const RequestResizableWrapper = ({
  children,
}: RequestResizableWrapperProps) => {
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);
  const isResponseCollapsed = useAppSelector(selectIsResponseCollapsed);
  const { forceCollapse, handleForceCollapse } = useRequestResponse();

  useEffect(() => {
    if (!forceCollapse) return;
    handleForceCollapse(false);

    const layout = panelGroupRef.current;
    if (!layout || !layout.getLayout) return;

    const currentLayout = layout.getLayout();
    if (!currentLayout || currentLayout.length !== 2) return;

    const safeLayout = isResponseCollapsed ? [100, 0] : [50, 50];
    layout.setLayout(safeLayout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceCollapse]);

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

export default RequestResizableWrapper;
