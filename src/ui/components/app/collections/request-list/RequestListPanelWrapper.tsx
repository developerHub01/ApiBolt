import { memo, useEffect, useRef } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import RequestListPanel from "@/components/app/collections/request-list/RequestListPanel";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { useAppSelector } from "@/context/redux/hooks";

const RequestListPanelWrapper = memo(() => {
  const resizablePanelRef = useRef<ImperativePanelHandle>(null);
  const requestListCollapsed = useAppSelector(
    (state) => state.requestResponse.requestListCollapsed
  );

  useEffect(() => {
    const panel = resizablePanelRef.current;
    if (!panel) return;

    if (requestListCollapsed) panel.collapse();
    else panel.expand();
  }, [requestListCollapsed]);

  return (
    <ResizablePanel
      collapsible
      defaultSize={30}
      minSize={15}
      maxSize={40}
      className="h-full backdrop-blur-xs"
      style={{
        maxWidth: "40vw",
      }}
      ref={resizablePanelRef}
    >
      <RequestListPanel />
    </ResizablePanel>
  );
});

RequestListPanelWrapper.displayName = "Request list panel wrapper";

export default RequestListPanelWrapper;
