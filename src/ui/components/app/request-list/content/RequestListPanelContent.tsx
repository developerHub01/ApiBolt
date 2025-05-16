import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/context/sidebar/SidebarProvider";
import RequestList from "@/components/app/request-list/content/request-list/RequestList";

const RequestListPanelContent = memo(() => {
  const { activeTab } = useSidebar();

  return (
    <ScrollArea className="flex-1 w-full min-h-0 px-2 text-sm pb-3">
      {activeTab === "collections" && <RequestList />}
      {activeTab !== "collections" && activeTab}
    </ScrollArea>
  );
});

RequestListPanelContent.displayName = "Request list panel content";

export default RequestListPanelContent;
