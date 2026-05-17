import { type ReactNode } from "react";
import { useAppSelector } from "@/context/redux/hooks";
import { selectRequestOrFolderList } from "@/context/redux/request-response/selectors/request-list";
import RequestListItem from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItem";
import TreeView from "@/components/ui/tree-view/TreeView";

interface Props {
  children: ReactNode;
}

const RequestListPanelProviderWrapper = ({ children }: Props) => {
  const requestList = useAppSelector(selectRequestOrFolderList);

  return (
    <TreeView.Provider
      requestList={requestList}
      itemComponent={RequestListItem}
    >
      {children}
    </TreeView.Provider>
  );
};

export default RequestListPanelProviderWrapper;
