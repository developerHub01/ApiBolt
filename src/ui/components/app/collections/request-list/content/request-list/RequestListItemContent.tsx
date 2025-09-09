import { memo, useCallback, useState } from "react";
import ItemCTA from "@/components/app/collections/request-list/content/request-list/item-cta/ItemCTA";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import RequestListItemFolderButton from "@/components/app/collections/request-list/content/request-list/RequestListItemFolderButton";
import { AnimatePresence } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/context/redux/hooks";
import type { RequestListItemInterface } from "@/types/request-response.types";
import { useRequestList } from "@/context/collections/request-list/RequestListProvider";
import { updateRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import RequestListItemName from "@/components/app/collections/request-list/content/request-list/RequestListItemName";
import RequestListItemContentWrapper from "@/components/app/collections/request-list/content/request-list/RequestListItemContentWrapper";
import RequestListItemWrapperLine from "@/components/app/collections/request-list/content/request-list/RequestListItemWrapperLine";

interface RequestListItemProps extends RequestListItemInterface {
  type: "folder" | "request";
  lavel: number;
}

const RequestListItemContent = memo(
  ({ id, type, children, parentId, lavel, ...props }: RequestListItemProps) => {
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
        childrenRequest={children}
        setIsHovering={setIsHovering}
      >
        <div className="h-7 flex items-center">
          {type === "folder" ? (
            <RequestListItemWrapperLine
              lavel={lavel}
              childrenRequest={children}
            >
              <RequestListItemFolderButton
                isExpended={isExpended ?? false}
                onClick={handleFolderButtonClick}
              />
            </RequestListItemWrapperLine>
          ) : (
            <RequestListItemWrapperLine
              lavel={lavel}
              childrenRequest={children}
            >
              <div className="w-10 flex justify-end items-center">
                <RequestMethodTag
                  method={method ?? "get"}
                  shortCut={true}
                  className="w-full"
                />
              </div>
            </RequestListItemWrapperLine>
          )}
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <div className="w-full text-sm h-7 flex justify-between items-center gap-1">
            <RequestListItemName id={id} name={props.name} />
            <AnimatePresence>
              {(isHovering || isContextMenuOpen) && (
                <ItemCTA type={type} id={id} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </RequestListItemContentWrapper>
    );
  }
);
export default RequestListItemContent;
