import { memo } from "react";
import TreeView from "@/components/ui/tree-view/TreeView";
import RequestListContent from "@/components/app/mock/request-list/RequestListContent";
import ListBottomAction from "@/components/app/mock/request-list/list-bottom-action/ListBottomAction";
import RequestListDeleteAlertDialog from "@/components/app/mock/request-list/content/request-list/RequestListDeleteAlertDialog";
import AddAction from "@/components/app/mock/request-list/AddAction";
import RequestListPanelProviderWrapper from "@/components/app/mock/request-list/RequestListPanelProviderWrapper";

const RequestListPanel = memo(() => {
  return (
    <RequestListPanelProviderWrapper>
      <TreeView>
        <TreeView.TopBar showTitle>
          <AddAction />
        </TreeView.TopBar>
        <RequestListContent />
        <ListBottomAction />
        <RequestListDeleteAlertDialog />
      </TreeView>
    </RequestListPanelProviderWrapper>
  );
});

export default RequestListPanel;
