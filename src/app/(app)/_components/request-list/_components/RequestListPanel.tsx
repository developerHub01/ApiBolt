import React from "react";
import ListTopAction from "@/app/(app)/_components/request-list/_components/ListTopAction";
import RequestListPanelWrapper from "@/app/(app)/_components/request-list/_components/RequestListPanelWrapper";
import RequestListPanelContent from "@/app/(app)/_components/request-list/_components/content/RequestListPanelContent";

const RequestListPanel = () => {
  return (
    <RequestListPanelWrapper>
      <div className="flex flex-col h-full">
        <ListTopAction />
        <RequestListPanelContent />
      </div>
    </RequestListPanelWrapper>
  );
};

export default RequestListPanel;
