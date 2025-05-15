import RequestListPanelContent from "@/components/app/request-list/content/RequestListPanelContent";
import ListTopAction from "@/components/app/request-list/ListTopAction";

const RequestListPanel = () => {
  return (
    <div className="flex flex-col h-full">
      <ListTopAction />
      <RequestListPanelContent />
    </div>
  );
};

export default RequestListPanel;
