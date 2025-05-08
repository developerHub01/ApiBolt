
import { memo } from "react";

const RequestListPanelContent = memo(() => {
  const { activeTab } = useSidebar();

  return <div>{activeTab}</div>;
});

RequestListPanelContent.displayName = "Request list panel content";

export default RequestListPanelContent;
