import { memo } from "react";
import { useSidebar } from "@/context/sidebar/SidebarProvider";
import RequestList from "@/components/app/request-list/content/request-list/RequestList";

const RequestListPanelContent = memo(() => {
  const { activeTab } = useSidebar();

  return (
    <div>
      {activeTab === "collections" && <RequestList />}
      {activeTab !== "collections" && activeTab}
    </div>
  );
});

RequestListPanelContent.displayName = "Request list panel content";

export default RequestListPanelContent;
