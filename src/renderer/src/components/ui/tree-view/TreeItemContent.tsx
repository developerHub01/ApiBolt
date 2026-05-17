import { ComponentProps, memo, ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useTreeListItem } from "@/context/tree-view/TreeListItemProvider";
import TreeView from "@/components/ui/tree-view/TreeView";

interface Props extends ComponentProps<"div"> {
  itemCTA?: ReactNode;
}

const TreeItemContent = memo(({ children, itemCTA, className = "" }: Props) => {
  const { isContextMenuOpen, isHovering } = useTreeListItem();

  return (
    <div
      className={cn(
        "w-full text-sm flex justify-between items-center gap-1",
        className,
      )}
    >
      {children ? (
        children
      ) : (
        <>
          <TreeView.ItemName />
          <AnimatePresence>
            {(isHovering || isContextMenuOpen) && (
              <div key="tree-item-cta">{itemCTA}</div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
});

export default TreeItemContent;
