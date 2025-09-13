import { memo, useCallback } from "react";
import { REQUEST_ITEM_SPACE_SIZE } from "@/constant/request-response.constant";
import RequestListItemLine from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemLine";
import RequestListItemContentWrapperParent from "@/components/app/collections/request-list/content/request-list/request-list-item/RequestListItemContentWrapperParent";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/context/redux/hooks";
import { createSingleRequest } from "@/context/redux/request-response/thunks/request-list";

interface Props {
  id: string;
  lavel: number;
  isRootLastChild?: boolean;
}

const RequestListItemFolderEmpty = memo(
  ({ id, lavel, isRootLastChild = false }: Props) => {
    const dispatch = useAppDispatch();
    const handleAddRequest = useCallback(
      async () => await dispatch(createSingleRequest(id)),
      [dispatch, id]
    );

    const emptyLeftSpace = REQUEST_ITEM_SPACE_SIZE * lavel;

    return (
      <RequestListItemContentWrapperParent className="h-auto cursor-auto">
        <div
          className="text-xs text-muted-foreground"
          style={{
            paddingLeft: emptyLeftSpace,
          }}
        >
          <RequestListItemLine
            lavel={lavel}
            className="select-none leading-relaxed py-1.5"
            isLastChild={true}
            isExpended={false}
            isRootLastChild={isRootLastChild}
          >
            This folder is empty.
            <br />
            <Button
              variant={"link"}
              size={"sm"}
              className="px-0 text-xs! h-auto"
              onClick={handleAddRequest}
            >
              Add a request
            </Button>{" "}
            to start working.
          </RequestListItemLine>
        </div>
      </RequestListItemContentWrapperParent>
    );
  }
);

export default RequestListItemFolderEmpty;
