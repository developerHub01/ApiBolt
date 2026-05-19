import { type ReactNode } from "react";
import RequestListItem from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItem";
import TreeView from "@/components/ui/tree-view/TreeView";
import { useRequestListTree } from "@/context/request-list-tree/RequestListTreeProvider";

interface Props {
  children: ReactNode;
}

const RequestListPanelProviderWrapper = ({ children }: Props) => {
  const {
    requestList,
    selectedTab,
    handleMoveItem,
    handleChangeSelectedTab,
    handleAddSingleItem,
    handleChangeName,
    handleToggleExpended,
  } = useRequestListTree();

  return (
    <TreeView.Provider
      requestList={requestList}
      itemComponent={RequestListItem}
      selectedTab={selectedTab}
      handleMoveItem={handleMoveItem}
      handleChangeSelectedTab={handleChangeSelectedTab}
      handleAddSingleItem={handleAddSingleItem}
      handleChangeName={handleChangeName}
      handleToggleExpended={handleToggleExpended}
    >
      {children}
    </TreeView.Provider>
  );
};

export default RequestListPanelProviderWrapper;
