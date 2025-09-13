import { memo, useCallback, useState } from "react";
import ItemCTA from "@/components/app/collections/request-list/content/request-list/item-cta/ItemCTA";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import RequestListItemFolderButton from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemFolderButton";
import { AnimatePresence } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import type { RequestListItemInterface } from "@/types/request-response.types";
import { useRequestList } from "@/context/collections/request-list/RequestListProvider";
import { updateRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import RequestListItemName from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemName";
import RequestListItemContentWrapper from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemContentWrapper";
import RequestListItemLine from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemLine";

interface RequestListItemProps extends RequestListItemInterface {
  type: "folder" | "request";
  lavel: number;
  isLastChild?: boolean;
  isRootLastChild?: boolean;
}

const RequestListItemContent = memo(
  ({
    id,
    type,
    children,
    parentId,
    lavel = 0,
    isLastChild = false,
    isRootLastChild = false,
    ...props
  }: RequestListItemProps) => {
    const dispatch = useAppDispatch();
    const method = useAppSelector(
      (state) => state.requestResponse.requestList[id].method ?? props.method
    );
    const isExpended = useAppSelector(
      (state) =>
        state.requestResponse.requestList[id].isExpended ?? props.isExpended
    );

    const { isContextMenuOpen } = useRequestList();
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const handleFolderButtonClick = useCallback(
      () =>
        dispatch(
          updateRequestOrFolder({
            id,
            isExpended: !isExpended,
          })
        ),
      [dispatch, id, isExpended]
    );

    return (
      <RequestListItemContentWrapper
        id={id}
        lavel={lavel}
        method={method}
        parentId={parentId}
        isExpended={isExpended}
        isRootLastChild={isRootLastChild}
        childrenRequest={children}
        setIsHovering={setIsHovering}
      >
        <RequestListItemLine
          lavel={lavel}
          isExpended={isExpended}
          isLastChild={isLastChild}
          isRootLastChild={isRootLastChild}
        >
          <div className="h-full w-6.5 flex items-center">
            {type === "folder" ? (
              <RequestListItemFolderButton
                isExpended={isExpended ?? false}
                onClick={handleFolderButtonClick}
              />
            ) : (
              <RequestMethodTag
                method={method ?? "get"}
                shortCut={true}
                shortCutSizeForAll={3}
                className="w-full px-0.5"
              />
            )}
          </div>
        </RequestListItemLine>
        <div className="w-full text-sm flex justify-between items-center gap-1">
          <RequestListItemName id={id} name={props.name} />
          <AnimatePresence>
            {(isHovering || isContextMenuOpen) && (
              <ItemCTA type={type} id={id} lavel={lavel} />
            )}
          </AnimatePresence>
        </div>
      </RequestListItemContentWrapper>
    );
  }
);
export default RequestListItemContent;
