import React, { memo } from "react";
import TreeView from "@/components/ui/tree-view/TreeView";

interface Props {
  id: string;
  level: number;
  isLastChild?: boolean;
  isRootLastChild?: boolean;
  childrenElements?: Array<string>;
  type: "folder" | "request";
  isExpended: boolean;
  parentId?: string;
  itemCTA?: React.ReactNode;
  tagEle?: React.ReactNode;
}

const TreeListItem = memo(
  ({
    id,
    level = 0,
    isLastChild,
    isRootLastChild = false,
    childrenElements = [],
    type,
    isExpended,
    parentId,
    itemCTA,
    tagEle,
  }: Props) => {
    return (
      <TreeView.ListItemProvider
        id={id}
        level={level}
        isLastChild={isLastChild}
        isRootLastChild={isRootLastChild}
        parentId={parentId}
        childrenElements={childrenElements}
        type={type}
        isExpended={isExpended}
      >
        <TreeView.ItemWrapper>
          <TreeView.Line
            level={level}
            isExpended={isExpended}
            isLastChild={isLastChild}
            isRootLastChild={isRootLastChild}
          >
            <TreeView.ItemTag>{tagEle}</TreeView.ItemTag>
          </TreeView.Line>
          <TreeView.ItemContent itemCTA={itemCTA} />
        </TreeView.ItemWrapper>
      </TreeView.ListItemProvider>
    );
  },
);

export default TreeListItem;
