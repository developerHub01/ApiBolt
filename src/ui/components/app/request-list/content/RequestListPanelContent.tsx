import { memo } from "react";
import { useSidebar } from "@/context/sidebar/SidebarProvider";

const RequestListPanelContent = memo(() => {
  const { activeTab } = useSidebar();

  return <div>{activeTab}</div>;
});

RequestListPanelContent.displayName = "Request list panel content";

export default RequestListPanelContent;
