import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import RequestListWrapper from "@/components/app/request-list/content/request-list/RequestListWrapper";
import { useAppSelector } from "@/context/redux/hooks";

const RequestListPanelContent = memo(() => {
  const activeTab = useAppSelector((state) => state.sidebar.activeTab);

  return (
    <ScrollArea className="flex-1 w-full min-h-0 text-sm">
      {activeTab === "collections" && <RequestListWrapper />}
      {activeTab !== "collections" && activeTab}
    </ScrollArea>
  );
});

RequestListPanelContent.displayName = "Request list panel content";

export default RequestListPanelContent;
