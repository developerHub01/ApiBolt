import { ResizablePanel } from "@/components/ui/resizable";
import { useSidebar } from "@/context/sidebar/SidebarProvider";
import RequestListPanel from "@/components/app/request-list/RequestListPanel";
import RequestListProvider from "@/context/request-list/RequestListProvider";
import { useRef } from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";

const RequestListPanelWrapper = () => {
  const { activeTab } = useSidebar();
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
      <RequestListProvider>
        <RequestListPanel />
      </RequestListProvider>
    </ResizablePanel>
  );
};

RequestListPanelWrapper.displayName = "Request list panel wrapper";

export default RequestListPanelWrapper;
