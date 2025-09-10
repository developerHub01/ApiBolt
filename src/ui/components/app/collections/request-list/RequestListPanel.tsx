import { memo } from "react";
import RequestListPanelContent from "@/components/app/collections/request-list/content/RequestListPanelContent";
import ListTopAction from "@/components/app/collections/request-list/ListTopAction";
import ListBottomAction from "@/components/app/collections/request-list/list-bottom-action/ListBottomAction";
import RequestListDeleteAlertDialog from "@/components/app/collections/request-list/content/request-list/RequestListDeleteAlertDialog";

const RequestListPanel = memo(() => {
  return (
    <div className="w-full flex flex-col h-full gap-1">
      <ListTopAction />
      <RequestListPanelContent />
      <ListBottomAction />
      <RequestListDeleteAlertDialog />
    </div>
  );
});

export default RequestListPanel;
