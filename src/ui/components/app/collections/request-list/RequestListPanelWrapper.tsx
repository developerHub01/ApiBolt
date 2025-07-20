import { memo, useRef } from "react";
import { ResizablePanel } from "@/components/ui/resizable";
import RequestListPanel from "@/components/app/collections/request-list/RequestListPanel";
import type { ImperativePanelHandle } from "react-resizable-panels";
import { useAppSelector } from "@/context/redux/hooks";

const RequestListPanelWrapper = memo(() => {
  const activeTab = useAppSelector((state) => state.sidebar.activeTab);
  const resizableSizelRef = useRef<number | null>(null);
  const resizablePanelRef = useRef<ImperativePanelHandle>(null);

  if (!activeTab) return null;

  const handleResize = (value: number) => {
    if (value < 20 && value < Number(resizableSizelRef.current)) {
      resizablePanelRef.current?.collapse();
    }

    resizableSizelRef.current = value;
  };

  return (
    <ResizablePanel
      collapsible={true}
      defaultSize={30}
      className="h-full"
      style={{
        maxWidth: "40vw",
      }}
      onResize={handleResize}
      ref={resizablePanelRef}
    >
      <RequestListPanel />
    </ResizablePanel>
  );
});

RequestListPanelWrapper.displayName = "Request list panel wrapper";

export default RequestListPanelWrapper;
