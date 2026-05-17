import React, {
  memo,
  MouseEvent,
  useCallback,
  useState,
  type DragEvent,
} from "react";
import { cn } from "@/lib/utils";
import { REQUEST_ITEM_SPACE_SIZE } from "@/constant/request-response.constant";
import { useTreeListItem } from "@/context/tree-view/TreeListItemProvider";
import { useTreeView } from "@/context/tree-view/TreeViewProvider";
import TreeView from "@/components/ui/tree-view/TreeView";

interface RequestListItemContentWrapperProps {
  children: React.ReactNode;
}

const TreeItemWrapper = memo(
  ({ children }: RequestListItemContentWrapperProps) => {
    const { selectedTab, handleChangeSelectedTab, checkIsRequestDropable } =
      useTreeView();
    const {
      id,
      method,
      isExpended,
      lavel,
      isRenameActive,
      handleToggleContextMenu,
      handleRenameAction,
      handleChangeHovering,
      handleMove,
    } = useTreeListItem();
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDragStart = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "move";
      },
      [id],
    );

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      setIsDragging(true);
    }, []);

    const handleDrop = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData("text/plain");
        const isDropAble = checkIsRequestDropable({
          dragRequestId: draggedId,
          dropRequestId: id,
          lavel,
        });

        setIsDragging(false);
        if (!isDropAble || draggedId === id) return;

        handleMove(draggedId);
      },
      [checkIsRequestDropable, handleMove, id, lavel],
    );

    const handleDragLeave = useCallback(() => setIsDragging(false), []);

    const handleRequestClick = useCallback(
      (e: MouseEvent<HTMLElement>) => {
        if (e.ctrlKey || e.metaKey) return handleRenameAction();
        handleChangeSelectedTab(id);
      },
      [handleChangeSelectedTab, handleRenameAction, id],
    );

    const leftSpace = REQUEST_ITEM_SPACE_SIZE * lavel;

    return (
      <>
        <TreeView.ListItemContentWrapperParent
          className={cn({
            /* active tab style */
            "bg-accent/80": selectedTab === id,

            /* active tab border color */
            "bg-transparent hover:bg-accent/50": selectedTab !== id,
            "border-green-500": selectedTab === id && method === "get",
            "border-blue-500": selectedTab === id && method === "post",
            "border-yellow-500": selectedTab === id && method === "put",
            "border-orange-500": selectedTab === id && method === "patch",
            "border-red-500": selectedTab === id && method === "delete",
            "border-primary": selectedTab === id && !method,
          })}
          onContextMenu={() => handleToggleContextMenu(true)}
          onClick={handleRequestClick}
          data-active={selectedTab === id}
        >
          <div
            className={cn(
              "pr-0.5 flex gap-1 w-full h-full items-center justify-between select-none group ring-2 rounded-md",
              {
                "ring-primary/50": isDragging,
                "ring-transparent": !isDragging,
              },
            )}
            onMouseEnter={() => handleChangeHovering(true)}
            onMouseLeave={() => handleChangeHovering(false)}
            draggable={!isRenameActive}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            style={{
              paddingLeft: leftSpace,
            }}
          >
            {children}
          </div>
        </TreeView.ListItemContentWrapperParent>
        {isExpended && <TreeView.ItemExpendedContent />}
      </>
    );
  },
);

export default TreeItemWrapper;
