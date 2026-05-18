import { memo } from "react";
import ItemCTA from "@/components/app/mock/request-list/content/request-list/item-cta/ItemCTA";
import TreeView from "@/components/ui/tree-view/TreeView";
import { useTreeListItem } from "@/context/tree-view/TreeListItemProvider";

const RequestListItemContent = memo(() => {
  const { level, isExpended, isLastChild, isRootLastChild } = useTreeListItem();

  return (
    <TreeView.ItemWrapper>
      <TreeView.Line
        level={level}
        isExpended={isExpended}
        isLastChild={isLastChild}
        isRootLastChild={isRootLastChild}
      >
        <TreeView.ItemTag />
      </TreeView.Line>
      <TreeView.ItemContent itemCTA={<ItemCTA />} />
    </TreeView.ItemWrapper>
  );
});
export default RequestListItemContent;
