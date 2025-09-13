import React, { memo, useCallback, useState, type DragEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import { selectSelectedTab } from "@/context/redux/request-response/request-response-selector";
import { cn } from "@/lib/utils";
import RequestListItemExpendedContent from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemExpendedContent";
import RequestListItemContentWrapperParent from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemContentWrapperParent";
import { useRequestList } from "@/context/collections/request-list/RequestListProvider";
import type { RequestListItemInterface } from "@/types/request-response.types";
import { moveRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import { handleChangeSelectedTab } from "@/context/redux/request-response/request-response-slice";
import { REQUEST_ITEM_SPACE_SIZE } from "@/constant/request-response.constant";
import useRequestItemDetails from "@/hooks/request-response/request-list/use-request-item-details";

interface RequestListItemContentWrapperProps
  extends Pick<
    RequestListItemInterface,
    "id" | "method" | "parentId" | "isExpended"
  > {
  lavel: number;
  isRootLastChild?: boolean;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
  childrenRequest: RequestListItemInterface["children"];
  children: React.ReactNode;
}

const RequestListItemContentWrapper = memo(
  ({
    id,
    setIsHovering,
    lavel = 0,
    method,
    parentId,
    isExpended,
    isRootLastChild,
    childrenRequest,
    children,
  }: RequestListItemContentWrapperProps) => {
    const dispatch = useAppDispatch();
    const selectedTab = useAppSelector(selectSelectedTab);
    const { isRenameActive, handleToggleContextMenu } = useRequestList();
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const { checkIsRequestDropable } = useRequestItemDetails();

    const handleDragStart = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", id);
        e.dataTransfer.effectAllowed = "move";
      },
      [id]
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
          })
        );
      },
      [checkIsRequestDropable, children, dispatch, id, lavel, parentId]
    );

    const handleDragLeave = useCallback(() => setIsDragging(false), []);

    const handleRequestClick = useCallback(
      () => dispatch(handleChangeSelectedTab(id)),
      [dispatch, id]
    );

    const leftSpace = REQUEST_ITEM_SPACE_SIZE * lavel;

    return (
      <>
        <RequestListItemContentWrapperParent
          className={cn({
            /* active tab style */
            "bg-accent": selectedTab === id,

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
              }
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
        {isExpended && (
          <RequestListItemExpendedContent
            id={id}
            children={childrenRequest}
            lavel={lavel}
            isRootLastChild={isRootLastChild}
          />
        )}
      </>
    );
  }
);

export default RequestListItemContentWrapper;
