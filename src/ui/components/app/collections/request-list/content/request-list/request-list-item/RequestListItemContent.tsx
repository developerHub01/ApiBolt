import { memo, useCallback, useState } from "react";
import ItemCTA from "@/components/app/collections/request-list/content/request-list/item-cta/ItemCTA";
import RequestMethodTag from "@/components/app/RequestMethodTag";
import RequestListItemFolderButton from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemFolderButton";
import { AnimatePresence } from "motion/react";
import { useAppDispatch } from "@/context/redux/hooks";
import { useRequestListItem } from "@/context/collections/request-list/RequestListItemProvider";
import { updateRequestOrFolder } from "@/context/redux/request-response/thunks/request-list";
import RequestListItemName from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemName";
import RequestListItemContentWrapper from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemContentWrapper";
import RequestListItemLine from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemLine";

const RequestListItemContent = memo(() => {
  const dispatch = useAppDispatch();
  const {
    id,
    isExpended,
    method,
    isContextMenuOpen,
    lavel,
    isRootLastChild,
    isLastChild,
    type,
  } = useRequestListItem();
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
    <RequestListItemContentWrapper setIsHovering={setIsHovering}>
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
        <RequestListItemName />
        <AnimatePresence>
          {(isHovering || isContextMenuOpen) && <ItemCTA />}
        </AnimatePresence>
      </div>
    </RequestListItemContentWrapper>
  );
});
export default RequestListItemContent;
