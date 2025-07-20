import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import RequestListWrapper from "@/components/app/collections/request-list/content/request-list/RequestListWrapper";

const RequestListPanelContent = memo(() => {
  return (
    <ScrollArea className="flex-1 w-full min-h-0 text-sm">
      <RequestListWrapper />
    </ScrollArea>
  );
});

RequestListPanelContent.displayName = "Request list panel content";

export default RequestListPanelContent;
