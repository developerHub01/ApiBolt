import { ComponentProps, memo } from "react";
import { cn } from "@/lib/utils";
import TreeTopAction from "@/components/ui/tree-view/TreeTopAction";
import TreeContentSkeleton from "@/components/ui/tree-view/TreeContentSkeleton";
import TreeBottomAction from "@/components/ui/tree-view/TreeBottomAction";
import TreeContentWrapper from "@/components/ui/tree-view/TreeContentWrapper";
import TreeContentEmptyBox from "@/components/ui/tree-view/TreeContentEmptyBox";
import TreeRestArea from "@/components/ui/tree-view/TreeRestArea";
import TreeListItemProvider from "@/context/tree-view/TreeListItemProvider";
import TreeItemLine from "@/components/ui/tree-view/TreeItemLine";
import TreeItemTag from "@/components/ui/tree-view/TreeItemTag";
import TreeItemWrapper from "@/components/ui/tree-view/TreeItemWrapper";
import TreeItemName from "@/components/ui/tree-view/TreeItemName";
import TreeItemContent from "@/components/ui/tree-view/TreeItemContent";
import TreeListItemDeleteAlertDialog from "@/components/ui/tree-view/TreeListItemDeleteAlertDialog";
import TreeViewProvider from "@/context/tree-view/TreeViewProvider";
import TreeItemExpendedContent from "@/components/ui/tree-view/TreeItemExpendedContent";
import TreeItemFolderEmpty from "@/components/ui/tree-view/TreeItemFolderEmpty";
import TreeListItem from "@/components/ui/tree-view/TreeListItem";
import TreeListItemContentWrapperParent from "@/components/ui/tree-view/TreeListItemContentWrapperParent";

interface Props extends ComponentProps<"div"> {}

const TreeViewBase = memo(({ children, className = "", ...props }: Props) => {
  return (
    <div
      className={cn("w-full flex flex-col h-full gap-1", className)}
      {...props}
    >
      {children}
    </div>
  );
});

type TreeViewType = typeof TreeViewBase & {
  TopBar: typeof TreeTopAction;
  BottomBar: typeof TreeBottomAction;
  ContentWrapper: typeof TreeContentWrapper;
  ContentSkeleton: typeof TreeContentSkeleton;
  EmptyBox: typeof TreeContentEmptyBox;
  RestArea: typeof TreeRestArea;
  Line: typeof TreeItemLine;
  ListItem: typeof TreeListItem;
  ItemTag: typeof TreeItemTag;
  ItemWrapper: typeof TreeItemWrapper;
  ItemContent: typeof TreeItemContent;
  ItemName: typeof TreeItemName;
  ItemExpendedContent: typeof TreeItemExpendedContent;
  ItemFolderEmpty: typeof TreeItemFolderEmpty;
  ListItemContentWrapperParent: typeof TreeListItemContentWrapperParent;
  ListItemDeleteAlertDialog: typeof TreeListItemDeleteAlertDialog;
  ListItemProvider: typeof TreeListItemProvider;
  Provider: typeof TreeViewProvider;
};

const TreeView = TreeViewBase as TreeViewType;
TreeView.TopBar = TreeTopAction;
TreeView.BottomBar = TreeBottomAction;
TreeView.ContentWrapper = TreeContentWrapper;
TreeView.ContentSkeleton = TreeContentSkeleton;
TreeView.EmptyBox = TreeContentEmptyBox;
TreeView.RestArea = TreeRestArea;
TreeView.Line = TreeItemLine;
TreeView.ListItem = TreeListItem;
TreeView.ItemTag = TreeItemTag;
TreeView.ItemWrapper = TreeItemWrapper;
TreeView.ItemContent = TreeItemContent;
TreeView.ItemName = TreeItemName;
TreeView.ItemName = TreeItemName;
TreeView.ItemExpendedContent = TreeItemExpendedContent;
TreeView.ItemFolderEmpty = TreeItemFolderEmpty;
TreeView.ListItemContentWrapperParent = TreeListItemContentWrapperParent;
TreeView.ListItemDeleteAlertDialog = TreeListItemDeleteAlertDialog;
TreeView.ListItemProvider = TreeListItemProvider;
TreeView.Provider = TreeViewProvider;

export default TreeView;
