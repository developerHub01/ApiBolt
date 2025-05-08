import RequestListPanelContent from "@/components/app/request-list/content/RequestListPanelContent";
import ListTopAction from "@/components/app/request-list/ListTopAction";
import RequestListPanelWrapper from "@/components/app/request-list/RequestListPanelWrapper";

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
