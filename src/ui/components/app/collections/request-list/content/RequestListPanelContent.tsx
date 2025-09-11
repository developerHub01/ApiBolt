import { memo } from "react";
import { ScrollAreaInnerFlexView } from "@/components/ui/scroll-area";
import RequestListWrapper from "@/components/app/collections/request-list/content/request-list/RequestListWrapper";

const RequestListPanelContent = memo(() => {
  return (
    <ScrollAreaInnerFlexView className="flex-1 w-full min-h-0 text-sm [&>div>div]:w-full [&>div>div]:h-full">
      <RequestListWrapper />
    </ScrollAreaInnerFlexView>
  );
});

RequestListPanelContent.displayName = "Request list panel content";

export default RequestListPanelContent;
