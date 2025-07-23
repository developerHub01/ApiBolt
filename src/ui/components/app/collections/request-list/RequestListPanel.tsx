import { memo } from "react";
import RequestListPanelContent from "@/components/app/collections/request-list/content/RequestListPanelContent";
import ListTopAction from "@/components/app/collections/request-list/ListTopAction";

const RequestListPanel = memo(() => {
  return (
    <div className="w-full flex flex-col h-full gap-1">
      <ListTopAction />
      <RequestListPanelContent />
    </div>
  );
});

export default RequestListPanel;
