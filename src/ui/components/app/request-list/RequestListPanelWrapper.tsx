import { ResizablePanel } from "@/components/ui/resizable";
import { useSidebar } from "@/context/sidebar/SidebarProvider";
import RequestListPanel from "@/components/app/request-list/RequestListPanel";
import RequestListProvider from "@/context/request-list/RequestListProvider";

const RequestListPanelWrapper = () => {
  const { activeTab } = useSidebar();

  if (!activeTab) return null;

  return (
    <ResizablePanel
      collapsible={true}
      defaultSize={30}
      style={{
        maxWidth: "40vw",
      }}
    >
      <RequestListProvider>
        <RequestListPanel />
      </RequestListProvider>
    </ResizablePanel>
  );
};

RequestListPanelWrapper.displayName = "Request list panel wrapper";

export default RequestListPanelWrapper;
