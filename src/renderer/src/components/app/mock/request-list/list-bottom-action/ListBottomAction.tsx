import { memo } from "react";
import ActionButton from "@/components/app/mock/request-list/list-bottom-action/ActionButton";
import DeleteButton from "@/components/app/mock/request-list/list-bottom-action/DeleteButton";
import useRequestListAction from "@/hooks/mock/request-list/use-request-list-action";
import TreeView from "@/components/ui/tree-view/TreeView";

const ListBottomAction = memo(() => {
  const { list, handleAction } = useRequestListAction();

  return (
    <TreeView.BottomBar>
      {list.map(item => (
        <ActionButton key={item.id} {...item} onClick={handleAction} />
      ))}
      <DeleteButton />
    </TreeView.BottomBar>
  );
});

export default ListBottomAction;
