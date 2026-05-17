import { memo } from "react";
import { useTreeListItem } from "@/context/tree-view/TreeListItemProvider";
import TreeView from "@/components/ui/tree-view/TreeView";
import { useTreeView } from "@/context/tree-view/TreeViewProvider";

const TreeItemExpendedContent = memo(() => {
  const { children, lavel, isRootLastChild } = useTreeListItem();
  const { itemComponent: ItemComponent } = useTreeView();

  return (
    <div className="w-full select-text cursor-text">
      {!Array.isArray(children) || !children.length ? (
        <TreeView.ItemFolderEmpty />
      ) : (
        <>
          {children.map((id, index) => (
            <ItemComponent
              key={id}
              id={id}
              lavel={lavel + 1}
              isLastChild={index === children.length - 1}
              isRootLastChild={isRootLastChild && index === children.length - 1}
            />
          ))}
        </>
      )}
    </div>
  );
});

export default TreeItemExpendedContent;
