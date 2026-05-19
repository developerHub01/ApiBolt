import { memo } from "react";
import TreeView from "@/components/ui/tree-view/TreeView";
import RequestListContent from "@/components/app/collections/request-list/RequestListContent";
import ListBottomAction from "@/components/app/collections/request-list/list-bottom-action/ListBottomAction";
import RequestListDeleteAlertDialog from "@/components/app/collections/request-list/content/request-list/RequestListDeleteAlertDialog";
import AddAction from "@/components/app/collections/request-list/AddAction";
import RequestListPanelProviderWrapper from "@/components/app/collections/request-list/RequestListPanelProviderWrapper";
import RequestListTreeProvider from "@/context/request-list-tree/RequestListTreeProvider";

const RequestListPanel = memo(() => {
  return (
    <RequestListTreeProvider>
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
    </RequestListTreeProvider>
  );
});

export default RequestListPanel;
