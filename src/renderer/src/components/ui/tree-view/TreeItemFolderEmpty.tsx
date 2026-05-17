import { memo } from "react";
import { REQUEST_ITEM_SPACE_SIZE } from "@/constant/request-response.constant";
import { Button } from "@/components/ui/button";
import { useTreeListItem } from "@/context/tree-view/TreeListItemProvider";
import { useTreeView } from "@/context/tree-view/TreeViewProvider";
import TreeView from "@/components/ui/tree-view/TreeView";

const TreeItemFolderEmpty = memo(() => {
  const {
    emtpyFolderContent: { startText, actionText, endText },
  } = useTreeView();
  const { lavel, isRootLastChild, handleAddSingle } = useTreeListItem();

  const emptyLeftSpace =
    REQUEST_ITEM_SPACE_SIZE + REQUEST_ITEM_SPACE_SIZE * lavel;

  return (
    <TreeView.ListItemContentWrapperParent className="h-auto cursor-auto">
      <div
        className="text-xs text-muted-foreground"
        style={{
          paddingLeft: emptyLeftSpace,
        }}
      >
        <TreeView.Line
          lavel={lavel + 1}
          isLastChild={true}
          isExpended={false}
          isRootLastChild={isRootLastChild}
          className="select-none leading-relaxed py-1.5"
        >
          {startText}.
          <br />
          <Button
            variant={"link"}
            size={"sm"}
            className="px-0 text-xs! h-auto"
            onClick={handleAddSingle}
          >
            {actionText}
          </Button>{" "}
          {endText}.
        </TreeView.Line>
      </div>
    </TreeView.ListItemContentWrapperParent>
  );
});

export default TreeItemFolderEmpty;
