import React, {
  memo,
  MouseEvent,
  useCallback,
  useState,
  type DragEvent,
} from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { cn } from "@/lib/utils";
import RequestListItemExpendedContent from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemExpendedContent";
import RequestListItemContentWrapperParent from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemContentWrapperParent";
import { useRequestListItem } from "@/context/collections/request-list/RequestListItemProvider";
import { moveRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import { REQUEST_ITEM_SPACE_SIZE } from "@/constant/request-response.constant";
import useRequestItemDetails from "@/hooks/request-response/request-list/use-request-item-details";
import { selectSelectedTab } from "@/context/redux/request-response/selectors/tab-list";
import { changeSelectedTab } from "@/context/redux/request-response/thunks/tab-list";

interface RequestListItemContentWrapperProps {
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const RequestListItemContentWrapper = memo(
  ({ setIsHovering, children }: RequestListItemContentWrapperProps) => {
    const dispatch = useAppDispatch();
    const {
      id,
      parentId,
      method,
      isExpended,
      lavel,
      isRenameActive,
      handleToggleContextMenu,
      handleRenameAction,
    } = useRequestListItem();
    const selectedTab = useAppSelector(selectSelectedTab);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const { checkIsRequestDropable } = useRequestItemDetails();

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

        dispatch(
          moveRequestOrFolder({
            requestId: draggedId,
            parentId: children ? id : parentId,
          }),
        );
      },
      [checkIsRequestDropable, children, dispatch, id, lavel, parentId],
    );

    const handleDragLeave = useCallback(() => setIsDragging(false), []);

    const handleRequestClick = useCallback(
      (e: MouseEvent<HTMLElement>) => {
        if (e.ctrlKey || e.metaKey) return handleRenameAction();
        dispatch(changeSelectedTab(id));
      },
      [dispatch, handleRenameAction, id],
    );

    const leftSpace = REQUEST_ITEM_SPACE_SIZE * lavel;

    return (
      <>
        <RequestListItemContentWrapperParent
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
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
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
        </RequestListItemContentWrapperParent>
        {isExpended && <RequestListItemExpendedContent />}
      </>
    );
  },
);

export default RequestListItemContentWrapper;
