import { memo } from "react";
import RequestListPanelContent from "@/components/app/collections/request-list/content/RequestListPanelContent";
import ListTopAction from "@/components/app/collections/request-list/ListTopAction";
import ListBottomAction from "@/components/app/collections/request-list/ListBottomAction";

const RequestListPanel = memo(() => {
  return (
    <div className="w-full flex flex-col h-full gap-1">
      <ListTopAction />
      <RequestListPanelContent />
      <ListBottomAction />
    </div>
  );
});

export default RequestListPanel;
